> 架构介绍
- 基于node的express框架，前端使用jade模板渲染页面，使用zepto处理前后端的请求交互，使用记事本作为轻量级的数据存储


> 主要node组件
- **supervisor** node express框架开发环境监听文件变化
- **forever** 守护进程
- **jade** 前端渲染模板代理
- **superagent** 模拟浏览器代理，登录使用
- **request** 爬虫，接口请求
- **nodemailer** 邮件发送
- **silly-datetime** node 格式化事件组件
- **cron** 定时任务


> 产品介绍
- 用户登录之后可进行订单预约
- 每天只可预约本周内的订单，即周一可预约到本周五，周五只可预约一天，非工作日不能预约
- 每周一到周五上午10:00更新「所有餐品列表」与「同事常点餐品列表」
- 每周一到周五下午15:00脚本自动根据用户的预约点餐，如果用户没有预约，则随机从「同事常点餐品列表」中点取一份
- 本脚本不保存用户的登录密码，只缓存cookie信息用于点餐
点餐完成后，将会以企业微信的方式通知点餐结果

> node组件库安装
- 安装node环境，执行npm install,安装node相关组件即可

> 命令行介绍，默认前缀（npm run ）
- start 本地开发环境，使用supervisor组件开启文件监听
- dish 手动执行脚本，获取「所有餐品列表」、「同事常点餐品列表」，更新「静态餐饮列表」
- forever 守护进程启动网站
- stop 守护进程关闭网站
- test 测试脚本，包含点餐、发送邮件、爬取餐饮列表、发送企业微信（组件暂时未同步到github）、发送静态消息测试


> 说明
- 仓库中并不包括databse文件夹，如果需要，请自己新建
- 因为企业微信接口接口只能在内网访问，所以并没有上传至仓库，如果遇到提示缺少该组件的error，删除该段逻辑即可

> 目录介绍

```
│  app.js                       ---页面启动js
│  config.js                    ---配置文件
│  package-lock.json            ---package
│  package.json                 ---node组件库
│  README.md                    ---readme
│
├─bin
│      www                      ---脚本入口
│
├─config
│      error.js                 ---错误码配置文件
│      user.js                  ---用户信息配置文件，已废弃
│
├─controller
│      api.js                   ---http请求
│      auth.js                  ---判断用户是否登录
│      autoCheckIn.js           ---自动点餐测试脚本
│      dataBase.js              ---模拟数据库链接增删改查
│      home.js                  ---渲染页面视图引擎
│      login.js                 ---登录模块
│      sendEmail.js             ---邮件模块
│      workWx.js                ---企业微信模块
│
├─database                      ---数据库
│  │  all_dishs                 ---所有餐饮列表，每工作日上午10:00更新
│  │  fav_dishs                 ---同事常点餐饮列表，每工作日上午10:00更新
│  │  static_dishs              ---静态餐饮列表，每工作日附加
│  │  user                      ---用户信息列表
│  │
│  └─order_reverse              ---用户预约文件夹，已用户名分割命名
│
├─log
│      err.log                  ---错误日志
│      out.log                  ---console输出日志
│
├─routes
│      index.js                 ---路由
│
├─script
│      checkin.js               ---点餐
│      dish.js                  ---测试点餐
│      message.js               ---每周一消息提醒
│      spider.js                ---爬虫脚本
│      test.js                  ---测试数据脚本
│
├─static
│  ├─css
│  │      about.css             ---关于我们
│  │      common.css            ---公共基础样式表
│  │      index.css             ---首页
│  │      login.css             ---登录
│  │      order_reverse.css     ---预约（mobile）
│  │      order_reverse_web.css ---预约（pc）
│  │      reset.css             ---reset.css
│  │      user_info.css         ---用户信息
│  │      user_list.css         ---用户列表
│  │      user_reverse.css      ---用户预约
│  │
│  ├─description                ---github readme
│  │      menu.png
│  │      my_reverse.png
│  │      order_reverse.png
│  │      user_info.png
│  │
│  ├─img
│  │      about.svg
│  │      basic-info.svg
│  │      close.svg
│  │      dish.svg
│  │      favicon.ico
│  │      home.svg
│  │      menu.svg
│  │      my-reverse.svg
│  │      null.png
│  │      reverse.svg
│  │      selected-ico-gray.svg
│  │      selected-ico.svg
│  │      user-list.svg
│  │
│  └─js
│          common.js
│          index.js
│          login.js
│          order_reverse.js
│          order_reverse_web.js
│          user_list.js
│
└─views
        about.jade
        error.jade
        index.jade
        layout.jade
        login.jade
        order_reverse.jade
        order_reverse_web.jade
        user_info.jade
        user_list.jade
        user_reverse.jade
```


> 菜单介绍

实现包括预约、预约查询、基本信息查询、用户列表的功能

![image](https://raw.githubusercontent.com/openart/meican/master/static/description/menu.png)

> 预约

用户登录之后可预约一周之内的餐品，每天只可预约本周内的订单，即周一可预约到本周五，周五只可预约一天，非工作日不能预约点击，点击提交后提示当前的预约状态
![image](https://github.com/openart/meican/blob/master/static/description/order_reverse.png?raw=true)

> 我的预约

考虑到用户可能忘记预约的记录，也不能在美餐上面查看，所以提供查询预约的功能，用户可以查询当天以及之后的所有预约订单
![image](https://github.com/openart/meican/blob/master/static/description/my_reverse.png?raw=true)

> 用户信息

此接口可实时拉取用户在美餐的基本信息
![image](https://github.com/openart/meican/blob/master/static/description/user_info.png?raw=true)
