// inject 函数里不能出现双引号
function __getInformation_homePage() {
	var page_links = document.querySelectorAll('a.tab_link');
	if (page_links.length == 0) {
		alert('请确保你现在访问的是某个人的微博主页')
		return
	}
	var link = page_links[0].getAttribute('href');
	page_id = link.split('/')[2];
	location_receiver = page_id.substr(0,6);
	uid_sender = document.querySelector('a.gn_name').getAttribute('href').split('/')[3];
	//console.log('page_id', page_id);
	//console.log('location_receiver', location_receiver);
	//console.log('uid_sender', uid_sender);
	
	var currs = document.querySelectorAll('li.curr');
	if (currs.length == 1) { alert('请展开至少一条微博'); }
	else { 
		var curr = currs[currs.length-1];/* 选择最后一条展开的微博 */
		microblog_id = curr.querySelector('a').getAttribute('suda-uatrack').split(':')[1]; 
	} 
}

function __commentWeiboOnce(content, mid, uid, page_id, retcode) {	
	var Data = new FormData();
	// 以下这些都是从chrome里看来的	
	Data.append('act', 'post');	
	Data.append('mid', mid);
	Data.append('uid', uid);// 对方的微博id
	Data.append('forward', '0');
	Data.append('isroot', '0');	
	Data.append('content', content);	// 转发内容	
	Data.append('location', page_id.substr(0,6));// 实际上应该是page_100406_home，但评论成功了，说明该字段是冗余字段
	Data.append('module', 'scommlist');	
	Data.append('group_source', '');	
	Data.append('pdetail', page_id);	 
	Data.append('_t', '0');	
	Data.append('retcode', retcode || '');	
	
	var xhr = new XMLHttpRequest();	
	xhr.timeout = 3000;	
	xhr.responseType = 'text';	
	xhr.open('POST', 'https://weibo.com/aj/v6/comment/add?ajwvr=6&__rnd=' + (new Date().getTime()-3000000), true);	// 从1970年1月1日午夜开始经过的毫秒数，这里即便把时间改了也没用。。。。
	xhr.onload = function(e) {	
		if (this.status == 200 || this.status == 304) {	
			var data = JSON.parse(this.responseText);	
			if (data.code == '100000') {	
				console.log('Successful!', content);	
			} else {	
				console.log('Failed!', data);	
			}	
		}	
	};	
	xhr.send(Data);	
}

function __commentWeibo(content, counts, t, mid, uid, page_id) {
	t = t ? t : 1;// 默认时间1秒
	var count = 1;
	var interval = setInterval(function(){
		__commentWeiboOnce(content + count++, mid, uid, page_id);
		if (count > counts) {
			clearInterval(interval)
		}
	}, t);// 毫秒
}


function __forwardWeiboOnce(content, mid, page_id, retcode) {	
	var Data = new FormData();	
	Data.append('pic_src', '');	
	Data.append('pic_id', '');	
	Data.append('appkey', '');	
	Data.append('mid', mid);
	Data.append('style_type', '1');
	Data.append('mark', '0');	// 是否转发
	Data.append('isroot', '0');	
	Data.append('reason', content);	// 转发内容	
	Data.append('location', page_id.substr(0,6));
	Data.append('pdetail', page_id);	 
	Data.append('module', '');	
	Data.append('page_module_id', '');	
	Data.append('refer_sort', '');	
	Data.append('is_comment_base', '');	// 是否同时评论
	Data.append('rank', '0');	
	Data.append('rankid', '');	
	Data.append('isReEdit', 'false');	
	Data.append('_t', '0');	
	Data.append('retcode', retcode || '');	
	
	var xhr = new XMLHttpRequest();	
	xhr.timeout = 3000;	
	xhr.responseType = "text";	
	xhr.open('POST', 'https://weibo.com/aj/v6/mblog/forward?ajwvr=6&domain=100505&__rnd=' + new Date().getTime(), true);	// 从1970年1月1日午夜开始经过的毫秒数
	xhr.onload = function(e) {	
		if (this.status == 200 || this.status == 304) {	
			var data = JSON.parse(this.responseText);	
			if (data.code == "100000") {	
				console.log(content);	
			} else {	
				console.log(data);	
			}	
		}	
	};	
	xhr.send(Data);	
}

