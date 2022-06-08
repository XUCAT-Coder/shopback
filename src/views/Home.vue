<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img
          src="../assets/pkq.jpg"
          alt=""
          style="width: 45px; height: 45px; border-radius: 50%"
        />
        <span>忘魂儿后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <transition name="xwl">
          <div class="btn" @click="change" v-show="!isCollapse">|||</div>
        </transition>

        <el-menu
          :uniqueOpened="true"
          :collapse-transition="false"
          :default-active="activePath"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="rgb(168, 224, 241)"
          text-color="#fff"
          active-text-color="blue"
          :collapse="isCollapse"
          :router="true"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template #title>
              <i :class="iconObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>

            <el-menu-item
              :index="'' + child.path"
              v-for="child in item.children"
              :key="child.id"
              @click="saveNavState('/' + child.path)"
            >
              <template #title>
                <i class="el-icon-watermelon"></i>
                <span>{{ child.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, getCurrentInstance, ref, watch, computed } from 'vue'
import { http } from '../assets/js/http'
import { toast } from '../assets/js/toast'
export default {
  name: 'Home',
  components: {},
  setup(props) {
    let router = useRouter()
    function logout() {
      window.sessionStorage.clear()
      router.push('/login')
    }
    const internalInstance = getCurrentInstance()
    const menuList = reactive([])
    const getMenuList = async () => {
      const { data: res } = await http(internalInstance).get('menus')

      if (res.meta.status !== 200)
        return toast(internalInstance).error(res.meta.msg)
      menuList.push(...res.data)
    }
    getMenuList()

    const iconObj = reactive({
      125: 'el-icon-user-solid',
      103: 'el-icon-view',
      101: 'el-icon-present',
      102: 'el-icon-document',
      145: 'el-icon-s-marketing'
    })
    let isCollapse = ref(false)
    const change = () => {
      isCollapse.value = !isCollapse.value
    }
    let activePath = ref('')
    const saveNavState = (activePath) => {
      window.sessionStorage.setItem('activePath', activePath)
    }
    activePath.value = window.sessionStorage.getItem('activePath')
    let routers = reactive(router)
    watch(routers, (newValue, oldValue) => {
      if (newValue.currentRoute.fullPath === '/welcome') {
        activePath.value = ''
      }
    })
    return {
      logout,
      menuList,
      getMenuList,
      iconObj,
      isCollapse,
      change,
      activePath,
      saveNavState,
      routers
    }
  }
}
</script>
<style scoped>
.home-container {
  box-sizing: inherit;
  height: 100vh;
}
.el-header {
  background-color: rgb(168, 224, 241);
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  align-items: center;
  font-size: 24px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header div span {
  padding-left: 15px;
}
.el-aside {
  background-color: rgb(168, 224, 241);
}
.el-main {
  background-color: rgb(118, 219, 245);
}
.btn {
  text-align: center;
  background-color: rgb(168, 224, 241);
  letter-spacing: 0.2em;
  font-size: 16px;
  line-height: 20px;
  height: 20px;
}
.xwl-enter-from,
.xwl-leave-to {
  opacity: 0;
}
.xwl-enter-to,
.xwl-leave-from {
  opacity: 1;
}
.xwl-enter-active,
.xwl-leave-active {
  transition: opacity 10s ease;
}
</style>
