
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
##### hook使用
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
##### hook方法
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
##### 面向SQL编程
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
		l := len(req[i].Params)
		tx := db.GetDB()
		var params []interface{}
		if stat.Key == 0 {
			rows, err = tx.Raw(stat.Param).Rows()
			if rows != nil {
				r := scanRows2map2(rows)
				result[stat.Res] = r
				err = rows.Close()
				if err != nil {
					return
				}
			}
		} else if l != 0 && stat.Key == l {
			params = make([]interface{}, l)
			for ii, s := range req[i].Params {
				params[ii] = s
			}
		} else if l == 0 && stat.Key > 0 {
			params = make([]interface{}, stat.Key)
			for j := 0; j < stat.Key; j++ {
				params[j] = req[i].Param
			}
		} else {
			result["content"] = "参数错误，请检查"
			return
		}
		rows, err = tx.Raw(stat.Param, params...).Rows()
		if rows != nil {
			r := scanRows2map2(rows)
			result[stat.Res] = r
			err = rows.Close()
			if err != nil {
				return
			}
		}
	}
}
```
##### 函数
<!-- scanRows2map 转换方法 -->
```go
func scanRows2map(rows *sql.Rows) (res []map[string]interface{}) {
	defer rows.Close()
	cols, _ := rows.Columns()
	cache := make([]interface{}, len(cols))
	// 为每一列初始化一个指针
	for index := range cache {
		var a interface{}
		cache[index] = &a
	}
	for rows.Next() {
		rows.Scan(cache...)
		row := make(map[string]interface{})
		for i, val := range cache {
			// 处理数据类型
			v := *val.(*interface{})
			switch v.(type) {
			case []uint8:
				v = string(v.([]uint8))
			case nil:
				v = ""
			}
			row[cols[i]] = v
		}
		res = append(res, row)
	}
	rows.Close()
	return res
}

```

<!-- 周次 节次二进制掩码转换 -->
```go
// generateBinaryUnion 生成从当前周开始往后n周的所有周数的数组或者节次
func generateBinaryUnion(current int, allMask int64, n int) []int {
	endWeek := current + n
	// 初始化周数数组
	union := make([]int, 0)
	for i := 1; allMask > 0; i++ {
		if i < current {
			allMask >>= 1
			continue
		}
		if i >= endWeek {
			break
		}
		if allMask&1 == 1 {
			union = append(union, i)
		}
		allMask >>= 1 // 右移一位，相当于检查下一个二进制位
	}
	return union
}
```


## go并发

```
Golang语言级别支持协程(goroutine)并发（协程又称微线程，比线程更轻量、开销更小，性能更高），操作起来非常简单，语言级别提供关键字（go）用于启动协程，并且在同一台机器上可以启动成千上万个协程。协程经常被理解为轻量级线程，一个线程可以包含多个协程，共享堆不共享栈。

协程间一般由应用程序显式实现调度，上下文切换无需下到内核层，高效不少。协程间一般不做同步通讯，而golang中实现协程间通讯有两种：1）共享内存型，即使用全局变量+mutex锁来实现数据共享；2）消息传递型，即使用一种独有的channel机制进行异步通讯。

```
>goroutine 是轻量级线程，goroutine 的调度是由 Golang 运行时进行管理的。


##### channel和goroutine使用

>通道可用于两个 goroutine 之间通过传递一个指定类型的值来同步运行和通讯。操作符 <- 用于指定通道的方向，发送或接收。如果未指定方向，则为双向通道。

通道可以设置缓冲区，通过 make 的第二个参数指定缓冲区大小

带缓冲区的通道允许发送端的数据发送和接收端的数据获取处于异步状态，就是说发送端发送的数据可以放在缓冲区里面，可以等待接收端去获取数据，而不是立刻需要接收端去获取数据。

不过由于缓冲区的大小是有限的，所以还是必须有接收端来接收数据的，否则缓冲区一满，数据发送端就无法再发送数据了。

chan是引用数据类型，必须初始化分配内存使用，chan又分为 无缓冲区和有缓冲区，有缓冲区的可指定缓存区域大小，能放多少数据。
- 无缓冲区 又称为同步通道，必须有一个goroutine 区接受值，否则会引发panic。 
- 待缓冲区 又被称为异步通道。把数据放到管道里，不管你有没有人接受，我就去干别的事情了。

chan是引用数据类型，不是每次都需要手动关闭，他会被垃圾机制回收。
- channel不需要通过close释放资源，只要没有goroutine持有channel，相关资源会自动释放。
-  close可以用来通知channel接收者不会再收到数据。所以即使channel中有数据也可以close而不会导致接收者收不到残留的数据。
 有些场景需要手动关闭通道，例如range遍历通道，如不关闭range遍历会出现死锁。

```go
func sumAll(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // 把 sum 发送到通道 c
}
func main() {

	c := make(chan int,3)
	go sumAll(s[:len(s)/2], c)
	go sumAll(s[len(s)/2:], c)
	x, y := <-c, <-c // 从通道 c 中接收

	fmt.Println(x, y, x+y)
}
//结果: -5 17 12
```
> 单项通道

```go
/生成0-100的数字发送到 ch1 只能接收
func a(c1 chan<- int){
	for i:=0;i<100;i++{
		c1 <- i
	}
	close(c1)
}

