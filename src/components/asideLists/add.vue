<template>
  <div class="">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        title="添加商品信息"
        type="info"
        show-icon
        :closable="false"
        center
      >
      </el-alert>
      <el-steps
        :space="200"
        :active="activeIndex"
        finish-status="success"
        align-center
        process-status="process"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :model="addForms"
        :rules="addRules"
        ref="addForm"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          :tab-position="'left'"
          v-model="activeIndex"
          :before-leave="handleBeforeLeave"
          @tab-click="handleTabClick"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForms.goods_name" type="string"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForms.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input
                v-model="addForms.goods_weight"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input
                v-model="addForms.goods_number"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                v-model="addForms.goods_cat"
                :options="state.cateList"
                :props="cateProps"
                @change="handleChange"
                placeholder="请选择"
              >
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              :label="item.attr_name"
              v-for="item in state.manyTableData"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="subitem"
                  v-for="(subitem, index) in item.attr_vals"
                  :key="index"
                  border
                  :checked="true"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in state.onlyTableData"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              action="https://lianghj.top:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headersObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  只能上传 jpg/png 文件，且不超过 500kb
                </div>
              </template>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <QuillEditor theme="snow" ref="qe"></QuillEditor>
            <el-button type="primary" class="btns" @click="commit"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <el-dialog title="预览" v-model="state.previewDialogVisible" width="50%">
      <template #footer>
        <img :src="state.imgPath" alt="" class="img" />
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  computed,
  toRaw
} from 'vue'
import { useRouter } from 'vue-router'
import { http } from '../../assets/js/http'
import { toast } from '../../assets/js/toast'
import _ from 'lodash'
export default defineComponent({
  name: '',
  components: {},
  setup() {
    const router = useRouter()
    const internalInstance = getCurrentInstance()
    let activeIndex = ref('0')
    const state = reactive({
      cateList: [],
      manyTableData: [],
      onlyTableData: [],
      imgPath: '',
      previewDialogVisible: false,
      oldGoods_introduce: ''
    })
    const cateProps = reactive({
      label: 'cat_name',
      value: 'cat_id',
      children: 'children',
      expandTrigger: 'hover'
    })
    const addForms = reactive({
      goods_name: '',
      goods_price: 0,
      goods_weight: 0,
      goods_number: 0,
      goods_cat: [],
      pics: [],
      goods_introduce: '',
      attrs: []
    })
    const addRules = reactive({
      goods_name: [
        { required: true, message: '请输入商品名称', trigger: 'blur' }
      ],
      goods_price: [
        { required: true, message: '请输入商品价格', trigger: 'blur' }
      ],
      goods_weight: [
        { required: true, message: '请输入商品重量', trigger: 'blur' }
      ],
      goods_number: [
        { required: true, message: '请输入商品数量', trigger: 'blur' }
      ]
    })
    const getCateList = async () => {
      const { data: res } = await http(internalInstance).get('categories')
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('获取分类列表失败')
      }
      state.cateList = res.data
    }
    getCateList()
    const handleChange = () => {
      if (addForms.goods_cat.length !== 3) {
        addForms.goods_cat = []
      }
    }
    const handleBeforeLeave = (activeName, oldActiveName) => {
      if (oldActiveName === '0' && addForms.goods_cat.length !== 3) {
        toast(internalInstance).error('请先选择商品分类')
        return false
      }
    }
    const cateId = computed(() => {
      if (addForms.goods_cat.length === 3) {
        return addForms.goods_cat[2]
      }
      return null
    })
    const handleTabClick = async () => {
      if (activeIndex.value === '1') {
        const { data: res } = await http(internalInstance).get(
          `categories/${cateId.value}/attributes`,
          { params: { sel: 'many' } }
        )

        if (res.meta.status !== 200) {
          return toast(internalInstance).error('获取动态参数列表失败')
        }
        res.data.forEach((item) => {
          item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        })
        state.manyTableData = res.data
      } else if (activeIndex.value === '2') {
        const { data: res } = await http(internalInstance).get(
          `categories/${cateId.value}/attributes`,
          { params: { sel: 'only' } }
        )

        if (res.meta.status !== 200) {
          return toast(internalInstance).error('获取静态属性列表失败')
        }
        state.onlyTableData = res.data
      }
    }
    const handlePreview = (file) => {
      state.imgPath = file.response.data.url
      state.previewDialogVisible = true
    }
    const handleRemove = (file) => {
      const pic = file.response.data.tmp_path
      const i = addForms.pics.findIndex((item) => {
        pic === item.pic
      })
      addForms.pics.splice(i, 1)
    }
    const headersObj = reactive({
      Authorization: window.sessionStorage.getItem('token')
    })
    const handleSuccess = (response) => {
      const picInfo = { pic: response.data.tmp_path }
      addForms.pics.push(picInfo)
    }
    const addForm = ref(null)
    const qe = ref(null)
    const commit = () => {
      if (addForm.value !== null) {
        addForm.value.validate(async (valid) => {
          if (!valid) {
            return toast(internalInstance).error('请填写必填项，不可偷懒')
          }
          const form = _.cloneDeep(addForms)
          form.goods_cat = form.goods_cat.join(',')
          // state.manyTableData.forEach(item=>{
          //   const newInfo={
          //     attr_id:item.attr_id,
          //     attr_value:item.attr_vals.join(' ')
          //   }
          //   addForms.attrs.push(newInfo)
          // })
          // state.onlyTableData.forEach(item=>{
          //   let newInfo={
          //     attr_id:item.attr_id,
          //     attr_value:item.attr_vals
          //   }
          //   addForms.attrs.push(newInfo)
          // })
          // form.attrs=addForms.attrs

          if (qe.value !== null) {
            form.goods_introduce = qe.value.getContents().ops[0].insert
          }
          const { data: res } = await http(internalInstance).post('goods', form)
          if (res.meta.status !== 201) {
            return toast(internalInstance).error('添加商品失败')
          }

          toast(internalInstance).success('添加商品成功')
          router.push('/goods')
        })
      }
    }

    return {
      activeIndex,
      addForms,
      addForm,
      addRules,
      state,
      getCateList,
      cateProps,
      handleChange,
      handleBeforeLeave,
      handleTabClick,
      cateId,
      handleRemove,
      handlePreview,
      headersObj,
      handleSuccess,
      commit,
      qe
    }
  }
})
</script>
<style>
.el-steps {
  margin-top: 30px;
}
.el-tabs {
  margin-top: 15px;
}
.img {
  width: 100%;
}
.btns {
  margin-top: 10px;
}
</style>
