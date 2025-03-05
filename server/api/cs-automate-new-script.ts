export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('dude', body);

  const response = await $fetch('https://eu-app.contentstack.com/automations-api/run/50ea5ee6a5074982a3f56280e73524ec', {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: {
      "event_type": "new.audience_message",
      "event_data": {
        "entry": {
          "title": body.title,
          "name": body.name,
          "message": body.message
        }
      }
    }
  });

  return {
    message: "Contentstack script new automation",
    response
  };
});