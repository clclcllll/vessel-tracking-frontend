<template>
  <div class="bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-md">
    <h1 class="text-3xl font-bold text-center text-blue-700 mb-4">
      船舶运输数据可视化
    </h1>
    <div>
      <button
          @click="toggleForm"
          class="mb-4 w-full text-blue-500 underline focus:outline-none"
      >
        {{ isLogin ? '没有账号？点击注册' : '已有账号？点击登录' }}
      </button>
    </div>
    <h2 class="text-xl font-semibold text-gray-800 text-center mb-6">
      {{ isLogin ? '登录' : '注册' }}
    </h2>
    <form @submit.prevent="onSubmit" class="space-y-6">
      <div>
        <label class="block text-gray-700 text-sm font-medium mb-2">用户名</label>
        <input
            v-model="username"
            type="text"
            placeholder="请输入用户名"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label class="block text-gray-700 text-sm font-medium mb-2">密码</label>
        <input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <button
          type="submit"
          class="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
      >
        {{ isLogin ? '登录' : '注册' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AuthForm',
  data() {
    return {
      isLogin: true, // 控制登录/注册状态
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('auth', ['login', 'register']),
    async onSubmit() {
      try {
        if (this.isLogin) {
          await this.login({ username: this.username, password: this.password });

          this.$router.push('/Home'); // 登录成功后跳转
        } else {
          await this.register({ username: this.username, password: this.password });
          alert('注册成功，请登录！');
          this.isLogin = true;
        }
      } catch (error) {
        alert(this.isLogin ? '登录失败，请检查用户名和密码。' : '注册失败，请重试。');
      }
    },
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
  },
};
</script>

<style scoped>
/* Tailwind CSS 的基础样式已涵盖 */
</style>
