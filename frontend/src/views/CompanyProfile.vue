<script setup lang="ts">
    import {ref, computed, onMounted, nextTick} from 'vue'

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

    const jobsData = ref(
    [
        {
            company: "Techhahaha Inc.",
            role: "Frontend Developer",
            location: "Nontaburi, Thailand",
            postTime: "3", 
            description: "Our company is so good!!! Please apply this job I'm begging WE HAVE FREE FOOD ahhhhhhh bla bla bla yada yada something something-- Please apply this job I'm begging WE HAVE FREE FOOD ahhhhhhh bla bla bla yada yada something something ahhhhhhhhhhhhhhhh...",
            jobType: "Full-time",
            skills: ["React", "CSS", "TypeScript", "Python", "JavaScript", "HTML", "Tailwind", "Vue.js"]
        },
        {
            company: "Techhahaha Inc.",
            role: "Backend Developer",
            location: "Bangkok, Thailand",
            postTime: "5", 
            description: "Join our amazing backend team! We're looking for passionate developers to help build scalable systems. Great benefits and flexible working hours available.",
            jobType: "Full-time",
            skills: ["Node.js", "MongoDB", "Express", "Docker", "PostgreSQL", "Redis"]
        },
        {
            company: "Techhahaha Inc.",
            role: "UI/UX Designer",
            location: "Bangkok, Thailand",
            postTime: "7", 
            description: "Creative designer needed to craft beautiful user experiences. Work with cross-functional teams to deliver innovative design solutions.",
            jobType: "Part-time",
            skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Sketch", "InVision", "Principle"]
        },
        {
            company: "Techhahaha Inc.",
            role: "DevOps Engineer",
            location: "Remote, Thailand",
            postTime: "10", 
            description: "Seeking experienced DevOps engineer to manage our cloud infrastructure and deployment pipelines. Remote work available.",
            jobType: "Full-time",
            skills: ["AWS", "Kubernetes", "CI/CD", "Terraform", "Docker", "Jenkins", "Ansible", "Monitoring"]
        },
        {
            company: "Techhahaha Inc.",
            role: "Data Scientist",
            location: "Bangkok, Thailand",
            postTime: "12", 
            description: "Analyze complex datasets and build machine learning models to drive business insights and decision making.",
            jobType: "Full-time",
            skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Pandas", "Scikit-learn"]
        },
        {
            company: "Techhahaha Inc.",
            role: "Product Manager",
            location: "Bangkok, Thailand",
            postTime: "15", 
            description: "Lead product strategy and roadmap development. Work closely with engineering and design teams to deliver exceptional products.",
            jobType: "Full-time",
            skills: ["Product Strategy", "Agile", "Analytics", "Leadership", "Roadmapping"]
        }
    ])

    const activeTab = ref('overview')
    const showAllJobs = ref(false)
    const expandedSkills = ref(new Set())
    
    // For calculate area of profile img
    const profileImageRef = ref(null)
    const containerRef = ref(null)
    const dynamicMarginTop = ref('96px') 

    const switchTab = (tab: string) => {
        activeTab.value = tab
        if (tab === 'overview') {
            showAllJobs.value = false
        }
    }

    const toggleJobsView = () => {
        showAllJobs.value = !showAllJobs.value
    }

    const displayedJobs = computed(() => {
        if (showAllJobs.value) {
            return jobsData.value
        }
        return jobsData.value.slice(0, 3)
    })

    const jobRows = computed(() => {
        const jobs = displayedJobs.value
        const rows = []
        for (let i = 0; i < jobs.length; i += 3) {
            rows.push(jobs.slice(i, i + 3))
        }
        return rows
    })

    const toggleSkillsExpansion = (jobIndex: number) => {
        const jobKey = `job-${jobIndex}`
        if (expandedSkills.value.has(jobKey)) {
            expandedSkills.value.delete(jobKey)
        } else {
            expandedSkills.value.add(jobKey)
        }
    }

    const getSkillsToShow = (skills: string[], jobIndex: number) => {
        const jobKey = `job-${jobIndex}`
        const isExpanded = expandedSkills.value.has(jobKey)
        
        if (isExpanded || skills.length <= 3) {
            return {
                skills: skills,
                hasMore: false,
                remainingCount: 0
            }
        }
        
        return {
            skills: skills.slice(0, 3),
            hasMore: true,
            remainingCount: skills.length - 3
        }
    }

    const getJobIndex = (job: any, rowIndex: number, jobIndexInRow: number) => {
        return rowIndex * 3 + jobIndexInRow
    }

    // Calculate dynamic margin for thing below profile photo
    const calculateDynamicMargin = () => {
        if (profileImageRef.value && containerRef.value) {
            const profileImageElement = profileImageRef.value as HTMLImageElement
            const containerElement = containerRef.value as HTMLDivElement
            
            const profileImageRect = profileImageElement.getBoundingClientRect()
            const containerRect = containerElement.getBoundingClientRect()
            
            const profileImageBottom = profileImageRect.bottom - containerRect.top
            
            const marginTop = Math.max(profileImageBottom + 4, 2)
            
            dynamicMarginTop.value = `${marginTop}px`
        }
    }

    const onImageLoad = () => {
        nextTick(() => {
            calculateDynamicMargin()
        })
    }

    onMounted(() => {
        nextTick(() => {
            calculateDynamicMargin()
        })

        window.addEventListener('resize', calculateDynamicMargin)
    })

    const badgeColor = ["#5C56F6", "#FB2B20", "#FF8800", "#FF4EA4", "#3BC7DD", "#9C3BDD", "#42C600"]
    
</script>

