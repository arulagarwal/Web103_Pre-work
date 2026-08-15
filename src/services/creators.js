import { supabase } from '../client';

const TABLE = 'creators';

export async function getCreators() {
  const { data, error } = await supabase.from(TABLE).select('*').order('id', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

// maybeSingle rather than single: single() throws PGRST116 on zero rows, which
// would turn a stale or mistyped URL into an exception instead of a "not found" page.
export async function getCreatorById(id) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).maybeSingle();

  if (error) throw error;
  return data;
}

// supabase-js v2 returns data: null from mutations unless .select() is chained.
export async function createCreator(creator) {
  const { data, error } = await supabase.from(TABLE).insert([creator]).select().single();

  if (error) throw error;
  return data;
}

export async function updateCreator(id, updates) {
  const { data, error } = await supabase.from(TABLE).update(updates).eq('id', id).select().single();

  if (error) throw error;
  return data;
}

export async function deleteCreator(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);

  if (error) throw error;
}
