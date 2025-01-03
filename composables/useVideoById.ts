import type { LivePreviewQuery } from "@contentstack/delivery-sdk"
import contentstack from "@contentstack/delivery-sdk"

export function useVideoById(videoId: string) {
  const getVideo = async () => {
    const { $preview, $stack } = useNuxtApp()
    const route = useRoute()
    const qs = toRaw(route.query)

    if ($preview && qs?.live_preview) {
      const route = useRoute()
      const qs = toRaw(route.query)
      $stack.livePreviewQuery(qs as unknown as LivePreviewQuery)
    }

    const entry = await $stack
      .contentType("video")
      .entry(videoId)
      .fetch()

    if ($preview) {
      contentstack.Utils.addEditableTags(entry as any, 'video', true)
    }

    return entry
  }

  const { data, status, error, refresh } = useAsyncData(`video-${videoId}`, getVideo)

  return { data, status, error, refresh }
}
