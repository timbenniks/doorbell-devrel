import type { LivePreviewQuery } from "@contentstack/delivery-sdk"
// import contentstack from "@contentstack/delivery-sdk"

export function useGetAvatars() {
  const getAvatars = async () => {
    const { $preview, $stack } = useNuxtApp()
    const route = useRoute()
    const qs = toRaw(route.query)

    if ($preview && qs?.live_preview) {
      const route = useRoute()
      const qs = toRaw(route.query)
      $stack.livePreviewQuery(qs as unknown as LivePreviewQuery)
    }

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
        "thumbnail.url",
        "thumbnail.uid",
        "thumbnail.filename",
        "thumbnail.title",
      ])
      .includeCount()
      .find();

    if ($preview) {
      result.entries?.forEach(entry => {
        if (entry) {
          //@ts-ignore
          contentstack.Utils.addEditableTags(entry, 'video', true)
        }
      })
    }

    return result.entries
  }

  const { data, status, error, refresh } = useAsyncData('avatars', getAvatars)

  return { data, status, error, refresh }
}
