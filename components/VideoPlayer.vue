<script setup lang="ts">
defineProps<{
  url: string;
  width: number;
  height: number;
}>();
</script>

<template>
  <div v-if="url">
    <video
      :src="url"
      :width="width"
      :height="height"
      controls
      class="rounded-lg object-cover"
    >
      Your browser does not support the video tag.
    </video>
  </div>
</template>
