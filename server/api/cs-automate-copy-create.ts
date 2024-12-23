export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const body = await readBody(event);
  const response = await $fetch('https://eu-app.contentstack.com/automations-api/run/b5f7415f2a2240a7b1b61bb82c488497', {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: {
      "event_type": "copy.new",
      "event_data": body
    },
  });

  return {
    message: "Contentstack copy new automation",
    response
  };
});