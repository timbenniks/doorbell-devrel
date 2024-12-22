export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const body = await readBody(event);
  const { title, text, avatarid } = body;

  if (!title || !text) {
    return {
      error: 'Title and text are required',
    };
  }

  const { heyGenApiKey, heyGenVoiceId } = useRuntimeConfig().public

  const response = await $fetch('https://api.heygen.com/v2/video/generate', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'x-api-key': heyGenApiKey,
    },
    body: {
      dimension: {
        "width": 720,
        "height": 1280
      },
      test: true,
      caption: true,
      callback_id: null,
      title,
      video_inputs: [
        {
          character: {
            type: 'avatar',
            avatar_id: avatarid || 'cb8556ae91434b5a8ab2363df4fd9eef',
            scale: 2.4,
          },
          voice: {
            type: "text",
            voice_id: heyGenVoiceId,
            input_text: text,
          }
        },
      ],
    },
  });

  return {
    message: 'New video created in HeyGen',
    response
  };
});