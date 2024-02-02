<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { RegisterSchema } from '~/schemas'

const form = useForm({
  validationSchema: RegisterSchema,
})

const success = ref<string | undefined>('')
const error = ref<string | undefined>('')

const onSubmit = form.handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
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
              <Input placeholder="John Doe" v-bind="componentField" />
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
              <Input type="email" placeholder="john.doe@example.com" v-bind="componentField" />
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
              <Input type="password" placeholder="******" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <FormSuccess :message="success" />
      <FormError :message="error" />
      <Button type="submit" class="w-full">
        Create an account
      </Button>
    </form>
  </CardWrapper>
</template>
