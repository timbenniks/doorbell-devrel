import type { LivePreviewQuery } from "@contentstack/delivery-sdk"
import contentstack from "@contentstack/delivery-sdk"

export function useAvatarById(avatarId: string) {
  const getAvatar = async () => {
    const { $preview, $stack } = useNuxtApp()
    const route = useRoute()
    const qs = toRaw(route.query)

    if ($preview && qs?.live_preview) {
      const route = useRoute()
      const qs = toRaw(route.query)
      $stack.livePreviewQuery(qs as unknown as LivePreviewQuery)
    }

    const entry = await $stack
      .contentType("avatar")
      .entry(avatarId)
      .fetch()

    if ($preview) {
      contentstack.Utils.addEditableTags(entry as any, 'avatar', true)
    }

    return entry
  }

  const { data, status, error, refresh } = useAsyncData(`avatar-${avatarId}`, getAvatar)

  return { data, status, error, refresh }
}
