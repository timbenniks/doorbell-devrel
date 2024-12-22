export function generateCloudinaryUrl(
  cloudinary_video: string,
  background_noise: string,
  vignette: boolean,
  intro: string,
): string {

  if (!cloudinary_video) return '';

  const transformations = [
    `fl_splice,l_video:${cloudinary_video.replace("/", ":")}`,
    `l_audio:${background_noise.replace("/", ":")},e_volume:30`,
    `${vignette ? "e_vignette:70" : ""}`,
    intro
  ];

  return `https://res.cloudinary.com/dwfcofnrd/video/upload/${transformations.join('/')}`;
}