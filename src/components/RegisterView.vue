<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2>注册</h2>
      <el-form :model="registerForm" @submit.native.prevent="handleRegister" ref="registerForm">
        <el-form-item prop="username" label="用户名" required>
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" required>
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码" required>
          <el-input type="password" v-model="registerForm.confirmPassword" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister">注册</el-button>
          <el-button type="text" @click="$emit('switchView', 'login')">已有账号？登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    handleRegister() {
      if (!this.registerForm.username || !this.registerForm.password || !this.registerForm.confirmPassword) {
        alert("请完整填写所有字段");
        return;
      }
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert("两次输入的密码不一致");
        return;
      }
      alert("注册成功!");
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.register-card {
  width: 300px;
  padding: 20px;
  text-align: center;
}
</style>
