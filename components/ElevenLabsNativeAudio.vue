<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  publicUserId: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "small",
  },
  textColorRgba: {
    type: String,
    default: "#e5e7eb",
  },
  backgroundColorRgba: {
    type: String,
    default: "#111827",
  },
});

const playerContainer = ref(null);

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://elevenlabs.io/player/audioNativeHelper.js";
  script.async = true;
  document.body.appendChild(script);

  script.onload = () => {
    if (playerContainer.value) {
      playerContainer.value.innerHTML = "";
      const iframe = document.createElement("iframe");
      iframe.setAttribute("id", "elevenlabs-audionative-widget");
      iframe.setAttribute("data-height", props.size === "small" ? "90" : "120");
      iframe.setAttribute("data-width", "100%");
      iframe.setAttribute("data-frameborder", "no");
      iframe.setAttribute("data-scrolling", "no");
      iframe.setAttribute("data-publicuserid", props.publicUserId);
      iframe.setAttribute(
        "data-playerurl",
        "https://elevenlabs.io/player/index.html"
      );
      iframe.setAttribute(
        "data-small",
        props.size === "small" ? "True" : "False"
      );
      iframe.setAttribute("data-textcolor", props.textColorRgba);
      iframe.setAttribute("data-backgroundcolor", props.backgroundColorRgba);
      playerContainer.value.appendChild(iframe);
    }
  };
});
</script>

<template>
  <div ref="playerContainer">
    <slot>
      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
    </slot>
  </div>
</template>
