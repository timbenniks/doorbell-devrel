export function generateCloudinaryUrl(
  cloudinary_video: string,
  background_noise?: string,
  vignette: boolean = false,
  intro?: string,
  width: number = 720,
  height: number = 1280
): string {
  if (!cloudinary_video) return '';

  let baseSize = `c_fill,w_${width},h_${height}`

  let transformations: string[] = [
    baseSize
  ];

  if (intro) {
    transformations = transformations.concat([
      `fl_splice,l_video:${cloudinary_video.replace("/", ":")}`,
      baseSize
    ]);
  }

  if (background_noise) {
    transformations.push(`l_audio:${background_noise.replace("/", ":")},e_volume:30`);
  }

  if (width === 720 && height === 1280) {
    transformations.push('c_crop,h_1170,y_0');
  }

  if (vignette) {
    transformations.push('e_vignette:70');
  }

  if (intro) {
    transformations.push(intro);
  } else {
    transformations.push(cloudinary_video);
  }

  return `https://res.cloudinary.com/dwfcofnrd/video/upload/${transformations.join('/')}`;
}
