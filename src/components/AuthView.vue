<template>
  <div>
    <Navbar
        :isLoggedIn="isLoggedIn"
        :username="username"
        userAvatar="path/to/avatar.png"
        @switch-view="switchView"
        @page-switch="handlePageSwitch"
    />
    <LoginView v-if="currentView === 'login'" @switchView="switchView" />
    <RegisterView v-else @switchView="switchView" />
  </div>
</template>

<script>

export default {
  name: 'AuthView',
  components: { Navbar, LoginView, RegisterView },
  data() {
    return {
      currentView: 'login',
      isLoggedIn: false,
      username: '',
    };
  },
  methods: {
    switchView(view) {
      this.currentView = view;
    },
    handlePageSwitch(page) {
      // 根据页面切换逻辑导航到不同视图
      alert(`切换到${page}页面`);
    },
  },
};
</script>
