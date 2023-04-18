<!--
 * @Author: wxfeiang
 * @Description: 
 * @Date: 2023-02-19 10:23:10
 * @LastEditTime: 2023-04-12 22:32:53
 * @FilePath: /js/npm.md
-->
## 查看自己全局安装的包

```
  npm list -g --depth 0  //加上层级控制显示深度

   npm ls -g

   https://blog.csdn.net/qq_41664096/article/details/121797260

```


## 卸载 全局包
·```
npm install -g  pack
```


查看所有创建的全局链接名称
npm ls --global --depth 0



强制解除创建的某个特定全局链接
sudo npm rm --global packageName