<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const route = useRoute();

const { data: video } = useVideoById(route.params.video as string);
const { introAsset, noiseAsset, openMediaLibrary } = useCloudinaryWidget();
import { generateCloudinaryUrl } from "../../utils/cloudinaryUrl";

interface State {
  title: string;
  background_noise: string;
  intro: string;
  vignette: boolean;
  text: string;
  avatar_id: string;
}

const state = reactive(video);

watch(introAsset, () => {
  state.intro = introAsset.value.public_id;
});

watch(noiseAsset, () => {
  state.background_noise = noiseAsset.value.public_id;
});

const cloudinaryUrl = computed(() => {
  let url = "";

  if (state && state.value) {
    url = generateCloudinaryUrl(
      state.value.cloudinary_video,
      state.value.background_noise,
      state.value.vignette,
      state.value.intro
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
            :to="`/videos/share/${state && state.uid}`"
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
              :poster="state && state.poster?.url"
              class="max-w-md"
            />
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
