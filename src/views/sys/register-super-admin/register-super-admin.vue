<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <div class="flex items-center absolute right-4 top-4">
      <!-- <AppDarkModeToggle class="enter-x mr-2" v-if="!sessionTimeout" /> -->
      <AppLocalePicker
        class="text-white enter-x xl:text-gray-600"
        :show-text="false"
        v-if="!sessionTimeout && showLocale"
      />
    </div>

    <span class="-enter-x xl:hidden">
      <AppLogo :alwaysShowTitle="true" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <AppLogo class="-enter-x" />
          <div class="my-auto">
            <img
              :alt="title"
              src="../../../assets/svg/login-box-bg.svg"
              class="w-1/2 -mt-16 -enter-x"
            />
            <div class="mt-10 font-medium text-white -enter-x">
              <span class="inline-block mt-4 text-3xl">
                {{ t("sys.login.signInTitle") }}</span
              >
            </div>
            <div
              class="mt-5 font-normal text-white dark:text-gray-500 -enter-x"
            >
              {{ t("sys.login.signInDesc") }}
            </div>
          </div>
        </div>
        <div
          class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12"
        >
          <div
            :class="`${prefixCls}-form`"
            class="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
          >
            <h2
              class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left"
            >
              注册超级管理员
            </h2>

            <!--  -->
            <Form
              class="p-4 enter-x"
              ref="formRef"
              :model="formData"
              :rules="rulesRef"
              @keypress.enter="handleRegister"
            >
              <!-- :rules="[{ required: true, message: '请输入必填字段3' }]" -->
              <FormItem
                name="account"
                class="enter-x"
                v-bind="validateInfos.account"
              >
                <Input
                  size="large"
                  v-model:value="formData.account"
                  :placeholder="t('超级管理员账号')"
                  class="fix-auto-fill"
                />
              </FormItem>

              <FormItem
                name="password"
                class="enter-x"
                v-bind="validateInfos.password"
              >
                <InputPassword
                  size="large"
                  v-model:value="formData.password"
                  :placeholder="t('sys.login.password')"
                />
              </FormItem>

              <FormItem
                name="confirmPassword"
                class="enter-x"
                v-bind="validateInfos.confirmPassword"
              >
                <InputPassword
                  size="large"
                  v-model:value="formData.confirmPassword"
                  :placeholder="t('sys.login.confirmPassword')"
                />
              </FormItem>

              <Button
                type="primary"
                class="enter-x"
                size="large"
                block
                @click="handleRegister"
                :loading="loading"
              >
                {{ t("sys.login.registerButton") }}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { registerSuperAdmin } from "/@/api/apis";
import sha256 from "crypto-js/sha512";

import { computed, reactive, toRaw } from "vue";
import { AppLogo } from "/@/components/Application";
import { AppLocalePicker } from "/@/components/Application";

// import LoginForm from "./LoginForm.vue";
// import ForgetPasswordForm from "./ForgetPasswordForm.vue";
// import RegisterForm from "./RegisterForm.vue";
// import MobileForm from "./MobileForm.vue";
// import QrCodeForm from "./QrCodeForm.vue";

import { useGlobSetting } from "/@/hooks/setting";
import { useI18n } from "/@/hooks/web/useI18n";
import { useDesign } from "/@/hooks/web/useDesign";
import { useLocaleStore } from "/@/store/modules/locale";

import {
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Button,
  Divider,
  message,
} from "ant-design-vue";

defineProps({
  sessionTimeout: {
    type: Boolean,
  },
});

const globSetting = useGlobSetting();
const { prefixCls } = useDesign("login");
const { t } = useI18n();
const localeStore = useLocaleStore();
const showLocale = localeStore.getShowPicker;
const title = computed(() => globSetting?.title ?? "");

const ACol = Col;
const ARow = Row;
const FormItem = Form.Item;
const InputPassword = Input.Password;
const useForm = Form.useForm;

const formData = reactive({
  account: "",
  password: "",
  confirmPassword: "",
});

const rulesRef = reactive({
  account: [
    {
      required: true,
      message: "请输入必填字段",
      trigger: ["change", "blur"],
    },
  ],
  password: [
    {
      required: true,
      message: "请输入必填字段",
      trigger: ["change", "blur"],
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "请输入必填字段",
      trigger: ["change", "blur"],
    },
  ],
});

const { resetFields, validate, validateInfos } = useForm(formData, rulesRef);

const handleRegister = async () => {
  validate()
    .then(() => {
      let data = toRaw(formData);

      if (data.password !== data.confirmPassword) {
        return message.error("密码不一致");
      }

      const hashPassword = sha256(`nonce-f;54%$fd#%hg$#-${data.password}`);

      registerSuperAdmin({
        username: data.account,
        password: hashPassword.toString(),
      })
        .then((res) => {})
        .catch((err) => {
          // console.log("错误2", err);
        });

      console.log(data, hashPassword.toString(), "成功");
    })
    .catch((err) => {
      console.log("error", err);
    });
  console.log("注册提交");
};
</script>

<style lang="less">
@prefix-cls: ~"@{namespace}-login";
@logo-prefix-cls: ~"@{namespace}-app-logo";
@countdown-prefix-cls: ~"@{namespace}-countdown-input";
@dark-bg: #293146;

html[data-theme="dark"] {
  .@{prefix-cls} {
    background-color: @dark-bg;

    &::before {
      background-image: url("/@/assets/svg/login-bg-dark.svg");
    }

    .ant-input,
    .ant-input-password {
      background-color: #232a3b;
    }

    .ant-btn:not(.ant-btn-link, .ant-btn-primary) {
      border: 2rpx solid #4a5569;
    }

    &-form {
      background: transparent !important;
    }

    .app-iconify {
      color: #fff;
    }
  }

  input.fix-auto-fill,
  .fix-auto-fill input {
    -webkit-text-fill-color: #c9d1d9 !important;
    box-shadow: inherit !important;
  }
}

.@{prefix-cls} {
  min-height: 100%;
  overflow: hidden;

  @media (max-width: @screen-xl) {
    background-color: #293146;

    .@{prefix-cls}-form {
      background-color: #fff;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url("/@/assets/svg/login-bg.svg");
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: auto 100%;

    @media (max-width: @screen-xl) {
      display: none;
    }
  }

  .@{logo-prefix-cls} {
    position: absolute;
    top: 12px;
    height: 30px;

    &__title {
      color: #fff;
      font-size: 16px;
    }

    img {
      width: 32px;
    }
  }

  .container {
    .@{logo-prefix-cls} {
      display: flex;
      width: 60%;
      height: 80px;

      &__title {
        color: #fff;
        font-size: 24px;
      }

      img {
        width: 48px;
      }
    }
  }

  &-sign-in-way {
    .anticon {
      color: #888;
      font-size: 22px;
      cursor: pointer;

      &:hover {
        color: @primary-color;
      }
    }
  }

  input:not([type="checkbox"]) {
    min-width: 360px;

    @media (max-width: @screen-xl) {
      min-width: 320px;
    }

    @media (max-width: @screen-lg) {
      min-width: 260px;
    }

    @media (max-width: @screen-md) {
      min-width: 240px;
    }

    @media (max-width: @screen-sm) {
      min-width: 160px;
    }
  }

  .@{countdown-prefix-cls} input {
    min-width: unset;
  }

  .ant-divider-inner-text {
    color: @text-color-secondary;
    font-size: 12px;
  }
}
</style>
