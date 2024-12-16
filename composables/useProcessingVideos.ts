import type { EnhancedVideo, VideoList, Video, VideoDetail } from '../types'

export function useProcessingVideos({ limit = 2 }: { limit?: number } = {}) {
  const headers = {
    'accept': 'application/json',
    'x-api-key': 'YjkyNDU5OGUyYTkxNDk0ZGJhN2NjOGUyZTNkZGFkODAtMTY3OTcyMDY1NQ=='
  }

  const fetchEnhancedVideos = async () => {
    const videoList = await $fetch<VideoList>(`https://api.heygen.com/v1/video.list?limit=${limit}`, { headers })

    const enhancedVideos = await Promise.all(
      videoList.data.videos
        .filter(video => video.status !== 'draft')
        .map(async (video: Video) => {
          const videoDetail = await $fetch<VideoDetail>(
            `https://api.heygen.com/v1/video_status.get?video_id=${video.video_id}`,
            { headers }
          )

          return { ...video, ...videoDetail }
        })
    )

    return enhancedVideos.filter(video => video.data.status === 'processing' || video.data.status === 'pending')
  }

  const { data, status, error, refresh } = useAsyncData<EnhancedVideo[]>(
    'enhancedVideoList',
    fetchEnhancedVideos
  )

  return { data, status, error, refresh }
}
