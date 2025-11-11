<script setup lang="ts">
import { ref } from 'vue'
import { tosContent } from '@/libs/getTOS';

const checkedTOS = ref(false)

const emit = defineEmits<{
  (e: "agreetos"): void
  (e: "closetos"): void
}>()

function continueRegister() {
  emit("agreetos")
}

function closeModal() {
  emit("closetos")
}

const hasScrolledToBottom = ref(false)
const scrollArea = ref<HTMLElement | null>(null)
const onScroll = () => {
  const el = scrollArea.value
  if (!el) return

  const reachedBottom =
    el.scrollTop + el.clientHeight >= el.scrollHeight - 4 // small tolerance

  if (reachedBottom) {
    hasScrolledToBottom.value = true
  }
}



</script>

<template>
  <teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      @click.self="closeModal"
    >
      <div
        class="w-[90vw] max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden"
      >
        <header class="px-6 py-4 border-b flex items-center justify-between">
          <h2 class="text-lg font-semibold truncate">
            Terms of Service
          </h2>
          <button
            type="button"
            class="ml-4 text-gray-400 hover:text-gray-600"
            @click="closeModal"
          >
            ✕
          </button>
        </header>

        <section 
          class="flex-1 overflow-y-auto px-6"
          ref="scrollArea"
          @scroll="onScroll"
        >
          <div class="space-y-1 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
            <slot>
              {{ tosContent }}
            </slot>
          </div>
        </section>        

        <footer class="w-full max-w px-6 py-3 border-t justify-center">
          <label
            class="inline-flex items-center gap-2 text-sm text-gray-700"
            >
            <input
              type="checkbox"
              v-model="checkedTOS"
              class="h-4 w-4 rounded border-gray-300 disabled:bg-gray-300"
              :disabled="!hasScrolledToBottom"
            />
            <span>I have read, accept, and agree to the Terms of Service</span>
          </label>

          <button
            type="button"
            class="w-full max-w-s px-4 py-3 mt-2 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-60"
            :disabled="!checkedTOS"
            @click="continueRegister"
          >
            Continue
          </button>
        </footer>
      </div>
    </div>
  </teleport>
</template>
