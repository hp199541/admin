<template>
  <div>
    <el-card shadow="never">
      <el-row :gutter="16" justify="space-between" align="middle">
        <el-col :xl="21" :lg="21" :md="21" :sm="24" :xs="24">
          <div class="flex items-center">
            <el-avatar :src="avatar" :size="70" class="mr-16px" v-if="avatar"/>
            <div class="user-logo-icon" v-else>{{username.slice(0, 1) }}</div>
            <div>
              <div class="text-20px">
                {{ t('workplace.welcome') }} {{ username }} {{ t('workplace.happyDay') }}
              </div>
              <div class="mt-10px text-14px text-gray-500">
                {{ t('workplace.toady') }}，20℃ - 32℃！
              </div>
            </div>
          </div>
        </el-col>
<!--        <el-col :xl="3" :lg="3" :md="3" :sm="3" :xs="3" class="flex justify-end">-->
<!--          <div class="flex items-center">-->
<!--            <div class="mr-4">{{ t('setting.theme') }}：</div>-->
<!--            <ThemeSwitch />-->
<!--          </div>-->
<!--        </el-col>-->
      </el-row>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
defineOptions({ name: 'Home' })

const { t } = useI18n()
const userStore = useUserStore()
const avatar = userStore.getUser.avatar
const username = userStore.getUser.nickname

</script>
<style scoped lang="scss">
.user-logo-icon {
  width: 60px;
  height: 60px;
  background: #e6f2ff;
  display: table-cell; // 使用表格单元格布局
  vertical-align: middle; // 垂直居中
  text-align: center; // 水平居中
  border-radius: 50%;
  color: rgba(54, 96, 221, 1);
  font-weight: 500;
  font-size: 34px;
  border: 1px solid rgba(54, 96, 221, 0.05);
}
</style>
