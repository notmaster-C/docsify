- [**GO**](#go)
	- [go 版本管理](#go-版本管理)
	- [**GORM hook**](#gorm-hook)
		- [hook使用](#hook使用)
		- [hook方法](#hook方法)
	- [**西华可视化实战**](#西华可视化实战)
		- [1. 多下钻](#1-多下钻)
		- [notes](#notes)

# **GO**

## go 版本管理
```
https://blog.csdn.net/weixin_42750434/article/details/121041728
g ls 查询已安装的go版本
g ls-remote  查询可供安装的所有go版本
g ls-remote stable 查询当前可供安装的stable状态的go版本
g install 1.14.6 安装目标go版本1.14.6
g use 1.14.6 切换至1.14.6版本
g uninstall 1.14.6 卸载一个已安装的go版本
```
## **GORM hook**
hook 钩子函数，是指当满足一定的触发条件时会自动触发的函数，我们能借助 Gorm 框架对数据库进行 CRUD 操作，对于这些操作，我们能绑定特定的 hook 函数，进行方法的加强。
### hook使用
```go 
package main

import (
   "fmt"
   "gorm.io/driver/sqlite"
   "gorm.io/gorm"
)

type Product struct {
   gorm.Model
   Code  string
   Price uint
}

func (p *Product) BeforeCreate(tx *gorm.DB) (err error) {
   fmt.Print("BeforeCreate......")
   return
}

func main() {
   db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
   if err != nil {
      panic("failed to connect database")
   }

   // Create
   db.Create(&Product{Code: "D41", Price: 100})

}
```
### hook方法
```go 
//gorm/callbacks/interface.go
type BeforeCreateInterface interface {
   BeforeCreate(*gorm.DB) error
}

type AfterCreateInterface interface {
   AfterCreate(*gorm.DB) error
}

type BeforeUpdateInterface interface {
   BeforeUpdate(*gorm.DB) error
}

type AfterUpdateInterface interface {
   AfterUpdate(*gorm.DB) error
}

type BeforeSaveInterface interface {
   BeforeSave(*gorm.DB) error
}

type AfterSaveInterface interface {
   AfterSave(*gorm.DB) error
}

type BeforeDeleteInterface interface {
   BeforeDelete(*gorm.DB) error
}

type AfterDeleteInterface interface {
   AfterDelete(*gorm.DB) error
}

type AfterFindInterface interface {
   AfterFind(*gorm.DB) error
}

```

另外需要注意的是，如果在不同的hook中发生了error，会有不同的效果：

markdown表格
| hook | return error后果 |
| --- | --- |
| BeforeUpdate/BeforeSave/BeforeCreate | 停止之后的执行 |
| AfterUpdate/AfterSave/AfterCreate/AfterDelete | 使得之前的数据库写入操作回滚 |
| AfterFind  | 继续执行 |

总结，如果是幂等操作（不会对数据库造成影响的操作，例如查找操作），并不会触发回滚，如果是非幂等操作（增删改等会影响数据库数据的操作），其 hook 的报错会引起事务性的回滚。

## **西华可视化实战**
### 1. 多下钻
```go
func hanleGetStatistics(c *gin.Context) {
	var (
		err    error
		result = gin.H{}
		rows   *sql.Rows
	)
	var req []StatisticsReq
	if err = c.ShouldBindJSON(&req); err != nil {
		err = common.ErrorInvalidParameter
		common.OutputReuslt(c, err, result)
		return
	}
	defer func() {
		common.OutputReuslt(c, err, result)
	}()

	for i := 0; i < len(req); i++ {
		var stat db.Statistic
		if err = db.GetDB().Model(&db.Statistic{}).Where("id = ?", req[i].ID).First(&stat).Error; err != nil {
			log.Errorf("failed to query error:%v", err)
			common.OutputReuslt(c, common.ErrorNotExistEntity, result)
			return
		}
		if stat.Key == 0 {
			rows, err = db.GetDB().Raw(stat.Param).Rows()
		} else {
			params := strings.Split(req[i].Param, ",")
			for len(params) < stat.Key {
				params = append(params, params[0])
			}
			rows, err = db.GetDB().Raw(stat.Param, params).Rows()

		}
		if rows != nil {
			r := scanRows2map2(rows)
			jsonString, _ := json.Marshal(r)
			res := string(jsonString)
			err := rows.Close()
			if err != nil {
				return
			}
			result[stat.Res] = res
		}
	}
}

```


### notes

```
Golang语言级别支持协程(goroutine)并发（协程又称微线程，比线程更轻量、开销更小，性能更高），操作起来非常简单，语言级别提供关键字（go）用于启动协程，并且在同一台机器上可以启动成千上万个协程。协程经常被理解为轻量级线程，一个线程可以包含多个协程，共享堆不共享栈。
协程间一般由应用程序显式实现调度，上下文切换无需下到内核层，高效不少。协程间一般不做同步通讯，而golang中实现协程间通讯有两种：1）共享内存型，即使用全局变量+mutex锁来实现数据共享；2）消息传递型，即使用一种独有的channel机制进行异步通讯。
```





```golang
// 拆分日期
func parseTimesToTime(sclTemp []SuperviseCourseListenTemp) (err error, flag bool) {
	db.GetDB().Model(&db.SuperviseCourseListen{})
	var newSclTemp []SuperviseCourseListenTemp
	err = db.GetDB().Model(&SuperviseCourseListenTemp{}).Where("status = 0").Find(&sclTemp).Error
	if len(sclTemp) == 0 {
		flag = true
		return
	}
	for _, v := range sclTemp {
		if strings.Contains(v.ListenTime, ",") {
			items := strings.Split(v.ListenTime, ",")
			for _, i := range items {
				t := v
				t.ListenTime = i
				newSclTemp = append(newSclTemp, t)
			}
		}
		v.Status = true
	}
	err = db.GetDB().Model(&db.SuperviseCourseListen{}).CreateInBatches(&newSclTemp, 100).Error
	err = db.GetDB().Model(&SuperviseCourseListenTemp{}).Where("1=1").Updates(SuperviseCourseListenTemp{Status: true}).Error
	return
}



	startTimeMap = map[string]string{
		"1":  "8:00",
		"2":  "8:55",
		"3":  "10:00",
		"4":  "10:55",
		"5":  "14:00",
		"6":  "14:55",
		"7":  "16:00",
		"8":  "16:55",
		"9":  "19:00",
		"10": "19:55",
		"11": "20:50",
	}
	endTimeMap = map[string]string{
		"1":  "8:45",
		"2":  "9:40",
		"3":  "10:45",
		"4":  "11:40",
		"5":  "14:45",
		"6":  "15:40",
		"7":  "16:45",
		"8":  "17:40",
		"9":  "19:45",
		"10": "20:40",
		"11": "21:35",
	}



	func handleSuperviseCourseListen(c *gin.Context) {
		mutex.Lock()
	defer func() {
		mutex.Unlock()
		common.OutputReuslt(c, err, result)
	}()
}
```