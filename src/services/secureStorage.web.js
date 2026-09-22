/**
 * Browser implementation for the existing local token/cart persistence.
 * Supabase's own session persistence remains configured separately.
 */
const getStorage = () => (typeof window !== 'undefined' ? window.localStorage : null);

export const getItemAsync = async (key) => {
  try { return getStorage()?.getItem(key) ?? null; } catch { return null; }
};

export const setItemAsync = async (key, value) => {
  try { getStorage()?.setItem(key, String(value)); } catch {}
};

export const deleteItemAsync = async (key) => {
  try { getStorage()?.removeItem(key); } catch {}
};
