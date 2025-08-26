<template>
  <el-form
    v-show="getShow"
    ref="formLogin"
    :model="loginData.loginForm"
    :rules="LoginRules"
    class="login-form"
  >
    <el-form-item prop="username">
      <el-input
        v-model="loginData.loginForm.username"
        :placeholder="t('login.usernamePlaceholder')"
      >
        <template #prefix>
          <img src="@/assets/imgs/login/icon_user.png" alt=""/>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginData.loginForm.password"
        :placeholder="t('login.passwordPlaceholder')"
        show-password
        type="password"
        @keyup.enter="handleLogin"
      >
        <template #prefix>
          <img src="@/assets/imgs/login/icon_password.png" alt=""/>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <XButton
        :loading="loginLoading"
        :title="t('login.login')"
        class="login-btn"
        type="primary"
        @click="handleLogin"
      />
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import {ElLoading} from 'element-plus'
import type {RouteLocationNormalizedLoaded} from 'vue-router'

import * as authUtil from '@/utils/auth'
import {usePermissionStore} from '@/store/modules/permission'
import * as LoginApi from '@/api/login'
import {LoginStateEnum, useLoginState} from './useLogin'
import { useDarkModeStore  } from '@/store/modules/darkMode'; // 新增：导入深色模式store
import { useConfigStore } from '@/store/modules/config'
defineOptions({name: 'LoginForm'})

const {t} = useI18n()
const darkModeStore = useDarkModeStore();
const configStore = useConfigStore();
const formLogin = ref()
const {getLoginState} = useLoginState()
const {currentRoute, push} = useRouter()
const permissionStore = usePermissionStore()
const redirect = ref<string>('')
const loginLoading = ref(false)

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

const LoginRules = {
  username: [required],
  password: [required]
}
const loginData = reactive({
  isShowPassword: false,
  captchaEnable: import.meta.env.VITE_APP_CAPTCHA_ENABLE,
  loginForm: {
    username: '',
    password: '',
    captchaVerification: ''
  }
})

const loading = ref() // ElLoading.service 返回的实例
// 登录
const handleLogin = async (params: any) => {
  loginLoading.value = true
  try {
    const loginDataLoginForm = {...loginData.loginForm}
    loginDataLoginForm.captchaVerification = params.captchaVerification
    const res = await LoginApi.login(loginDataLoginForm)
    if (!res) {
      return
    }
    loading.value = ElLoading.service({
      lock: true,
      text: '正在加载系统中...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    authUtil.setToken(res)
    if (!redirect.value) {
      redirect.value = '/'
    }
    // 判断是否为SSO登录
    if (redirect.value.indexOf('sso') !== -1) {
      window.location.href = window.location.href.replace('/login?redirect=', '')
    } else {
      await push({path: redirect.value || permissionStore.addRouters[0].path})
    }
    darkModeStore.applySavedMode();
    configStore.fetchGlobalConfig()
  } finally {
    loginLoading.value = false
    loading.value.close()
  }
}
watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.el-form {
  .el-form-item {
    margin-bottom: 28px;

    &:nth-last-child(1) {
      margin-bottom: 0;
    }

    .el-form-item__content {
      .login-btn {
        width: 100%;
        height: 48px;
        line-height: 48px;
        text-align: center;
        background: linear-gradient(
            33deg,
            #5e34a9 0%,
            #4a2ea6 13%,
            #1a209e 44%,
            #427bf7 100%
        );
        box-shadow: 0 2px 12px #001dff59, inset 0 0 1px #ffffff80;
        border-radius: 24px;
        cursor: pointer;
        font-weight: 400;
        font-size: 16px;
      }

      .el-input__prefix-inner {
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.login-form {
  .el-input__inner {
    height: 48px;
    font-weight: 500;
    font-size: 16px;
    color: #000000;
  }

  .el-input__wrapper {
    border-radius: 24px;
  }
}
</style>
