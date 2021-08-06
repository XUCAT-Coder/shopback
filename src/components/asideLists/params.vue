<template>
  <div class="">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert
        title="注意:只允许为第三级分类设置相关参数"
        type="warning"
        show-icon
      >
      </el-alert>
      <el-row>
        <el-col>
          <span
            >选择商品分类:
            <el-cascader
              :options="state.cateList"
              :props="props"
              @change="handleChange"
              v-model="state.selectedID"
              expand-trigger="hover"
              placeholder="请选择"
            >
            </el-cascader>
          </span>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="isBtnsDisabled"
            @click="add"
            >添加参数</el-button
          >
          <el-table
            :data="state.manyData"
            style="width: 100%"
            border
            stripe
            fit
            v-show="isShow"
          >
            <el-table-column type="expand">
              <template v-slot="expand">
                <el-tag
                  v-for="(item, index) in expand.row.attr_vals"
                  :key="index"
                  closable
                  @close="handleClose(index, expand.row)"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="expand.row.inputVisible"
                  v-model="expand.row.inputValue"
                  ref="TagInput"
                  size="small"
                  @keyup.enter="handleInputConfirm(expand.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(expand.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称">
            </el-table-column>

            <el-table-column label="操作">
              <template v-slot="operators">
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
                    @click="editor(operators.row)"
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
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            size="mini"
            :disabled="isBtnsDisabled"
            @click="add"
            >添加属性</el-button
          >
          <el-table
            :data="state.onlyData"
            style="width: 100%"
            border
            stripe
            fit
            v-show="isShow"
          >
            <el-table-column type="expand">
              <template v-slot="expand">
                <el-tag
                  v-for="(item, index) in expand.row.attr_vals"
                  :key="index"
                  closable
                  @close="handleClose(index, expand.row)"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="expand.row.inputVisible"
                  v-model="expand.row.inputValue"
                  ref="TagInput"
                  size="small"
                  @keyup.enter="handleInputConfirm(expand.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(expand.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称">
            </el-table-column>

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
                    @click="editor(operator.row)"
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
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      :title="'添加' + title"
      v-model="Show"
      width="30%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="title" prop="isAdd">
          <el-input v-model="addForm.isAdd"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="Show = false">取 消</el-button>
          <el-button type="primary" @click="commitAddForm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      :title="'修改' + title"
      v-model="editShow"
      width="30%"
      @close="editDialogClosed"
    >
      <el-form
        :model="state.editForm"
        :rules="editRules"
        ref="editFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="title" prop="attr_name">
          <el-input v-model="state.editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editShow = false">取 消</el-button>
          <el-button type="primary" @click="commitEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  reactive,
  ref,
  nextTick,
  onMounted,
  watch
} from 'vue'
import { http } from '../../assets/js/http'
import { toast } from '../../assets/js/toast'
export default defineComponent({
  name: '',
  components: {},
  setup() {
    const internalInstance = getCurrentInstance()
    const state = reactive({
      cateList: [],
      selectedID: [],
      manyData: [],
      onlyData: [],
      currentParams: '',
      editForm: {},
      inputValue: '',
      inputVisible: false
    })

    const getCateList = async () => {
      const { data: res } = await http(internalInstance).get('categories')
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('获取分类列表失败')
      }
      state.cateList = res.data
    }
    getCateList()
    const props = reactive({
      value: 'cat_id',
      label: 'cat_name',
      children: 'children',
      expandTrigger: 'hover'
    })
    const getParamsData = async () => {
      if (state.selectedID.length !== 3) {
        state.selectedID = []
        return
      }
      const { data: res } = await http(internalInstance).get(
        `categories/${cateId.value}/attributes`,
        { params: { sel: activeName.value } }
      )
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('请求params失败')
      }
      res.data.forEach((item) => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        item.inputVisible = state.inputVisible
        item.inputValue = state.inputValue
      })

      if (activeName.value === 'many') {
        state.manyData = res.data
      } else {
        state.onlyData = res.data
      }
    }
    const handleChange = async () => {
      getParamsData()
    }
    let activeName = ref('many')
    const Show = ref(false)
    const add = () => {
      Show.value = true
    }
    const handleClick = () => {
      getParamsData()
    }
    const isShow = ref(false)
    const cateId = computed(() => {
      if (state.selectedID.length === 3) {
        isShow.value = true
        return state.selectedID[2]
      }
      return null
    })

    const isBtnsDisabled = computed(() => {
      if (state.selectedID.length !== 3) {
        return true
      }
      return false
    })
    const title = computed(() => {
      if (activeName.value === 'many') {
        return '动态参数'
      }
      return '静态属性'
    })
    const addFormRef = ref(null)
    const addForm = reactive({
      isAdd: ''
    })
    const commitAddForm = async () => {
      if (addFormRef.value !== null) {
        addFormRef.value.validate(async (valid) => {
          if (!valid) {
            return
          }
          const { data: res } = await http(internalInstance).post(
            `categories/${cateId.value}/attributes`,
            { attr_name: addForm.isAdd, attr_sel: activeName.value }
          )
          if (res.meta.status !== 201) {
            return toast(internalInstance).error('添加params失败')
          }

          Show.value = false
          getParamsData()
        })
      }
    }
    const addRules = reactive({
      isAdd: [
        {
          type: 'string',
          required: true,
          message: '请输入参数名称',
          trigger: 'blur'
        },
        { min: 2, max: 8, message: '长度在 2  到 8 个字符', trigger: 'blur' }
      ]
    })
    const editRules = reactive({
      attr_name: [
        {
          type: 'string',
          required: true,
          message: '请修改参数名称',
          trigger: 'blur'
        },
        { min: 2, max: 8, message: '长度在 2  到 8 个字符', trigger: 'blur' }
      ]
    })
    const addDialogClosed = () => {
      if (addFormRef.value !== null) {
        addFormRef.value.resetFields()
      }
    }
    const editShow = ref(false)
    const editFormRef = ref(null)
    const editor = async (info) => {
      const { data: res } = await http(internalInstance).get(
        `categories/${cateId.value}/attributes/${info.attr_id}`,
        { attr_sel: activeName.value }
      )
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('查询params失败')
      }
      state.editForm = res.data

      editShow.value = true
    }

    const editDialogClosed = () => {
      if (editFormRef.value !== null) {
        editFormRef.value.resetFields()
      }
    }
    const commitEdit = () => {
      if (editFormRef.value !== null) {
        editFormRef.value.validate(async (valid) => {
          if (!valid) {
            return
          }
          const { data: res } = await http(internalInstance).put(
            `categories/${cateId.value}/attributes/${state.editForm.attr_id}}`,
            { attr_name: state.editForm.attr_name, attr_sel: activeName.value }
          )
          if (res.meta.status !== 200) {
            return toast(internalInstance).error('提交params失败')
          }

          editShow.value = false
          getParamsData()
        })
      }
    }

    let TagInput = ref(null)
    const showInput = (block) => {
      block.inputVisible = true
      next()
    }
    const next = () => {
      nextTick(() => {
        if (TagInput.value !== null) {
          // // saveTagInput.value.input.focus();
          // console.log(TagInput.value)
        }
        // console.log(TagInput.value)
      })
    }
    const handleInputConfirm = async (block) => {
      block.inputVisible = false
      block.attr_vals.push(block.inputValue.trim())
      block.inputValue = ''
      const { data: res } = await http(internalInstance).put(
        `categories/${cateId.value}/attributes/${block.attr_id}`,
        {
          attr_name: block.attr_name,
          attr_sel: block.attr_sel,
          attr_vals: block.attr_vals.join(' ')
        }
      )
      if (res.meta.status !== 200) {
        toast(internalInstance).error('更新失败')
      }
      toast(internalInstance).success('更新成功')
    }
    async function handleClose(index, block) {
      block.inputVisible = false
      block.attr_vals.splice(index, 1)
      const { data: res } = await http(internalInstance).delete(
        `categories/${cateId.value}/attributes/${block.attr_id}`
      )
      if (res.meta.status !== 200) {
        toast(internalInstance).error('删除失败')
      }
      toast(internalInstance).success('删除成功')
    }
    onMounted(() => {
      next()
    })
    return {
      state,
      props,
      handleChange,
      activeName,
      handleClick,
      isBtnsDisabled,
      cateId,
      isShow,
      title,
      Show,
      add,
      addForm,
      addFormRef,
      commitAddForm,
      addRules,
      addDialogClosed,
      editShow,
      editor,
      editFormRef,
      editRules,
      editDialogClosed,
      commitEdit,
      handleInputConfirm,
      showInput,
      TagInput,
      handleClose
    }
  }
})
</script>
<style>
.el-alert {
  margin-bottom: 5px;
}
.el-cascader {
  width: 100px;
}
.el-input {
  width: 120px;
}
</style>
