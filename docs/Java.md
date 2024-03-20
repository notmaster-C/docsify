```
判断两个对象的引用是否相等，用==号判断。
判断两个对象的值是否相等，调用equals方法判断。
```
```
使用JSON.parseObject方法将json转化为对象时，对象之间可以多层嵌套，也可以循环嵌套。对象也可以继承其他对象
注意：对象的setter和getter方法要齐全，少一个则对应的内容会提取不到。
```
# JAVA11
## 引入关键字var 编译器能根据=右边的实际赋值来自动推断出变量的类型
```java
var name = "codesheep"; // 自动推断name为String类型
System.out.println(name);

for循环中使用
var upList1 = List.of( "刘能", "赵四", "谢广坤" );
var upList2 = List.of( "永强", "玉田", "刘英" );
var upList3 = List.of( "谢飞机", "兰妮", "兰娜" );
var upListAll = List.of( upList1, upList2, upList3 );
for( var i : upListAll ) { // 用var接受局部变量的确非常简洁！
    for( var j : i  ) {
        System.out.println(j);
    }
}

不能使用的情况
//var类型变量一旦赋值后，重新赋不同类型的值是不行的，比如：

var name = "codesheep";
name = 666;  // 此时编译会提示不兼容的类型

//定义var类型变量没有初始化是不行的，比如：

var foo;  // 此时编译会提示无法推断类型
foo = "Foo";

//另外，像类的成员变量类型、方法入参类型、返回值类型等是不能使用var的，比如：

public class Test {
    
    private var name; // 会提示不允许使用var           

    public void setName( var name ) { // 会提示不允许使用var
        this.name = name;
    }

    public var getName() { // 会提示不允许使用var
        return name;
    }
     
}
```
## 官方HTTP Client加持
```java
//发送同步请求：

var request = HttpRequest.newBuilder()
        .uri( URI.create("https://www.codesheep.cn") )
        .GET()
        .build();
// 同步请求方式，拿到结果前会阻塞当前线程
var httpResponse = HttpClient.newHttpClient()
        .send( request, HttpResponse.BodyHandlers.ofString());
System.out.println( httpResponse.body() ); // 打印获取到的网页内容

//发送异步请求：

CompletableFuture<String> future = HttpClient.newHttpClient().
        sendAsync( request, HttpResponse.BodyHandlers.ofString() )
        .thenApply( HttpResponse::body );
System.out.println("我先继续干点别的事情...");
System.out.println( future.get() ); // 打印获取到的网页内容

//当然你也可以自定义请求头，比如携带JWT Token权限信息去请求等：

var requestWithAuth = HttpRequest.newBuilder()
        .uri( URI.create("http://www.xxxxxx.com/sth") )
        .header("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTIwNTE2MTE5NiIsImNyZWF0ZWQiOjE1ODMzMTA2ODk0MzYsImV4cCI6MTU4MzM5NzA4OSwidXNlcmlkIjoxMDAwNH0.OE9R5PxxsvtVJZn8ne-ksTb2aXXi7ipzuW9kbCiQ0uNoW0fJJr_wckLFmgDzxmBs3IdzIhWDAtaSIvmTshK_RQ")
        .GET()
        .build();
var response = HttpClient.newHttpClient()
        .send( requestWithAuth, HttpResponse.BodyHandlers.ofString() );
System.out.println( response.body() ); // 打印获取到的接口返回内容
```
## String处理增强
```java
//新版字符串String类型增加了诸如：isBlank()、strip()、repeat()等方便的字符串处理方法

String myName = " codesheep ";
System.out.println( "  ".isBlank() ); // 打印：true
System.out.println( "  ".isEmpty() ); // 打印：false

System.out.println( myName.strip() );         // 打印codesheep，前后空格均移除
System.out.println( myName.stripLeading() );  // 打印codesheep ，仅头部空格移除
System.out.println( myName.stripTrailing() ); // 打印 codesheep，仅尾部空格移除
System.out.println( myName.repeat(2) );       // 打印 codesheep  codesheep
```
## 集合增强
主要是增加了诸如of()和copyOf()等方法用于更加方便的创建和复制集合类型

