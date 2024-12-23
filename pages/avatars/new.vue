<script setup lang="ts">
const { introAsset, noiseAsset, openMediaLibrary } = useCloudinaryWidget();

const state = reactive({
  title: "",
  background_noise: "",
  intro: "",
  vignette: false,
  avatar: "",
  avatar_id: "",
  voice: "",
  voice_id: "",
  thumbnail_url: "",
});

const toast = useToast();
async function create() {
  toast.add({ title: "Creating Avatar", icon: "i-heroicons-check-circle" });
  const response = await $fetch("/api/cs-automate-avatar-new", {
    method: "POST",
    body: state,
  });

  navigateTo("/avatars");
}

watch(introAsset, () => {
  state.intro = introAsset.value.public_id;
});

watch(noiseAsset, () => {
  state.background_noise = noiseAsset.value.public_id;
});
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="New Avatar" />
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
        <div class="grid grid-cols-2 gap-8">
          <UForm :state="state" v-if="state">
            <UFormGroup
              name="title"
              label="CMS Title"
              required
              :ui="{ wrapper: 'mb-6' }"
            >
              <UInput
                color="primary"
                v-model="state.title"
                autocomplete="off"
                size="xl"
                placeholder="Avatar title"
              />
            </UFormGroup>

            <UFormGroup
              name="avatar"
              label="Avatar"
              required
              :ui="{ wrapper: 'mb-6' }"
            >
              <UInput
                color="primary"
                v-model="state.avatar"
                autocomplete="off"
                size="xl"
                placeholder="Avatar title"
              />
            </UFormGroup>

            <UFormGroup
              name="avatar_id"
              label="HeyGen Avatar ID"
              required
              :ui="{ wrapper: 'mb-6' }"
            >
              <UInput
                color="primary"
                v-model="state.avatar_id"
                autocomplete="off"
                size="xl"
                placeholder="Avatar ID"
              />
            </UFormGroup>

            <UFormGroup
              name="voice"
              label="Elevenlabs Voice"
              required
              :ui="{ wrapper: 'mb-6' }"
            >
              <UInput
                color="primary"
                v-model="state.voice"
                autocomplete="off"
                size="xl"
                placeholder="Avatar ID"
              />
            </UFormGroup>

            <UFormGroup
              name="voice_id"
              label="Elevenlabs Voice ID"
              required
              :ui="{ wrapper: 'mb-6' }"
            >
              <UInput
                color="primary"
                v-model="state.voice_id"
                autocomplete="off"
                size="xl"
                placeholder="Avatar ID"
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
          <div>
            <UFormGroup
              name="thumbnail_url"
              label="Thumbnail URL"
              required
              :ui="{ wrapper: 'mb-6' }"
            >
              <UInput
                color="primary"
                v-model="state.thumbnail_url"
                autocomplete="off"
                size="xl"
                placeholder="Avatar Thumbnail URL"
              />
            </UFormGroup>
            <img
              v-if="state"
              :src="state.thumbnail_url"
              class="rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
