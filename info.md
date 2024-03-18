- [网址](#网址)
  - [学业画像](#学业画像)
  - [学生个人画像](#学生个人画像)
  - [线上](#线上)
  - [本地](#本地)
  - [UI](#ui)
  - [项目排期](#项目排期)
  - [原型图](#原型图)
  - [希嘉中台](#希嘉中台)
  - [人脸](#人脸)
  - [锐捷上网](#锐捷上网)
  - [idea插件仓库](#idea插件仓库)
  - [go中文网](#go中文网)
  - [jira](#jira)
- [git](#git)
  - [乐为](#乐为)
- [excel 获取汉字首字母拼音VBA函数](#excel-获取汉字首字母拼音vba函数)
- [数据库连接信息](#数据库连接信息)
  - [202.115.158.164](#202115158164)
  - [host: 192.168.10.47](#host-1921681047)
  - [ip:202.115.158.164](#ip202115158164)
  - [mysql.ini](#mysqlini)
- [TO DO](#to-do)
- [账号信息](#账号信息)
  - [数据中台](#数据中台)
  - [IBM](#ibm)
  - [vpn](#vpn)
  - [miniprogram](#miniprogram)
  - [服务器](#服务器)
  - [乐为](#乐为-1)
  - [招生](#招生)
  - [李科研](#李科研)
- [sql](#sql)

## 网址

### 学业画像
https://modao.cc/app/b7ny6rimrz61imLOeaHwZC#screen=sll4vu4v31p5jux
### 学生个人画像
https://4wu0xe.axshare.com/?id=9ejc0c&p=%E5%AD%A6%E4%B8%9A%E7%94%BB%E5%83%8F&g=1
### 线上
http://lesscode.xhu.edu.cn/#/web/dataVis/index v1
https://data.xhu.edu.cn/visual/#/web/dataVis/index v2
https://data.xhu.edu.cn/visual/#/login?manager=1
### 本地
https://xihua-dev.netdisk.app/#/login
### UI
https://www.figma.com/file/QeQCDmcbvBbfBjSskXgAy4/%E8%A5%BF%E5%8D%8E%E5%8F%AF%E8%A7%86%E5%8C%96%E5%8D%8F%E4%BD%9C?type=design&node-id=657-8893&t=dLJEadzqAF8CPmup-0
### 项目排期
https://docs.qq.com/sheet/DTGlVWFNqVXhHcFFD?tab=qip5uz&_t=1690364846955

https://docs.qq.com/sheet/DTGlVWFNqVXhHcFFD?tab=na42d6
### 原型图
https://6vms5n.axshare.com/#id=itni5t&p=%E5%AD%A6%E7%94%9F%E8%80%83%E8%AF%95&g=1

### 希嘉中台
http://202.115.158.71:8770
### 人脸
http://202.115.158.132/    
### 锐捷上网
202.115.114.60
### idea插件仓库
https://plugins.jetbrains.com/plugins/alpha/5047
### go中文网
https://studygolang.com/dl
### jira
http://account.fly5.cn/

## git
### 乐为
 git push origin HEAD:refs/for/master
git status .
git log -p
$ git commit --amend --no-edit
git add internal/model/db/tables.go
git commit -m "" .git commit -m "XH-1131 宿舍晚未归" .
rm -rf e\ --git-dir\)\;\ scp\ -p\ -P\ 29418\ 10241253\@gerrit.zte.com.cn

## excel 获取汉字首字母拼音VBA函数
```vb
Function pinyin(p As String) As String
i = Asc(p)
Select Case i
Case -20319 To -20284: pinyin = "A"
Case -20283 To -19776: pinyin = "B"
Case -19775 To -19219: pinyin = "C"
Case -19218 To -18711: pinyin = "D"
Case -18710 To -18527: pinyin = "E"
Case -18526 To -18240: pinyin = "F"
Case -18239 To -17923: pinyin = "G"
Case -17922 To -17418: pinyin = "H"
Case -17417 To -16475: pinyin = "J"
Case -16474 To -16213: pinyin = "K"
Case -16212 To -15641: pinyin = "L"
Case -15640 To -15166: pinyin = "M"
Case -15165 To -14923: pinyin = "N"
Case -14922 To -14915: pinyin = "O"
Case -14914 To -14631: pinyin = "P"
Case -14630 To -14150: pinyin = "Q"
Case -14149 To -14091: pinyin = "R"
Case -14090 To -13319: pinyin = "S"
Case -13318 To -12839: pinyin = "T"
Case -12838 To -12557: pinyin = "W"
Case -12556 To -11848: pinyin = "X"
Case -11847 To -11056: pinyin = "Y"
Case -11055 To -2050: pinyin = "Z"
Case Else: pinyin = p
End Select
End Function
Function getpy(str)
For i = 1 To Len(str)
getpy = getpy & pinyin(Mid(str, i, 1))
Next i
End Function

```


## 数据库连接信息
### 202.115.158.164
```
mysql:
ip:202.115.158.164
用户名:root
密码:31!#$%Qwqwq14
数据库:xg_disanfang
```

```
名称：四川乐为科技有限公司
税号：9151 0100 0643 2227 9P
单位地址：中国（四川）自由贸易试验区成都高新区益州大道中段1800号1栋9层901号
电话：02885329651
开户银行：招商银行成都华阳支行
银行账户：1289 0557 6910 901

```

 ###  host: 192.168.10.47
 port: 3306
 user: baiduyun
  passwd: Baiduyun@123
  dbName: bigdata_core

  ### ip:202.115.158.164
  数据库类型:MySQL
ip:202.115.158.164
用户名:sjzx_user
密码:sjzx_user@4321W
端口:3306
数据库:studentwork
  
### mysql.ini
[mysqld]
basedir=D:\\soft\\mysql-5.7.19-winx64
datadir=D:\\soft\\mysql-5.7.19-winx64\\data
port=3306
skip-grant-tables

## TO DO
```
⦁	sql optimize table
⦁	https://blog.51cto.com/dadaman/1957229
⦁	show table status 
⦁	learn go and doris in depth 
```
日报
```

```
## 账号信息
### 数据中台
QYL
KM*32ij2%69P
CSL xHjs4nbvH?b2$1P
KM*32ij2%69P
admin
### IBM
1700138161@qq.com
IBMCloud1229.
### vpn
网页登录 vpn.xhu.edu.cn  
xjdata1-6  
```sql 
Xjcz123data+
```

### miniprogram
```sql 
appid wxd77abc41ed2d07c3
scecret eb6b59f366757d435ae6a7e89b1e3c86
```

### 服务器
```
202.115.158.100 服务器 西华的服务器
-104
root账号 密码lwDBsjzt@158
root密码Abc#123456.

5台新的 69 lwPan@xhu158
```
### 乐为
caishenglin
Ca7dTqrQ

caishenglin@leweikeji.com
csl@abc123


### 招生
地址：http://202.115.158.136:8080/zsxx
账号：sjdj1
密码：sjdj1

```
· 标签：社交，恋爱，校园，私密，共享，短剧
· 校园目标群体消费力大，且更容易,更喜欢尝试新鲜事物.满足一定的社交和倾诉需求，并且便利
· 圆形星球样式（样式简洁美观，信息明确，吸引用户），拖拽即可上传文件，多设备共享剪切板或者屏幕（重要功能）等
· 需要提供一定的免费服务，例如免费树洞，用户可拖拽文本丢进圆形星球黑洞中
· 根据比特币区块链秘钥，通过秘钥创建星球，一个密码口令对应一个星球，小星球之间互相联系交流共享，区别于公域社交媒体如微博、微信公众号等开放平台，私域社交强调的是在自己可控的空间内开展活动保证私密性，符合私域共享社交概念  
私域共享社交：
共享社交模式是一种社交方式，通过共享资源和信息来促进社交互动和合作。这种模式的核心理念是将个人的资源和技能与他人共享，以实现互利共赢的社交关系。    
通过共享资源，人们可以促进社交网络的扩展和拓展共享社交模式也有助于提高资源的利用效率和可持续性。
用户群更为精准和忠诚，更容易形成强关系网络，有利于提高转化率和复购率。
这对于环境保护和可持续发展具有积极的影响,可以理解成美团和闲鱼的升级品
· 收费模式，存储容量，秘钥时长，并且做平台最赚钱 ，按照抽成模式，用户自行设置资源收费
· 初始用户群体面向校园以及年轻人，更能接受新潮概念。通过社交裂变和口碑传播，可以在较低的成本下扩大品牌影响力和市场份额。


项目名称：私密云
一、项目概述
本项目旨在创建一款面向校园及年轻人群体的私密共享社交平台，充分融合社交、恋爱、校园生活及资源共享的概念，打造新颖独特的用户体验。
平台以圆形星球样式呈现，界面简洁美观，信息直观明了，以吸引年轻用户群体，满足他们在社交互动、倾诉分享及探索新鲜事物方面的多重需求。
1.1 目标群体与市场分析主要目标用户为校园消费力强大的学生群体，他们乐于尝试新事物，具有强烈的社交欲望和倾诉需求。平台以便捷高效的交互方式设计，如拖拽上传文件、多设备共享剪切板和屏幕等功能，力求提升用户体验。
1.2 核心功能与特色
•星球创建与连接：借鉴比特币区块链秘钥机制，用户通过秘钥创建独一无二的星球，每个星球由一个专属密码口令保护，不同星球间可以安全私密地相互联系和交流共享资源，形成私域社交网络，与公域社交媒体如微博、微信公众号等形成差异化竞争。
•学习与知识分享：课程资料共享：鼓励用户上传学习资料、笔记、心得等，形成丰富的学习资源库，支持用户之间的学术交流和互助学习。在线教育与直播授课：引入在线教育模块，允许教师或专家开设私人课程，用户可通过购买门票参与学习，增强平台的教育属性。
•免费服务：提供基础免费服务，例如免费树洞功能，用户可以将文本信息拖拽至星球黑洞中进行匿名倾诉，增强用户粘性。
•资源共享：采用共享社交模式，鼓励用户在安全私密的环境下共享各类资源，包括但不限于文件、信息、技能等，以此拓展社交网络，增强用户间的强关系纽带，提升转化率和复购率，同时有助于资源的高效利用和可持续发展。
1.3 收费模式与盈利策略•增值服务付费：平台提供存储容量升级、秘钥时长延长等增值服务，采用用户自主设定资源收费的抽成模式，平台从中抽取一定比例的服务费，实现商业化运作。
1.4 用户增长与市场推广初期用户积累阶段，平台将重点面向校园及年轻人群体推广，利用他们易于接纳新潮概念的特点，通过社交裂变和口碑传播等方式，在较低成本下快速扩大品牌影响力和市场份额。
综上所述，本项目致力于打造一款集社交、恋爱、校园生活于一体的私密共享社交平台，以创新的互动形式和安全的资源分享机制，服务于热衷探索、追求个性化的年轻用户群体，同时也兼具商业潜力和社会价值。
```
```
1.督导预约课程id有时候会增加1，获取到的列表的id去查询详情接口使用会查询不到，具体表现为：点击课程，没有反应。之前也出现过，龙哥说可能是id太大，之前获取的17位的uuid，改小了一位成16位，问题还是存在，但是偶尔有一个，准备改用Oracle去根据教工号和课程号生成hash，作为唯一标识，不是uuid应该就不会被自增了把
本地跑代码用postman测试接口返回的id会随数据库改变，但是dudao的dev环境，数据库的id改变了，获取课程列表里的id不会改变！
当id=9409366332536905 时获取到的list的id就会变成9409366332536904，手动将id改为9409366332536904，9409366332536906都能正常获取，将id修改为94093663325369051，获取到的id变成了94093663325369060
940936633253690555变为940936633253690550，所以应该是接口获取到数据，转换格式的时候大小超出范围，所以我在postman能正常获取到，
备份数据，排查线上数据太大的id，将没有使用的195条处理掉
update bigdata_supervise_courses set id = substr(id,1,10) where id > 9409366332536905 and id not in (SELECT course_id from bigdata_supervise_course_reserves)

2.处理填报教学工作量确认数据
3.督导课程预约取消接口

```
### 李科研
0120010030
1qaz2wsx

## sql
```sql
-- 线上
-- bigdata_authorize_users
insert into bigdata_authorize_users (id,`name`,`password`,`status`,created_at,updated_at) select jgh_id,concat('A',jgh_id),'$2a$10$LQU3eFqRXEp1IysMgPSE3OLmQM1hc719qHS8m0emqwKeSjTreZRJm',0,now(),now() from t_xhwp_skjsjbxx;

-- bigdata_course_teachers

insert into bigdata_course_teachers (class_number,teacher_name,teacher_number) select kch,xm,jgh from bigdata_kbjsxx_x;

-- bigdata_course_hours
insert into bigdata_course_hours (id,course_name,semester,class_number,total_period,course_college,`status`,apply_teacher,teachers,created_at,updated_at) select uuid_short(),kcmc,kkxq,kkh,zxs,kkdw,0,cjlrr_id,jsxx,now(),now() from bigdata_kbjsxx;

-- bigdata_user_departments
insert into bigdata_user_departments (id,department_id,user_id,role_type,created_at,updated_at) select uuid_short(),concat('D',ifnull(bmdm,'10623')),concat('U',jgh_id),1,now(),now() from t_xhwp_skjsjbxx;

-- bigdata_users
insert into bigdata_users (user_id,account_id,`name`,sex,`status`,mobile,email,wx_work_id,title,created_at,updated_at) select concat('U',jgh_id) as user_id,jgh_id,xm,ifnull(xbm,0),1,'','','',ifnull(zgwmc,''),now(),now() from t_xhwp_skjsjbxx;


---本地
-- bigdata_authorize_users
insert into bigdata_authorize_users (id,`name`,`password`,`status`,created_at,updated_at) select jgh_id,jgh_id,'$2a$10$LQU3eFqRXEp1IysMgPSE3OLmQM1hc719qHS8m0emqwKeSjTreZRJm',0,now(),now() from t_xhwp_skjsjbxx;

--bigdata_departments 
INSERT into bigdata_departments (depart_id,`name`,parent_id,order_id)
SELECT concat('D',jgbm),bmmc,if(ssdwbm is null,'',concat('D',ssdwbm)),1 as order_id from bigdata_zzjgxx 
-- 给所有院长身份修改为部门管理员
select ud.* from bigdata_user_departments as ud inner join bigdata_course_department_managers as cm on ud.user_id = concat("U",cm.teacher_number) order by ud.id asc;
update bigdata_user_departments d, bigdata_course_department_managers c set d.role_type=2 where d.user_id=concat("U",c.teacher_number);

-- bigdata_users 用户加入的部门
update bigdata_users u,bigdata_user_departments d set u.department=concat('["',d.department_id,'"]') where u.user_id=d.user_id;
```

``` sql
SELECT T1.*,t2.kxlh as card_no FROM(
  -- 本科生
  SELECT xh as cert_id,xm as name,case when xbm =1 then 'M' else 'F' end as sex,to_char(sfzjh) as id_card,yxmc as dept,yxdm as dept_code,bjmc,zymc,'' as duty,'' as position,'' as education,csrq as birthday,nvl(yddh,dh) as mobile,dzyx as email,'本科生' as reader_type,xz as duration,tstamp as upd_date,rxny as school_date,'' as end_date,xznj as grade,'' as redr_status 
FROM "UDW"."T_GXXS_BZKSJBXX_X" where xsdqztm in ('01','02','20','21','25','24')
UNION ALL
-- 研究生
SELECT * from(
SELECT xh as cert_id,xm as name,case when xbm=1 then 'M' else 'F' end as sex,to_char(sfz) as id_card,xymc as dept,xy as dep_code,zymc as class,zymc as occupation,'' as duty,'' as position , '' as education, substr(sr,1,4)||'-'||substr(sr,5,2)||'-'||substr(sr,7,2) as birthday,sjhm as mobile,yj as email,'研究生' as redr_type,'3' as duration,tstamp as upd_date,substr(rxsj,1,4)||'-'||substr(rxsj,5,2)||'-'||substr(rxsj,7,2) as school_date,substr(bysj,1,4)||'-'||substr(bysj,5,2)||'-'||substr(bysj,7,2) as end_date,nj as grade,d1.ms as redr_status
FROM "UDW"."T_GXXS_YJSJBXX" t1 LEFT JOIN (SELECT DISTINCT dm,ms from DM_XB_YJS_XJDM )d1 on t1.xjzt=d1.dm WHERE xjzt in (1,2,4,6))t 
UNION ALL  
-- 教职工
SELECT 
t1.jgh AS cert_id,
t1.xm AS name, 
case when xb=1 then 'M' else 'F' end as sex, 
sfzh as id_card,
d4.dwmc as dept, 
dw as dept_code, 
''as class, 
''as occupation,
d2.dmmc as duty,'' as position, 
d1.ms as education, 
substr(csrq,1,4)||'-'||substr(csrq,5,2)||'-'||substr(csrq,7,2) as birthday, 
'' as mobile,'' as email,'职工' as redr_type,'' as duration, 
substr(t1.tstamp,1,4)||'-'||substr(t1.tstamp,5,2)||'-'||substr(t1.tstamp,7,2) as upd_datep, 
substr(jrbdwsj,1,4)||'-'||substr(jrbdwsj,5,2)||'-'||substr(jrbdwsj,7,2) as school_date, 
'' as end_date, 
'' as grade, 
d3.ms as redr_status  
FROM "UDW"."T_GXJG_JZGJBXX" t1 
LEFT JOIN DM_XB_RS_RYXLM d1 on t1.xl=d1.dm
LEFT JOIN DM_XB_ZCDJDM  d2 on t1.zcdj=d2.dm
LEFT JOIN DM_GB_JZGDQZTDM  d3 on t1.dqzt=d3.dm
LEFT JOIN T_GXJG_ZZJGXX  d4 on t1.dw=d4.dwbm
WHERE dqzt in (11,12,13,14,15,16,'01','02','04')
)T1 LEFT JOIN(SELECT max(kxlh) as kxlh,zjh FROM "UDW"."T_YKT_YKTZHXXB" where length(zjh)>9 and kxlh is not null GROUP BY zjh)t2 on t1.cert_id=t2.zjh 
```

```sql
 select 
  distinct
       a.jxb_id,--教学班ID
       a.xh_id,--学号ID
       a.xnm,--学年码
       a.xqm,--学期码
       a.kch_id,--课程ID
       a.cxbj,--重修标记
       g.zyh_id,--专业号ID
       g.zyh,--专业号
       g.zymc,--专业名称
       b.jg_id,--学生学院ID
       b.njdm_id njdm, --年级代码
       c.jgmc xsxy, --学生学院名称
       d.jxbmc,--教学班名称
       d.xqh_id,--校区ID
       d.xf,--课程学分
       d.kklxdm,--开课类型代码 01为主修，
       e.kch,--课程号
       e.kcmc,--课程名称
       e.kkbm_id,--开课部门ID
       e.zxs,--课程总学时
       f.jgmc kkxy --开课部门名称
FROM T_JWXTZF_JW_XK_XSXKB      a,--选课 学生选课表
       T_JWXTZF_JW_XJGL_XSJBXXB  b,--学籍管理 学生基本信息表
       T_JWXTZF_ZFTAL_XTGL_JGDMB c,--系统管理 机构代码表
       T_JWXTZF_JW_JXRW_JXBXXB   d,--教学任务 教学班信息表
       T_JWXTZF_JW_JH_KCDMB      e,--教学计划 课程代码表
       T_JWXTZF_ZFTAL_XTGL_JGDMB f,--系统管理 机构代码表
       T_JWXTZF_ZFTAL_XTGL_ZYDMB g,--系统管理 专业代码表
       T_JWXTZF_ZFTAL_XTGL_BJDMB h--系统管理 班级代码表
 where a.xh_id = b.xh_id
   and b.zyh_id=g.zyh_id
   and b.jg_id = c.jg_id
   and a.jxb_id = d.jxb_id
   and d.kch_id = e.kch_id
   and e.kkbm_id = f.jg_id
   and b.bh_id=h.bh_id
   and d.xnm || d.xqm in ('202312') --2023-2024-2学期；（ '202312','20243')表示2024自然年度
   and d.kkzt <> 4 --排除停开数据
   and d.fjxb_id is null --教学班拆分为实践类排除
   and a.xh_id not in (select xh_id from T_JWXTZF_JW_XJGL_XSJBXXB where xh like '39%' or xh like'95%' or xh like'43%' or xh like '41%' or xh like '34%'or xh like '92%') 
   --排除39辅修、95国际生、43四类专科、41普通专科、34交流生、92进修生
   and a.cxbj<>1  --排除重修

```
jinlong
cdbonecto
```

```
1 计算一卡通高消费学生 提供给易班
2 查询易班教务数据不一致
3 督导新需求 增加查询软删除和恢复接口


```
WITH course as (
SELECT t1.jxbmc as "class_number",t1.jsgh  as "teacher_number",wm_concat(t1.sksj) as "listen_time",t1.jc "sessions",nvl(to_char(t2.id),cdbh)  as "address_code",case t1.xqh when 1 then '郫都校区' when 2 then '彭州校区' when 3 then '人南校区' when 4 then '宜宾校区' when 5 then '联办' end "campus",yxzrs "total_student"
FROM (
SELECT t1.kch||'-'||jsgh jxbmc,t1.xqh,t1.jsgh,t1.cdbh,cdmc,F_GET_JC_t(t1.jc) jc,F_GET_COURSEDATES_T('20240226',ksz,jsz,dsz,xqj) sksj,yxzrs
FROM "UDW"."T_GXJX_BZKSJSKBXX"  t1 
where cdmc not in ('线上上课','线上考试') and t1.cdmc not like '不用教室%' and cdbh not in ('000-199')
and substr(t1.xn,1,4) =case when to_char(sysdate,'mm')>'07' then to_char(sysdate,'yyyy') else to_char(ADD_MONTHS(sysdate, -12),'yyyy') end
and t1.xq =case when to_char(sysdate,'mm') BETWEEN '02' and '07' then '2' else '1' end
and F_GET_COURSEDATES_T('20240226',ksz,jsz,dsz,xqj) is not null
) t1 
LEFT JOIN T_LWSJZT_BIGDATA_SUPERVISE_SCHOOL_ROOMS t2 on t1.cdbh=t2.dm
GROUP BY jxbmc,jsgh,t1.xqh,jc,t2.id,cdbh,yxzrs
)
SELECT DISTINCT * from course where LENGTH("sessions") - LENGTH(REPLACE("sessions", ',', '')) = 0
union all
SELECT DISTINCT "class_number","teacher_number","listen_time",TRIM(REGEXP_SUBSTR("sessions", '[^,]+', 1, LEVEL)) "sessions","address_code","campus","total_student" 
FROM (
SELECT * from course where LENGTH("sessions") - LENGTH(REPLACE("sessions", ',', '')) > 0
)t1
CONNECT BY instr("sessions", ',', 1, LEVEL - 1) > 0
START WITH "sessions" LIKE '%,%'
union all
SELECT t1.kcdm||'-'||t1.zgh as CLASS_number,to_char(t1.zgh),F_GET_COURSEDATES_T('20240226',kkzks,kkzjs,'2',xq) sksj,F_GET_JC_t(kcks||'-'||kcjs) jc,nvl(to_char(t3.id),'1'),'郫都校区',to_number(t2.xs)
FROM "ODS"."T_YJS_JX_PKAP" t1
LEFT JOIN "ODS"."V_YJS_RKJSXX" t2 on t1.kcdm||'-'||t1.zgh=t2.kch||'-'||t2.rkjsgh
LEFT JOIN T_LWSJZT_BIGDATA_SUPERVISE_SCHOOL_ROOMS t3 on t3.name like ('%'||js||'%')

```