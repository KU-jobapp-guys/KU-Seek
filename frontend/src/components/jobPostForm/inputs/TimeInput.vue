<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  start?: string 
  end?: string  
  emitCombined?: boolean
    modelValue?: string 
}>()

const emit = defineEmits<{
  (e: 'update:start', v: string): void
  (e: 'update:end', v: string): void
  (e: 'update:workHours', v: string): void
    (e: 'update:modelValue', v: string): void
}>()

const localStart = ref(props.start ?? '')
const localEnd = ref(props.end ?? '')

watch(() => props.start, (v) => (localStart.value = v ?? ''))
watch(() => props.end, (v) => (localEnd.value = v ?? ''))

function to12Hour(hm: string) {
  if (!hm) return ''
  const [hStr, m] = hm.split(':')
  let h = Number(hStr)
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12
  if (h === 0) h = 12
  return `${h}:${m} ${ampm}`
}

function emitCombinedLocal() {
  if (!props.emitCombined) return
  const s = to12Hour(localStart.value)
  const e = to12Hour(localEnd.value)
  if (s && e) {
    const combined = `${s} - ${e}`
    emit('update:workHours', combined)
    emit('update:modelValue', combined)
  }
}

function parseModelValue(v?: string) {
  if (!v) return
  const parts = v.split(' - ').map((p) => p.trim())
  if (parts.length !== 2) return
  const parse12 = (s: string) => {
    const m = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
    if (!m) return ''
    let hh = Number(m[1])
    const mm = m[2]
    const ampm = m[3].toUpperCase()
    if (ampm === 'AM') {
      if (hh === 12) hh = 0
    } else {
      if (hh !== 12) hh += 12
    }
    return `${String(hh).padStart(2, '0')}:${mm}`
  }
  const s24 = parse12(parts[0])
  const e24 = parse12(parts[1])
  if (s24) localStart.value = s24
  if (e24) localEnd.value = e24
}

if (props.modelValue) parseModelValue(props.modelValue)
watch(() => props.modelValue, (v) => parseModelValue(v))

watch(localStart, (v) => {
  emit('update:start', v)
  emitCombinedLocal()
})

watch(localEnd, (v) => {
  emit('update:end', v)
  emitCombinedLocal()
})
</script>

<template>
  <div class="grid grid-cols-2 gap-3 items-end">
    <div class="flex flex-col">
      <label class="text-sm font-medium text-gray-700 mb-1">Start time</label>
      <input
        type="time"
        v-model="localStart"
        class="px-3 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      />
    </div>

    <div class="flex flex-col">
      <label class="text-sm font-medium text-gray-700 mb-1">End time</label>
      <input
        type="time"
        v-model="localEnd"
        class="px-3 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
