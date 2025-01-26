import contentstack from '@contentstack/delivery-sdk'
import type { EmbeddedItem } from '@contentstack/utils/dist/types/Models/embedded-object'
import type { LivePreviewQuery } from '@contentstack/delivery-sdk'
import type { AsyncData } from '#app';

export function replaceCslp(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => replaceCslp(item));
  }

  const newObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (key === "$") {
        newObj["cslp"] = replaceCslp(obj[key] as any);
      } else {
        newObj[key] = replaceCslp(obj[key] as any);
      }
    }
  }
  return newObj;
}

export const useGetPage = async <T>(options: {
  contentTypeUid: string
  url: string
  referenceFieldPath?: string[]
  locale?: string
  replaceHtmlCslp?: boolean
}): Promise<AsyncData<T | null, Error>> => {
  const {
    contentTypeUid,
    url,
    referenceFieldPath,
    locale,
    replaceHtmlCslp,
  } = options

  const { $stack, $ContentstackLivePreview, $preview } = useNuxtApp()

  if ($preview) {
    const route = useRoute()
    const qs = toRaw(route.query)
    $stack.livePreviewQuery(qs as unknown as LivePreviewQuery)
  }

  const { data, status, refresh } = await useAsyncData(`${contentTypeUid}-${url}-${locale}`, async () => {
    let result: { entries: T[] } | null = null

    const entryQuery = $stack.contentType(contentTypeUid)
      .entry()
      .includeReference(referenceFieldPath ?? [])

    if (referenceFieldPath) {
      for (const path of referenceFieldPath) {
        entryQuery.includeReference(path)
      }
    }

    result = await entryQuery.query()
      .equalTo('url', url)
      .find() as { entries: T[] }

    const data = result?.entries?.[0] as EmbeddedItem

    if ($preview) {
      contentstack.Utils.addEditableTags(data, contentTypeUid, true, locale)
    }

    let finalData
    if (replaceHtmlCslp && $preview) {
      finalData = replaceCslp(data)
    }
    else {
      finalData = data
    }

    return finalData
  })

  if ($preview && import.meta.client) {
    $ContentstackLivePreview.onEntryChange(refresh)
  }

  // @ts-expect-error doesnt export all useAsyncData props
  return { data, status, refresh }
}
