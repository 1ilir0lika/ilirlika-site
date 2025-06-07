<template>
  <div class="flex flex-col min-h-screen bg-white relative overflow-hidden">
    <!-- Triangles container with isolation -->
    <div class="triangles-wrapper">
      <div class="triangle center-left"></div>
      <div class="triangle bottom-right"></div>
      <div class="triangle top-right"></div>
      <div class="triangle center-right"></div>
      <div class="triangle bottom-left"></div>
      <div class="triangle top-left"></div>
    </div>

    <!-- Main content -->
    <section class="flex-grow text-center flex flex-col items-center justify-center px-4 relative z-10">
      <h1 class="text-4xl font-bold text-gray-800 mb-6">Who am I?</h1>
      
      <div class="max-w-xl text-lg text-gray-700 leading-relaxed">
        <p>
          I'm Ilir Lika, an 18-year-old student from Italy with a passion for math, chemistry, and computer science.
          I also enjoy exploring and contributing to FOSS (Free and Open Source Software) projects.
        </p>
        <p class="mt-4">
          In my free time, I enjoy:
        </p>
        <ul class="list-disc list-inside mt-2 text-left mx-auto">
          <li>Listening to electronic music</li>
          <li>Going to the gym</li>
          <li>Reading non-fiction books</li>
        </ul>
      </div>

      <a href="/" class="mt-10 text-blue-600 hover:underline">← Back to Home</a>
    </section>

    <!-- Footer -->
    <footer class="text-center text-sm text-gray-500 py-6 border-t border-gray-200 relative z-10 flex justify-center items-center gap-2">
      Contact me at
      <a href="mailto:your-email@example.com" class="text-blue-600 hover:underline mx-1">
        ilir8503@gmail.com
      </a>
      &nbsp;|&nbsp;
      <a href="https://github.com/1ilir0lika" target="_blank" class="text-blue-600 hover:underline flex items-center gap-1 mx-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.893 1.53 2.341 1.088 2.91.832.092-.646.35-1.088.636-1.34-2.22-.252-4.555-1.113-4.555-4.95 0-1.093.39-1.987 1.029-2.688-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.563 9.563 0 0112 6.844a9.56 9.56 0 012.5.336c1.91-1.296 2.75-1.027 2.75-1.027.546 1.377.202 2.394.1 2.647.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.942.36.31.682.923.682 1.86 0 1.343-.012 2.424-.012 2.753 0 .268.18.58.688.482A10.017 10.017 0 0022 12.017C22 6.484 17.523 2 12 2z"
            clip-rule="evenodd"
          />
        </svg>
        GitHub
      </a>
    </footer>
  </div>
</template>

<style scoped>
.triangles-wrapper {
  position: absolute;
  inset: 0;
  pointer-events: none;
  isolation: isolate; /* create stacking context for blend modes */
  z-index: 1;
}

.triangle {
  position: absolute;
  background-color: #444;
  opacity: 0.85;
  animation: slowRotate 60s linear infinite;
  transform-origin: center;
  mix-blend-mode: lighten;
  will-change: transform;
}

/* Triangles */

.triangle.center-left {
  width: 200px;
  height: 300px;
  top: 30%;
  left: 8%;
  transform: translateY(50%);
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}

.triangle.bottom-right {
  width: 200px;
  height: 200px;
  bottom: 150px;
  right: 300px;
  clip-path: polygon(100% 0%, 0% 100%, 100% 100%);
}

.triangle.top-right {
  width: 200px;
  height: 200px;
  top: 90px;
  right: 100px;
  clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
}

.triangle.center-right {
  width: 200px;
  height: 300px;
  top: 50%;
  right: 8%;
  transform: translateY(-50%);
  clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
}

.triangle.bottom-left {
  width: 120px;
  height: 120px;
  bottom: 100px;
  left: 50px;
  clip-path: polygon(0% 100%, 100% 0%, 100% 100%);
}

.triangle.top-left {
  width: 120px;
  height: 120px;
  top: 40px;
  left: 80px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
}

/* Content */

.flex-grow {
  position: relative;
  z-index: 10;
}

/* Rotation animation */
@keyframes slowRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
