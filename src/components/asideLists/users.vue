<!--  -->
<template>
  <!--面包屑导航区-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card class="box-card">
    <el-row :gutter="30">
      <el-col :span="9"
        ><el-input
          placeholder="请输入内容"
          class="input-with-select"
          v-model="info.query"
          clearable
          @clear="getUserList"
        >
          <template #append>
            <el-button icon="el-icon-search" @click="getUserList"></el-button>
          </template> </el-input
      ></el-col>
      <el-col :span="9"
        ><el-button type="primary" @click="addusers"
          >添加用户</el-button
        ></el-col
      >
    </el-row>
    <el-table :data="state.userLists" style="width: 100%" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="200">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"> </el-table-column>
      <el-table-column prop="mobile" label="电话" width="200">
      </el-table-column>
      <el-table-column prop="role_name" label="角色" width="200">
      </el-table-column>
      <el-table-column prop="mg_state" label="状态" width="200">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeState(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="210">
        <template v-slot="operator">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editor(operator.row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              @click="deleteor(operator.row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="设置"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="primary"
              icon="el-icon-setting"
              size="mini"
              @click="setor(operator.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="info.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="info.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
  <el-dialog
    title="添加用户"
    v-model="dialogVisible"
    width="30%"
    @close="reset"
  >
    <span>
      <el-form
        ref="addroles"
        :model="addUserInfo"
        label-width="70px"
        :rules="addRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUserInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
    </span>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isAddUsers">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    title="修改用户"
    v-model="editorShow"
    width="30%"
    @close="editFormClose"
  >
    <el-form
      :model="state.editForm"
      :rules="editRules"
      ref="editruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名">
        <el-input v-model="state.editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="state.editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="state.editForm.mobile"></el-input>
      </el-form-item> </el-form
    >>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editorShow = false">取 消</el-button>
        <el-button type="primary" @click="commitEditForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog title="设置权限" v-model="setorShow" width="30%">
    <div>
      <p>当前用户：{{ state.userInfo.username }}</p>
      <p>当前角色：{{ state.userInfo.role_name }}</p>
      <p>
        分配新角色：
        <el-select v-model="state.selectedRoleID" placeholder="请选择新角色">
          <el-option
            v-for="item in state.roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </p>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="setorShow = false">取 消</el-button>
        <el-button type="primary" @click="sllotRoles">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { http } from '../../assets/js/http'
import { toast } from '../../assets/js/toast'
import { confirm } from '../../assets/js/confirm'
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect
} from 'vue'
export default {
  name: '',
  setup(props) {
    let total = ref(0)
    const state = reactive({
      userLists: [],
      editForm: {},
      userInfo: {},
      roleList: {},
      selectedRoleID: ''
    })

    let info = reactive({
      query: '',
      pagenum: 1,
      pagesize: 2
    })
    const internalInstance = getCurrentInstance()
    async function getUserList() {
      const { data: res } = await http(internalInstance).get('users', {
        params: info
      })
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('获取用户失败')
      }
      state.userLists = res.data.users
      total.value = res.data.total
    }

    getUserList()
    const handleSizeChange = (newValue) => {
      info.pagesize = newValue
      getUserList()
    }
    const handleCurrentChange = (newValue) => {
      info.pagenum = newValue
      getUserList()
    }
    const changeState = async (userinfo) => {
      const { data: res } = await http(internalInstance).put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return toast(internalInstance).error('更新用户状态失败')
      }

      toast(internalInstance).success('更新用户状态成功')
    }
    const dialogVisible = ref(false)
    const addroles = ref(null)
    const addusers = () => {
      dialogVisible.value = true
    }
    const addUserInfo = reactive({
      username: '',
      password: '',
      email: '',
      mobile: ''
    })
    const checkEmail = (rule, value, callback) => {
      const regEmail =
        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的邮箱'))
    }
    const checkMobile = (rule, value, callback) => {
      const regMobile =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }
    const addRules = reactive({
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { validator: checkEmail, trigger: 'blur' }
      ],
      mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { validator: checkMobile, trigger: 'blur' }
      ]
    })
    const editRules = reactive({
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { validator: checkEmail, trigger: 'blur' }
      ],
      mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { validator: checkMobile, trigger: 'blur' }
      ]
    })
    const reset = () => {
      if (addroles.value !== null) {
        addroles.value.resetFields()
      }
    }
    const isAddUsers = () => {
      if (addroles.value !== null) {
        addroles.value.validate(async (valid) => {
          if (!valid) return
          const { data: res } = await http(internalInstance).post(
            'users',
            addUserInfo
          )
          if (res.meta.status !== 201) {
            toast(internalInstance).error('添加用户失败')
          }
          toast(internalInstance).success('添加用户成功')
          dialogVisible.value = false
        })
      }
    }
    let editorShow = ref(false)
    const editruleForm = ref(null)
    const editor = async (id) => {
      editorShow.value = true
      const { data: res } = await http(internalInstance).get('users/' + id)
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('查找用户失败')
      }
      state.editForm = res.data
    }
    const editFormClose = () => {
      if (editruleForm.value !== null) {
        editruleForm.value.resetFields()
      }
    }
    const commitEditForm = () => {
      if (editruleForm.value !== null) {
        editruleForm.value.validate(async (valid) => {
          if (!valid) {
            return
          }
          const { data: res } = await http(internalInstance).put(
            'users/' + state.editForm.id,
            {
              id: state.editForm.id,
              email: state.editForm.email,
              mobile: state.editForm.mobile
            }
          )
          if (res.meta.status !== 200) {
            return toast(internalInstance).error('更新失败')
          }
          toast(internalInstance).success('更新成功')
          getUserList()
          editorShow.value = false
        })
      }
    }
    const deleteor = async (id) => {
      const confirms = confirm(internalInstance)
      const result = await confirms
        .confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .catch((err) => err)

      if (result !== 'confirm') {
        return toast(internalInstance).info('已取消删除操作')
      }
      const { data: res } = await http(internalInstance).delete('users/' + id)
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('删除失败')
      }
      getUserList()
      return toast(internalInstance).success('删除成功')
    }
    const setorShow = ref(false)
    const setor = async (user) => {
      state.userInfo = user
      const { data: res } = await http(internalInstance).get('roles')
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('获取用户列表失败')
      }
      state.roleList = res.data
      setorShow.value = true
    }
    const sllotRoles = async () => {
      if (!state.selectedRoleID) {
        return toast(internalInstance).error('请选择一个角色')
      }
      const { data: res } = await http(internalInstance).put(
        `users/${state.userInfo.id}/role`,
        { rid: state.selectedRoleID }
      )

      if (res.meta.status !== 200) {
        return toast(internalInstance).error('分配角色失败')
      }
      getUserList()
      setorShow.value = false
    }
    onMounted(() => {
      reset()
      isAddUsers()
      editFormClose()
      commitEditForm()
    })

    return {
      total,
      getUserList,
      info,
      state,
      handleSizeChange,
      handleCurrentChange,
      changeState,
      addusers,
      dialogVisible,
      addUserInfo,
      addRules,
      addroles,
      checkEmail,
      checkMobile,
      reset,
      isAddUsers,
      editor,
      editorShow,
      editRules,
      editruleForm,
      editFormClose,
      commitEditForm,
      deleteor,
      setor,
      setorShow,
      sllotRoles
    }
  }
}
</script>

<style lang="stylus" scoped></style>
