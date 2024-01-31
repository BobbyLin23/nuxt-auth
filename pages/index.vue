<script lang="ts" setup>

</script>

<template>
  <main class="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
    <div class="space-y-6 text-center">
      <h1 class="text-6xl font-semibold text-white drop-shadow-md">
        🔐 Auth
      </h1>
      <p class="text-lg text-white">
        A simple authentication service
      </p>
      <div>
        <LoginButton>
          <Button variant="secondary" size="lg">
            Sign In
          </Button>
        </LoginButton>
      </div>
    </div>
  </main>
</template>
