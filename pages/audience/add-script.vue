<script setup lang="ts">
import type { FormError } from "#ui/types";

definePageMeta({
  layout: "site",
});

const state = reactive({
  title: undefined,
  name: undefined,
  message: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: "name", message: "Required" });
  if (!state.message) errors.push({ path: "message", message: "Required" });
  return errors;
};

const toast = useToast();

async function create() {
  toast.add({ title: "Creating script", icon: "i-heroicons-check-circle" });
  await $fetch("/api/cs-automate-new-script", {
    method: "POST",
    body: {
      title: `${state.name}-${Date.now()}`,
      name: state.name,
      message: state.message,
    },
  });
}
</script>

<template>
  <UMain class="max-w-xl mx-auto">
    <ULandingSection
      title="Add your scripts"
      description="Let's keep it civil shall we? 😂"
      :ui="{
        wrapper: 'py-12 sm:py-16',
      }"
    >
      <UForm :state="state" :validate="validate" @submit="create">
        <UFormGroup name="name" label="Name" required :ui="{ wrapper: 'mb-6' }">
          <UInput
            color="primary"
            v-model="state.name"
            autocomplete="off"
            size="xl"
            placeholder="Your name"
          />
        </UFormGroup>

        <UFormGroup
          name="message"
          label="Script"
          required
          :ui="{ wrapper: 'mb-6' }"
        >
          <UTextarea
            v-model="state.message"
            color="primary"
            placeholder="What do you want Tim to say?"
            size="xl"
            autoresize
          />
        </UFormGroup>

        <UFormGroup>
          <UButton size="xl" type="submit">Submit</UButton>
        </UFormGroup>
      </UForm>
    </ULandingSection>
    <UNotifications />
    <UModals />
  </UMain>
</template>
