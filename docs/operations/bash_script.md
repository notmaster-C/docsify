
# 记录一些写过的运维脚本(非涉密)

## SpringBoot 博客项目
```bash 
#!/bin/bash
module_name="blog.jar"
function proc_number(){
    proc_number=$(ps -ef | grep ${module_name} | grep "$user " | grep -v "grep " | grep -v "vim " | grep -v "vi "|grep -v "tail" | grep -v "util.sh" |grep -v ".sh" | awk '{print $2}' | wc -l)
    echo "$proc_number"
}


function proc_pid(){
    proc_pid=$(ps -ef | grep ${module_name} | grep "$user " | grep -v "grep " | grep -v "vim " | grep -v "vi "|grep -v "tail" | grep -v "util.sh" |grep -v ".sh" | awk '{print $2}')
    echo "$proc_pid"
}
function start(){
if [ $(proc_number) -eq 0 ];then
                echo "${module_name} not running"
                echo "start ${module_name}"
		nohup java -jar ${module_name} &
                if [ $(proc_number) -eq 0 ];then
                        echo " start failed .... please check nohup.out 日志文件"
			tailf nohup.out
                else
                        echo " start successful. PID:$(proc_pid)"
                fi
        else
                echo "PID:$(proc_pid)"
                echo " ${module_name} already running ..."
        fi
}

function stop(){
        if [ $(proc_number) -eq 0 ];then
                echo "${module_name} not running"
        else
                kill $(proc_pid)
                a=0
                while [ $a -lt 200 ]
                do
                   sleep 0.1
                   if [ $(proc_number) -eq 0 ];then
                        echo "process stop sucessfull"
                        break
                   else
                        let a++
                        echo "killing process,check is exist, try again $a count"
                        if [ $a -eq 200 ];then
                           if [ $(proc_number) -eq 0 ];then
                              echo "process stop sucessfull"
                           else
                              echo "================process stop faild============="
                           fi
                           break
                        fi
                   fi
                done
        fi
}

function nginx(){
        case "$1" in
        conf)
        vim /etc/nginx/nginx.conf
        ;;
        error) 
        tailf /var/log/nginx/error.log
        ;;
        access)  
        tailf /var/log/nginx/access.log
        ;;
        reload)  
        /usr/sbin/nginx -s reload
        ;;
        *)
        echo "Input not ok"
        esac

}

case "$1" in
        start)
        start
                ;;
        stop)
        stop
                ;;
        restart)
        stop
        start
                ;;
        nginx)
        nginx $2
                ;;
        *)
        echo "Input not ok"
        echo "Usage: sh  $0  start ||  stop || restart ||nginx"
esac


```

## 西华 上网日志获取
```bash
#!/bin/bash
user=$(env | grep USER | cut -d "=" -f 2)
module_name="netlogRecord"
cur_path="/home/work/soft/netlogRecord/"
log_dir="/home/work/var/log/netlogRecord/"
log_path="/home/work/var/log/netlogRecord/netlogRecord.log"
config_path="/home/work/soft/netlogRecord/config/config.yaml"
prog_path=${cur_path}${module_name}
if [ "$user" == "root"  ]
then
    echo "不能以root用户执行此启动脚本，请切换普通用户执行"
    exit
fi
Green_Info(){
        printf '\033[1;32;40m[info]  %b\033[0m\n' "$1";
}

Yellow_Info(){
        printf '\033[1;33;40m[info]  %b\033[0m\n' "$1";
}

Red_Info(){
        printf '\033[1;31;40m[error]  %b\033[0m\n' "$1";
}
function proc_number(){
    proc_number=$(ps -ef | grep netlogRecord | grep -v "grep " | grep -v "vim " | grep -v "vi "|grep -v "tail" |grep -v ".sh" | awk '{print $2}' | wc -l)
    echo "$proc_number"
}

function proc_pid(){
    proc_pid=$(ps -ef | grep netlogRecord  | grep -v "grep " | grep -v "vim " | grep -v "vi "|grep -v "tail" |grep -v ".sh" | awk '{print $2}')
    echo "$proc_pid"
}
function start(){
Yellow_Info "------step1:go build------"
 if ! go mod tidy; then
        Red_Info "go mod tidy failed, exiting..."
        exit 1
    fi
 if ! go build; then
        Red_Info "go build failed, exiting..."
        exit 1
    fi
Green_Info "------done------"

Yellow_Info "------step2:mkdir and chmod-----"
mkdir -p ${log_dir}
chmod u+x ${cur_path}${module_name}
Green_Info "------done------"

Yellow_Info "------step3:kill and run------"
	if [ $(proc_number) -eq 0 ];then
		Yellow_Info "${module_name} not running"
		Yellow_Info "start ${module_name}......"
    ${prog_path} -config=${config_path} > ${log_path} 2>&1 &
		Yellow_Info "now,proc_number : $(proc_number)"
		Yellow_Info "proc_id: $(proc_pid)"
		if [ $(proc_number) -eq 0 ];then
			Red_Info "${module_name} start failed .... please check nohup.out 日志文件"
		else
			Green_Info "${module_name} start successful. PID:$(proc_pid)"
		fi
	else
		Green_Info "PID:$(proc_pid)"
		Green_Info "${module_name} already running ..."
	fi
  Green_Info "------all done------"
}

function stop(){
	if [ $(proc_number) -eq 0 ];then
		Yellow_Info "${module_name} not running"
	else
		kill $(proc_pid)
                a=0
                while [ $a -lt 200 ]
                do
                   sleep 0.1
                   if [ $(proc_number) -eq 0 ];then
                        Green_Info "process stop sucessfull"
                        break
                   else
                        let a++
                        Yellow_Info "killing process,check is exist, try again $a count"
                        if [ $a -eq 200 ];then
                           if [ $(proc_number) -eq 0 ];then
                              Green_Info "process stop sucessfull"
                           else
                              Red_Info "================process stop faild============="
                           fi
                           break
                        fi
                   fi
                done
	fi
}
function log(){
  	cat ${log_path}
}
function info(){
		Green_Info "user:   $USER"
		Green_Info "module_name:    ${module_name}"
		Yellow_Info "cur_path:    ${cur_path}"
		Yellow_Info "log_path:    ${log_path}"
		Yellow_Info "config_path:   ${config_path}"
			if [ $(proc_number) -eq 0 ];then
    		Yellow_Info "status:    ${module_name} not running"
    	else
    	  Green_Info "status:   ${module_name} is running"
        Green_Info "proc_pid:      $(proc_pid)"
    	fi


}


case "$1" in
	start)
	start
		;;
	stop)
	stop
		;;
	info)
	info
		;;
	log)
	log
		;;
	restart)
        stop
        start
                ;;
	*)
	Red_Info "Input not ok"
	Yellow_Info "Usage: sh  $0  start ||stop||restart||info||log	"
esac


```


