<script setup lang="ts">
import { generateCloudinaryUrl } from "../utils/cloudinaryUrl";

const { videoAsset, subtitleAsset, openMediaLibrary } = useCloudinaryWidget();

const volume = ref(30);
const vignette = ref(60);

const cloudinaryUrl = computed(() =>
  generateCloudinaryUrl(
    videoAsset.value,
    subtitleAsset.value,
    volume.value,
    vignette.value
  )
);
</script>

<template>
  <div class="max-w-7xl mx-auto p-12">
    <h2 class="text-5xl title inline-block mb-8">Cloudinary Video Form</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="space-y-6">
        <div class="flex flex-col gap-2">
          <button @click="openMediaLibrary('video')" class="cta uppercase">
            Select Video
          </button>
          <span v-if="videoAsset" class="text-sm text-slate-400">
            Selected: {{ videoAsset.public_id }}
          </span>
        </div>

        <div class="flex flex-col gap-2">
          <button @click="openMediaLibrary('subtitle')" class="cta uppercase">
            Select Subtitle File (.srt)
          </button>
          <span v-if="subtitleAsset" class="text-sm text-slate-400">
            Selected: {{ subtitleAsset.public_id }}
          </span>
        </div>

        <div class="flex flex-col gap-2">
          <label class="">Volume:</label>
          <input
            type="range"
            v-model="volume"
            min="0"
            max="100"
            class="w-full"
          />
          <span class="text-sm">{{ volume }}%</span>
        </div>

        <div class="flex flex-col gap-2">
          <label class="">Vignette:</label>
          <input
            type="range"
            v-model="vignette"
            min="0"
            max="100"
            class="w-full"
          />
          <span class="text-sm">{{ vignette }}%</span>
        </div>
      </div>

      <div class="space-y-8">
        <textarea
          readonly
          v-model="cloudinaryUrl"
          rows="6"
          class="w-full p-3 bg-slate-800 text-slate-100"
        ></textarea>
      </div>
      <VideoPlayer :url="cloudinaryUrl" />
    </div>
  </div>
</template>
