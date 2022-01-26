## 查看端口
`
netstat -ntlp  

`

## 结束占用的端口  pid 
`
kill -9 编号

`

## 80被占用的情况
`
netstat -lnp|grep 80

`
## 常见参数
`
-a (all)显示所有选项，默认不显示LISTEN相关
-t (tcp)仅显示tcp相关选项
-u (udp)仅显示udp相关选项
-n 拒绝显示别名，能显示数字的全部转化成数字。
-l 仅列出有在 Listen (监听) 的服務状态

-p 显示建立相关链接的程序名
-r 显示路由信息，路由表
-e 显示扩展信息，例如uid等
-s 按各个协议进行统计
-c 每隔一个固定时间，执行该netstat命令。

提示：LISTEN和LISTENING的状态只有用-a或者-l才能看到
`
##  首先查看防火墙状态
`
firewall-cmd --state

`
##  首先查看防火墙状态
`
firewall-cmd --state

runing / not runing

`
## 开启防火墙
`
systemctl start firewalld.service
`

## 设置开机自启
`
systemctl enable firewalld.service

`

## 重启防火墙
`
systemctl restart firewalld.service
`
## 查看防火墙设置开机自启是否成功
`
systemctl is-enabled firewalld.service;echo $?

`
# 开启特定端口
* 
## 添加端口 
`
firewall-cmd --zone=public --add-port=80/tcp --permanent （--permanent永久生效，没有此参数重启后失效）


如果要添加其他端口号，请修改80端口号之后重复执行命令，如：firewall-cmd --zone=public --add-port=3306/tcp --permanent

批量添加端口（添加端口1000到2000之间的所有）
firewall-cmd --zone=public --add-port=1000-2000/tcp --permanent
 --zone #作用域 --add-port=80/tcp #添加端口，格式为：端口/通讯协议 --permanent #永久生效，没有此参数重启后失效 

`

## 重新载入
`
firewall-cmd --reload
`
## 产看
`
firewall-cmd --zone=public --query-port=80/tcp
`
##  关闭防火墙
`
systemctl stop firewalld.service
`

## 查看开启的所有端口
`
firewall-cmd --list-ports
`

Mac 电脑查看 占用端口
lsof -i 
lsof -i:端口号
kill -9 端口 杀死


##  nginx  

`
nginx -t   检查 配置文件是否有问题

netstat -tnlp   端口是否被占用

ps -aux | grep nginx   检查是否已经启动

pkill -9 nginx      结束进程

systemctl  restart nginx      重启nginx


`
