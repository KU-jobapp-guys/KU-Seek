<script setup lang="ts">
import type { CompanyProfile } from '@/types/companyType';
import { Building2Icon } from 'lucide-vue-next'

const props = defineProps<{ companyData: CompanyProfile }>()
const { companyData } = props
</script>

<template>
  <div
    class="bg-white flex flex-col ring-1 ring-[#B1B1B1] ring-inset p-8 md:p-12 gap-y-4 rounded-xl shadow-md"
  >
    <div class="flex items-center gap-x-2">
      <div class="w-12 h-12 shrink-0 flex items-center justify-center bg-orange-500 rounded-full text-white">
        <Building2Icon />
      </div>
      <h2 class="font-bold text-2xl">Company Overview</h2>
    </div>

    <div class="flex flex-col md:pl-4 gap-y-1">
      <p v-if="companyData.website">
        <span class="font-medium block md:inline">Website: </span>
        <a :href="companyData.website" class="underline">{{
          companyData.name
        }}</a>
      </p>
      <p>
        <span class="font-medium block md:inline">Industry: </span>
        {{ companyData.industry }}
      </p>
      <p>
        <span class="font-medium block md:inline">Specialities: </span>
        {{ companyData.workFields.join(', ') }}
      </p>
      <p><span class="font-medium">Company Size:</span> {{ companyData.size }}</p>
      <p>
        <span class="font-medium block md:inline">Primary Location:</span>
        {{ companyData.fullLocation }}
      </p>
    </div>

    <p>{{ companyData.about }}</p>
  </div>
</template>