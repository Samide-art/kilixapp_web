/**
 * Platform-safe secure-ish storage adapter.
 * Native keeps the existing Expo SecureStore implementation.
 * Web uses localStorage because SecureStore is not available in browsers.
 * Authentication itself remains owned by Supabase; this key is only a local
 * compatibility/cache token used by the existing app.
 */
import * as SecureStore from 'expo-secure-store';

export const getItemAsync = (...args) => SecureStore.getItemAsync(...args);
export const setItemAsync = (...args) => SecureStore.setItemAsync(...args);
export const deleteItemAsync = (...args) => SecureStore.deleteItemAsync(...args);
