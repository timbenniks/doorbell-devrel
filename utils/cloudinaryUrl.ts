export function generateCloudinaryUrl(
  cloudinary_video: string,
  background_noise: string,
  vignette: boolean,
  intro: string,
): string {

  if (!cloudinary_video) return '';

  const transformations = [
    'c_fill,w_720,h_1280',
    `fl_splice,l_video:${cloudinary_video.replace("/", ":")}`,
    'c_fill,w_720,h_1280',
    `l_audio:${background_noise.replace("/", ":")},e_volume:30`,
    'c_crop,h_1170,y_0',
    `${vignette ? "e_vignette:70" : ""}`,
    intro
  ];

  return `https://res.cloudinary.com/dwfcofnrd/video/upload/${transformations.join('/')}`;
}