<!-- src/views/LoginView.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-semibold text-gray-700 text-center mb-6">登录</h2>
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <label class="block text-gray-600 text-sm font-medium mb-1">用户名</label>
          <input
              v-model="username"
              type="text"
              placeholder="请输入用户名"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-gray-600 text-sm font-medium mb-1">密码</label>
          <input
              v-model="password"
              type="password"
              placeholder="请输入密码"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
        >
          登录
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    async onSubmit() {
      try {
        await this.login({ username: this.username, password: this.password });
        this.$router.push('/'); // 登录成功后跳转到首页
      } catch (error) {
        alert('登录失败，请检查用户名和密码。');
      }
    },
  },
};
</script>

<style scoped>
/* Tailwind CSS 样式已经足够，无需额外样式 */
</style>