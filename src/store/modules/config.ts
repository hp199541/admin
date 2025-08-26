// src/stores/configStore.ts
import {defineStore} from 'pinia'
import {ref, computed, type Ref} from 'vue'
import * as ConfigApi from '@/api/infra/config'
import {CACHE_KEY, useCache} from '@/hooks/web/useCache'

const {wsCache} = useCache()

interface GlobalConfig {
  title: string
  logo_path: string
}

export const useConfigStore = defineStore('config', () => {
  // 初始化时尝试从缓存读取配置
  const cachedConfig = wsCache.get(CACHE_KEY.GLOBALCONFIG) as GlobalConfig | null
  const globalConfig: Ref<GlobalConfig | null> = ref(cachedConfig)

  const appTitle = computed(() => globalConfig.value?.title || '大医医助后台管理')

  const logoUrl = computed(() => {
    if (!globalConfig.value?.logo_path) {
      return new URL('@/assets/imgs/st.png', import.meta.url).href
    }

    return globalConfig.value.logo_path
  })

  const fetchGlobalConfig = async () => {
    try {
      // 获取配置API返回的JSON字符串
      const res = await ConfigApi.getConfigKey('client_logo_title')

      if (typeof res === 'string') {
        // 解析JSON字符串
        globalConfig.value = JSON.parse(res) as GlobalConfig
        wsCache.set(CACHE_KEY.GLOBALCONFIG, globalConfig.value)
      }
    } catch (e) {
      console.error('获取或解析全局配置失败:', e)
      throw e
    }
  }

  return {
    globalConfig,
    fetchGlobalConfig,
    appTitle,
    logoUrl
  }
})
