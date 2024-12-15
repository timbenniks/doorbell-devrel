<script setup lang="ts">
const { data, pending, error } = useEnhancedVideoList();
</script>

<template>
  <ul>
    <li v-for="video in data" :key="video.video_id">
      <pre>{{ video }}</pre>
    </li>
  </ul>
</template>
