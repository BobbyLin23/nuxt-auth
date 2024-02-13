<script lang="ts" setup>
import { useForm } from 'vee-validate'

import type { FetchResponseType } from '~/types'

const error = ref<string>()
const success = ref<string>()
const loading = ref(false)

const form = useForm()

const onSubmit = form.handleSubmit(async (values) => {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    const { data } = await useFetch<FetchResponseType>('/api/reset', {
      method: 'POST',
      body: {
        email: values.email,
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
    header-label="Forgot your password?"
    back-button-label="Back to login"
    back-button-href="/auth/login"
  >
    <form className="space-y-6" @submit="onSubmit">
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
      </div>
      <FormError :message="error" />
      <FormSuccess :message="success" />
      <Button
        :disabled="loading"
        type="submit" class="w-full"
      >
        Send reset email
      </Button>
    </form>
  </CardWrapper>
</template>

<style>

</style>
