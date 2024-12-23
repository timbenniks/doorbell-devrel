
export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  await $fetch('https://eu-app.contentstack.com/automations-api/run/1ab919bd1fb848909bc59a85ee6805d3', {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: {
      "event_type": "avatar_video.success",
      "event_data": {
        "video_id": "73420818d8fc4f999a8aaf67a7aee09d"
      }
    },
  });

  return {
    message: "Contentstack mock video success automation running",
    response: {
      data: {
        video_id: "73420818d8fc4f999a8aaf67a7aee09d"
      }
    },
  };
});