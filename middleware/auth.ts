import { defineNuxtRouteMiddleware, useUserSession, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo('/login')
  }

  // @ts-ignore
  if (user && user.value && user.value?.githubId !== 121096) {
    return navigateTo('/login')
  }
})