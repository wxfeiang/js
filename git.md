# git 配置部分

1. 配置ssh-key （邮箱最好与远端的保持一致）

```
ssh-keygen -t rsa -C '你的邮箱'
```
2. 配置邮箱，用户名
```
git config --global user.name "姓名"
git config --global user.email "邮箱"

```


通过git stash将工作区恢复到上次提交的内容，
同时备份本地所做的修改，之后就可以正常git pull了，git pull完成后，
执行git stash pop将之前本地做的修改应用到当前工作区。


git stash
git pull
git stash pop

克隆远程仓库并重命名

git clone url dir

------ tags
把本地tag推送到远程
git push --tags

获取远程tag
git fetch origin tag < tagname>

    2.查看标签
    查看本地某个 tag 的详细信息：

    git show < tagName>

        查看本地所有 tag：

        git tag 或者 git tag -l

        查看远程所有 tag：

        git ls-remote --tags origin

        3.删除标签
        本地 tag 的删除：

        git tag -d < tagName>

            远程 tag 的删除：

            git push origin :< tagName>

                4.检出标签
                git checkout -b < branchName>
                    < tagName>


                        ------------------
                        5. git 删除后紧急操作
                        查看提交日志 ： git log

                        回退某次版本 git reset --hard XXX (XXXX 对应的指针)

                        git push --force 本地会退 后 强制更新远程库


                        ——————————————————————————————————————————————————————————————————————————
                        分支相关命令
                        git branch 查看本地分支；
                        git branch -r 查看远程分支；
                        git branch -a 查看本地和远程分支；
                        git branch -d branchName 删除本地分支；
                        git branch -d -r branchName 删除远程分支；
                        git branch -D branchName 强制删除branchName分支；
                        git branch -v s 查看本地分支信息；
                        git branch -vv 查看更多本地分支信息；
                        git branch -av 查看所有分支信息；
                        git branch -m oldbranch newbranch 重命名分支；
                        git branch -M oldbranch newbranch 强制重命名分支（如果newbranch分支已存在，那么采用-M强制重命名为newbranch）


                        ————————————————
                        git checkout -- * 撤销上次提交后的所有修改


                        删除远程分支: git push origin --delete [branchname]
                        提交分支到远程分支: git push origin branch:branch // 每次都会输入

                        git push -u origin branch (远程分支名)， 首次提交分支 一直提交当前分支
                        ------

                        更新 分支
                        git pull --rebase origin master


                        // git 2.28 版本以上配和 github 修改主分支 为 main

                        // 配置本地初始化为 main
                        git config --global init.defaultBranch main


                        //修改已创建项目的主分支为main
                        //切换到主分支master

                        使用 git branch -M main 命令, 把当前master分支改名为main, 其中-M的意思是移动或者重命名当前分支

                        // git 合并分支 单文件
                        1 git checkout master 切换到当前分支

                        2 git checkout --patch 来源分支名称 文件路径（比如/app/view/activity.java）

                        3 git checkout dev 切换分支 （dev 也可以是远程分支）

                        ---- mac git提交失败

                        Host wxfeiang
                        HostName 47.99.93.97
                        port 22
                        User root
                        IdentityFile ~/.ssh/wxfeiang
                        Host github.com
                        port 443 # 默认是22端口
                        HostName ssh.github.com
                        IdentityFile ~/.ssh/id_rsa
                        ServerAliveInterval 60
                        ServerAliveCountMax 60

                        git修改远程仓库地址
                        方法有三种：
                        1.修改命令
                        git remote origin set-url [url]

                        2.先删后加（这种操作不会保持历史记录）
                        git remote rm origin
                        git remote add origin [url]

                        3.直接修改config文件(打开.git文件夹找到config文件，替换远程地址)

                        ----- 多个KEY 时候
                        已经添加好了Key


                        尝试 git https 克隆 （需要用户名和密码）

                        配置本项目 的用户名和 邮箱

                        切换 远程地址


                        未commit操作时
                        写了一天的代码准备提交了，忽然发现写在了错误的分支上，what？！怎么在不让别人发现情况下，悄悄把这些修改转移到正确的分支上去呢？
                        例如需要在dev分支上开发，现在代码全都写在了test分支上，
                        首先把所有修改都git add进暂存区，先不要git commit，然后：

                        git stash //把暂存区内的修改存储起来
                        git checkout dev //切换到正确的分支
                        git stash pop //将存储的修改取出来

                        就可以继续愉快的开发啦~

                        已commit操作时
                        如果已经commit了呢？

                        git reset HEAD^ // 撤回到刚刚commit之前的状态



                        # 建议不要用 cnpm 安装 可以通过如下操作解决 npm 下载速度慢的问题
                        npm install --registry=https://registry.npm.taobao.org