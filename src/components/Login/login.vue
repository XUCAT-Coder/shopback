<!--  -->
<template>
  <div class="container">
    <div class="avater_img">
      <img src="../../assets/pkq.jpg" alt="" />
    </div>
    <div>
      <el-form
        label-width="80px"
        class="form"
        :model="info"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item label="用户名:" prop="username">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="user"
            v-model="info.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="******"
            v-model="info.password"
            type="password"
          ></el-input>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="valid">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import { http } from '../../assets/js/http'
import { toast } from '../../assets/js/toast'
import { useRouter } from 'vue-router'
export default {
  name: '',
  setup(props, context) {
    const info = reactive({
      username: '',
      password: ''
    })
    const rules = reactive({
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
      ]
    })
    const loginForm = ref(null)
    const reset = () => {
      loginForm.value.resetFields()
    }

    const internalInstance = getCurrentInstance()
    const router = useRouter()
    const valid = () => {
      loginForm.value.validate(async (valid) => {
        if (!valid) {
          return
        }
        const { data: res } = await http(internalInstance).post('login', info)
        if (res.meta.status !== 200) {
          return toast(internalInstance).error('登录失败')
        } else {
          window.sessionStorage.setItem('token', res.data.token)
          router.push('/home')
          return toast(internalInstance).success('登录成功')
        }
      })
    }

    onMounted(() => {
      reset()
      valid()
    })

    return {
      info,
      rules,
      loginForm,
      reset,
      valid
    }
  }
}
</script>

<style scoped>
.container {
  width: 450px;
  height: 300px;
  background-color: whitesmoke;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avater_img {
  text-align: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid gray;
  padding: 10px;
  position: absolute;
  left: 50%;
  top: -20%;
  transform: translate(-50%);
}
.avater_img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
  border: 1px solid gray;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.form {
  position: absolute;
  bottom: 10%;
  width: 90%;
  left: 50%;
  transform: translate(-50%);
  box-sizing: border-box;
}
</style>