```java
var upList = List.of( "刘能", "赵四", "谢广坤" );
var upListCopy = List.copyOf( upList );
System.out.println(upList);     // 打印 [刘能, 赵四, 谢广坤]
System.out.println(upListCopy); // 打印 [刘能, 赵四, 谢广坤]

var upSet = Set.of("刘能","赵四");
var upSetCopy = Set.copyOf( upSet );
System.out.println(upSet);      // 打印 [赵四, 刘能]
System.out.println(upSetCopy);  // 打印 [赵四, 刘能]

var upMap = Map.of("刘能","58岁","赵四","59岁");
var upMapCopy = Map.copyOf( upMap );
System.out.println(upMap);      // 打印 {刘能=58岁, 赵四=59岁}
System.out.println(upMapCopy);  // 打印 {刘能=58岁, 赵四=59岁}
```
## 函数式编程增强
```java
var upList = List.of( "刘能", "赵四", "谢广坤" );

// 从集合中依次删除满足条件的元素，直到不满足条件为止
var upListSub1 = upList.stream()
        .dropWhile( item -> item.equals("刘能") )
        .collect( Collectors.toList() );
System.out.println(upListSub1);  // 打印 [赵四, 谢广坤]

// 从集合中依次获取满足条件的元素，知道不满足条件为止
var upListSub2 = upList.stream()
        .takeWhile( item -> item.equals("刘能") )
        .collect( Collectors.toList() );
System.out.println( upListSub2 ); // 打印 [刘能]
```

## 文件读写增强
```java
Path path = Paths.get("/Users/CodeSheep/test.txt");
String content = Files.readString(path, StandardCharsets.UTF_8);
System.out.println(content);
Files.writeString( path, "王老七", StandardCharsets.UTF_8 );


InputStream inputStream = new FileInputStream( "/Users/CodeSheep/test.txt" );
OutputStream outputStream = new FileOutputStream( "/Users/CodeSheep/test2.txt" );
inputStream.transferTo( outputStream );
```
## 源文件运行
jdk11中，通过 java xxx.java 命令，就可直接运行源码文件程序，而且不会产生.class 文件。

一个java文件中包含多个类时，java xxx.java 执行排在最上面的一个类的main方法。

java xxx.java 启动单个Java源代码文件的程序时，相关个类必须定义在同一个java文件中。


https://zhuanlan.zhihu.com/p/52814937
https://zhuanlan.zhihu.com/p/79506166

# 可视化、大数据治理
1,主从复制，读写分离
2，消息队列 异步执行
3，分布式存储日志hdfs hadoop
4，配置中心，注册中心nacos
服务网关
Jenkins自动化编译-dockers自动打包 K8S自动化部署

分布式搜索技术

devops

微服务治理

异步通信

缓存技术、搜索技术

# springcloud

分布式架构 每个模块负责自己的功能，通过rpc进行异步通信？Feign

服务健康状态感知！

微服务原则：
单一原则：拆分粒度更小，做到单一职责 避免重复业务开发
面向服务：向外提供服务
自治：团队独立，技术独立，数据独立，部署独立
隔离性强：服务调用做好隔离、肉搞错、降级，避免一个出现问题，整个都受影响

缺点：部署、运维成本高

eureka 注册中心 获取地址和端口
服务提供者 -》服务消费者
心跳机制 保证健康状态
负载均衡进行选择
疑惑：预警机制？挂了的服务 怎么提醒恢复，有没有自动重启或者其他机制？


三步走：引依赖 加注解 写配置


IDEA复制配置 ，， 再修改选项  选择VM选项-Dserver.port=8082 修改端口配置

## Ribbon
@LoadBalanced   //负载均衡
默认配置NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule # 负载均衡规则

区域、轮询、重试、权重、随机、健壮性等 负载均衡规则
默认是区域轮询机制  ZoneAviudanceRules，根据zone选择区域

定义IRule BEAN的实现

```java
注入bean   全局生效
    @Bean
    public IRule randomRule(){
        return new RandomRule();
    }
```

ribbon
默认：懒加载，第一次请求服务的时候进行加载
饥饿加载：启动服务就加载

ribbon:
  eager-load:
    enabled: true # 开启饥饿加载
    clients:
      - userservice # 指定饥饿加载的服务名称
