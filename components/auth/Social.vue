<script lang="ts" setup>
import { DEFAULT_LOGIN_REDIRECT } from '~/routes'

const { signIn } = useAuth()

function onClick(provider: 'github' | 'google') {
  signIn(provider, {
    callbackUrl: DEFAULT_LOGIN_REDIRECT,
  })
}
</script>

<template>
  <div class="flex w-full items-center gap-x-2">
    <Button size="lg" class="w-full" variant="outline" @click="onClick('google')">
      <Icon name="i-flat-color-icons:google" class="h-5 w-5" />
    </Button>
    <Button size="lg" class="w-full" variant="outline" @click="onClick('github')">
      <Icon name="i-fa-brands:github" class="w-5 h-5" />
    </Button>
  </div>
</template>
