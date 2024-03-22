
- [**Mysql**](#mysql)
  - [Json数据操作](#json数据操作)
    - [基础查询](#基础查询)
    - [函数查询](#函数查询)
      - [json函数：](#json函数)
      - [JSON\_KEYS](#json_keys)
      - [新增json](#新增json)
      - [JSON\_SET() ：将数据插入JSON格式中，有key则替换，无key则新增](#json_set-将数据插入json格式中有key则替换无key则新增)
      - [JSON\_INSERT():插入值（往json中插入新值，但不替换已经存在的旧值）](#json_insert插入值往json中插入新值但不替换已经存在的旧值)
      - [JSON\_REPLACE](#json_replace)
      - [JSON\_REMOVE() ：从JSON文档中删除数据](#json_remove-从json文档中删除数据)
      - [JSON\_SEARCH](#json_search)

# **Mysql**
```sql
ALTER TABLE `bigdata_core`.`bigdata_net_log_online_details` 
MODIFY COLUMN `create_time` datetime DEFAULT CURRENT_TIMESTAMP;
```

## Json数据操作
> 要求：mysql5.7以上 <br>

### 基础查询
- 创建json字段(不创建也可以对varchar之类的执行json操作) :
```sql
CREATE TABLE `dept` (
  `id` int(11) NOT NULL,
  `dept` varchar(255) DEFAULT NULL,
  `json_value` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
- 示例数据：
```sql
insert into dept VALUES(1,'部门1','{"deptName": "部门1", "deptId": "1", "deptLeaderId": "3"}');
insert into dept VALUES(2,'部门2','{"deptName": "部门2", "deptId": "2", "deptLeaderId": "4"}');
insert into dept VALUES(3,'部门3','{"deptName": "部门3", "deptId": "3", "deptLeaderId": "5"}');
insert into dept VALUES(4,'部门4','{"deptName": "部门4", "deptId": "4", "deptLeaderId": "5"}');
insert into dept VALUES(5,'部门5','{"deptName": "部门5", "deptId": "5", "deptLeaderId": "5"}');

  ```
*-* 查询操作:
  
```sql
-- 单条件
SELECT * from dept WHERE json_value->'$.deptLeaderId'='5';
-- 多字段条件
SELECT * from dept WHERE json_value->'$.deptLeaderId'='5' and dept='部门3';
-- 多jsonvalue条件
SELECT * from dept WHERE json_value->'$.deptLeaderId'='5' and json_value->'$.deptId'='5';

```
### 函数查询
#### json函数：<br>
![mysql_json_1.png](../_images/mysql_json_1.png)

*-* json_extract
```sql
select id,json_extract(json_value,'$.deptName') as deptName from dept;
```
#### JSON_KEYS
```sql
--  可以将key取出来,value没取
SELECT JSON_KEYS(json_value) FROM dept 
```
#### 新增json
#### JSON_SET() ：将数据插入JSON格式中，有key则替换，无key则新增
```sql
-- 比如我们想针对id=2的数据新增一组：newData:新增的数据,修改deptName为新增的部门1
update dept set json_value=JSON_SET('{"deptName": "部门2", "deptId": "2", "deptLeaderId": "4"}','$.deptName','新增的部门1','$.newData','新增的数据') WHERE id=2;

select * from dept WHERE id =2

-- id dept json_value 
-- 2 部门2   {"deptld”："2"，“newData”：“新增的数据”，“deptName”：“新增的部门1"，"deptleaderld”：“4”}


-- 如果不带这个单元格之前的值，之前的值是会新值被覆盖的，比如我们如果更新的语句换成:

update dept set json_value=JSON_SET('{"a":"1","b":"2"}','$.deptName','新增的部门1','$.newData','新增的数据') WHERE id=2

-- 2  部门2 {a':"1",，"b"："2"，"newData"：“新增的数据"，"deptName”：“新增的部门]1"}

```
#### JSON_INSERT():插入值（往json中插入新值，但不替换已经存在的旧值）
```sql
UPDATE dept set json_value=JSON_INSERT('{"a": "1", "b": "2"}', '$.deptName', '新增的部门2','$.newData2','新增的数据2') 
WHERE id=2
-- 2  部门2 {”a"："1"，"b"："2"，"deptName”：“新增的部门2"，"newData2"：“新增的数据2"}

```

#### JSON_REPLACE
```sql
UPDATE dept set json_value=JSON_REPLACE('{"a": "1", "b": "2", "deptName": "新增的部门2", "newData2": "新增的数据2"}', '$.newData2', '更新的数据2') WHERE id =2;

select * from dept WHERE id =2

-- 2  部门2 {"a"："1"，"b":"2"，"deptName”：“新增的部门2"，"newData2"："更新的数据2"}

```
#### JSON_REMOVE() ：从JSON文档中删除数据
```sql
-- 删除key为a的字段。
UPDATE dept set json_value=JSON_REMOVE('{"a": "1", "b": "2", "deptName": "新增的部门2", "newData2": "更新的数据2"}','$.a') WHERE id =2;
```


#### JSON_SEARCH
```sql
mysql> SET @j = '["abc", [{"k": "10"}, "def"], {"x":"abc"}, {"y":"bcd"}]';

-- 对比one和all的区别
-- 很直观的能看除one获取到一个符合条件的路径后就终止了，而all则返回全部

mysql> SELECT JSON_SEARCH(@j, 'one', 'abc');
+-------------------------------+
| JSON_SEARCH(@j, 'one', 'abc') |
+-------------------------------+
| "$[0]"                        |
+-------------------------------+

mysql> SELECT JSON_SEARCH(@j, 'all', 'abc');
+-------------------------------+
| JSON_SEARCH(@j, 'all', 'abc') |
+-------------------------------+
| ["$[0]", "$[2].x"]            |
+-------------------------------+

-- 若搜索内容不存在，则返回NULL

mysql> SELECT JSON_SEARCH(@j, 'all', 'ghi');
+-------------------------------+
| JSON_SEARCH(@j, 'all', 'ghi') |
+-------------------------------+
| NULL                          |
+-------------------------------+

-- 模糊匹配
mysql> SELECT JSON_SEARCH(@j, 'all', '%a%');
+-------------------------------+
| JSON_SEARCH(@j, 'all', '%a%') |
+-------------------------------+
| ["$[0]", "$[2].x"]            |
+-------------------------------+

mysql> SELECT JSON_SEARCH(@j, 'all', '%b%');
+-------------------------------+
| JSON_SEARCH(@j, 'all', '%b%') |
+-------------------------------+
| ["$[0]", "$[2].x", "$[3].y"]  |
+-------------------------------+

# 指定搜索路径，$[0] = "abc"
mysql> SELECT JSON_SEARCH(@j, 'all', '%b%', NULL, '$[0]');
+---------------------------------------------+
| JSON_SEARCH(@j, 'all', '%b%', NULL, '$[0]') |
+---------------------------------------------+
| "$[0]"                                      |
+---------------------------------------------+

# $[2] = {"x":"abc"}
mysql> SELECT JSON_SEARCH(@j, 'all', '%b%', NULL, '$[2]');
+---------------------------------------------+
| JSON_SEARCH(@j, 'all', '%b%', NULL, '$[2]') |
+---------------------------------------------+
| "$[2].x"                                    |
+---------------------------------------------+

# $[1] = [{"k": "10"}, "def"] 模糊匹配无结果
mysql> SELECT JSON_SEARCH(@j, 'all', '%b%', NULL, '$[1]');
+---------------------------------------------+
| JSON_SEARCH(@j, 'all', '%b%', NULL, '$[1]') |
+---------------------------------------------+
| NULL                                        |
+---------------------------------------------+

mysql> SELECT JSON_SEARCH(@j, 'all', '%b%', '', '$[1]');
+-------------------------------------------+
| JSON_SEARCH(@j, 'all', '%b%', '', '$[1]') |
+-------------------------------------------+
| NULL                                      |
+-------------------------------------------+

mysql> SELECT JSON_SEARCH(@j, 'all', '%b%', '', '$[3]');
+-------------------------------------------+
| JSON_SEARCH(@j, 'all', '%b%', '', '$[3]') |
+-------------------------------------------+
| "$[3].y"                                  |
+-------------------------------------------+


```

实例
```sql
Create Table: CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL COMMENT '名字',
  `age` int(4) unsigned NOT NULL COMMENT '年龄',
  `info` text COMMENT '补充信息',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表'
-- 插入用户数据
INSERT INTO `suhw`.`user` (`name`, `age`, `info`) VALUES ('suhw', '23', '{"phone":"12312123434","language":["c++","java","go"]}');
INSERT INTO `suhw`.`user` (`name`, `age`, `info`) VALUES ('bob', '20', '{"phone":"18912123434","language":["c++","c","go","php"]}');

-- 查询会go语言的用户
mysql> select * from user where JSON_SEARCH(info, 'all', 'go', NULL, '$.language') IS NOT NULL\G
*************************** 1. row ***************************
  id: 1
name: suhw
 age: 23
info: {"phone":"12312123434","language":["c++","java","go"]}
*************************** 2. row ***************************
  id: 2
name: bob
 age: 20
info: {"phone":"18912123434","language":["c++","c","go","php"]}
2 rows in set (0.00 sec)


```
