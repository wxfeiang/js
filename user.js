import { getDot, getEncryptConf, getInfo, getResponseConfig, login } from '@/api/login';
import { getMenu, getPrimaryMenu } from '@/api/system/menu';
import router from '@/router';
import { getMenuId, getMenuName, getToken, removeToken, setMenuId, setMenuName } from '@/utils/auth';
import Cookies from "js-cookie";
let resArr = []
const user = {
  state: {
    token: getToken(),
    user: {},
    roles: [],
    name: '',
    menu: [],
    permissions: [],
    secondMenu: [],
    // 第一次加载菜单时用到
    loadMenus: false,
    secondTopMenu: '',
    menuPath: ['/'],
    userMsg: {},
    str: '',
    strppd: '',
    filterData: {},
    resstrppd: '',
    aesresppd: '',
    resAlt: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_MENU(state, menu) {
      state.menu = menu
    },
    SET_USER(state, user) {
      state.userMsg = user
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_SECOND_MENU: (state, secondMenu) => {
      state.secondMenu = secondMenu
    },
    SET_MENU_PATH: (state, menuPath) => {
      state.menuPath = menuPath
    },
    SET_SECOND_TOP_MENU: (state, secondTopMenu) => {
      state.secondTopMenu = secondTopMenu
    },
    SET_STR: (state, str) => {
      state.str = str
    },
    SET_STRPPD: (state, strppd) => {
      state.strppd = strppd
    },
    SET_FILTER: (state, filterData) => {
      state.filterData = filterData
    },
    SET_RESSTRPPD: (state, resstrppd) => {
      state.resstrppd = resstrppd
    },
    SET_AESRESPPD: (state, aesresppd) => {
      state.aesresppd = aesresppd
    },
    SET_RESALT: (state, resAlt) => {
      state.resAlt = resAlt
    },

  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.un.trim(), userInfo.pw, userInfo.cd, Cookies.get("flag"), userInfo.tp, userInfo.pcd).then(res => {
          commit('SET_NAME', userInfo.un.trim())
          commit('SET_TOKEN', getToken())
          // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
          commit('SET_LOAD_MENUS', true)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetEncryptConf({ commit, state }) {
      return new Promise((resolve, reject) => {
        getEncryptConf().then(obj => {
          commit('SET_FILTER', obj.data)
          resolve(obj)
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetstrPPD({ commit }) {
      return new Promise((resolve, reject) => {
        getDot({ 'appkey': 'test' }).then(res => {
          commit('SET_STRPPD', res.data)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetResPPD({ commit }) {
      return new Promise((resolve, reject) => {
        getResponseConfig({ 'appkey': 'test' }).then(res => {
          commit('SET_RESSTRPPD', res.data.priK)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    async getAesRes({ commit }, data) {
      console.log("data", data.responseK)
      commit('SET_AESRESPPD', data.responseK)
    },
    Getstr({ commit }) {
      return new Promise((resolve, reject) => {
        getDot({ appkey: 'test' }).then(res => {
          commit('SET_STR', res.data)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取菜单信息
    GetPrimaryMenu({ commit, state }) {
      return new Promise((resolve, reject) => {
        getPrimaryMenu().then(res => {
          commit('SET_MENU', res.data)
          if (res.data.length > 0) {
            if (!getMenuId() || getMenuId() === 'null') {
              setMenuId(res.data[0].menuId)
            }
            if (!getMenuName() || getMenuName() === 'null') {
              setMenuName(res.data[0].menuName)
            }
          }
          // setUserInfo(['system:menu:add','system:menu:edit'],commit)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getSecondTopName({ commit }, menuName) {
      commit('SET_SECOND_TOP_MENU', menuName)
    },
    // 获取菜单
    GetNextMenu({ commit }, menuId) {
      if (menuId && menuId !== 'null') {
        return new Promise((resolve, reject) => {
          getMenu({ menuId, }).then(res => {
            console.log('🍍[res]: 获取到的菜单数据===', res);

            commit('SET_SECOND_MENU', res.data)
            resArr = []
            flatData(res.data)
            console.log('🍞', resArr);

            let data = res.data.map(element => {

              return element.path
            });
            commit('SET_MENU_PATH', data)

            if (res.data[0].path !== '/') {
              if (res.data[0].children.length > 0) {
                router.push({ path: res.data[0].children[0].path })
              } else {
                router.push({ path: res.data[0].path })
              }
            }
            // loadMenus(commit,res.data)
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      }
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          let userMsg = res.data
          setUserInfo(res.data.perms, commit)
          // type:0 管理员  type:1  商户
          let type = userMsg.type
          if (type === 1) {
            if (userMsg.shopName !== null) {
              userMsg.title = userMsg.shopName
            } else {
              userMsg.title = '翼云店'
            }
          } else {
            userMsg.title = '翼云店'
          }
          commit('SET_USER', userMsg)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })

    },
    // 登出
    LogOut({ commit, state }) {
      let type = user.state.userMsg.type
      console.log("type", type)
      if (Cookies.get("rememberMe") === undefined || Cookies.get("rememberMe") === null) {
        Cookies.remove("username")
      }
      logOut(commit)
      // type:0 管理员  type:1  商户
      router.push({ path: '/' })
    },
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     loginOut().finally(() => {
    //       logOut(commit)
    //       router.push({ path: '/' })
    //       // location.reload()
    //     }).catch(error => {
    //       reject(error)
    //       router.push({ path: '/' })
    //       // location.reload()
    //     })
    //   })
    // },
    updateLoadMenus({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_LOAD_MENUS', false)
      })
    }
  }
}

export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_PERMISSIONS', [])
  commit('SET_SECOND_MENU', [])
  commit('SET_MENU', [])
  commit('SET_SECOND_TOP_MENU', '')
  commit('SET_USER', {})
  Cookies.remove("usn");
  Cookies.remove("wpd");
  Cookies.remove("Admin-Token");
  Cookies.remove("JSESSIONID");
  Cookies.remove("_cfuvid");
  Cookies.remove("authorization");
  setMenuId(null)
  setMenuName(null)
  removeToken()
}

export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res.length === 0) {
    commit('SET_PERMISSIONS', ['ROLE_SYSTEM_DEFAULT'])
  } else {
    commit('SET_PERMISSIONS', res)
  }
}
function flatData(arr) {
  arr.forEach((item) => {
    resArr.push({
      path: item.path,
      component: (resolve) => require([`@/views/${item.component}`], resolve),
      name: item.menuName,
      meta: { title: item.menuName, icon: item.icon, noCache: true, affix: true }
    })
    item.children != null && item.children && item.children.length ? flatData(item.children) : ''
    delete item.children
  })
}



export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default user
