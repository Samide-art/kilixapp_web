import * as ImagePicker from 'expo-image-picker';

const assetToFile = (asset, fallbackName) => ({
  uri: asset.uri,
  fileName: asset.fileName || asset.uri?.split('/').pop() || fallbackName,
  mimeType: asset.mimeType || 'application/octet-stream',
  duration: asset.duration || 0,
  fileSize: asset.fileSize || 0,
});

export const requestMediaPermissions = async () => ({ granted: true });

export const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'], allowsEditing: false, aspect: [4, 3], quality: 0.8,
  });
  return !result.canceled && result.assets?.[0]
    ? assetToFile(result.assets[0], `image_${Date.now()}.jpg`)
    : null;
};

export const pickVideo = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['videos'], allowsEditing: false, quality: 0.8,
  });
  if (result.canceled || !result.assets?.[0]) return null;
  const asset = result.assets[0];
  if (asset.fileSize && asset.fileSize > 50 * 1024 * 1024) {
    const mb = asset.fileSize / 1024 / 1024;
    throw new Error(`حجم الفيديو (${mb.toFixed(2)}MB) يتجاوز الحد الأقصى (50MB)`);
  }
  return assetToFile(asset, `video_${Date.now()}.mp4`);
};

export const pickMultipleImages = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'], allowsMultipleSelection: true, quality: 0.8,
  });
  return !result.canceled && result.assets ? result.assets.map((a) => assetToFile(a, `image_${Date.now()}.jpg`)) : [];
};

export const validateFileSize = async (fileUri, maxSizeInMB = 50) => {
  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const sizeMB = blob.size / 1024 / 1024;
    return sizeMB > maxSizeInMB
      ? { isValid: false, sizeMB, error: `حجم الملف (${sizeMB.toFixed(2)}MB) يتجاوز الحد الأقصى (${maxSizeInMB}MB)` }
      : { isValid: true, sizeMB };
  } catch {
    return { isValid: false, sizeMB: 0, error: 'حدث خطأ أثناء التحقق من حجم الملف' };
  }
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
