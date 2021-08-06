<!--  -->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col
          ><el-button type="primary" @click="isAddRole"
            >添加角色</el-button
          ></el-col
        >
      </el-row>
      <el-table border stripe :data="state.roleList" fit>
        <el-table-column type="expand">
          <template v-slot="expand">
            <el-row
              v-for="(item, index) in expand.row.children"
              :key="item.id"
              :class="['tagBot', index === 0 ? 'tagTop' : '']"
            >
              <el-col :span="5"
                ><el-tag closable @close="deletePowerById(expand.row, item.id)"
                  >{{ item.authName }} </el-tag
                ><i class="el-icon-caret-right"></i
              ></el-col>
              <el-col :span="19">
                <el-row
                  v-for="(item2, index2) in item.children"
                  :key="item2.id"
                >
                  <el-col :span="8"
                    ><el-tag
                      type="success"
                      closable
                      @close="deletePowerById(expand.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    ><i class="el-icon-caret-right"></i
                  ></el-col>
                  <el-col :span="16"
                    ><el-tag
                      v-for="(item3, index3) in item2.children"
                      type="warning"
                      :key="item3.id"
                      closable
                      @close="deletePowerById(expand.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    ></el-col
                  >
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
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
                @click="editRole(operator.row.id)"
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
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteRole(operator.row.id)"
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
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setPower(operator.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加角色" v-model="roleForm">
        <el-form :model="roleInfo" ref="addRoleRef">
          <el-form-item label="角色名称">
            <el-input v-model="roleInfo.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleInfo.roleDesc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="roleForm = false">取 消</el-button>
            <el-button type="primary" @click="commitAddRole">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog title="编辑角色" v-model="isEditRoleForm">
        <el-form :model="state.roleInfo">
          <el-form-item label="角色名称">
            <el-input v-model="state.roleInfo.roleName">{{
              state.roleList.roleName
            }}</el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="state.roleInfo.roleDesc">{{
              state.roleList.roleDesc
            }}</el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isEditRoleForm = false">取 消</el-button>
            <el-button type="primary" @click="commitEditRole">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog
        title="修改权限"
        v-model="isSetForm"
        width="30%"
        @close="resetDefKeys"
      >
        <el-tree
          :data="state.rightList"
          :props="TreeProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="state.defKeys"
          ref="treeRef"
        >
        </el-tree>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isSetForm = false">取 消</el-button>
            <el-button type="primary" @click="sllotPower">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      <div>{{ state.roleList.id }}</div>
    </el-card>
  </div>
</template>

<script>
import { http } from '../../assets/js/http'
import { toast } from '../../assets/js/toast'
import { confirm } from '../../assets/js/confirm'
import { getCurrentInstance, reactive, ref, onMounted } from 'vue'
export default {
  name: '',
  setup(props) {
    const internalInstance = getCurrentInstance()
    const state = reactive({
      roleList: [],
      roleInfo: {},
      rightList: [],
      defKeys: [],
      roleId: ''
    })
    //  let defKeys=reactive([])
    let roleInfo = reactive({
      roleName: '',
      roleDesc: ''
    })
    const getRoleList = async () => {
      const { data: res } = await http(internalInstance).get('roles')
      if (res.meta.status != 200) {
        return toast(internalInstance).error('获取角色列表失败')
      }
      state.roleList = res.data
    }

    getRoleList()

    const roleForm = ref(false)
    const isAddRole = async () => {
      roleForm.value = true
    }
    const commitAddRole = async () => {
      const { data: res } = await http(internalInstance).post('roles', roleInfo)
      if (res.meta.status !== 201) {
        return toast(internalInstance).error('添加角色失败')
      }
      roleForm.value = false
      getRoleList()
      return toast(internalInstance).success('添加角色成功')
    }
    const isEditRoleForm = ref(false)
    const editRole = async (id) => {
      isEditRoleForm.value = true
      const { data: res } = await http(internalInstance).get('roles/' + id)
      if (res.meta.status != 200) {
        return toast(internalInstance).error('查询角色失败')
      }
      state.roleInfo = res.data
    }
    const commitEditRole = async () => {
      const { data: res } = await http(internalInstance).put(
        'roles/' + state.roleInfo.roleId,
        { roleName: state.roleInfo.roleName, roleDesc: state.roleInfo.roleDesc }
      )

      if (res.meta.status !== 200) {
        return toast(internalInstance).error('修改角色失败')
      }
      isEditRoleForm.value = false
      getRoleList()
      return toast(internalInstance).success('修改角色成功')
    }
    const deleteRole = async (id) => {
      const confirms = confirm(internalInstance)
      const result = await confirms
        .confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .catch((err) => err)

      if (result !== 'confirm') {
        return toast(internalInstance).info('已取消删除操作')
      }
      const { data: res } = await http(internalInstance).delete('roles/' + id)
      if (res.meta.status != 200) {
        return toast(internalInstance).error('删除角色失败')
      }
      getRoleList()
      return toast(internalInstance).success('删除角色成功')
    }
    const deletePowerById = async (role, rightId) => {
      const confirms = confirm(internalInstance)
      const result = await confirms
        .confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .catch((err) => err)

      if (result !== 'confirm') {
        return toast(internalInstance).info('已取消删除操作')
      }
      const { data: res } = await http(internalInstance).delete(
        `roles/${role.id}/rights/${rightId}`
      )
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('删除权限失败')
      }
      role.children = res.data

      toast(internalInstance).success('删除权限成功')
    }
    const setPower = async (role) => {
      const { data: res } = await http(internalInstance).get('rights/tree')
      state.rightList = res.data
      state.roleId = role.id
      getDefKeys(role, state.defKeys)
      isSetForm.value = true
    }
    const isSetForm = ref(false)
    const TreeProps = reactive({
      label: 'authName',
      children: 'children'
    })
    const getDefKeys = (node, arr) => {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((item) => {
        getDefKeys(item, arr)
      })
    }
    const resetDefKeys = () => {
      state.defKeys = []
      state.roleId = ''
    }
    const treeRef = ref(null)
    const sllotPower = async () => {
      if (treeRef.value !== null) {
        const keys = reactive([
          ...treeRef.value.getCheckedKeys(),
          ...treeRef.value.getHalfCheckedKeys()
        ])
        const result = keys.join(',')
        const { data: res } = await http(internalInstance).post(
          `roles/${state.roleId}/rights`,
          { rids: result }
        )
        if (res.meta.status !== 200) {
          return toast(internalInstance).error('分配权限失败')
        }
        getRoleList()
        isSetForm.value = false
        return toast(internalInstance).success('分配权限成功')
      }
    }
    onMounted(() => {
      sllotPower()
    })

    return {
      state,
      getRoleList,
      isAddRole,
      roleInfo,
      roleForm,
      commitAddRole,
      isEditRoleForm,
      editRole,
      commitEditRole,
      deleteRole,
      deletePowerById,
      setPower,
      isSetForm,
      TreeProps,
      resetDefKeys,
      treeRef,
      sllotPower
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin-top: 2px;
}
.tagTop {
  border-top: 1px solid gray;
}
.tagBot {
  border-bottom: 1px solid gray;
}
</style>
