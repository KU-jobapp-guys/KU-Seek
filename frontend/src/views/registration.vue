<template>
    <div class="relative w-full h-[480px] overflow-hidden bg-white">
        <!-- Left side background -->
        <div class="absolute inset-0 w-1/2 bg-[#2b2b2b]">
            <svg
            viewBox="0 0 960 480"
            xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            >
            <!-- Middle yellow wave -->
            <path
                d="M0 260 C150 220 280 220 400 260 C520 300 600 380 760 340 C860 310 920 260 960 280 L960 480 L0 480 Z"
                fill="#F4E172"
            />
            <!-- Bottom orange wave -->
            <path
                d="M0 300 C150 260 280 260 400 300 C520 340 600 420 760 380 C860 350 920 300 960 320 L960 480 L0 480 Z"
                fill="#FFA40C"
            />
            </svg>
        </div>

        <!-- Right side background -->
        <div class="absolute right-0 top-0 w-1/2 h-full bg-white">
            <svg
            viewBox="0 0 960 480"
            xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            >
            <!-- gpt ahh-ing the lines for now will fix later -->
            <!-- Fluid yellow scribble -->
            <path
                d="M80 120 
                C180 20, 320 60, 420 180
                C520 300, 600 40, 720 120
                C840 200, 880 280, 940 260"
                stroke="#F4E172"
                stroke-width="5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <!-- More dynamic orange scribble -->
            <path
                d="M60 340 
                C200 260, 340 400, 460 320
                C580 240, 640 440, 760 360
                C880 280, 940 400, 960 380"
                stroke="#FFA40C"
                stroke-width="6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            </svg>
        </div>
    </div>

</template>