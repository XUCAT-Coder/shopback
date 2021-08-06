<template>
  <div class="">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addCate">添加分类</el-button>
        </el-col>
      </el-row>
      <el-table border stripe :data="state.cateList" fit>
        <el-table-column type="expand">
          <template v-slot="expand">
            <el-row
              v-for="(item, index) in expand.row.children"
              :key="item.id"
              :class="['tagBot', index === 0 ? 'tagTop' : '']"
            >
              <el-col :span="5"
                ><el-tag closable>{{ item.cat_name }} </el-tag
                ><i class="el-icon-caret-right"></i
              ></el-col>
              <el-col :span="19">
                <el-row
                  v-for="(item2, index2) in item.children"
                  :key="item2.id"
                >
                  <el-col :span="8"
                    ><el-tag type="success" closable>{{
                      item2.cat_name
                    }}</el-tag
                    ><i class="el-icon-caret-right"></i
                  ></el-col>
                  <el-col :span="16"
                    ><el-tag
                      v-for="(item3, index3) in item2.children"
                      type="warning"
                      :key="item3.id"
                      closable
                      >{{ item3.cat_name }}</el-tag
                    ></el-col
                  >
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" prop="cat_name"> </el-table-column>
        <el-table-column label="是否有效">
          <template v-slot="flag">
            <i
              class="el-icon-circle-check"
              v-if="flag.row.cat_deleted !== 'false'"
            ></i>
            <i class="el-icon-circle-close" v-else></i>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template v-slot="sort">
            <el-tag v-if="sort.row.cat_level === 0">一级</el-tag>
            <el-tag type="success" v-else-if="sort.row.cat_level === 1"
              >二级</el-tag
            >
            <el-tag type="info" v-else>三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="operator">
            <div class="btns">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="top"
                :enterable="false"
              >
                <el-button type="primary" icon="el-icon-edit"></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
                :enterable="false"
              >
                <el-button type="danger" icon="el-icon-delete"></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="添加分类"
        v-model="isAddForm"
        width="30%"
        @close="CateFormClose"
      >
        <el-form
          ref="CateForm"
          :model="addForm"
          label-width="80px"
          :rules="Caterules"
        >
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="addForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类:">
            <el-cascader
              :options="state.ParentCateList"
              :props="props"
              @change="handleChange"
              v-model="state.selectedID"
              expand-trigger="hover"
              placeholder="请选择"
              clearable
            >
            </el-cascader>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isAddForm = false">取 消</el-button>
            <el-button type="primary" @click="commitAddForm">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  getCurrentInstance,
  watch,
  ref,
  onMounted
} from 'vue'
import { http } from '../../assets/js/http'
import { toast } from '../../assets/js/toast'
export default {
  name: '',
  components: {},
  setup() {
    const internalInstance = getCurrentInstance()
    const state = reactive({
      cateList: [],
      ParentCateList: [],
      selectedID: []
    })

    const queryInfo = reactive({
      type: 3,
      pagenum: 1,
      pagesize: 5
    })

    const getCategories = async () => {
      const { data: res } = await http(internalInstance).get(
        'categories',
        queryInfo
      )
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('获取商品列表失败')
      }
      state.cateList = res.data
      //    state.total=res.data.total
    }
    getCategories()
    const isAddForm = ref(false)
    const addCate = () => {
      getParentCateList()
      isAddForm.value = true
    }
    let addForm = reactive({
      cat_name: '',
      cat_pid: 0,
      cat_level: 0
    })
    const Caterules = reactive({
      cat_name: [
        {
          type: 'string',
          required: true,
          message: '请输入分类名称',
          trigger: 'blur'
        },
        { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
      ]
    })
    const getParentCateList = async () => {
      const { data: res } = await http(internalInstance).get('categories', {
        params: { type: 2 }
      })
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('获取分类列表失败')
      }
      state.ParentCateList = res.data
    }
    const props = reactive({
      value: 'cat_id',
      label: 'cat_name',
      children: 'children',
      expandTrigger: 'hover',
      checkStrictly: 'true'
    })

    const handleChange = () => {
      if (state.selectedID.length > 0) {
        addForm.cat_pid = state.selectedID[state.selectedID.length - 1]
        addForm.cat_level = state.selectedID.length
        return
      } else {
        addForm.cat_pid = 0
        addForm.cat_level = 0
      }
    }
    const CateForm = ref(null)
    const commitAddForm = () => {
      if (CateForm.value !== null) {
        CateForm.value.validate(async (valid) => {
          if (!valid) {
            return
          }
          const { data: res } = await http(internalInstance).post(
            'categories',
            addForm
          )

          if (res.meta.status !== 201) {
            return toast(internalInstance).error('添加分类失败')
          }
          getCategories()
          isAddForm.value = false
        })
      }
    }

    const CateFormClose = () => {
      if (CateForm.value !== null) {
        CateForm.value.resetFields()
        state.selectedID = []
        addForm.cat_pid = 0
        addForm.cat_level = 0
      }
    }
    onMounted(() => {})
    return {
      queryInfo,
      getCategories,
      state,
      addCate,
      isAddForm,
      addForm,
      Caterules,
      getParentCateList,
      props,
      handleChange,
      commitAddForm,
      CateForm,
      CateFormClose
    }
  }
}
</script>
<style>
.btns {
  display: flex;
  justify-content: space-evenly;
}
.el-cascader {
  width: 100%;
}
</style>
