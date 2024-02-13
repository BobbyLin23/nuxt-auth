<script lang="ts" setup>
import { useForm } from 'vee-validate'

import { LoginSchema } from '~/schemas'

const route = useRoute()

const urlError = computed(() => {
  if (route.query.error && route.query.error === 'OAuthAccountNotLinked')
    return 'Email already in use with different provider'
  return ''
})

const { signIn } = useAuth()

const form = useForm({
  validationSchema: LoginSchema,
})

const success = ref<string | undefined>('')
const error = ref<string | undefined>('')
const loading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  success.value = ''
  error.value = ''
  loading.value = true

  try {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirectTo: '/settings',
    })
  }
  catch (e) {
    console.error(e)
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <ClientOnly>
    <CardWrapper
      header-label="Welcome back"
      back-button-label="Don't have an account?"
      back-button-href="/auth/register"
      show-social
    >
      <form class="space-y-6" @submit="onSubmit">
        <div class="space-y-4">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  :disabled="loading"
                  placeholder="john.doe@example.com"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>
                Password
              </FormLabel>
              <FormControl>
                <Input
                  :disabled="loading"
                  type="password"
                  placeholder="******"
                  v-bind="componentField"
                />
              </FormControl>
              <Button size="sm" variant="link" as-child class="px-0 font-normal">
                <NuxtLink href="/auth/reset">
                  Forgot password?
                </NuxtLink>
              </Button>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <FormSuccess :message="success" />
        <FormError :message="error || urlError" />
        <Button :disabled="loading" type="submit" class="w-full">
          Login
        </Button>
      </form>
    </CardWrapper>
  </ClientOnly>
</template>
