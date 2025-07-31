<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const previewImage = ref(""); // 预览图片路径
const cameraObj = ref(null); // 相机对象
const cameraPreview = ref(null); // 相机预览层
const flashMode = ref("off"); // 闪光灯模式：on/off/auto

// 初始化相机
const initCamera = async () => {
  try {
    // 请求相机权限
    const hasPermission = await checkCameraPermission();
    if (!hasPermission) return;

    // 创建相机对象
    cameraObj.value = plus.camera.getCamera();

    // 设置相机参数
    cameraObj.value.flash = flashMode.value; // 闪光灯模式
    cameraObj.value.facing = "back"; // 默认后置摄像头

    // 创建预览层
    const cameraStyles = {
      top: "0px",
      left: "0px",
      width: "100%",
      height: "100vh",
      position: "fixed",
    };
    cameraPreview.value = new plus.camera.CameraPreview(cameraObj.value, cameraStyles);
    cameraPreview.value.start();
  } catch (error) {
    console.error("相机初始化失败:", error);
    uni.showToast({ title: "相机初始化失败", icon: "none" });
  }
};

// 检查相机权限
const checkCameraPermission = async () => {
  return new Promise((resolve) => {
    plus.android.requestPermissions(
      ["android.permission.CAMERA"],
      (e) => resolve(e.denied.length === 0),
      (err) => {
        console.error(err);
        resolve(false);
      }
    );
  });
};

// 拍照
const takePhoto = async () => {
  try {
    const filePath = `_doc/camera_${Date.now()}.jpg`;
    await new Promise((resolve, reject) => {
      cameraObj.value.captureImage(
        (path) => resolve(path),
        (err) => reject(err),
        { filename: filePath }
      );
    });
    previewImage.value = filePath;
  } catch (error) {
    console.error("拍照失败:", error);
    uni.showToast({ title: "拍照失败", icon: "none" });
  }
};

// 切换闪光灯
const toggleFlash = () => {
  const modes = ["off", "on", "auto"];
  const currentIdx = modes.indexOf(flashMode.value);
  flashMode.value = modes[(currentIdx + 1) % 3];
  if (cameraObj.value) cameraObj.value.flash = flashMode.value;
};

// 切换摄像头
const switchCamera = () => {
  if (cameraObj.value) {
    cameraObj.value.facing = cameraObj.value.facing === "back" ? "front" : "back";
  }
};

// 释放相机资源
const releaseCamera = () => {
  if (cameraPreview.value) {
    cameraPreview.value.close();
    cameraPreview.value = null;
  }
  if (cameraObj.value) {
    cameraObj.value = null;
  }
};

onMounted(initCamera);
onUnmounted(releaseCamera);
</script>

<template>
  <view class="camera-container">
    <!-- 相机预览层（由 Native.js 渲染） -->

    <!-- 控制按钮 -->
    <view class="controls">
      <button @click="switchCamera" class="btn">切换摄像头</button>
      <button @click="takePhoto" class="btn btn-primary">拍照</button>
      <button @click="toggleFlash" class="btn">闪光灯: {{ flashMode }}</button>
    </view>

    <!-- 照片预览 -->
    <image v-if="previewImage" :src="previewImage" class="preview-image" />
  </view>
</template>

<style scoped>
.camera-container {
  position: relative;
  height: 100vh;
}

.controls {
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
}

.btn {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px 15px;
  border-radius: 20px;
}

.btn-primary {
  background: #007aff;
}

.preview-image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  background: black;
}
</style>
