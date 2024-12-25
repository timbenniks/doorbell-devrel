<script setup lang="ts">
defineProps<{
  url: string;
  poster: string;
}>();
</script>

<template>
  <div v-if="url">
    <div class="w-full">
      <div class="relative w-full pt-[177.78%]">
        <video
          :src="url"
          controls
          class="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
          :poster="poster"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</template>