function __forwardWeibo(content, counts, t, mid, page_id) {
	var count = 1;	
	var interval = setInterval(function(){
		__forwardWeiboOnce(content + count++, mid, page_id);
		if (count > counts) {
			clearInterval(interval)
		}
	}, t);// 毫秒
}


function __getInformation_singleWeiboPage() {
	if (document.querySelectorAll('a.tab_link').length != 0) {
		alert('请确保你在单条微博的界面！')
		return;
	}
	var weibo_link = document.querySelectorAll('div.WB_from')[0].firstElementChild;
	mid = weibo_link.getAttribute('name');
	page_id = weibo_link.getAttribute('href').split('/')[2].split('&')[0].split('_')[1]
	uid_sender = document.querySelector('a.gn_name').getAttribute('href').split('/')[3];
	var currs = document.querySelectorAll('li.curr');
	if (currs.length == 1) {
		alert('请确保你打开了要评论的微博！')
		return;		
	}
	var comment_link = currs[1].firstElementChild.firstElementChild;// 被回复的评论链接
	comment_data_arr = comment_link.getAttribute('action-data').split('&')
}

// 回复根评论
function __replyWeiboOnce(content, mid, uid, page_id, comment_data_arr,   retcode) {	
	var Data = new FormData();	
	Data.append('act', 'reply');	
	Data.append('mid', mid); 		// microblog id
	Data.append('cid', comment_data_arr[1].split('=')[1]);		// 被回复的评论id
	Data.append('uid', uid);		// 评论者的id
	Data.append('forward', '0');	// 是否转发
	Data.append('isroot', '0');		// ??
	Data.append('content', '回复@'+ comment_data_arr[2].split('=')[1] + ':' + content);	// 回复内容	
	Data.append('ouid', comment_data_arr[0].split('=')[1]);  	// 被回复者的id
	Data.append('nick', comment_data_arr[2].split('=')[1]);	 	// 被回复者的用户名
	Data.append('ispower', comment_data_arr[3].split('=')[1]);	
	Data.append('status_owner_user', comment_data_arr[4].split('=')[1]);	// 被评论微博的主人的id
	Data.append('canUploadImage', '0');	
	Data.append('module', 'scommlist');	
	Data.append('dissDataFromFeed', '[object Object]');	
	Data.append('root_comment_id', comment_data_arr[1].split('=')[1]);	// 根评论id(这里等于cid，非根评论有点难找所以懒得管，不过即便是错的也不影响成功评论，可能会影响根评论的排序)
	Data.append('approvalComment', 'false');	// 是否点赞？
	Data.append('location', '');				// 无关紧要，懒得写了
	Data.append('pdetail', page_id);	// 被评论者的pageid
	Data.append('_t', '0');	
	Data.append('retcode', retcode || '');	
	
	var xhr = new XMLHttpRequest();	
	xhr.timeout = 3000;	
	xhr.responseType = "text";	
	xhr.open('POST', 'https://weibo.com/aj/v6/comment/add?ajwvr=6&__rnd=' + new Date().getTime(), true);	// 从1970年1月1日午夜开始经过的毫秒数
	xhr.onload = function(e) {	
		if (this.status == 200 || this.status == 304) {	
			var data = JSON.parse(this.responseText);	
			if (data.code == "100000") {	
				console.log(content);	
			} else {	
				console.log(data);	
			}	
		}	
	};	
	xhr.send(Data);	
}

function __replyWeibo(content, counts, t, mid, uid, page_id, comment_data_arr) {
	var count = 1;	
	var interval = setInterval(function(){
		__replyWeiboOnce(content + count++, mid, uid, page_id, comment_data_arr);
		if (count > counts) {
			clearInterval(interval)
		}
	}, t);// 毫秒
}


