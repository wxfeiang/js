<!-- 图片上传 -->
<template>
  <view class="file-upload-box">
    <u-upload
      :previewFullImage="true"
      :width="width"
      :height="height"
      :fileList="fileList"
      @afterRead="afterRead"
      @delete="deletePic"
      :multiple="multiple"
      :maxCount="maxCount"
      uploadIcon="plus"
      :disabled="disabled"
    ></u-upload>
    <u-toast ref="uToastImg"></u-toast>
  </view>
</template>

<script>
import urlConfig from "@/api/config.js";
import upLoadUrls from "@/api/upLoadUrl.js";
import { getToken } from "@/utils/authToken.js";
import { mapGetters } from "vuex";
import { sign } from "../api/http";
export default {
  name: "fileUpload",
  props: {
    value: {
      type: [String, Object, Array],
      default: () => [],
    },
    width: {
      type: [String, Number],
      default: "150",
    },
    height: {
      type: [String, Number],
      default: "150",
    },
    maxCount: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    //  上传文件类型
    fileType: {
      type: String,
    },
    upLoadUrl: {
      type: String,
    },
    otherData: {
      type: Object,
      default: {},
    },
    privacyUpload: {
      // 隐私图片
      type: Boolean,
      default: false,
    },
    replace: {
      // 上传后返回地址处理
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["appId"]),
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(",");
          // 然后将数组转为对象数组
          this.fileList = list.map((item) => {
            if (typeof item === "string") {
              if (item.indexOf(this.baseUrl) === -1) {
                item = { name: this.baseUrl + item, url: this.baseUrl + item };
              } else {
                item = { name: item, url: item };
              }
            }
            return item;
          });
        } else {
          this.fileList = [];
          return [];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    // 图片读取成功 新增图片
    async afterRead(event, url1) {
      if (event.file[0].size / 1000 > 2048) {
        this.$refs.uToastImg.show({
          message: "图片大小不能超过2MB",
        });
        return;
      }

      // 判断图片类型
      let isFileType = this.verifySuffix(event.file[0].url, this.fileType);
      this.$emit("isUpLoadType", isFileType, event.index, "add");
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: "uploading",
          message: "上传中",
        });
      });
      for (let i = 0; i < lists.length; i++) {
        // 加载blob文件
        const result = await this.uploadFilePromise(lists[i]);

        if (!result.data) {
          this.$refs.uToastImg.show({
            message: result.msg || "上传失败",
          });
          this.fileList = [];
          return false;
        }

        let item = this[`fileList${event.name}`][fileListLen];

        this[`fileList${event.name}`].splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: "success",
            message: "",
            // 普通上传接口返回result.data、创建小程序上传图片接口返回imageUrl/media
            url: !this.replace
              ? result.data.replace("XXXXXX", upLoadUrls.imageBaseUrl)
              : result.data,

            media: result.data?.media || "",
          })
        );
        fileListLen++;
      }
      this.$emit("input", this.fileList);
    },
    uploadFilePromise(listsI) {
      return new Promise((resolve, reject) => {
        // 请求头
        let header = {
          Authorization: getToken(),
          sign: sign({ appkey: "app" }),
        };
        let curl = this.privacyUpload
          ? upLoadUrls.privacyUpload
          : this.upLoadUrl || upLoadUrls.upLoadUrl;
        uni.uploadFile({
          url: urlConfig.url + curl,
          filePath: listsI.url,
          name: "file",
          formData: {
            appId: this.appId,
            ...this.otherData,
          },
          header,
          success: (res) => {
            let result = JSON.parse(res.data);
            resolve(result);
          },
        });
      });
    },
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
      this.$emit("input", this.listToString(this.fileList));
    },
    verifySuffix(fileName, fileType) {
      let suffix = this.fileType || `(png|jpg)`;
      let regular = new RegExp(`.*\.${suffix}`);
      return regular.test(fileName);
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = "";
      separator = separator || ",";
      if (list && list.length > 0) {
        str = list
          .map((item) => {
            return item.url.replace(this.baseUrl, "XXXXXX");
          })
          .join(separator);
        return str;
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss">
::v-deep {
  .u-upload__button__text {
    font-size: 18rpx !important;
    // margin-top: 100rpx;
  }
}

.file-upload-box {
  width: 100%;
  height: 100%;
}
</style>
