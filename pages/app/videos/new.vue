<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const { data: avatars } = useGetAvatars();

const { introAsset, noiseAsset, openMediaLibrary } = useCloudinaryWidget();

const state = reactive({
  title: "",
  background_noise: "",
  intro: "",
  vignette: false,
  text: "",
  avatar_id: "",
  prompt: "",
  elevenlabs: false,
  voice_id: "",
  width: 720,
  height: 1280,
  scale: 2.4,
});

function selectAvatar(avatar: any) {
  state.background_noise = avatar.background_noise;
  state.intro = avatar.intro;
  state.vignette = avatar.vignette;
  state.avatar_id = avatar.avatar_id;
  state.voice_id = avatar.voice_id;
  state.width = avatar.width;
  state.height = avatar.height;
  state.scale = avatar.scale;
}

const toast = useToast();
async function create() {
  toast.add({ title: "Creating video", icon: "i-heroicons-check-circle" });

  const newHeygenVideo = await $fetch("/api/new-video", {
    method: "POST",
    body: {
      title: state.title,
      text: state.text,
      avatar_id: state.avatar_id,
      voice_id: state.voice_id,
      width: state.width,
      height: state.height,
      scale: state.scale,
    },
  });

  await $fetch("/api/cs-automate-new", {
    method: "POST",
    body: {
      title: state.title,
      intro: state.intro,
      background_noise: state.background_noise,
      avatar_id: state.avatar_id,
      video_id: newHeygenVideo.response.data.video_id,
      vignette: state.vignette,
      prompt: state.prompt,
      description: state.text,
      width: state.width,
      height: state.height,
    },
  });

  navigateTo("/app/");
}

watch(introAsset, () => {
  state.intro = introAsset.value.public_id;
});

watch(noiseAsset, () => {
  state.background_noise = noiseAsset.value.public_id;
});

const aiLoading = ref(false);

async function getAIToHelp(text: string) {
  aiLoading.value = true;
  const response = await $fetch("/api/cs-automate-copy-create", {
    method: "POST",
    body: { prompt: text },
  });
  aiLoading.value = false;
  state.text = response.response.replace("[DONE]", "");
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="New video" />
      <UDashboardToolbar>
        <template #left>
          <UButton
            :loading="false"
            icon="i-heroicons-server"
            size="md"
            @click="create"
          >
            Create
          </UButton>
        </template>
      </UDashboardToolbar>
      <UDashboardPanelContent>
        <div class="grid lg:grid-cols-[1fr,2fr] gap-8">
          <UForm :state="state">
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
              />
            </UFormGroup>

            <UFormGroup
              name="prompt"
              label="Prompt Brandkit"
              v-model="state.prompt"
              :ui="{ wrapper: 'mb-6' }"
            >
              <UTextarea
                v-model="state.prompt"
                color="primary"
                placeholder="Ask Brandkit to help you write the text"
                size="xl"
                autoresize
              />

              <template #hint>
                <UButton
                  :loading="aiLoading"
                  variant="link"
                  icon="i-heroicons-sparkles"
                  :padded="false"
                  @click="getAIToHelp(state.prompt)"
                />
              </template>
            </UFormGroup>

            <UFormGroup
              name="text"
              label="Text"
              required
              :ui="{ wrapper: 'mb-6' }"
            >
              <UTextarea
                v-model="state.text"
                color="primary"
                placeholder="What do you want the avatar to say?"
                size="xl"
                autoresize
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
                :ui="{ icon: { trailing: { pointer: '' } } }"
              >
                <template #trailing>
                  <UButton
                    variant="link"
                    icon="i-heroicons:cloud"
                    :padded="false"
                    @click="openMediaLibrary('noise')"
                  />
                </template>
              </UInput>
            </UFormGroup>

            <UFormGroup name="intro" label="Intro" :ui="{ wrapper: 'mb-6' }">
              <UInput
                icon="i-heroicons-folder"
                v-model="state.intro"
                autocomplete="off"
                color="primary"
                size="xl"
                :ui="{ icon: { trailing: { pointer: '' } } }"
              >
                <template #trailing>
                  <UButton
                    variant="link"
                    icon="i-heroicons:cloud"
                    :padded="false"
                    @click="openMediaLibrary('intro')"
                  />
                </template>
              </UInput>
            </UFormGroup>

            <UFormGroup
              name="vignette"
              label="Video effects"
              :ui="{ wrapper: 'mb-6' }"
            >
              <UCheckbox v-model="state.vignette" label="Vignette" />
            </UFormGroup>
          </UForm>

          <UFormGroup label="Select avatar" required>
            <UBlogList
              orientation="horizontal"
              :ui="{
                wrapper:
                  'flex flex-col lg:grid grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-16',
              }"
            >
              <UBlogPost
                v-if="avatars"
                v-for="avatar in avatars"
                :key="avatar.uid"
                orientation="vertical"
                :description="`Voice: ${avatar.voice}`"
                @click="selectAvatar(avatar)"
                :title="avatar.avatar"
                :ui="{
                  image: {
                    wrapper: `ring-4 ${
                      state.avatar_id === avatar.avatar_id
                        ? 'ring-blue-900 dark:ring-blue-900 opacity-100'
                        : 'ring-gray-200 dark:ring-gray-800 opacity-60'
                    }  relative overflow-hidden aspect-[9/16] w-full rounded-lg pointer-events-none`,
                  },
                }"
                class="cursor-pointer"
              >
                <template #image>
                  <NuxtImg
                    v-if="avatar.thumbnail?.url"
                    provider="contentstack"
                    :src="avatar.thumbnail.filename"
                    :quality="90"
                    width="90"
                    height="160"
                    fit="fill"
                    :alt="avatar.avatar"
                    format="pjpg"
                    sizes="sm:400px md:800px lg:1600"
                    :modifiers="{
                      assetuid: avatar.thumbnail.uid,
                      auto: 'avif',
                      versionuid: getCSImageVersion(avatar.thumbnail),
                    }"
                    loading="lazy"
                    fetchpriority="auto"
                    class="rounded-lg w-full block"
                  />
                </template>
              </UBlogPost>
            </UBlogList>
          </UFormGroup>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
