import type { MediaAsset } from '../types';

const CLOUDINARY_CONFIG = {
  cloudName: 'dwfcofnrd',
  uploadPreset: 'dd',
  aspectRatio: 'ar_9:16',
  crop: 'c_fill',
  width: 1080,
  height: 1920
} as const;

export function generateCloudinaryUrl(
  videoAsset: MediaAsset | null,
  subtitleAsset: MediaAsset | null,
  volume: number,
  vignette: number
): string {
  if (!videoAsset) return '';

  const { cloudName, uploadPreset, aspectRatio, crop, width, height } = CLOUDINARY_CONFIG;
  const videoId = videoAsset.public_id.replace(`${uploadPreset}/`, '');
  const subtitleId = subtitleAsset ? subtitleAsset.public_id.replace(`${uploadPreset}/`, '') : '';

  const transformations = [
    `${aspectRatio},${crop},w_${width},h_${height}`,
    `fl_splice,l_video:${uploadPreset}:${videoId}`,
    `l_audio:${uploadPreset}:noise,e_volume:${volume}`,
    `e_vignette:${vignette}`,
  ];

  if (subtitleAsset) {
    transformations.push(
      `l_subtitles:${uploadPreset}:${subtitleId},so_3,du_10,g_south,co_white`
    );
  }

  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformations.join('/')}/${uploadPreset}/intro.mp4`;
}