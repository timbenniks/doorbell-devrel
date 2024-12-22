import type { MediaAsset } from "~/types";

export function useCloudinaryWidget() {
  const { cloudinaryApiKey, cloudinaryCloudname, cloudinaryFolder } = useRuntimeConfig().public

  const introAsset = ref<MediaAsset | null>(null);
  const noiseAsset = ref<MediaAsset | null>(null);

  const openMediaLibrary = (assetType: 'intro' | 'noise') => {
    // @ts-ignore - Cloudinary widget types are not available
    window.cloudinary.createMediaLibrary({
      cloud_name: cloudinaryCloudname,
      api_key: cloudinaryApiKey,
      folder: { path: cloudinaryFolder },
      multiple: false,
    }, {
      insertHandler: (data: { assets: MediaAsset[] }) => {
        if (data.assets.length > 0) {
          if (assetType === 'intro') {
            introAsset.value = data.assets[0];
          } else {
            noiseAsset.value = data.assets[0];
          }
        }
      }
    }).show();
  };

  return {
    introAsset,
    noiseAsset,
    openMediaLibrary
  };
}