

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const response = await $fetch('https://eu-app.contentstack.com/automations-api/run/a39861944ddb414f835325a564589bc4', {
    method: 'POST'
  });

  return {
    message: "Contentstack mock test automation",
    response
  };
});














