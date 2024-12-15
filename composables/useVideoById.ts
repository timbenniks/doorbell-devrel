import type { VideoDetail } from "~/types"

export function useVideoById(videoId: string) {
  const { data, pending, error } = useFetch<VideoDetail>(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`,
    {
      headers: {
        'accept': 'application/json',
        'x-api-key': 'YjkyNDU5OGUyYTkxNDk0ZGJhN2NjOGUyZTNkZGFkODAtMTY3OTcyMDY1NQ=='
      }
    })

  return { data, pending, error }
}