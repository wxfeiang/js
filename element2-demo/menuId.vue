<template>
  <el-menu :default-active="activeMenu" mode="horizontal" @select="handleSelect">
    <template v-for="(item, index) in topMenus">
      <el-menu-item :index="item.menuModal" :key="index">
        {{ item.menuName }}
      </el-menu-item>
    </template>

    <!-- 顶部菜单超出数量折叠 -->
    <!-- <el-submenu index="more" v-if="topMenus.length > visibleNumber">
        <template slot="title">更多菜单</template>
        <template v-for="(item, index) in topMenus">
          <el-menu-item :index="item.menuModal" :key="index" v-if="index >= visibleNumber">
            {{ item.menuName }}
          </el-menu-item>
        </template>
      </el-submenu> -->
  </el-menu>
</template>

<script>
import { constantRoutes } from "@/router";
import { mapState } from "vuex";

// 隐藏侧边栏路由
const hideList = ["/index"];

export default {
  data() {
    return {
      // 顶部栏初始数
      visibleNumber: 6,
      // 当前激活菜单的 index
      currentIndex: undefined,
      topMenus: [],
      treebind: [],
    };
  },
  computed: {
    ...mapState(["settings", "user"]),
    theme() {
      return this.$store.state.settings.theme;
    },
    // 所有的路由信息
    routers() {
      return this.user.menu;
    },
    // 顶部显示菜单
    // topMenus() {
    //   let topMenus = [];
    //   console.log("🌽", this.routers);
    //   this.routers.map((menu) => {
    //     if (menu.hidden !== true) {
    //       // 兼容顶部栏一级菜单内部跳转
    //       if (menu.menuModal === "/") {
    //         topMenus.push(menu.childMenus[0]);
    //       } else {
    //         topMenus.push(menu);
    //       }
    //     }
    //   });
    //   console.log("🥒", topMenus);
    //   return topMenus;
    // },

    // 设置子路由
    childrenMenus() {
      var childrenMenus = [];
      this.routers.map((router) => {
        for (var item in router.childMenus) {
          if (router.childMenus[item].menuPid === 0) {
            if (router.menuModal === "/") {
              router.childMenus[item].menuModal = "/" + router.childMenus[item].menuModal;
            } else {
              if (!this.ishttp(router.childMenus[item].menuModal)) {
                router.childMenus[item].menuModal =
                  router.menuModal + "/" + router.childMenus[item].menuModal;
              }
            }
            router.childMenus[item].parentPath = router.menuModal;
          }
          childrenMenus.push(router.childMenus[item]);
        }
      });
      let child = constantRoutes.concat(childrenMenus);
      this.flatData(child, "childMenus");
      return child;
    },
    // 默认激活的菜单
    activeMenu() {
      console.log("🍌", this.$route);
      const path = this.$route.path;
      let activePath = path;
      this.activeRoutes(activePath);
      let apath = this.goCurrentMenu(activePath).menuModal ?? "/index";
      console.log("🥪[apath]:", apath);

      return apath;
      // return activePath;
    },
  },
  created() {
    let topMenus = [];

    this.routers.map((menu) => {
      if (menu.hidden !== true) {
        if (menu?.childMenus.length > 0) {
          menu.menuModal = menu.childMenus[0].menuModal;
          topMenus.push(menu);
        } else {
          topMenus.push(menu);
        }
      }
    });
    this.topMenus = topMenus;
  },
  beforeMount() {
    window.addEventListener("resize", this.setVisibleNumber);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setVisibleNumber);
  },
  mounted() {
    this.setVisibleNumber();
  },
  methods: {
    // 根据宽度计算设置显示栏数
    setVisibleNumber() {
      const width = document.body.getBoundingClientRect().width / 3;
      this.visibleNumber = parseInt(width / 85);
    },
    // 菜单选择事件
    handleSelect(key, keyPath) {
      console.log("🍠[key]:", key, keyPath);
      this.currentIndex = key;
      const route = this.routers.find((item) => item.menuModal === key);
      if (this.ishttp(key)) {
        // http(s):// 路径新窗口打开
        window.open(key, "_blank");
      } else {
        this.activeRoutes(key);
        this.$store.dispatch("app/toggleSideBarHide", false);
      }
    },
    // 当前激活的路由
    activeRoutes(key) {
      console.log("🍈", key);
      var routes = [];
      if (key === "/" || key === "/index") {
        key === "/index";
        routes = this.topMenus.filter((item) => item.menuModal === key);
      } else {
        if (this?.childrenMenus.length > 0) {
          routes = this.goCurrentMenu(key).childMenus;
        }
      }

      if (routes.length > 0) {
        this.$store.commit("SET_SIDEBAR_ROUTERS", routes);
      }
    },
    ishttp(url) {
      return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
    },
    goCurrentMenu(key) {
      console.log("🍗[key]:", key);
      let routes = [];
      this.treebind.forEach((item) => {
        if (item?.menuModal && item.menuModal === key) {
          console.log("🍰", item);
          if (item.menuPid !== 0 && item?.childMenus?.length > 0) {
            console.log("🍯", item);
            // 递归
            const a = this.getAllParentNodes(
              this.topMenus,
              item.menuPid,
              "childMenus",
              "menuId"
            );
            console.log("🥡[ a]:", a);
          } else {
            routes = this.topMenus.find((i) => {
              return i.menuId === item.menuPid;
            });
          }
        }
      });
      return routes;
    },

    getFirstMenu(key) {
      this.treebind.forEach((i) => {
        if (i.menuId === key) {
          if (i.menuPid !== 0) {
            console.log("🍵", i);
            cData = this.getFirstMenu(i.menuPid);
          } else {
            cData = i;
          }
        }
      });
      return cData;
    },
    getAllParentNodes(list, id, children, resourcesId) {
      for (let i in list) {
        if (list[i][resourcesId] === id) {
          return [list[i]].filter((v) => v[resourcesId] !== id);
        }
        if (list[i][children]?.length > 0) {
          let node = this.getAllParentNodes(list[i][children], id, children, resourcesId);
          if (node) return node.concat(list[i]).filter((v) => v[resourcesId] !== id);
        }
      }
    },
    flatData(arr, children) {
      arr.forEach((item) => {
        this.treebind.push(item);
        item[children]?.length > 0 ? this.flatData(item[children], children) : "";
      });
    },
  },
};
</script>

<style lang="scss">
.topmenu-container.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 60px !important;
  line-height: 60px !important;
  color: #fff !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
  font-weight: 600;
}

.topmenu-container.el-menu--horizontal > .el-menu-item.is-active,
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  color: #fff !important;
  font-weight: bold !important;
  background: #124ed3 !important;
  border: none !important;
  font-size: 18px !important;
}

/* submenu item */
.topmenu-container.el-menu--horizontal > .el-submenu .el-submenu__title {
  float: left;
  height: 60px !important;
  line-height: 60px !important;
  color: #fff !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}
.topmenu-container.el-menu--horizontal
  > .el-menu--horizontal
  .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background: #124ed3 !important;
  border: none !important;
}

.el-menu {
  background-color: transparent !important;
  border: none !important;
}
</style>
