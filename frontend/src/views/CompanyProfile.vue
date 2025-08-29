<script setup>
    import {ref} from 'vue'

    const companyData = ref({
        name: "Urban Mobility Tech",
        type: "Tech House",
        website: "[LINE Company (Thailand)](https://linecorp.com/en/)",
        industry: "Information & Communication Technology",
        workFields: ["Information and Internet", "Technology"],
        location: "Bangkok, Thailand",
        fullLocation: "127 Ratchadamri Road, Gaysorn Tower,  Bangkok 10330 Thailand",
        size: "101 - 1,000",
        contacts: "",
        about: "We are a tech company that focuses on mobility. Our solution is an  on-demand shared service called MuvMi (muvmi.co) to address typical  issues of price and accessibility of microtransit,while Tuk Tuk Hop (www.tuktukhop.com) helps tourists hop around Bangkok main  attractions. We have served over 1.6Mn trips with 100+ EVs operating  everyday. We are expanding our operation and coverage areas rapidly, and will soon expand to other cities(including abroad). We are looking for champions to help us grow.Our team consists of hands-on entrepreneurs with various technical  backgrounds such as receiving PhD from Stanford University, working at  Rambus in Silicon Valley, at Lotus Cars Ltd. inEngland, researching with Volkswagen Electronic Research Laboratory in Silicon  Valley, and over 10 years of experience in designing & manufacturing electric vehicles. On the business side, our team consists of business  background from working at Boston ConsultingGroup and running own businesses.",
        bannerPhoto: "/images/companies/mockUp/image.png",
        profilePhoto: "/images/companies/mockUp/logo.png"
    })
</script>

<template>
    <div class="px-48 py-16">
        <div class="proflie">
            <div class="h-[40%]">
                <img :src="companyData.bannerPhoto" class="rounded-t-[20px]" alt="Company Banner"/>
            </div>

            <div class="relative bg-gradient-to-b from-[#045c3a44] to-white p-8">
                <img :src="companyData.profilePhoto" class="absolute -top-20 rounded-full" alt="Company Banner"/>
                
                <div class="flex justify-between items-end mt-32 w-full px-8">
                    <div>
                        <h1 class="font-semibold text-2xl">{{ companyData.name }}</h1>
                        <p class="font-medium">{{ companyData.type }}</p>
                        <p>{{ companyData.location }}</p>
                    </div>

                    <button class="bg-white rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.25)] px-8 py-1 text-[#01432A]">see jobs</button>
                   
                </div>
             
            </div>

            <div class="w-full h-8 bg-gradient-to-r from-[#03A96B] to-[#01432A] rounded-b-[10px]"></div>
        </div>
    </div>
</template>