<template>
    <div class="px-48 py-16">

        <section class="profile">
            <div class="h-[40%] w-full object-cover ">
                <img :src="companyData.bannerPhoto" class="rounded-t-[20px] w-[100%]" alt="Company Banner"/>
            </div>

            <div ref="containerRef" class="relative bg-gradient-to-b from-[#045c3a44] ring-1 ring-[#B1B1B1] ring-inset to-white p-8">
                <img 
                    ref="profileImageRef"
                    :src="companyData.profilePhoto" 
                    @load="onImageLoad"
                    class="absolute -top-20 ring-8 max-w-44 ring-[#BCBCBC] ring-offset-0 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.25)]" 
                    alt="Company Profile"
                />
                
                
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="46" height="46" viewBox="0 0 24 24" fill="none" alt="edit btn"
                    stroke="#000000" stroke-width="1" stroke-linecap="round"
                    stroke-linejoin="round" class="absolute right-20 lucide lucide-square-pen-icon lucide-square-pen">
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                </svg>

                <div class="flex justify-between items-end w-full px-6" :style="{ marginTop: dynamicMarginTop }">
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
            <div class="bg-gradient-to-b from-[#72908484] to-white rounded-[20px] ring-1 ring-[#B1B1B1] ring-inset w-[100%]  p-8">

                <!-- Switch Tab Button IS HEREEEEE -->
                <div class="flex">
                    <button 
                        @click="switchTab('overview')"
                        :class="[
                            'px-6 py-4 text-xl rounded-t-[20px] transition-colors duration-200',
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
                            'px-6 py-4 text-xl rounded-t-[20px] transition-colors duration-200',
                            activeTab === 'job' 
                                ? 'text-[#01432A] font-black' 
                                : 'text-gray-600 hover:text-[#01432A]'
                        ]"
                    >
                        Job
                    </button>
                </div>

                <div class="w-full h-1 bg-[#afafaf]"></div>

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
                    <div v-else-if="activeTab === 'job'" class="relative">
                        
                        <div class="space-y-4">
                            <div v-for="(row, rowIndex) in jobRows" :key="rowIndex" class="grid grid-cols-3 gap-4">
                                <div v-for="(job, jobIndexInRow) in row" :key="job.role + job.postTime" class="flex flex-col gap-y-2 bg-white ring-1 ring-[#B1B1B1] ring-inset py-8 px-6 rounded-[20px] shadow-[0_4px_6px_rgba(0,0,0,0.25)]">
                                    <h3 class="text-[#636363] text-sm">{{ job.company }}</h3>
                                    <h2 class="text-xl font-bold">{{ job.role }}</h2>

                                    <div class="flex gap-x-1 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-map-pin-icon lucide-map-pin">
                                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                                            <circle cx="12" cy="10" r="3"/>
                                        </svg>

                                        <span>{{ job.location }}</span>
                                    </div>

                                    <div class="flex gap-x-1 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-clock-icon lucide-clock">
                                            <path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/>
                                        </svg>
                                        
                                        <span>{{ job.postTime }} days ago</span>
                                    </div>

                                    <p class="text-sm text-gray-600 line-clamp-3">{{ job.description }}</p>
                                    
                                    <p class="text-[#5696F6] text-sm">{{ job.jobType }}</p>

                                    <!-- Skills -->
                                    <div class="flex gap-1 flex-wrap">
                                        <template v-for="(skill, index) in getSkillsToShow(job.skills, getJobIndex(job, rowIndex, jobIndexInRow)).skills" :key="skill">
                                            <div class="rounded-full bg-[#5C56F6] text-white py-1 px-3 text-xs whitespace-nowrap"                 
                                            :style="{ backgroundColor: badgeColor[index % badgeColor.length] }"
                                            >
                                                {{ skill }}
                                            </div>
                                        </template>
                                        

                                        <button 
                                            v-if="getSkillsToShow(job.skills, getJobIndex(job, rowIndex, jobIndexInRow)).hasMore"
                                            @click="toggleSkillsExpansion(getJobIndex(job, rowIndex, jobIndexInRow))"
                                            class="rounded-full bg-gray-200 text-gray-600 py-1 px-3 text-xs hover:bg-gray-300 transition-colors duration-200 whitespace-nowrap"
                                        >
                                            +{{ getSkillsToShow(job.skills, getJobIndex(job, rowIndex, jobIndexInRow)).remainingCount }} more
                                        </button>
                                        

                                        <button 
                                            v-if="expandedSkills.has(`job-${getJobIndex(job, rowIndex, jobIndexInRow)}`) && job.skills.length > 3"
                                            @click="toggleSkillsExpansion(getJobIndex(job, rowIndex, jobIndexInRow))"
                                            class="rounded-full bg-gray-200 text-gray-600 py-1 px-3 text-xs hover:bg-gray-300 transition-colors duration-200 whitespace-nowrap"
                                        >
                                            Show less
                                        </button>
                                    </div>

                                    <button class="mt-4 bg-[#878787] text-white font-bold rounded-xl self-end py-2 px-6 text-sm">View Details</button>
                                </div>
                            </div>
                        </div>

                        <!-- View More Button -->
                        <div v-if="!showAllJobs && jobsData.length > 3" class="flex justify-end mt-6">
                            <button 
                                @click="toggleJobsView"
                                class="text-[#686868] font-medium hover:text-[#8e8e8e] transition-colors duration-200 flex items-center gap-1"
                            >
                                View More
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
                                    <path d="M5 12h14"/>
                                    <path d="M12 5v14"/>
                                </svg>
                            </button>
                        </div>

                        <!-- View Less Button -->
                        <div v-if="showAllJobs" class="flex justify-end mt-6">
                            <button 
                                @click="toggleJobsView"
                                class="text-[#686868] font-medium hover:text-[#8e8e8e] transition-colors duration-200 flex items-center gap-1"
                            >
                                View Less
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus">
                                    <path d="M5 12h14"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>