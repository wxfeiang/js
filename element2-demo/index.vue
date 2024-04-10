<template>
  <view class="shop-info-box">
    <u-navbar
      title="我的银行卡"
      leftIconSize="40"
      placeholder
      :autoBack="true"
    ></u-navbar>
    <view class="shop-info-box-form-box">
      <view class="shop-info-box-form">
        <u--form :model="formSign" :rules="rules" labelPosition="left" ref="formSign">
          <u-form-item label="主体类型" borderBottom required prop="licenseName">
            <!-- @click="openPopup(0)" -->
            <u-input
              v-model="formSign.licenseName"
              disabled
              placeholder="请选择主体类型"
              border="none"
              inputAlign="right"
            ></u-input>
            <!-- <u-icon slot="right" name="arrow-right"></u-icon> -->
          </u-form-item>
          <u-form-item
            label="开户类型"
            borderBottom
            required
            prop="licenseName"
            @click="openPopup(1)"
          >
            <u-input
              v-model="formSign.bankAccountTypeName"
              placeholder="请选择开户类型"
              border="none"
              inputAlign="right"
            ></u-input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item
            label="开户银行省"
            prop="provinceCodeName"
            required
            borderBottom
            @click="pickerShowClick('provinceCode')"
          >
            <u--input
              v-model="formView.provinceCodeName"
              autoBlur
              placeholder="请选择"
              disabled
              border="none"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item
            label="开户银行市"
            prop="bankAddressCode"
            required
            borderBottom
            @click="pickerShowClick('bankAddressCode')"
          >
            <u--input
              v-model="formView.bankAddressCodeName"
              autoBlur
              placeholder="请选择"
              disabled
              border="none"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item
            label="开户银行"
            prop="accountBank"
            borderBottom
            required
            @click="pickerShowClick('accountBank')"
          >
            <u--input
              v-model="formSign.accountBank"
              autoBlur
              placeholder="请选择"
              disabled
              border="none"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
          <u-form-item
            label="开户银行全称（含支行）"
            prop="bankName"
            borderBottom
            required
            v-if="formSign.accountBank === '其他银行'"
            @click="toBankList"
            ><u-input
              v-model="formSign.bankName"
              placeholder="请选择"
              border="none"
              disabled
          /></u-form-item>
          <u-form-item label="银行账号" prop="accountNumber" borderBottom required
            ><u-input
              v-model="formSign.accountNumber"
              placeholder="请输入"
              border="none"
            />
            <Ocr
              slot="right"
              @ocrSucess="businessSuccess"
              showType="icon"
              certificateType="bankCard"
            />
          </u-form-item>
          <span class="tips" v-if="formSign && formSign.bankAccountType === '75'"
            >签约为对私账户，银行账户的开户名称必须与身份证姓名（<span
              style="font-weight: 800"
              >{{ formSign.idCardName }}</span
            >）一致；否则银行会打款失败。
          </span>
          <span class="tips" v-else>
            签约为对公账户，银行账户的开户名称必须与营业执照上的“商户名称”（<span
              style="font-weight: 800"
              >{{ formSign.merchantName }}</span
            >）一致；否则银行会打款失败。</span
          >
          <!-- <p class="tips">
            1、用于接收微信支付的重要管理信息及日常操作验证码。
          </p> -->
        </u--form>
      </view>
    </view>
    <u-action-sheet
      :show="showSheet"
      :actions="actions"
      :title="sheetTitle"
      @close="showSheet = false"
      @select="sheetSelect"
    >
    </u-action-sheet>
    <u-notify ref="formSignNotify" fontSize="500"></u-notify>
    <u-picker
      :show="pickerShow"
      :keyName="keyName"
      :columns="listPicker"
      @cancel="cancelEvent"
      @confirm="confirmEvent"
    ></u-picker>
    <u-tabbar
      @change="submit"
      :fixed="true"
      :border="false"
      :placeholder="true"
      :safeAreaInsetBottom="false"
    >
      <u-tabbar-item :text="'保存'"></u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>
