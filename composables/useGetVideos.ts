import type { LivePreviewQuery } from "@contentstack/delivery-sdk"
// import contentstack from "@contentstack/delivery-sdk"

export function useGetVideos() {
  const getVideos = async () => {
    const { $preview, $stack } = useNuxtApp()
    const route = useRoute()
    const qs = toRaw(route.query)

    if ($preview && qs?.live_preview) {
      const route = useRoute()
      const qs = toRaw(route.query)
      $stack.livePreviewQuery(qs as unknown as LivePreviewQuery)
    }

    const result = await $stack
      .contentType("video")
      .entry()
      .only([
        "title",
        "video_id",
        "created_at",
        "duration",
        "heygen_status",
        "intro",
        "background_noise",
        "animated_poster.url",
        "animated_poster.uid",
        "animated_poster.filename",
        "animated_poster.title",
        "poster.url",
        "poster.uid",
        "poster.filename",
        "poster.title",
        "video.url",
        "video.uid",
        "video.filename",
        "video.title"
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

  const { data, pending, error, refresh } = useAsyncData('videos', getVideos)

  return { data, pending, error, refresh }
}