## eureka:
配置
```
eureka:
  client:
    service-url:  # eureka的地址信息
      defaultZone: http://127.0.0.1:10086/eureka


      
//自动装配的开关
@EnableEurekaServer
@SpringBootApplication
public class EurekaApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaApplication.class, args);
    }
}


server:
  port: 10086 # 服务端口
spring:
  application:
    name: eurekaserver # eureka的服务名称
eureka:
  client:
    service-url:  # eureka的地址信息
      defaultZone: http://127.0.0.1:10086/eureka
```
## nacos
```
startup.cmd -m standalone
```

```
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: SH # 集群名称

```
nacos 分级存储模型

1 服务
2 集群
3 服务
三个层级

优先访问本地集群的服务

nacos rule 负载均衡：
```
    NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule # 负载均衡规则
    随机请求，集群优先
```
nacos 编辑服务 设置权重 可设置优先级

优先级还是优先本地集群~！
设置本地集群权重0.1  远程集群1  但还是优先访问了本地集群

环境隔离：
namespace-》group-》service/data
```
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ # 集群名称
        namespace: 09e33dc2-2024-410b-bfd5-4fd1d9e17954 #dev 
```

# 注册中心
服务消费者定时拉取注册中心的服务列表，进行缓存
再去负载均衡调用服务提供者对应的服务
默认是临时示例
nacos 心跳比eureka快
nacos 不会剔除非临时示例，主动心跳查询非临时示例，主动推送变更消息到非临时示例
nacos支持主动检测，eureka不支持，主动检测对服务器压力较大
nacos集群默认采用AP方式，强调数据可用性，存在非临时示例采用CP模式，强调数据可靠性和可用性；  eureka采用AP模式  

## nacos统一配置管理：
### 配置更改热更新


spring配置获取步骤：
项目启动-》获取本地application.yml-》创建spring容器-》加载bean...

bootstrap.yml优先级比application.yml高
```
spring:
  application:
    name: userservice # 服务名称
  profiles:
    active: dev #开发环境，这里是dev
  cloud:
    nacos:
      server-addr: localhost:8848 # Nacos地址
      # server-addr: localhost:80 # 只有搭建Nacos集群（linux）时候，才这么配置
      config:
        file-extension: yaml # 文件后缀名
```
### 热更新
```
    @GetMapping("now")
    public String now(){
        System.out.println(dateformat);
        //TODO 下面演示两种方式实现热更新：第一种是使用Value注解(被注释掉了)；第二种是使用配置文件(推荐)
//        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(dateformat));
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(patternProperties.getDateformat()));
    }
```
方式1：@RefreshScope
方式2：@ConfigurationProperties(prefix = "pattern")
```
@Data
@Component
@ConfigurationProperties(prefix = "pattern")
public class PatternProperties {
    private String dateformat;
    private String envSharedValue;
}
```

### 多配置共享

优先级：服务名-profile.yaml > 服务名.yaml > 本地配置

### feign
feign 继承了ribbon 所以具备负载均衡和重试机制

性能优化
底层客户端实现
URLConnection: 默认实现 不支持连接池
Apache Httpclient： 支持连接池
OKHttp：支持连接池
日志最好设置成none或basic
```
feign:
  httpclient:
    enabled: true # 支持HttpClient的开关
    max-connections: 200 # 最大连接数
    max-connections-per-route: 50 # 单个路径的最大连接数  根据压测设置两个参数
```
最佳实践：
方式一：继承
方式二：抽取



1.易班数据异常，教务一个学生的班级代码没有对应的，已反馈教务
2.智慧教室排课数据异常，主键存在null值 同步部分失败
3.督导bug修改，软删除还有问题，之前从form_data 自动upFillCourseRecordState更新数据到新的表SuperviseFillLog里，目前需要再删除新表的数据，但是两个表没有强关联


date59532   supervise_time
-- 线上更新以后需要备份表新建表 做记录
INSERT INTO bigdata_supervise_fill_logs_copy2(app_key,form_id,user_id,user_name,semester,fill_id,fill_type,fill_time)
SELECT app_key,form_id,creator,creator_name,semester,id,content->'$.fillCourseRecordType',DATE_FORMAT(created_at,'%Y%m') 
from bigdata_form_filling_data
where status='submit'