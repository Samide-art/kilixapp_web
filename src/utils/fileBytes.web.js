const extensionFromUri = (uri = '') => {
  const clean = String(uri).split('?')[0].split('#')[0];
  const match = clean.match(/\.([a-z0-9]+)$/i);
  return match ? `.${match[1].toLowerCase()}` : '';
};

const getBlob = async (fileUri) => {
  if (!fileUri) throw new Error('مسار الملف غير موجود');
  const response = await fetch(fileUri);
  if (!response.ok) throw new Error('تعذر الوصول إلى الملف المحدد');
  return response.blob();
};

export const getFileInfo = async (fileUri) => {
  const blob = await getBlob(fileUri);
  return {
    size: Number(blob.size) || 0,
    type: blob.type || '',
    extension: extensionFromUri(fileUri),
    arrayBuffer: () => blob.arrayBuffer(),
  };
};
