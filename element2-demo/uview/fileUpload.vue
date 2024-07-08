<!-- 图片上传 -->
<template>
  <view class="file-upload-box">
    <view v-if="privacyUpload" class="img_warp">
      <view v-for="(item, index) in fileList1" :key="index" class="img_box">
        <imgages
          :src="item.url"
          :width="width"
          :height="height"
          :privacyUpload="privacyUpload"
        >
        </imgages>
        <view class="img_del" @click="deletePic({ name: item.name, index: index })">
          X
        </view>
      </view>
    </view>

    <u-upload
      :previewFullImage="true"
      :width="width"
      :height="height"
      :fileList="fileList1"
      @afterRead="afterRead"
      @delete="deletePic"
      name="1"
      :multiple="multiple"
      :maxCount="maxCount"
      uploadIcon="plus"
    ></u-upload>
    <u-toast ref="uToastImg"></u-toast>
  </view>
</template>

<script>
import urlConfig from "@/api/config.js";
import upLoadUrls from "@/api/upLoadUrl.js";
import imgages from "@/components/imgages.vue";
import { getToken } from "@/utils/authToken.js";
import { mapGetters } from "vuex";
import { sign } from "../api/http";
export default {
  name: "fileUpload",
  components: {
    imgages,
  },
  props: {
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
    multiple: {
      type: Boolean,
      default: false,
    },
    //  上传文件类型
    fileType: {
      type: String,
    },
    fileList: {
      type: Array,
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
    fileList(val) {
      console.log("🥚[val]:", val);
      if (val && val.length > 0) {
        this.fileList1 = val;
      } else {
        this.fileList1 = [];
      }
    },
  },
  data() {
    return {
      fileList1: [
        {
          name: 1,
          url:
            "http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        },
        {
          name: 2,
          url:
            "http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280",
        },
      ],
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
          this.fileList1 = [];
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
      this.$emit("afterUpload", this.fileList1);
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
      console.log("🥤[event]:", event);
      this[`fileList${event.name}`].splice(event.index, 1);
      this.$emit("delUpload", this.fileList1);
      this.$emit("isUpLoadType", "", event.index, "del");
    },
    verifySuffix(fileName, fileType) {
      let suffix = this.fileType || `(png|jpg)`;
      let regular = new RegExp(`.*\.${suffix}`);
      return regular.test(fileName);
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
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10px;
}

.img_warp {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
}
.img_box {
  position: relative;
  overflow: hidden;
  background: #f5f5f5;
}
.img_del {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 18px;
  height: 18px;
  border-radius: 0 0 0 50%;
  color: #fff;
  background: #333;
  text-align: center;
  font-size: 12px;
}
</style>