//从ch1接受数据 计算平方 放到ch2
//c1只能发送，c2 只能接收
func b(c1 <-chan int,c2 chan<- int){
	//循环取值
	for tem := range c1{
		c2 <- tem*tem
	}
	close(c2)

}

func main() {
	ch1 := make(chan int ,100)
	ch2 := make(chan int,100)
	go a(ch1)
	go b(ch1,ch2)

	//从ch2中循环取值 所有没有完成之前主程序不会退出
	for num := range ch2{
		fmt.Println(num)
	}

}

```
或者也可以定义的时候声明
```go
	//只能发送值
	var ch3 = make(<-chan int,1)
	//只能接收值
	var ch4 = make(chan<- int,1)
```




>临界资源的安全问题

临界资源: 指的是在并发环境中, 多个进程, 线程or协程共享的资源,这就需要用到互斥锁

```go
	a := 1
	fmt.Println("first a:", a)
	go func() {
		a = 2
		fmt.Println("goroutine a:", a)
	}()
	a = 3
	fmt.Println("mainf a:", a)
	time.Sleep(time.Second * 2) // 切换 cpu调度
	fmt.Println("main a:", a)

	// 输出结果1 3 2  2 

	// time.Sleep暂停了2秒，让goroutine有可能获得CPU时间并执行。
```

>使用互斥锁能够保证同一时间有且只有一个goroutine进入临界区，其他的goroutine则在等待锁；当互斥锁释放后，等待的goroutine才可以获取锁进入临界区，多个goroutine同时等待一个锁时，唤醒的策略是随机的。

经典卖票问题：

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// 定义全局变量
var ticket int = 20

// 定义锁 sync.Mutex 锁头 -> 提供上锁和解锁(这两个常用)
var mutex sync.Mutex

func main() {
	// 多线程资源争取会出现问题
	go saleTicket("sam")
	go saleTicket("lo")
	go saleTicket("a")
	go saleTicket("b")
	time.Sleep(time.Second * 3)
}

// 售票
// 为了解决多进程售票的安全问题, 可以在一个人进入(函数调用)的时候, 先对临界资源上锁, 修改完之后, 再把锁解开 (排队拿)
func saleTicket(name string) {
	for {
		mutex.Lock() // 拿到共享资源之前先上锁 !
		if ticket > 0 {
			time.Sleep(time.Millisecond)
			fmt.Println(name, "进来买票了, 剩余票数", ticket)
			ticket--
		} else {
			fmt.Println("票已卖完")
			break
		}
		mutex.Unlock() // 完成操作 就解锁
	}
}

```


>不要以共享内存的方式去通信, 而要以通信的方式去共享内存

共享内存方式 -> 锁, 通信方式 -> chan(通道)

##### 读写互斥锁

```go

var (
	a int
	wg sync.WaitGroup
	lock sync.RWMutex
)

func read(){
	lock.RLock() //读锁
	time.Sleep(time.Millisecond) //假如读需要一毫秒
	lock.RUnlock() //解锁
	wg.Done()
}

func write(){
	lock.Lock() //加锁
	a = a+1
	lock.Unlock() //解锁
	wg.Done()
}

func main() {
	wg.Add(1000)
	for i:=0;i<1000;i++{
		go read()
	}
	wg.Add(100)
	for i:=0;i<100;i++ {
		go write()
	}
	wg.Wait()
	fmt.Println(a)
}


```

##### 同步等待组的使用和介绍

```go 
package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func main() {
	wg.Add(2) // WaitGroup为2, 即有2个线程去执行
	// wg.Add() 判断还有几个线程去执行, 计数
	// wg.Done() 告知线程已经结束 -> 线程-1
	// 同步等待组
	go test1()
	go test2()
	fmt.Println("main_start")
	wg.Wait() // 等到 wg = 0， 才会继续向下执行
	fmt.Println("main_end")
}
func test1() {
	for i := 0; i < 10; i++ {
		fmt.Println("test1--", i)
	}
	wg.Done()
}

func test2() {
	defer wg.Done() // 这个与test1() 中的 wg.Done() 效果一致
	for i := 0; i < 10; i++ {
		fmt.Println("test2--", i)
	}
}
```



## 基础
##### new 和make 的区别

new 返回的是零值指针
make返回的是 按类型初始化的变量，常用于初始化切片、映射或通道


- new() 函数在底层使用了 Go 的 runtime.newobject 函数。
- runtime.newobject 函数会分配一块内存，大小为指定类型的大小，并将该内存清零。
- 然后，runtime.newobject 函数会返回这块内存的指针。


- make() 函数在底层使用了 Go 的 runtime.makeslice、runtime.makemap 和 runtime.makechan 函数。
- runtime.makeslice 函数用于创建切片，它会分配一块连续的内存空间，并返回切片结构体。
- runtime.makemap 函数用于创建映射，它会分配一块哈希表内存，并返回映射结构体。
- runtime.makechan 函数用于创建通道，它会分配一块通道内存，并返回通道结构体。
