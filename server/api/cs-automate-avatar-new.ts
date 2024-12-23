export default defineEventHandler(async (event) => {
  await requireUserSession(event)
  const body = await readBody(event);
  const response = await $fetch('https://eu-app.contentstack.com/automations-api/run/edea52f2ecee41b2bf639070005b5720', {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: {
      "event_type": "avatar.new",
      "event_data": body
    },
  });

  return {
    message: "Contentstack avatar new automation",
    response
  };
});














