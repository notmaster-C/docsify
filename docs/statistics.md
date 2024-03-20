[增量表、全量表、拉链表的应用场景及优缺点详解](https://blog.csdn.net/weixin_42782150/article/details/125039662)


```sql
 select distinct
a.jxb_id,a.xh_id,a.xnm,a.xqm,a.kch_id,a.cxbj,g.zyh_id,g.zyh,g.zymc, 
       b.jg_id,b.njdm_id as njdm,c.jgmc as xsxy,d.jxbmc,d.xqh_id,d.xf, 
       d.kklxdm,e.kch,e.kcmc,e.kkbm_id,e.zxs,f.jgmc as kkxy 
FROM T_JWXTZF_JW_XK_XSXKB a, 
       T_JWXTZF_JW_XJGL_XSJBXXB b, 
       T_JWXTZF_ZFTAL_XTGL_JGDMB c, 
       T_JWXTZF_JW_JXRW_JXBXXB d, 
       T_JWXTZF_JW_JH_KCDMB e, 
       T_JWXTZF_ZFTAL_XTGL_JGDMB f, 
       T_JWXTZF_ZFTAL_XTGL_ZYDMB g, 
       T_JWXTZF_ZFTAL_XTGL_BJDMB h
 where a.xh_id = b.xh_id
   and b.zyh_id=g.zyh_id
   and b.jg_id = c.jg_id
   and a.jxb_id = d.jxb_id
   and d.kch_id = e.kch_id
   and e.kkbm_id = f.jg_id
   and b.bh_id=h.bh_id
   and (d.xnm || d.xqm) in ('202312') 
   and d.kkzt <> 4 
   and d.fjxb_id is null 
   and a.xh_id not in (select xh_id from jw_xjgl_xsjbxxb where xh like '39%' or xh like'95%' or xh like'43%' or xh like '41%' or xh like '34%'or xh like '92%') 
   and a.cxbj<>1 
```




   
```sql
CREATE TABLE "UDW"."T_GXJX_SYJXJSB" as  
SELECT t4.kch ,t4.kcmc,t5.xmdm,t5.xmmc,t1.xnm,case t1.xqm when '3' then '1' else '2' end xq,t8.JGH,T8.XM JSXM,t1.xqj,F_Get_BinaryDesc_t(t1.zcd) skzc,F_Get_BinaryDesc_t(t1.jc) skjc,t1.sfyx,t2.syfzrs,t3.zb,t3.xbz,t3.xs,t3.xf,t7.dm CDDM,t7.mc CDMC,t7.rl
FROM "ODS"."T_JWXTZF_JW_SYGL_KBSJB" t1
LEFT JOIN(SELECT id,syjxrwxm_id,syfzrs FROM "ODS"."T_JWXTZF_JW_SYGL_SYJXRWXMZB" )t2 on t1.xmz_id=t2.id
LEFT JOIN(SELECT id,syjxrw_id,syxm_id,zb,xbz,xs,xf,sfyx FROM "ODS"."T_JWXTZF_JW_SYGL_SYJXRWXMB" )t3 on t3.id=t2.syjxrwxm_id
LEFT JOIN(SELECT * FROM "ODS"."T_JWXTZF_JW_SYGL_SYJXRWB" )t4 on t3.syjxrw_id=t4.id 
LEFT JOIN(SELECT * FROM "ODS"."T_JWXTZF_JW_SYGL_SYXMB" )t5 on t3.syxm_id=t5.id 
LEFT JOIN(SELECT * FROM "ODS"."T_JWXTZF_JW_SYGL_KBCDB" )t6 on t1.id=t6.kb_id 
LEFT JOIN(SELECT * FROM "ODS"."T_JWXTZF_JW_SYGL_SYFJXXB" )t7 on t7.id=t6.syfj_id 
LEFT JOIN(SELECT * FROM "ODS"."T_JWXTZF_JW_JG_JZGXXB" )t8 on t1.jgh_id=t8.jgh_id 
where t1.sfyx=1 and t1.xnm=2023 and t1.xqm='12'
```



```sql
SELECT a.mername,b.studentid,b.txamt,b.txdate,b.tradecode from (SELECT a.MERCHANTNO,a.mername FROM `syn_merchant` a
LEFT JOIN (SELECT * FROM `syn_mertypebind` where status=1 )b on a.id=b.MERCHANTid
LEFT JOIN (SELECT * FROM `syn_mertype` where status=1)c on b.typeid=c.id
where a.status=1 and c.typename='餐厅消费' and a.mername<>'测试商户')a 
INNER JOIN `syn_trade` b on a.MERCHANTNO=b.txaccnum
 where txamt>=2500 and length(studentid)>10
```

 
 
 
```sql
 -- 线上更新以后需要备份表新建表 做记录
INSERT INTO bigdata_supervise_fill_logs_copy2(app_key,form_id,user_id,user_name,semester,fill_id,fill_type,fill_time)
SELECT app_key,form_id,creator,creator_name,semester,id,content->'$.fillCourseRecordType',DATE_FORMAT(TRIM(BOTH '"' FROM content->'$.date_order'),'%Y%m') 
from bigdata_form_filling_data
where status='submit'
```

 


```sql
 SELECT t2.sjbh, t2.sjbh_id,t3.ksrq,t3.kskssj,t3.ksjssj 
FROM "ODS"."T_JWXTZF_JW_KW_KSMCDMB" t1 /* 考试名称代码表*/
LEFT JOIN "ODS"."T_JWXTZF_JW_KW_KSSJB"  t2 on t1.ksmcdmb_id=t2.ksmcdmb_id /* 考试试卷*/
LEFT JOIN "ODS"."T_JWXTZF_JW_KW_KSCCB"  t3 on t2.ksccb_id=t3.ksccb_id /* 考试场次*/
where t1.xnm='2023' and t1.xqm ='3' and t1.ksmc='期末考试' and t2.ksxs='1'
```
 
 
 
 
 
 