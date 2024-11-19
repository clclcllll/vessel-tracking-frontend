<template>
  <div
      class="flex items-center justify-center min-h-screen bg-cover bg-center"
      style="background-image: url('src/assets/ship-background.jpg');"
  >
    <AuthForm />
  </div>
</template>

<script>
import AuthForm from '@/components/auth/AuthForm.vue';

export default {
  name: 'Auth',
  components: { AuthForm },
};
</script>

<style scoped>
/* Tailwind CSS 的基础样式已涵盖 */
</style>
