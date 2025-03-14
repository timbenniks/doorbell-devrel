<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const { data: video } = useVideoById(route.params.video as string);
const { introAsset, noiseAsset } = useCloudinaryWidget();
import { generateCloudinaryUrl } from "../../../utils/cloudinaryUrl";

const state = reactive(video);

watch(introAsset, () => {
  state.intro = introAsset.value && introAsset.value.public_id;
});

watch(noiseAsset, () => {
  state.background_noise = noiseAsset.value && noiseAsset.value.public_id;
});

const cloudinaryUrl = computed(() => {
  let url = "";

  if (state && state.value) {
    url = generateCloudinaryUrl(
      state.value.cloudinary_video,
      state.value.background_noise,
      state.value.vignette,
      state.value.intro,
      state.value.width,
      state.value.height
    );
  }

  return url;
});

function downloadFile(url: string, filename: string) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "download";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    })
    .catch((error) => console.error("Download failed:", error));
}

async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar v-if="state" :title="`Video: ${state.title}`" />

      <UDashboardToolbar>
        <template #left>
          <UButton
            :loading="false"
            icon="i-heroicons-folder-arrow-down"
            size="md"
            @click="downloadFile(cloudinaryUrl, state.title)"
          >
            Download
          </UButton>
          <UButton
            :loading="false"
            icon="i-heroicons-share"
            size="md"
            :to="`/app/videos/share/${state && state.uid}`"
          >
            Share
          </UButton>
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <div class="grid lg:grid-cols-2 gap-8">
          <UForm :state="state" v-if="state">
            <UFormGroup
              name="title"
              label="Title"
              required
              :ui="{ wrapper: 'mb-6' }"
            >
              <UInput
                color="primary"
                v-model="state.title"
                autocomplete="off"
                size="xl"
                placeholder="Video title"
                disabled
              />
            </UFormGroup>

            <UFormGroup
              v-if="state.description"
              name="description"
              label="Script"
              :ui="{ wrapper: 'mb-6' }"
            >
              <UTextarea v-model="state.description" size="xl" disabled />
            </UFormGroup>

            <UFormGroup
              v-if="state.prompt"
              name="prompt"
              label="Prompt"
              required
              :ui="{ wrapper: 'mb-6' }"
            >
              <UInput
                color="primary"
                v-model="state.prompt"
                autocomplete="off"
                size="xl"
                placeholder="Prompt"
                disabled
              />
            </UFormGroup>

            <UFormGroup
              name="background_noise"
              label="Background Noise"
              :ui="{ wrapper: 'mb-6' }"
            >
              <UInput
                icon="i-heroicons-folder"
                v-model="state.background_noise"
                autocomplete="off"
                size="xl"
                color="primary"
                disabled
              />
            </UFormGroup>

            <UFormGroup name="intro" label="Intro" :ui="{ wrapper: 'mb-6' }">
              <UInput
                icon="i-heroicons-folder"
                v-model="state.intro"
                autocomplete="off"
                color="primary"
                size="xl"
                disabled
              />
            </UFormGroup>

            <UFormGroup
              name="vignette"
              label="Video effects"
              :ui="{ wrapper: 'mb-6' }"
            >
              <UCheckbox v-model="state.vignette" label="Vignette" />
            </UFormGroup>
            <UFormGroup name="URL" label="URL" :ui="{ wrapper: 'mb-6' }">
              <UTextarea v-model="cloudinaryUrl" size="xl" disabled />

              <template #hint>
                <UButton
                  variant="link"
                  icon="i-heroicons-document-duplicate"
                  :padded="false"
                  @click="copyText(cloudinaryUrl)"
                />
              </template>
            </UFormGroup>

            <UFormGroup
              name="duration"
              label="Duration"
              :ui="{ wrapper: 'mb-6' }"
            >
              <UInput
                v-model="state.duration"
                color="primary"
                size="xl"
                disabled
              />
            </UFormGroup>

            <UFormGroup name="date" label="Date" :ui="{ wrapper: 'mb-6' }">
              <UInput
                v-model="state.created_at"
                color="primary"
                size="xl"
                disabled
              />
            </UFormGroup>
          </UForm>
          <div>
            <VideoPlayer
              v-if="state"
              :url="cloudinaryUrl"
              class="max-w-md"
              :width="state.width"
              :height="state.height"
            />
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
