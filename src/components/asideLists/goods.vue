<template>
  <div class="">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable
            @clear="getGoodsList"
          >
            <template #append>
              <el-button
                icon="el-icon-search"
                @click="getGoodsList"
              ></el-button>
            </template>
          </el-input>
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="state.goodList" style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="180">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column label="创建时间">
          <template v-slot="time">
            {{ DateFilters(time.row.add_time).value }}
          </template>
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
              <el-button type="primary" icon="el-icon-edit"></el-button>
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
                @click="deleteGoods(operator.row.goods_id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="state.total"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  reactive,
  computed
} from 'vue'
import { http } from '../../assets/js/http'
import { toast } from '../../assets/js/toast'
import { confirm } from '../../assets/js/confirm'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: '',
  components: {},
  setup() {
    const internalInstance = getCurrentInstance()
    const state = reactive({
      goodList: [],
      total: 0
    })
    const queryInfo = reactive({
      query: '',
      pagenum: 1,
      pagesize: 10
    })
    const getGoodsList = async () => {
      const { data: res } = await http(internalInstance).get('goods', {
        params: queryInfo
      })
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('获取商品列表失败')
      }
      state.goodList = res.data.goods
      state.total = res.data.total
    }

    getGoodsList()
    const DateFilters = (origalVal) => {
      return computed(() => {
        const dt = new Date(origalVal)
        const y = dt.getFullYear()
        const m = (dt.getMonth() + 1 + '').padStart(2, '0')
        const d = (dt.getDate() + '').padStart(2, '0')

        const hh = (dt.getHours() + '').padStart(2, '0')
        const mm = (dt.getMinutes() + '').padStart(2, '0')
        const ss = (dt.getSeconds() + '').padStart(2, '0')
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      })
    }
    const handleSizeChange = (newValue) => {
      queryInfo.pagesize = newValue
      getGoodsList()
    }
    const handleCurrentChange = (newValue) => {
      queryInfo.pagenum = newValue
      getGoodsList()
    }
    const deleteGoods = async (id) => {
      const confirms = confirm(internalInstance)
      const result = await confirms
        .confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .catch((err) => err)

      if (result !== 'confirm') {
        return toast(internalInstance).info('已取消删除操作')
      }
      const { data: res } = await http(internalInstance).delete(`goods/${id}`)
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('已取消删除操作')
      }
      getGoodsList()
      return toast(internalInstance).success('删除成功')
    }
    const router = useRouter()
    const goAddPage = () => {
      router.push('/goods/add')
    }
    return {
      state,
      getGoodsList,
      DateFilters,
      handleSizeChange,
      handleCurrentChange,
      queryInfo,
      deleteGoods,
      goAddPage
    }
  }
})
</script>
<style scoped>
.el-input {
  width: 30%;
  margin-right: 15px;
}
.el-table {
  font-size: 12px;
}
</style>
