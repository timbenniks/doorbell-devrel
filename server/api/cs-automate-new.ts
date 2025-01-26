export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const body = await readBody(event);
  const { video_id, title, intro, background_noise, vignette, prompt, description, width, height } = body;

  await $fetch('https://eu-app.contentstack.com/automations-api/run/08e7f723473444a58d34086ae06f3e98', {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: {
      "event_type": "avatar_video.creation",
      "event_data": {
        "video_id": video_id,
        "title": title,
        "intro": intro || "",
        "background_noise": background_noise || "",
        "heygen_status": "processing",
        "vignette": vignette || false,
        "prompt": prompt || "",
        "description": description || "",
        "width": width || 720,
        "height": height || 1280
      }
    },
  });

  return {
    message: "Contentstack new video automation running",
    response: {
      data: {
        video_id
      }
    },
  };
});














