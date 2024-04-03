# Docker

## 记一次Docker安装部署

### Docker 安装

```bash

# 查看当前的内核版本
uname -r

# 卸载旧版本（如果之前安装过的话）
yum remove docker \

# 查看可用版本有哪些(我跳过了)
yum list docker-ce --showduplicates | sort -r

# yum安装
yum install -y docker

# 启动 Docker 并设置开机自启(实际安装完了就启动了)
systemctl start docker
systemctl enable docker

# 测试docker是否安装成功
docker version


# 添加添加阿里云镜像（我直接mkdir 然后vim文件写内容了）
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://yqre8ban.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

# 测试 Docker 是否安装正常
docker run hello-world

```
> docker 镜像源
```
网易：http://hub-mirror.c.163.com
中科大镜像地址：http://mirrors.ustc.edu.cn/
中科大github地址：https://github.com/ustclug/mirrorrequest
Azure中国镜像地址：http://mirror.azure.cn/
Azure中国github地址：https://github.com/Azure/container-service-for-azure-china
DockerHub镜像仓库: https://hub.docker.com/ 
阿里云镜像仓库： https://cr.console.aliyun.com 
google镜像仓库： https://console.cloud.google.com/gcr/images/google-containers/GLOBAL （如果你本地可以翻墙的话是可以连上去的 ）
coreos镜像仓库： https://quay.io/repository/ 
RedHat镜像仓库： https://access.redhat.com/containers
```
### Docker 安装运行环境
> docker部署MySQL

```bash
# 首先从 docker.hub 中根据各自的需求 pull 对应的 mysql 镜像
docker pull mysql:5.7.24
# 由于 mysql 是用来存数据的，数据无论什么情况都不能丢失
# 所以数据存在容器外部，通过映射操作，映射到容器内部
# 将宿主机的路径，映射到容器内部。这个路径既可以是文件夹，也可以是文件
-v hostPath:containerPath

# 假设在宿主机中数据存放路径为/opt/mysql/data,配置文件路径为：/opt/mysql/my.cnf
docker run --name=mysql -itd -p 3308:3306 -v /etc/localtime:/etc/localtime -v /etc/timezone:/etc/timezone -v /opt/mysql/data:/var/lib/mysql -v /opt/mysql/my.cnf:/etc/mysql/my.cnf -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7.25

docker run -p 3306:3306 --name mysql --restart=always --privileged=true \
-v /root/mysql/log:/var/log/mysql \
-v /root/mysql/data:/var/lib/mysql \
-v /root/mysql/conf:/etc/mysql \
-v /etc/localtime:/etc/localtime:ro \
-e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7.24

# docker运行MySQL容器
docker run -itd -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mysql  mysql:5.7.24
# 进入MySQL容器测试
docker exec -it mysql bash

mysql -uroot -p 
123456
# 成功！


```
### Docker命令
```bash
#移除container
docker rm xxx
#移除image
docker rmi xxx
#查看镜像
docker images
# 查看正在运行(所有的)的container
docker ps (-a)
# 结束container
docker kill

```
#### docker run选项说明，

```bash
# run
docker run
--privileged=true # 赋予容器几乎与主机相同的权限
--restart=always # 详见Docker的重启策略docker run 的 --restart 参数说明
-a #stdin: 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项；
-d: #后台运行容器，并返回容器ID；
-i: #以交互模式运行容器，通常与 -t 同时使用；
-P: #随机端口映射，容器内部端口随机映射到主机的端口
-p: #指定端口映射，格式为：主机(宿主)端口:容器端口
-t: #为容器重新分配一个伪输入终端，通常与 -i 同时使用；
--dns 8.8.8.8 #指定容器使用的DNS服务器，默认和宿主一致；
--dns-search example.com #指定容器DNS搜索域名，默认和宿主一致；
-h "mars" #指定容器的hostname；
-e username="ritchie" # 设置环境变量；
--env-file=[] # 从指定文件读入环境变量；
--cpuset="0-2" or --cpuset="0,1,2" # 绑定容器到指定CPU运行；
-m #设置容器使用内存最大值；
--net="bridge" # 指定容器的网络连接类型，支持 bridge/host/none/container 四种类型；
--link=[] # 添加链接到另一个容器；
--expose=[] # 开放一个端口或一组端口；
--volume , -v # 绑定一个卷
```


