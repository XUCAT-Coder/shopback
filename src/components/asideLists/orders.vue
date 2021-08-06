<template>
  <div class="">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-input
            placeholder="请输入内容"
            v-model="state.input"
            class="input-with-select"
            clearable
          >
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="state.ordersList" style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180">
        </el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
          <template v-slot="flag">
            <el-tag type="success" v-if="flag.row.pay_status === '1'"
              >已付款</el-tag
            >
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send">
          <template v-slot="flag">
            <el-tag type="success" v-if="flag.row.is_send === '是'"
              >已发货</el-tag
            >
            <el-tag type="danger" v-else>未发货</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下单时间">
          <template v-slot="time">
            {{ DateFilters(time.row.create_time).value }}
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
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="editAddressForm"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="物流进度"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="success"
                icon="el-icon-location"
                @click="ShowLogisticsForm"
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
    <el-dialog title="修改地址" v-model="showAddressForm" width="30%">
      <el-form
        ref="addressFormRef"
        :model="addressForm"
        label-width="80px"
        :rules="addressRules"
      >
        <el-form-item label="省市区/县">
          <el-cascader
            :options="state.citydata"
            @change="handleChange"
            v-model="addressForm.address1"
            expand-trigger="hover"
            placeholder="请选择"
            clearable
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddressForm = false">取 消</el-button>
          <el-button type="primary" @click="showAddressForm = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-dialog title="物流进度" v-model="showLogisticsForm" width="30%">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in state.logisticsInfo"
          :key="index"
          :timestamp="activity.time"
        >
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showLogisticsForm = false">取 消</el-button>
          <el-button type="primary" @click="showLogisticsForm = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  getCurrentInstance,
  computed,
  ref
} from 'vue'
import { http } from '../../assets/js/http'
import { toast } from '../../assets/js/toast'
import citydata from '../../assets/js/citydata'
export default defineComponent({
  name: '',
  components: {},
  setup() {
    const internalInstance = getCurrentInstance()
    const state = reactive({
      input: '',
      ordersList: [],
      total: 0,
      citydata,
      logisticsInfo: []
    })
    const queryInfo = reactive({
      query: '',
      pagenum: 1,
      pagesize: 5
    })
    const getOrdersList = async () => {
      const { data: res } = await http(internalInstance).get('orders', {
        params: queryInfo
      })
      if (res.meta.status !== 200) {
        return toast(internalInstance).error('获取订单列表失败')
      }
      state.ordersList = res.data.goods
      state.total = res.data.total
    }
    getOrdersList()
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
    const handleSizeChange = (newSize) => {
      queryInfo.pagesize = newSize
      getOrdersList()
    }
    const handleCurrentChange = (newNum) => {
      queryInfo.pagenum = newNum
      getOrdersList()
    }
    const addressForm = reactive({
      address1: [],
      address2: ''
    })
    const showAddressForm = ref(false)
    const editAddressForm = () => {
      showAddressForm.value = true
    }
    const addressRules = reactive({
      address2: [
        {
          type: 'string',
          required: true,
          message: '请输入详细地址',
          trigger: 'blur'
        }
      ]
    })

    const showLogisticsForm = ref(false)

    const ShowLogisticsForm = async () => {
      const { data: res } = await http(internalInstance).get(
        '/kuaidi/1106975712662'
      )

      if (res.meta.status !== 200) {
        return toast(internalInstance).error('获取物流信息失败')
      }
      state.logisticsInfo = res.data
      showLogisticsForm.value = true
    }

    return {
      state,
      queryInfo,
      getOrdersList,
      DateFilters,
      handleSizeChange,
      handleCurrentChange,
      addressForm,
      editAddressForm,
      showAddressForm,
      addressRules,
      showLogisticsForm,
      ShowLogisticsForm
    }
  }
})
</script>
<style>
.el-input {
  width: 50%;
}
.el-cascader {
  width: 100%;
}
</style>
