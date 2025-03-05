<script setup lang="ts">
import { formatInTimeZone } from "date-fns-tz";
import Pusher from "pusher-js";
import { useClipboard } from "@vueuse/core";

definePageMeta({
  layout: "site",
});

type Message = {
  uid: number;
  title: string;
  message: string;
  created_at: string;
};

const messages = ref<Message[]>([]);

// Pusher.logToConsole = true;
const pusher = new Pusher("6dd95a8c2f8e3f2fa2b0", {
  cluster: "eu",
});

const channel = pusher.subscribe("audience-message");
channel.bind("new", (data: Message) => {
  messages.value.push(data);
});

const { $stack } = useNuxtApp();
const { entries } = await $stack
  .contentType("audience_script")
  .entry()
  .only(["title", "name", "message", "created_at"])
  .includeCount()
  .find();

const { text, isSupported, copy } = useClipboard();
</script>

<template>
  <UMain class="max-w-xl mx-auto">
    <ULandingSection
      title="Audience scripts"
      :ui="{
        wrapper: 'py-12 sm:py-16',
      }"
    >
      <UBlogList
        orientation="vertical"
        :ui="{
          wrapper: 'gap-y-8',
        }"
      >
        <UPageCard
          v-for="message in messages"
          :key="message.uid"
          :title="`${message.name} at ${formatInTimeZone(
            message?.created_at,
            'Europe/Berlin',
            `MMM d, yyyy 'at' HH:mm`
          )}`"
          :description="message.message"
          :ui="{
            title: 'font-normal',
            description:
              'font-bold text-[24px] text-gray-500 dark:text-white mt-1',
          }"
        >
          <UButton
            class="mt-2"
            size="2xs"
            variant="soft"
            @click="copy(message.message)"
            >copy script</UButton
          >
        </UPageCard>

        <UPageCard
          v-for="entry in entries"
          :key="entry.uid"
          :title="`${entry.name} at ${formatInTimeZone(
            entry?.created_at,
            'Europe/Berlin',
            `MMM d, yyyy 'at' HH:mm`
          )}`"
          :description="entry.message"
          :ui="{
            title: 'font-normal',
            description:
              'font-bold text-[24px] text-gray-500 dark:text-white mt-1',
          }"
        >
          <UButton
            class="mt-2"
            size="2xs"
            variant="soft"
            @click="copy(entry.message)"
            >copy script</UButton
          >
        </UPageCard>
      </UBlogList>
    </ULandingSection>
  </UMain>
</template>
