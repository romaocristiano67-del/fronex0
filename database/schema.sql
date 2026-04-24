-- Schema do banco de dados Fronex Marketplace
-- Execute no Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT CHECK (phone IS NULL OR char_length(regexp_replace(phone, '\D', '', 'g')) BETWEEN 9 AND 15),
  company TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  duration_days INTEGER NOT NULL CHECK (duration_days > 0),
  features JSONB NOT NULL DEFAULT '{}'::jsonb,
  max_listings INTEGER CHECK (max_listings IS NULL OR max_listings >= 0),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (char_length(trim(title)) BETWEEN 5 AND 100),
  description TEXT NOT NULL CHECK (char_length(trim(description)) BETWEEN 20 AND 2000),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  price NUMERIC(10, 2) CHECK (price IS NULL OR price >= 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'pending_review', 'active', 'sold', 'rejected', 'archived')),
  condition TEXT CHECK (condition IS NULL OR condition IN ('new', 'used', 'refurbished')),
  company TEXT,
  location TEXT,
  views INTEGER NOT NULL DEFAULT 0 CHECK (views >= 0),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.listing_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0 CHECK (order_index >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  sender_name TEXT NOT NULL CHECK (char_length(trim(sender_name)) >= 2),
  sender_email TEXT,
  sender_phone TEXT,
  message TEXT NOT NULL CHECK (char_length(trim(message)) BETWEEN 10 AND 2000),
  whatsapp_sent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT messages_sender_email_valid CHECK (
    sender_email IS NULL OR sender_email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ),
  CONSTRAINT messages_sender_phone_valid CHECK (
    sender_phone IS NULL OR char_length(regexp_replace(sender_phone, '\D', '', 'g')) BETWEEN 9 AND 15
  )
);

CREATE INDEX IF NOT EXISTS idx_listings_user_id ON public.listings(user_id);
CREATE INDEX IF NOT EXISTS idx_listings_category_id ON public.listings(category_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON public.listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON public.listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_featured ON public.listings(featured);
CREATE INDEX IF NOT EXISTS idx_listing_images_listing_id ON public.listing_images(listing_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_messages_listing_id ON public.messages(listing_id);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Public can read categories" ON public.categories;
CREATE POLICY "Public can read categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can read active plans" ON public.subscription_plans;
CREATE POLICY "Public can read active plans" ON public.subscription_plans FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Anyone can view active listings" ON public.listings;
DROP POLICY IF EXISTS "Users can view own listings" ON public.listings;
DROP POLICY IF EXISTS "Users can insert own listings" ON public.listings;
DROP POLICY IF EXISTS "Users can update own listings" ON public.listings;
DROP POLICY IF EXISTS "Users can delete own listings" ON public.listings;
CREATE POLICY "Anyone can view active listings" ON public.listings FOR SELECT USING (status = 'active');
CREATE POLICY "Users can view own listings" ON public.listings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own listings" ON public.listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own listings" ON public.listings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own listings" ON public.listings FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can view images of active listings" ON public.listing_images;
DROP POLICY IF EXISTS "Users can view own listing images" ON public.listing_images;
DROP POLICY IF EXISTS "Users can insert images for own listings" ON public.listing_images;
DROP POLICY IF EXISTS "Users can delete images from own listings" ON public.listing_images;
CREATE POLICY "Anyone can view images of active listings" ON public.listing_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.listings
      WHERE public.listings.id = public.listing_images.listing_id
        AND public.listings.status = 'active'
    )
  );
CREATE POLICY "Users can view own listing images" ON public.listing_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.listings
      WHERE public.listings.id = public.listing_images.listing_id
        AND public.listings.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can insert images for own listings" ON public.listing_images
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.listings
      WHERE public.listings.id = public.listing_images.listing_id
        AND public.listings.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can delete images from own listings" ON public.listing_images
  FOR DELETE USING (
    EXISTS (
      SELECT 1
      FROM public.listings
      WHERE public.listings.id = public.listing_images.listing_id
        AND public.listings.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can insert messages" ON public.messages;
DROP POLICY IF EXISTS "Users can view messages of own listings" ON public.messages;
CREATE POLICY "Anyone can insert messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view messages of own listings" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.listings
      WHERE public.listings.id = public.messages.listing_id
        AND public.listings.user_id = auth.uid()
    )
  );

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_listings_updated_at ON public.listings;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.categories (name, slug, description, icon)
VALUES
  ('Eletronicos', 'eletronicos', 'Celulares, computadores e gadgets', 'device'),
  ('Veiculos', 'veiculos', 'Carros, motos e pecas', 'car'),
  ('Imoveis', 'imoveis', 'Casas, apartamentos e terrenos', 'home'),
  ('Servicos', 'servicos', 'Servicos diversos e profissionais', 'briefcase'),
  ('Moda', 'moda', 'Roupas, calcados e acessorios', 'shirt'),
  ('Esportes', 'esportes', 'Equipamentos e artigos desportivos', 'ball'),
  ('Livros', 'livros', 'Livros didaticos e literarios', 'book'),
  ('Outros', 'outros', 'Diversos', 'box')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.subscription_plans (name, slug, price, duration_days, features, max_listings)
VALUES
  ('Free', 'free', 0, 365, '{"featured": false, "priority_support": false, "analytics": false}', 3),
  ('Semanal', 'semanal', 4900, 7, '{"featured": true, "priority_support": false, "analytics": true}', 10),
  ('Mensal', 'mensal', 18900, 30, '{"featured": true, "priority_support": true, "analytics": true}', 50),
  ('Anual', 'anual', 189000, 365, '{"featured": true, "priority_support": true, "analytics": true, "custom_domain": true}', 999)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-images', 'listing-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Anyone can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own images" ON storage.objects;
CREATE POLICY "Anyone can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'listing-images');
CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'listing-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own images" ON storage.objects
  FOR DELETE USING (bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]);
