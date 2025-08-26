<template>
  <el-row :gutter="20">
    <!-- 左侧组织树 -->
    <el-col :span="4" :xs="24">
      <ContentWrap class="h-1/1">
        <DeptTree @node-click="handleDeptNodeClick" />
      </ContentWrap>
    </el-col>
    <el-col :span="20" :xs="24">
      <!-- 内容 -->
      <ContentWrap>
        <template v-if="queryParams.deptId">
          <el-form :model="queryParams" label-width="130px">
            <el-form-item label="用药咨询欢迎卡片">
              <el-input v-model="queryParams.configContent" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template v-else>
          <el-empty description="请选择一个部门" />
        </template>
      </ContentWrap>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import * as DeptConfigApi from '@/api/system/deptConfig'
import DeptTree from '../user/DeptTree.vue'
import { ElMessage } from 'element-plus'

defineOptions({ name: 'DeptConfig' })

const loading = ref(true) // 列表的加载中
const queryParams = reactive({
  deptId: undefined,
  configCode: 'welcome_message',
  configContent: ''
})

/** 查询列表 */
const getDeptConfig = async () => {
  loading.value = true
  try {
    if (typeof queryParams.deptId !== 'number') {
      return
    }
    const data = await DeptConfigApi.getDeptConfig(queryParams.deptId, queryParams.configCode)
    queryParams.configContent = data.configContent
  } finally {
    loading.value = false
  }
}

/** 处理组织被点击 */
const handleDeptNodeClick = async (row) => {
  queryParams.deptId = row.id
  await getDeptConfig()
}

/**
 * 保存部门配置
 */
const handleSave = async () => {
  // 校验 deptId 是否为有效数字
  if (typeof queryParams.deptId !== 'number') {
    ElMessage.warning('请先选择一个部门')
    return
  }
  try {
    await DeptConfigApi.updateDeptConfig({
      deptId: queryParams.deptId,
      configCode: queryParams.configCode,
      configContent: queryParams.configContent
    })
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error('保存失败，请重试')
  }
}

/** 初始化 */
// onMounted(() => {
//   getDeptConfig()
// })
</script>
