<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { RegisterSchema } from '~/schemas'

const form = useForm({
  validationSchema: RegisterSchema,
})

const success = ref<string | undefined>('')
const error = ref<string | undefined>('')

const loading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  success.value = ''
  error.value = ''
  loading.value = true

  const { data, error: fetchError } = await useFetch('/api/register', {
    method: 'POST',
    body: {
      name: values.name,
      email: values.email,
      password: values.password,
    },
  })

  if (data.value)
    success.value = 'User created successfully!'

  if (fetchError.value)
    error.value = fetchError.value.statusMessage

  loading.value = false
})
</script>

<template>
  <ClientOnly>
    <CardWrapper
      header-label="Create an account"
      back-button-label="Already have an account?"
      back-button-href="/auth/login"
      show-social
    >
      <form class="space-y-6" @submit="onSubmit">
        <div class="space-y-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>
                Name
              </FormLabel>
              <FormControl>
                <Input :disabled="loading" placeholder="John Doe" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>
                Email
              </FormLabel>
              <FormControl>
                <Input :disable="loading" type="email" placeholder="john.doe@example.com" v-bind="componentField" />
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
                <Input :disabled="loading" type="password" placeholder="******" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <FormSuccess :message="success" />
        <FormError :message="error" />
        <Button :disabled="loading" type="submit" class="w-full">
          Create an account
        </Button>
      </form>
    </CardWrapper>
  </ClientOnly>
</template>
