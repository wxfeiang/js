<!--
 * @Author: wxfeiang
 * @Description: 
 * @Date: 2023-04-15 17:41:34
 * @LastEditTime: 2023-04-15 17:41:37
 * @FilePath: /js/githubApi.md
-->
api地址    请求方式    请求参数    返回参数  
  
获取用户信息    https://api.github.com/users/    get    path路径： 用户名    一个用户对象  
  
获取用户所有仓库    https://api.github.com/users/{用户名}/repos    get    path路径： 用户名    返回一个数组  
  
获取某个仓库的详细信息    https://api.github.com/repos/{用户名}/{仓库名}    get    path路径： 用户名 和 仓库名    返回一个仓库对象  
  
获取某个仓库里根目录文件或文件夹数组    https://api.github.com/repos//{用户名}/{仓库名}/contents    get    path路径： 用户名 和 仓库名    返回一个首层文件或文件夹数组  
  
获取某个仓库里子目录文件或文件夹数组    https://api.github.com/repos//{用户名}/{仓库名}/contents/{文件名或文件夹名}    get    path路径： 用户名 和 仓库名和文件名或文件夹名    返回一个文件数组  
  
获取某文件的原始内容（Raw）    1. 通过上面的文件信息中提取download_url这条链接，就能获取它的原始内容了。2. 或者直接访问：https://raw.githubusercontent.com/{用户名}/{仓库名}/{分支名}/{文件路径}    get    path路径： 用户名 和 仓库名和文件l路径    返回一个文件内容的字符串  
  
获取某个用户的跟随者列表    https://api.github.com/users/{用户名}/followers    get    path路径： 用户返回一个数组  
  
获取某个用户正在关注谁列表    https://api.github.com/users/{用户名}}/following    get    path路径： 用户名    返回一个数组  
  
获取某个用户加入的组织列表    https://api.github.com/users/{用户名}/orgs    get    path路径： 用户名    返回一个数组repo中所有的commits列表    https://api.github.com/repos/{用户名}/{仓库名}/commits    get    -