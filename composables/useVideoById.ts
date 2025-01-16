export function useVideoById(videoId: string) {
  const getVideo = async () => {
    const { $stack } = useNuxtApp()

    const entry = await $stack
      .contentType("video")
      .entry(videoId)
      .fetch()

    return entry
  }

  const { data, status, error, refresh } = useAsyncData(`video-${videoId}`, getVideo)

  return { data, status, error, refresh }
}
