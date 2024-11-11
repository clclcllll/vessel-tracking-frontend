<template>
  <el-header class="navbar">
    <el-row>
      <!-- 左侧：页面切换 -->
      <el-col :span="12">
        <el-menu mode="horizontal" @select="handlePageSwitch">
          <el-menu-item index="home">主页</el-menu-item>
          <el-menu-item index="about">关于我们</el-menu-item>
          <el-menu-item index="contact">联系我们</el-menu-item>
        </el-menu>
      </el-col>

      <!-- 右侧：用户头像和登录/注册按钮 -->
      <el-col :span="12" class="navbar-right">
        <div v-if="isLoggedIn" class="user-info">
          <el-avatar :src="userAvatar" size="small" />
          <span>{{ username }}</span>
        </div>
        <div v-else>
          <el-button type="text" @click="switchToLogin">登录</el-button>
          <el-button type="text" @click="switchToRegister">注册</el-button>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    isLoggedIn: Boolean,
    username: String,
    userAvatar: String,
  },
  methods: {
    handlePageSwitch(page) {
      this.$emit('page-switch', page);
    },
    switchToLogin() {
      this.$emit('switch-view', 'login');
    },
    switchToRegister() {
      this.$emit('switch-view', 'register');
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #409EFF;
  color: #fff;
  padding: 10px 20px;
}
.navbar-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.user-info {
  display: flex;
  align-items: center;
}
.user-info span {
  margin-left: 8px;
  color: #fff;
}
</style>
