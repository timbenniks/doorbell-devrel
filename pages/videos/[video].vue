<script setup lang="ts">
const route = useRoute();

const { data: video } = useVideoById(route.params.video as string);

import type { FormError, FormSubmitEvent } from "#ui/types";

const state = reactive({
  name: "Benjamin Canac",
  email: "ben@nuxtlabs.com",
  username: "benjamincanac",
  avatar: "",
  bio: "",
  password_current: "",
  password_new: "",
});

const toast = useToast();

function validate(state: any): FormError[] {
  const errors = [];
  if (!state.name)
    errors.push({ path: "name", message: "Please enter your name." });
  if (!state.email)
    errors.push({ path: "email", message: "Please enter your email." });
  if (
    (state.password_current && !state.password_new) ||
    (!state.password_current && state.password_new)
  )
    errors.push({
      path: "password",
      message: "Please enter a valid password.",
    });
  return errors;
}

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);

  toast.add({ title: "Profile updated", icon: "i-heroicons-check-circle" });
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :title="`Video: ${video.title}`" />

      <UDashboardToolbar>
        <template #left>
          <UButton
            :loading="false"
            icon="i-heroicons-server"
            size="md"
            @click=""
          >
            Save
          </UButton>
          <UButton
            :loading="false"
            icon="i-heroicons-folder-arrow-down"
            size="md"
            @click=""
          >
            Download
          </UButton>
          <UButton
            :loading="false"
            icon="i-heroicons-share"
            size="md"
            @click=""
          >
            Share
          </UButton>
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <div class="grid lg:grid-cols-2 gap-8">
          <UForm
            :state="state"
            :validate="validate"
            :validate-on="['submit']"
            @submit="onSubmit"
          >
            <UFormGroup
              name="name"
              label="Name"
              description="Will appear on receipts, invoices, and other communication."
              required
            >
              <UInput
                v-model="state.name"
                autocomplete="off"
                icon="i-heroicons-user"
                size="md"
              />
            </UFormGroup>
          </UForm>
          <div>lala</div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
