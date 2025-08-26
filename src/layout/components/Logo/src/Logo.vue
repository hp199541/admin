<script lang="ts" setup>
import {computed, onMounted, ref, unref, watch} from 'vue'
import {useAppStore} from '@/store/modules/app'
import {useDesign} from '@/hooks/web/useDesign'
import {useConfigStore} from '@/store/modules/config'

defineOptions({name: 'Logo'})

const {getPrefixCls} = useDesign()

const prefixCls = getPrefixCls('logo')

const appStore = useAppStore()
const configStore = useConfigStore()
const show = ref(true)

const layout = computed(() => appStore.getLayout)

const collapse = computed(() => appStore.getCollapse)
const logoUrl = computed(() => configStore.logoUrl)
const appTitleFromConfig = computed(() => configStore.appTitle)
onMounted(() => {
  if (unref(collapse)) show.value = false
})

watch(
  () => collapse.value,
  (collapse: boolean) => {
    if (unref(layout) === 'topLeft' || unref(layout) === 'cutMenu') {
      show.value = true
      return
    }
    if (!collapse) {
      setTimeout(() => {
        show.value = !collapse
      }, 400)
    } else {
      show.value = !collapse
    }
  }
)

watch(
  () => layout.value,
  (layout) => {
    if (layout === 'top' || layout === 'cutMenu') {
      show.value = true
    } else {
      if (unref(collapse)) {
        show.value = false
      } else {
        show.value = true
      }
    }
  }
)
</script>

<template>
  <div>
    <router-link
      :class="[
        prefixCls,
        layout !== 'classic' ? `${prefixCls}__Top` : '',
        !show ? 'pl-8px' : 'pl-15px',
        'flex !h-[var(--logo-height)] items-center  cursor-pointer  relative decoration-none overflow-hidden'
      ]"
      to="/"
    >
      <div class="flex flex-col">
        <img
          :class="[!show ? 'h-28px' : 'h-34px', 'object-cover']"
          :src="logoUrl"
        />
        <div
          v-if="show"
          :class="[
            'mt-2px ml-0px text-center text-16px font-700',
            {
              'text-[var(--logo-title-text-color)]': layout === 'classic',
              'text-[var(--top-header-text-color)]':
                layout === 'topLeft' || layout === 'top' || layout === 'cutMenu'
            }
          ]"
        >
          {{ appTitleFromConfig }}
        </div>
      </div>
    </router-link>
  </div>
</template>
