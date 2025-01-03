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
});

function selectAvatar(avatar: any) {
  state.background_noise = avatar.background_noise;
  state.intro = avatar.intro;
  state.vignette = avatar.vignette;
  state.avatar_id = avatar.avatar_id;
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
    },
  });

  navigateTo("/");
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
        <div class="grid lg:grid-cols-2 gap-8">
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
              name="text"
              label="Text"
              required
              :ui="{ wrapper: 'mb-6' }"
            >
              <template #hint>
                <UButton
                  :loading="aiLoading"
                  variant="link"
                  icon="i-heroicons-sparkles"
                  :padded="false"
                  @click="getAIToHelp(state.text)"
                />
              </template>
              <UTextarea
                v-model="state.text"
                color="primary"
                placeholder="What do you want the avatar to say?"
                size="xl"
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
            <UBlogList orientation="horizontal">
              <UBlogPost
                class="cursor-pointer"
                :class="{
                  'bg-indigo-900 p-2 rounded-xl':
                    state.avatar_id === avatar.avatar_id,
                }"
                v-for="avatar in avatars"
                :key="avatar.uid"
                orientation="vertical"
                :description="`Voice: ${avatar.voice}`"
                @click="selectAvatar(avatar)"
                :title="avatar.avatar"
                :image="avatar.thumbnail.url"
                :ui="{
                  image: {
                    wrapper:
                      'ring-1 ring-gray-200 dark:ring-gray-800 relative overflow-hidden aspect-[960/720] w-full rounded-lg pointer-events-none',
                  },
                }"
              />
            </UBlogList>
          </UFormGroup>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
