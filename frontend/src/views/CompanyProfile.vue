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

    const jobData = ref({
        company: "Techhahaha Inc.",
        role: "Frontend Developer",
        location: "Nontaburi, Thailand",
        postTime: "3 days ago",
        description: "Our company is so good!!! Please apply this job I’m begging WE HAVE FREE FOOD ahhhhhhh bla bla bla yada yada something something-- Please apply this job I’m begging WE HAVE FREE FOOD ahhhhhhh bla bla bla yada yada something something ahhhhhhhhhhhhhhhh...",
        jobType: "Full-time",
        skills: ["React", "CSS", "TypeScript", "Python"]
    })
</script>

<template>
    <div class="px-48 py-16">
        <section class="profile">
            <div class="h-[40%] w-full object-cover ">
                <img :src="companyData.bannerPhoto" class="rounded-t-[20px] w-[100%]" alt="Company Banner"/>
            </div>

            <div class="relative bg-gradient-to-b from-[#045c3a44] to-white p-8">
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

                    <button class="bg-white rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.25)] px-8 py-1 text-[#01432A] [text-shadow:-1px_-1px_0_#B1B1B1,1px_-1px_0_#B1B1B1,-1px_1px_0_#B1B1B1,1px_1px_0_#B1B1B1]">see jobs</button>                </div>
             
            </div>

            <div class="w-full h-8 bg-gradient-to-r from-[#03A96B] to-[#01432A] rounded-b-[10px]"></div>
        </section>

        <section class="data">
            <div class="bg-gradient-to-b from-[#045c3a44] to-white rounded-[20px] w-[100%]">
                <div class="flex">
                    Overview
                    Job
                </div>
            </div>
        </section>
    </div>
</template>
