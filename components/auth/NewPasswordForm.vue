<script lang="ts" setup>
import { useForm } from 'vee-validate'

import { NewPasswordSchema } from '~/schemas'
import type { FetchResponseType } from '~/types'

const form = useForm({
  validationSchema: NewPasswordSchema,
})

const loading = ref(false)
const error = ref<string>()
const success = ref<string>()

const onSubmit = form.handleSubmit(async (values) => {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    const { data } = await useFetch<FetchResponseType>('/api/new-password', {
      method: 'POST',
      body: {
        token: useRoute().query.token,
        password: values.password,
      },
    })

    if (data.value) {
      error.value = data.value.error
      success.value = data.value.success
    }
  }
  catch {
    error.value = 'Something went wrong'
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <CardWrapper
    header-label="Enter a new password"
    back-button-label="Back to login"
    back-button-href="/auth/login"
  >
    <form class="space-y-6" @submit="onSubmit">
      <div class="space-y-4">
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>
              Password
            </FormLabel>
            <FormControl>
              <Input
                type="password"
                :disabled="loading"
                placeholder="******"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <FormError :message="error" />
      <FormSuccess :message="success" />
      <Button
        :disabled="loading"
        type="submit" class="w-full"
      >
        Reset password
      </Button>
    </form>
  </CardWrapper>
</template>
