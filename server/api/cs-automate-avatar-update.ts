export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const body = await readBody(event);
  const response = await $fetch('https://eu-app.contentstack.com/automations-api/run/a39861944ddb414f835325a564589bc4', {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: {
      "event_type": "avatar.update",
      "event_data": body
    },
  });

  return {
    message: "Contentstack avatar update automation",
    response
  };
});














