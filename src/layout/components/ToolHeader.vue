<script lang="tsx">
import {defineComponent, computed} from 'vue'
import {Collapse} from '@/layout/components/Collapse'
import {UserInfo} from '@/layout/components/UserInfo'
import {Breadcrumb} from '@/layout/components/Breadcrumb'
import {useAppStore} from '@/store/modules/app'
import {useDesign} from '@/hooks/web/useDesign'
import {ThemeSwitch} from "@/layout/components/ThemeSwitch";
const {t} = useI18n()
const {getPrefixCls, variables} = useDesign()

const prefixCls = getPrefixCls('tool-header')

const appStore = useAppStore()

// 面包屑
const breadcrumb = computed(() => appStore.getBreadcrumb)

// 折叠图标
const hamburger = computed(() => appStore.getHamburger)

// 布局
const layout = computed(() => appStore.getLayout)

export default defineComponent({
  name: 'ToolHeader',
  components: {ThemeSwitch},
  setup() {
    return () => (
      <div
        id={`${variables.namespace}-tool-header`}
        class={[
          prefixCls,
          'h-[var(--top-tool-height)] relative px-[var(--top-tool-p-x)] flex items-center justify-between',
          'dark:bg-[var(--el-bg-color)]'
        ]}
      >
        {layout.value !== 'top' ? (
          <div class="h-full flex items-center">
            {hamburger.value && layout.value !== 'cutMenu' ? (
              <Collapse class="custom-hover" color="var(--top-header-text-color)"></Collapse>
            ) : undefined}
            {breadcrumb.value ? <Breadcrumb class="lt-md:hidden"></Breadcrumb> : undefined}
          </div>
        ) : undefined}
        <div class="h-full flex items-center justify-between">
          <div class="flex items-center">
            <div class="mr-4">{t('setting.theme')}：</div>
            <ThemeSwitch/>
          </div>
          <UserInfo></UserInfo>
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
$prefix-cls: #{$namespace}-tool-header;

.#{$prefix-cls} {
  transition: left var(--transition-time-02);
}
// 调整切换主题区域样式
.#{$prefix-cls} .flex.items-center {
  gap: 8px; // 增加切换主题文字和开关之间的间距
}
// 调整切换主题和用户信息之间的间距
.#{$prefix-cls} .h-full.flex.items-center.justify-between > div:last-child {
  margin-left: 16px;
}
.#{$prefix-cls} .h-full.flex.items-center.justify-between {
  align-items: center;
}
// 给用户信息部分添加边框和轻微阴影
.#{$prefix-cls} .UserInfo {
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 6px 10px;
}
@media (max-width: 768px) {
  // 在小屏幕下调整布局
  .#{$prefix-cls} .h-full.flex.items-center.justify-between {
    flex-direction: column;
    align-items: flex-end;
  }
  .#{$prefix-cls} .flex.items-center {
    margin-bottom: 8px;
  }
}
</style>
