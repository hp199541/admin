<template>
  <div class="login-wrap">
    <div class="login-bg"></div>
    <div class="login-wrap-left">
      <div class="center-bg"></div>
      <div class="left-bg"></div>
    </div>
    <div class="login-wrap-right">
      <div class="login-form-box">
        <div class="login-form-title">{{ config?.title }}</div>
        <div class="login-form-wrap">
          <LoginForm/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {LoginForm} from './components'
import * as ConfigApi from '@/api/infra/config'

defineOptions({name: 'Login'})
const config = ref({})
onMounted(async () => {
  try {
    const res = await ConfigApi.isLoginConfigValue()
    config.value = JSON.parse(res.client_logo_title)
  } catch (e) {
    console.log(e)
  }
})
</script>

<style lang="scss" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(23, 63, 138, 0.1);

  .login-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #000000 1px, transparent 1px),
    linear-gradient(to bottom, #000000 1px, transparent 1px);
    background-size: 30px 30px;
    background-repeat: repeat;
    opacity: 0.08;
  }

  &-left {
    position: relative;
    width: 65%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    .center-bg {
      width: 100%;
      height: calc(100% - 50px);
      background-image: url("../../assets/imgs/login/login_main.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      margin: 25px;
    }

    .left-bg {
      width: 100%;
      height: 100%;
      background-image: url("../../assets/imgs/login/login_bg_left.png");
      background-size: auto;
      background-repeat: no-repeat;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }

  &-right {
    // width: 362px;
    // transform: translateX(-75px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0 5%;

    .top-bg {
      position: absolute;
      right: 0;
      top: 0;
      width: 551px;
      height: 415px;
      background-image: url("../../assets/imgs/login/login_bg_left_top.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      pointer-events: none;
    }

    .bottom-bg {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 294px;
      height: 518px;
      background-image: url("../../assets/imgs/login/login_bg_right_bottom.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      pointer-events: none;
    }

    .login-form-box {
      border-radius: 40px;
      width: 100%;

      .login-form-title {
        font-weight: 500;
        font-size: 36px;
        color: #000000;
        margin-bottom: 40px;
        text-align: center;
      }

      .login-form-wrap {
        box-sizing: border-box;
        // padding: 16px;
        border-radius: 32px;
        background: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(10px);
        box-sizing: border-box;
        padding: 48px 24px;
      }
    }
  }
}

</style>

<style lang="scss">

</style>
