import { File } from 'expo-file-system';

const extensionFromUri = (uri = '') => {
  const clean = String(uri).split('?')[0].split('#')[0];
  const match = clean.match(/\.([a-z0-9]+)$/i);
  return match ? `.${match[1].toLowerCase()}` : '';
};

export const getFileInfo = (fileUri) => {
  if (!fileUri) throw new Error('مسار الملف غير موجود');
  const file = new File(fileUri);
  if (!file.exists) throw new Error('تعذر الوصول إلى الملف المحدد');
  return {
    size: Number(file.size) || 0,
    type: file.type || '',
    extension: file.extension || extensionFromUri(fileUri),
    arrayBuffer: () => file.arrayBuffer(),
  };
};
