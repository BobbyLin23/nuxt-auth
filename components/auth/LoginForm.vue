<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { LoginSchema } from '~/schemas'

const form = useForm({
  validationSchema: LoginSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
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
      <FormSuccess />
      <FormError />
      <Button type="submit" class="w-full">
        Login
      </Button>
    </form>
  </CardWrapper>
</template>