import {
  cityList,
  getShopSign,
  getSysDic,
  province,
  selectMyBank,
  updateMyBank,
} from "@/api/index.js";
import { getShopCertificationInfo } from "@/api/shop.js";
import pickers from "@/components/ming-picker/ming-picker.vue";
import Ocr from "@/components/ocr.vue";
import { mapGetters } from "vuex";
import { redirectTo } from "@/utils/toPage";
export default {
  components: {
    pickers,
    Ocr,
  },
  computed: {
    ...mapGetters(["shopId", "userId"]),
  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.formSign.setRules(this.rules);
  },
  onShow() {},
  onLoad(options) {
    // this.getInfo();
    this.getShopCertificationInfo();
  },
  data() {
    return {
      keyName: "",
      listPicker: [],
      pickerShow: false,
      provinceList: [],
      cityList: [],
      formSign: {
        licenseName: "",
        bankAccountTypeName: "",
        provinceCodeName: "",
        bankAddressCode: "",
        accountBank: "",
        accountNumber: "",
      },
      formView: {},
      bankList: [],
      provinceCode: "",
      rules: {
        licenseName: [
          {
            type: "string",
            required: true,
            message: "请选择商户类型",
            trigger: ["change", "blur"],
          },
        ],
        bankAccountTypeName: [
          {
            type: "string",
            required: true,
            message: "请选择商户开户类型",
            trigger: ["change", "blur"],
          },
        ],
        provinceCodeName: [
          {
            type: "string",
            required: true,
            message: "请选择开户银行省",
            trigger: ["change", "blur"],
          },
        ],
        bankAddressCode: [
          {
            type: "string",
            required: true,
            message: "请选择开户银行市",
            trigger: ["change", "blur"],
          },
        ],
        accountBank: [
          {
            type: "string",
            required: true,
            message: "请选择开户银行",
            trigger: ["change", "blur"],
          },
        ],
        accountNumber: [
          {
            type: "string",
            required: true,
            message: "请输入银行账号",
            trigger: ["change", "blur"],
          },
        ],
      },
      mainInfoTypeList: [
        { name: "个体工商户", type: "1" },
        { name: "企业商户", type: "2" },
        { name: "机关事业单位和社会团体", type: "3" },
      ],
      bankAccountTypeList: [
        { name: "对公账户", type: "74", license: "1" },
        { name: "对私账户", type: "75", license: "2" },
      ],
      showSheet: false,
      sheetTitle: "",
      actions: [],
      selectINdex: 0,
    };
  },

  methods: {
    openPopup(index) {
      this.selectINdex = index;
      this.showSheet = true;
      if (index == 0) {
        this.sheetTitle = "主体类型";
        this.actions = this.mainInfoTypeList;
      }
      if (index == 1) {
        this.sheetTitle = "开户类型";
        this.actions = this.bankAccountTypeList;
      }
    },
    sheetSelect(e) {
      this.showSheet = false;
      if (this.selectINdex == 0) {
        this.formSign.licenseName = e.name;
        this.formSign.license = e.type;
      }
      if (this.selectINdex == 1) {
        this.formSign.bankAccountType = e.type;
        this.formSign.bankAccountTypeName = e.name;
      }

      this.$refs.formSign.validateField("formSign.licenseName");
    },
    async getInfo() {
      const { data: bankList } = await getSysDic({ kindCode: "bank" });
      this.bankList = bankList;
      const { data: provinceList } = await province();
      this.provinceList = provinceList;
      await this.getShopSign();
      this.selectMyBank();
    },
    getValue(bankName) {
      // this.formSign.bankName = bankName;
      this.$set(this.formSign, "bankName", bankName);
    },
    // 获取商城是否认证通过
    async getShopCertificationInfo() {
      let params = {
        shopId: this.shopId,
      };
      const res = await getShopCertificationInfo(params);
      console.log("🌮[res]:", res);
      if (res.data && res.data.status == 1) {
        this.license = res.data.license;
        this.formSign.licenseName =
          this.mainInfoTypeList.find((item) => item.type == this.license)?.name ?? "";

        let arr = this.bankAccountTypeList.filter((item) => {
          return item.license == this.license;
        });
        this.bankAccountTypeList = arr.length > 0 ? arr : this.bankAccountTypeList;
        this.getInfo();
      } else {
        uni.showModal({
          title: "提示",
          content: "未开通商城认证,请先开通商城！",
          showCancel: false,
          success: (res) => {
            redirectTo("/subShopMessage/pages/index.vue", {}, "navigateBack");
          },
        });
      }
    },
    // 获取签约信息
    async getShopSign() {
      try {
        const { data } = await getShopSign({ shopId: this.shopId });
        if (data == null) {
          uni.$u.toast(res.data.msg);
        } else {
          if (data.bankAddressCode) {
            this.provinceCode = data.bankAddressCode.slice(0, 2) + "0000";
            let provinceIndex = this.provinceList.findIndex(
              (v) => v.code === this.provinceCode
            );
            let provinceName = this.provinceList[provinceIndex].name;
            this.$set(this.formView, "provinceCodeName", provinceName);
            await this.getCityList(this.provinceCode);
            let cityIndex = this.cityList.findIndex(
              (v) => v.code === data.bankAddressCode
            );
            let cityName = this.cityList[cityIndex].name;
            this.$set(this.formView, "bankAddressCodeName", cityName);
          }
          this.formSign = data;
        }
      } catch {
      } finally {
      }
    },
    async selectMyBank() {
      const { data } = await selectMyBank({ shopId: this.shopId });
      this.$set(this.formSign, "accountNumber", data.accountNumber);
    },
    cancelEvent() {
      this.pickerShow = false;
    },
    confirmEvent(val) {
      let type = this.type;
      if (type == "accountBank") {
        this.formSign[type] = val.value[0].dicName;
      } else if (type == "provinceCode") {
        this.getCityList(val.value[0].code);
        this.formSign[type] = val.value[0].code;
        this.formView[`${type}Name`] = val.value[0].name;
      } else if (type == "bankAddressCode") {
        this.formSign[type] = val.value[0].code;
        this.formView[`${type}Name`] = val.value[0].name;
      }
      this.pickerShow = false;
    },
    async getCityList(dataCode) {
      let code = dataCode.substring(0, 6);
      const { data } = await cityList(code);
      this.cityList = data;
      this.$set(this.formSign, "bankAddressCode", "");
      this.$set(this.formView, "bankAddressCodeName", "");
    },
    async pickerShowClick(type) {
      if (type == "provinceCode") {
        this.listPicker = [this.provinceList];
        this.keyName = "name";
      }
      if (type == "bankAddressCode") {
        this.listPicker = [this.cityList];
        this.keyName = "name";
      }
      if (type == "accountBank") {
        this.listPicker = [this.bankList];
        this.keyName = "dicName";
      }
      this.type = type;
      this.pickerShow = true;
    },
    toBankList() {
      uni.navigateTo({
        url: "/subWechatSign/pages/bankList",
      });
    },
    submit() {
      this.$refs.formSign
        .validate()
        .then(async (res) => {
          let params = {
            accountType: this.formSign.bankAccountType,
            accountBank: this.formSign.accountBank,
            bankAddressCode: this.formSign.bankAddressCode,
            bankName:
              this.formSign.bankName && this.formSign.accountBank == "其他银行"
                ? this.formSign.bankName
                : null,
            accountNumber: this.formSign.accountNumber,
            shopId: this.shopId,
            bankAccountType: "",
          };

          const { data } = await updateMyBank(params);
          if (data) {
            uni.$u.toast("修改成功！");
          }
        })
        .catch((err) => {
          uni.showToast({
            title: "请检查填写是否完整",
            icon: "none",
            duration: 3000,
          });
        });
    },
    // #ifdef MP-WEIXIN
    async businessSuccess(e) {
      let data = e.ocrData.detail;
      this.formSign.accountNumber = data.number.text;
    },
    // #endif
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .u-form-item__body {
    min-height: 110rpx;
  }

  .u-input {
    background-color: #fff !important;
  }

  .u-textarea {
    text-align: right;
    font-size: 32rpx !important;
    color: #000 !important;
  }

  .u-tabbar__content {
    display: flex;
    justify-content: center;
  }

  .u-tabbar__content__item-wrapper {
    height: 100rpx !important;
  }

  .u-tabbar-item {
    background-color: $blue;

    .u-tabbar-item__text {
      font-size: 36rpx;
      color: #fff !important;
    }
  }

  .u-picker__view__column__item {
    line-height: 68rpx !important;
  }
}

.shop-info-box {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  padding-bottom: 10px;
  .tips {
    font-size: 12px;
    text-align: left;
    color: #f49d63;
  }
  &-form-box {
    width: 100%;
    @include padding(24rpx);

    .shop-info-box-form {
      width: 100%;
      background-color: #fff;
      // @include padding(0 0 0 25rpx);

      /deep/ {
        .u-upload__deletable__icon {
          text {
            font-size: 20rpx !important;
            line-height: 20rpx !important;
          }
        }

        .u-form-item__body {
          @include padding(10rpx 40rpx 10rpx 30rpx);
        }

        .u-form-item__body__left {
          width: 35% !important;
          // text-align: center;
        }

        .u-form-item__body__left__content__ {
          left: -20rpx;
          font-size: 30rpx;
        }

        .u-form-item__body__left__content__label {
          font-size: 32rpx;
        }

        .u-form-item__body__right__message {
          @include padding(0 30rpx);
          text-align: right;
        }

        .u-input__content__field-wrapper {
          input {
            font-size: 32rpx !important;
            text-align: right !important;
            color: #2a2f36 !important;
          }
        }
      }
    }
  }
}
</style>
