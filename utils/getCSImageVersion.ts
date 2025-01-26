export function getCSImageVersion(image: any) {
  const { apiKey, assetHost } = useRuntimeConfig().public;

  const assetuid = image?.uid;
  const url = image?.url;
  const src = image?.filename;

  const baseStr = url.split(src)[0];

  const versionuid = baseStr.split(
    `https://${assetHost}/${apiKey}/${assetuid}/`
  )[1];

  return versionuid.slice(0, -1);
}