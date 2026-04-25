/**
 * Helper utilities to manage Supabase Storage uploads.
 */

/**
 * Faz o upload de uma imagem de servico para o bucket 'services' no Supabase Storage.
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase O cliente Supabase inicializado
 * @param {File} file O ficheiro de imagem a ser carregado
 * @param {string} path O caminho onde o ficheiro deve ser guardado (ex: 'services/uuid_nome.jpg')
 * @returns {Promise<string>} O URL publico da imagem carregada
 */
export async function uploadServiceImage(supabase, file, path) {
  if (!file) throw new Error('Nenhum ficheiro fornecido.');

  // Fazemos o upload para o bucket 'services' (necessario criar este bucket no painel do Supabase)
  const { data, error } = await supabase.storage
    .from('services')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw error;
  }

  // Retornamos o URL publico
  const { data: { publicUrl } } = supabase.storage
    .from('services')
    .getPublicUrl(path);

  return publicUrl;
}
