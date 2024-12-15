import type { MediaAsset } from "~/types";

export function useCloudinaryWidget() {
  const cloudName = 'dwfcofnrd';
  const uploadPreset = 'dd';

  const videoAsset = ref<MediaAsset | null>(null);
  const subtitleAsset = ref<MediaAsset | null>(null);

  const openMediaLibrary = (assetType: 'video' | 'subtitle') => {
    // @ts-ignore - Cloudinary widget types are not available
    window.cloudinary.createMediaLibrary({
      cloud_name: cloudName,
      api_key: '616751826717264',
      folder: { path: uploadPreset },
      multiple: false,
      resource_type: assetType === 'video' ? 'video' : 'raw',
      allowed_formats: assetType === 'video' ? ['mp4', 'mov'] : ['srt'],
    }, {
      insertHandler: (data: { assets: MediaAsset[] }) => {
        if (data.assets.length > 0) {
          if (assetType === 'video') {
            videoAsset.value = data.assets[0];
          } else {
            subtitleAsset.value = data.assets[0];
          }
        }
      }
    }).show();
  };

  return {
    videoAsset,
    subtitleAsset,
    openMediaLibrary
  };
}