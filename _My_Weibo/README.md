备注：第一次写插件，很多东西都是现学现用的，所以代码和注释看起来比较凌乱。。。

---

## 微博自动转发评论回复插件

 - 仅支持chrome浏览器，其他浏览器没有测试过
 - 使用前需要登录微博帐号
 - 评论微博、回复评论都是需要先打开要回复的微博/评论的回复栏才可以
 - 评论微博和转发微博都是需要在主页上进行（实际上也没必要在单条微博的页面上进行）
 - 回复评论需要在单条微博的页面上进行
 - 短时间内大量操作微博号会被限制，需要手动解除限制（正确回答三个好友头像和id的对应关系即可）
 - 如果懒得总是手动解封，那么请把时间间隔设置久一点

---

插件截图：

![](https://raw.githubusercontent.com/wiki/azyl99/chrome-plugin/images/plugin.png)

评论截图（间隔时间为1毫秒，微博服务器的处理顺序不严格对应评论发出去的顺序）：

![](https://raw.githubusercontent.com/wiki/azyl99/chrome-plugin/images/excample.png)

--- 
具体使用方法见[wiki](https://github.com/azyl99/chrome-plugin/wiki)
