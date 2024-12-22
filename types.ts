export interface Video {
  "video_id": string;
  "status": "draft" | "completed" | "processing" | "pending";
  "video_title": string;
  "created_at"?: number;
  "type": string;
}

export interface VideoDetail {
  data: {
    "callback_id"?: string;
    "caption_url": string;
    "created_at"?: number;
    "duration": string;
    "error": string;
    "gif_url": string;
    "id": string;
    "status": "draft" | "completed" | "processing" | "pending";
    "thumbnail_url": string;
    "video_url": string;
    "video_url_caption": string;
  }
}

export type VideoList = {
  data: {
    videos: Video[]
  }
}

export interface EnhancedVideo extends Video, VideoDetail { }

export interface MediaAsset {
  public_id: string;
  secure_url: string;
}