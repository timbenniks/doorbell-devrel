export function useAvatarById(avatarId: string) {
  const getAvatar = async () => {
    const { $stack } = useNuxtApp()

    const entry = await $stack
      .contentType("avatar")
      .entry(avatarId)
      .fetch()

    return entry
  }

  const { data, status, error, refresh } = useAsyncData(`avatar-${avatarId}`, getAvatar)

  return { data, status, error, refresh }
}
