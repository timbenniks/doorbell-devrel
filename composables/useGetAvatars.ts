
export function useGetAvatars() {
  const getAvatars = async () => {
    const { $stack } = useNuxtApp()

    const result = await $stack
      .contentType("avatar")
      .entry()
      .only([
        "title",
        "avatar",
        "created_at",
        "avatar_id",
        "voice",
        "voice_id",
        "gender",
        "intro",
        "background_noise",
        "vignette",
        "thumbnail.url",
        "thumbnail.uid",
        "thumbnail.filename",
        "thumbnail.title",
        "width",
        "height",
        "scale"
      ])
      .includeCount()
      .find();

    return result.entries
  }

  const { data, status, error, refresh } = useAsyncData('avatars', getAvatars)

  return { data, status, error, refresh }
}