#### Docker exec 命令
> OPTIONS说明：

- -d :分离模式: 在后台运行

- -i :即使没有附加也保持STDIN 打开

- -t :分配一个伪终端

实例
```bash
#在容器 my 中以交互模式执行容器内 /root/util.sh 脚本:
 docker exec -it my /bin/sh /root/util.sh
# 进入容器
docker exec -it mysql bash
```

### Docker 配置
#### 修改docker的端口映射
1，删除重新创建images
2，修改配置

```bash 
#首先关闭docker
systemctl stop docker
#进入docker目录
cd /var/lib/docker/containers
# 然后我们在ls查看一下容器，找我们想要修改的容器ID
# 修改配置
vi 容器ID hostconfig.json
#文件中其中有一项是PortBindings，其中8080/tcp对应的是容器内部的8080端口，HostPort对应的是映射到宿主机的端口8989。8361/tcp对应的是容器内部的8361端口，HostPort对应的是映射到宿主机的端口9999，按需修改端口

#
vi 容器ID /config.v2.json 

```


### Docker 容器的重启策略
>为了保证容器运行时健壮性（自愈），Docker 提供了容器重启策略，即使用参数 --restart，它可以让容器在退出时自动尝试重启。

 Docker 容器的自动重启是由 Docker 守护进程完成的。在较老版本 Docker 中，如果 docker 守护进程重启，容器会全部挂掉。新版本 Docker 中，允许设置，当 docker 守护进程重启，容器不受影响。该场景比较多见，例如修改了 docker 的配置而需要重新加载 docker 守护进程，如果 docker 容器重启，业务会短暂中断，尤其是在生产环境这是不可接受的。所以这个设置很有必要。
```bash

#具体设置方法有两种：
# 第一种，编辑 /etc/docker/daemon.json，添加 "live-restore": true ：
{
    "live-restore": true,
}

# 第二种，命令启用\
dockerd --live-restore systemd
```

Docker 容器的重启策略具体如下：

- no
默认策略，在容器退出时不重启容器。启动容器时不添加参数 --restart 即可。
- on-failure
在容器非正常退出时（退出状态非0），才会重启容器。
- on-failure:n
在容器非正常退出时重启容器，并且指定重启次数。n 为正整数。如果不指定次数，则会一直重启。
- always
只要容器退出就重启容器。
- unless-stopped
在容器退出时总是重启容器，但是 Docker 守护进程启动之前就已经停止运行的容器不算在内。

> docker run 的 --restart 参数说明

- --restart 选项通常只用于 detached 模式的容器。
- detached 即后台运行模式（类比 Linux 命令的前台运行和后台运行）。Docker容器的两种运行模式：Foreground，Detached。docker run 时添加了 -d 或者 -d=true 参数，就是后台模式运行。
- --restart 选项不能与 --rm 选项同时使用。
因为 --rm 选项只适用于 foreground 模式的容器。
- **在 docker ps 查看容器时，对于使用了 --restart 选项的容器，其状态只有 Up 或 Restarting 两种状态。**

--restart 参数中的其他设定
- 关于时间策略的设定：
- - 前 5 次时间间隔为 1 秒
- - 第 6 次开始时间间隔为之前的 2 倍。
--  直到时间间隔超过 1 分钟时，后续的每一次重启的时间间隔都固定为 1 分钟。
- 关于 --restart 策略失效的设定：
- - 当执行容器 stop 时， --restart 失效，容器不再尝试重启。实验中，重启日志一直停留在“2022/03/30 04:04:39”。