<template>
  <el-form @submit.prevent="login">
    <el-form-item label="用户名">
      <el-input v-model="username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      console.log('Logging in:', this.username, this.password);
    },
  },
};
</script>

<style scoped>
.el-form {
  max-width: 300px;
  margin: 0 auto;
  padding-top: 50px;
}
</style>
