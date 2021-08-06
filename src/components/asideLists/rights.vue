<!--  -->
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-table :data="state.rightsList" border style="width: 100%" stripe fit>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column prop="level" label="权限等级">
        <template v-slot="power">
          <el-tag v-if="power.row.level === '0'">等级一</el-tag>
          <el-tag v-if="power.row.level === '1'" type="success">等级二</el-tag>
          <el-tag v-if="power.row.level === '2'" type="info">等级三</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue'
import { http } from '../../assets/js/http'

import { toast } from '../../assets/js/toast'
export default {
  name: '',
  setup(props) {
    const state = reactive({
      rightsList: []
    })
    const internalInstance = getCurrentInstance()
    const getRightsList = async () => {
      const { data: res } = await http(internalInstance).get('rights/list')
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('获取权限列表失败')
      }
      state.rightsList.push(...res.data)
    }
    getRightsList()
    return {
      state,
      getRightsList
    }
  }
}
</script>

<style lang="stylus" scoped></style>
