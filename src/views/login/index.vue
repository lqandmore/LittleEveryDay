<script setup lang="ts">
import { UserFilled, Lock, Checked } from "@element-plus/icons-vue";
import { ref } from "vue";
import ReImageVerity from "@/components/ReImageVerify/src/index.vue";
import { thirdParty } from "./utils/enums";
import { FormInstance } from "element-plus";
import { useUserStoreHook } from "@/store/modules/user";
const url = "https://vuejs.org/images/logo.png";
const ruleForm = reactive({
  userName: "admin",
  password: "admin123",
  verificationCode: ""
});
const imgCode = ref("");
const isSavePassword = ref(false);
const loading = ref(false);

const titles = ["手机登录", "二维码登录", "注册"];

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      useUserStoreHook().loginByUserName({userName: ruleForm.userName, password: ruleForm.password})
      .then(res => {
        if (res.success) {
          initRouter().then(() => {
            loading.value = false;
            router.push({path: '/'})
          })
        }
      })
    }else {
      loading.value = false;
      return;
    }
    console.log(ruleForm);
  });
}


</script>
<template>
  <div class="login">
    <div class="login-container">
      <div class="login-box">
        <div class="login-form">
          <el-image style="width: 100px; height: 100px" :src="url" fit="cover" />

          <h2 class="mx-1">PUTEADMIN</h2>
          <el-form size="large">
            <el-form-item>
              <div class="mt-4 w-full">
                <el-input
                  v-model="ruleForm.userName"
                  placeholder="请输入用户名"
                  class="input-with-select"
                  clearable
                  :prefix-icon="UserFilled"
                  aria-autocomplete
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="mt-4 w-full">
                <el-input
                  v-model="ruleForm.password"
                  placeholder="请输入密码"
                  class="input-with-select"
                  :prefix-icon="Lock"
                  clearable
                  show-password
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="mt-4 w-full" prop="verityCode">
                <el-input
                  v-model="ruleForm.verificationCode"
                  placeholder="请输入验证码"
                  class="input-with-select"
                  :prefix-icon="Checked"
                >
                  <template #append>
                    <ReImageVerity v-model:code="imgCode" />
                  </template>
                </el-input>
              </div>
            </el-form-item>
          </el-form>
          <div class="loginSpace">
            <el-checkbox v-model="isSavePassword">记住密码</el-checkbox>
            <el-button type="primary" link>忘记密码?</el-button>
          </div>
          <div class="loginBtn">
            <el-button class="w-full" type="primary" :loaidng="loading">登录</el-button>
          </div>
          <div class="loginSpace">
            <template v-for="title in titles" :key="title">
              <el-button>{{ title }}</el-button>
            </template>
          </div>
          <el-divider>第三方登录</el-divider>
          <div class="thirdLogin">
            <template v-for="item in thirdParty" :key="item.title">
              <IconifyIconOnline :icon="`ri:${item.icon}-fill`" width="20" class="cursor-pointer text-gray-500 hover:text-blue-400"/>
            </template>

            <!-- <el-button type="primary" icon="wechat"></el-button>
            <el-button type="primary" icon="qq"></el-button>
            <el-button type="primary" icon="weibo"></el-button>
            <el-button type="primary" icon="zhifubao"></el-button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
.mx-1 {
  font-size: 50px;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 360px;
}
.loginSpace {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.loginBtn {
  margin-top: 20px;
  margin-bottom: 20px;
}
.thirdLogin {
  display: flex;
  margin-top: 30px;
  justify-content: space-around;
  align-items: center;
}
</style>
