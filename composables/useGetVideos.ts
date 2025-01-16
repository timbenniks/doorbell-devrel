export function useGetVideos() {
  const getVideos = async () => {
    const { $stack } = useNuxtApp()

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

    return result.entries
  }

  const { data, status, error, refresh } = useAsyncData('videos', getVideos)

  return { data, status, error, refresh }
}
