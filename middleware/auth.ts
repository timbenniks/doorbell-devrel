import { defineNuxtRouteMiddleware, useUserSession, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useUserSession()

  if (user && user.value.githubId !== 121096) {
    return navigateTo('/login')
  }

  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})