<template>
  <div class="flex justify-between items-center bg-blue-950 px-5 py-3 text-white">
    <!-- 系统名称 -->
    <div class="text-lg font-bold">
      {{ systemName }}
    </div>

    <!-- 用户信息和退出登录 -->
    <div class="flex items-center">
      <img
          :src="userAvatar"
          alt="用户头像"
          class="w-8 h-8 rounded-full mr-2"
      />
      <span class="mr-4">{{ userName }}</span>
      <button
          @click="logout"
          class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
      >
        退出登录
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'TopNavBar',
  setup() {
    const store = useStore();
    const systemName = '原油运输可视化系统';

    // 动态生成用户头像 URL
    const generateAvatarUrl = (username) => {
      const seed = username || 'guest'; // 如果用户名不存在，则使用默认种子
      return `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(seed)}`;
    };

    const userName = computed(() => store.state.auth.userInfo?.username || '未登录');
    const userAvatar = computed(() => generateAvatarUrl(store.state.auth.userInfo?.username));

    const logout = () => {
      if (confirm('确定要退出登录吗？')) {
        store.dispatch('auth/logout');
        window.location.href = '/';
      }
    };

    return {
      systemName,
      userName,
      userAvatar,
      logout,
    };
  },
};
</script>
