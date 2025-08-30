<script setup>
    import {ref} from 'vue'

    const companyData = ref({
        name: "Urban Mobility Tech",
        type: "Tech House",
        website: {name:" LINE Company (Thailand)", url:" https://linecorp.com/en/"},
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

    const jobData = ref(
    [
        {
            company: "Techhahaha Inc.",
            role: "Frontend Developer",
            location: "Nontaburi, Thailand",
            postTime: "3", 
            description: "Our company is so good!!! Please apply this job I'm begging WE HAVE FREE FOOD ahhhhhhh bla bla bla yada yada something something-- Please apply this job I'm begging WE HAVE FREE FOOD ahhhhhhh bla bla bla yada yada something something ahhhhhhhhhhhhhhhh...",
            jobType: "Full-time",
            skills: ["React", "CSS", "TypeScript", "Python"]
        },

        {
            company: "Techhahaha Inc.",
            role: "Frontend Developer",
            location: "Nontaburi, Thailand",
            postTime: "3", 
            description: "Our company is so good!!! Please apply this job I'm begging WE HAVE FREE FOOD ahhhhhhh bla bla bla yada yada something something-- Please apply this job I'm begging WE HAVE FREE FOOD ahhhhhhh bla bla bla yada yada something something ahhhhhhhhhhhhhhhh...",
            jobType: "Full-time",
            skills: ["React", "CSS", "TypeScript", "Python"]
        },

        {
            company: "Techhahaha Inc.",
            role: "Frontend Developer",
            location: "Nontaburi, Thailand",
            postTime: "3", 
            description: "Our company is so good!!! Please apply this job I'm begging WE HAVE FREE FOOD ahhhhhhh bla bla bla yada yada something something-- Please apply this job I'm begging WE HAVE FREE FOOD ahhhhhhh bla bla bla yada yada something something ahhhhhhhhhhhhhhhh...",
            jobType: "Full-time",
            skills: ["React", "CSS", "TypeScript", "Python"]
        },
    ])

    const activeTab = ref('overview')


    const switchTab = (tab) => {
        activeTab.value = tab
    }
</script>

<template>
    <div class="px-48 py-16">

        <section class="profile">
            <div class="h-[40%] w-full object-cover ">
                <img :src="companyData.bannerPhoto" class="rounded-t-[20px] w-[100%]" alt="Company Banner"/>
            </div>

            <div class="relative bg-gradient-to-b from-[#045c3a44] ring-1 ring-[#B1B1B1] ring-inset to-white p-8">
                <img :src="companyData.profilePhoto" class="absolute -top-20 ring-8 max-w-44 ring-[#BCBCBC] ring-offset-0 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.25)]" alt="Company Banner"/>
                
                
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="46" height="46" viewBox="0 0 24 24" fill="none" alt="edit btn"
                    stroke="#000000" stroke-width="1" stroke-linecap="round"
                    stroke-linejoin="round" class="absolute right-20 lucide lucide-square-pen-icon lucide-square-pen">
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                </svg>

                <div class="flex justify-between items-end mt-24 w-full px-6">
                    <div>
                        <h1 class="font-semibold text-3xl">{{ companyData.name }}</h1>
                        <p class="font-medium">{{ companyData.type }}</p>
                        <p>{{ companyData.location }}</p>
                    </div>

                    <button class="bg-white rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.25)] px-8 py-1 text-[#01432A] [text-shadow:-1px_-1px_0_#B1B1B1,1px_-1px_0_#B1B1B1,-1px_1px_0_#B1B1B1,1px_1px_0_#B1B1B1]">see jobs</button>                
                </div>
             
            </div>

            <div class="w-full h-8 bg-gradient-to-r from-[#03A96B] to-[#01432A] rounded-b-[10px]"></div>
        </section>

        <section class="data mt-8">
            <div class="bg-gradient-to-b from-[#045c3a44] to-white rounded-[20px] ring-1 ring-[#B1B1B1] ring-inset w-[100%]  p-8">

                <!-- Switch Tab Button IS HEREEEEE -->
                <div class="flex">
                    <button 
                        @click="switchTab('overview')"
                        :class="[
                            'px-6 py-4 font-medium text-sm rounded-t-[20px] transition-colors duration-200',
                            activeTab === 'overview' 
                                ? 'text-[#01432A] font-black' 
                                : 'text-gray-600 hover:text-[#01432A]'
                        ]"
                    >
                        Overview
                    </button>
                    <button 
                        @click="switchTab('job')"
                        :class="[
                            'px-6 py-4 font-medium text-sm rounded-t-[20px] transition-colors duration-200',
                            activeTab === 'job' 
                                ? 'text-[#01432A] font-black' 
                                : 'text-gray-600 hover:text-[#01432A]'
                        ]"
                    >
                        Job
                    </button>
                </div>

                <div class="w-full h-1 bg-[#CECECE]"></div>

                <!-- Tab Content -->
                <div class="p-8">

                    <!-- Overview Tab Content -->
                    <div v-if="activeTab === 'overview'" class="space-y-6">
                        <div class="bg-white ring-1 ring-[#B1B1B1] ring-inset py-12 px-6 rounded-[20px] shadow-[0_4px_6px_rgba(0,0,0,0.25)]">
                            <div class="flex gap-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    class="lucide lucide-building2-icon lucide-building-2">
                                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
                                    <path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/>
                                    <path d="M10 18h4"/>
                                </svg>

                                <h2>Company Overview</h2>
                            </div>

                            <div class="p-4">
                                <p><span class="font-medium">Website:</span> <a :href="companyData.website.url" class="underline">{{ companyData.website.name }}</a></p>
                                <p><span class="font-medium">Industry:</span> {{ companyData.industry }}</p>
                                <p>
                                    <span class="font-medium">Specialities: </span>
                                    
                                    <span v-for="(item, index) in companyData.workFields" :key="item">
                                        {{ item }}<span v-if="index < companyData.workFields.length - 1">, </span>
                                    </span>
                                </p>
                                <p><span class="font-medium">Company Size:</span> {{ companyData.size }}</p>
                                <p><span class="font-medium">Primary Location:</span> {{ companyData.fullLocation }}</p>
                                <br/>
                                <p>{{ companyData.about }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Jobs Tab Content -->
                    <div v-else-if="activeTab === 'jobs'" class="space-y-6">
                        YES JOB
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>