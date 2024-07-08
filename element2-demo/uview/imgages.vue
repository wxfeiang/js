<template>
  <u--image
    :showLoading="true"
    :src="imgurl"
    :width="width"
    :height="height"
    :privacyUpload="privacyUpload"
  >
  </u--image>
</template>
<script>
import { getprifileImg } from "@/utils/imgUrl.js";
export default {
  props: {
    // ocr 展位信息
    width: {
      type: [String, Number],
      default: "250px",
    },
    height: {
      type: [String, Number],
      default: "120px",
    },
    privacyUpload: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
    },
  },
  data() {
    return {
      imgurl: "",
    };
  },
  methods: {
    getUrl(url) {
      console.log("🍛[url]=====:", url);
      if (this.privacyUpload) {
        getprifileImg({ path: url })
          .then((res) => {
            this.imgurl = res;
          })
          .catch((err) => {
            this.imgurl =
              "https://img.mp.itc.cn/upload/20160728/6b6f991fcfb74774a102db03e27cbfe1_th.jpg";
          });
      } else {
        console.log("🍾");
        this.imgurl = url;
        console.log("🥛[ this.imgurl]:", this.imgurl);
      }
    },
  },
  created() {
    console.log("🍦", this.src);
    this.getUrl(this.src);
  },
};
</script>
<style lang="scss" scoped></style>
