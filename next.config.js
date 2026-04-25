/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Dominios permitidos para o componente <Image> do Next.js
    // lh3.googleusercontent.com: avatares do Google OAuth
    // localhost: desenvolvimento local
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

module.exports = nextConfig
