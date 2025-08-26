<script lang="ts" setup>
import { useDesign } from '@/hooks/web/useDesign'
import {computed} from "vue";
import {useConfigStore} from '@/store/modules/config'
// eslint-disable-next-line vue/no-reserved-component-names
defineOptions({ name: 'Footer' })

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('footer')

const configStore = useConfigStore()
const appTitleFromConfig = computed(() => configStore.appTitle)
// 添加当前年份计算属性
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <div
    :class="prefixCls"
    class="h-[var(--app-footer-height)] bg-[var(--app-content-bg-color)] text-center leading-[var(--app-footer-height)] text-[var(--el-text-color-placeholder)] dark:bg-[var(--el-bg-color)] overflow-hidden"
  >
    <span class="text-14px">Copyright ©{{ currentYear }} {{appTitleFromConfig}}</span>
  </div>
</template>
