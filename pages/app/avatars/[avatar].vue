<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const route = useRoute();

const { data: avatar } = useAvatarById(route.params.avatar as string);
const { introAsset, noiseAsset, openMediaLibrary } = useCloudinaryWidget();

const state = reactive(avatar);

watch(introAsset, () => {
  state.intro = introAsset.value.public_id;
});

watch(noiseAsset, () => {
  state.background_noise = noiseAsset.value.public_id;
});

const toast = useToast();
async function save() {
  toast.add({ title: "Updating Avatar", icon: "i-heroicons-check-circle" });
  await $fetch("/api/cs-automate-avatar-update", {
    method: "POST",
    body: state.value,
  });
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar v-if="state" :title="`Avatar: ${state.title}`" />

      <UDashboardToolbar>
        <template #left>
          <UButton
            :loading="false"
            icon="i-heroicons-server"
            size="md"
            @click="save"
          >
            Update
          </UButton>
          <UButton
            :loading="false"
            icon="i-heroicons-user"
            size="md"
            target="_blank"
            to="https://app.heygen.com/avatars/looks?avatarId=f32890fbb32a48fbb8c773b8386941f8&look_type=video"
          >
            See in HeyGen
          </UButton>
          <UButton
            :loading="false"
            icon="i-heroicons-play"
            size="md"
            to="/app/videos/new"
          >
            New Video
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

            <div class="grid grid-cols-2 gap-6 mb-6">
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
            </div>

            <div class="grid grid-cols-2 gap-6 mb-6">
              <UFormGroup name="background_noise" label="Background Noise">
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

              <UFormGroup name="intro" label="Intro">
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
            </div>

            <UFormGroup
              name="vignette"
              label="Video effects"
              :ui="{ wrapper: 'mb-6' }"
            >
              <UCheckbox v-model="state.vignette" label="Vignette" />
            </UFormGroup>

            <div class="grid grid-cols-3 gap-6">
              <UFormGroup name="width" label="Width">
                <UInput
                  color="primary"
                  v-model="state.width"
                  size="xl"
                  placeholder="width"
                  type="number"
                />
              </UFormGroup>
              <UFormGroup name="height" label="Height">
                <UInput
                  color="primary"
                  v-model="state.height"
                  size="xl"
                  placeholder="height"
                  type="number"
                />
              </UFormGroup>
              <UFormGroup name="scale" label="Scale">
                <UInput
                  color="primary"
                  v-model="state.scale"
                  size="xl"
                  placeholder="scale"
                  type="number"
                />
              </UFormGroup>
            </div>
          </UForm>
          <div>
            <img
              v-if="state"
              :src="state.thumbnail.url"
              class="rounded-xl"
              loading="lazy"
            />
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
