// 字符串占位符拼接
String.prototype.format = function() {  
	if(arguments.length == 0) return this;  
	var param = arguments[0];  
	var s = this;  
	if(typeof(param) == 'object') {  
		for(var key in param) {
			s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);    
		}
	} else {  
		for(var i = 0; i < arguments.length; i++) {
			s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);  
		}
	}  
	return s;  
}

function initInjectFuntions() {
	// 把这些脚本从插件的页面注入到微博页面
	chrome.tabs.executeScript(null, {code:[
		__getBaseInformation_singleWeiboPage.toString(), 
		__getInformation_singleWeiboPage.toString(), 
		__commentWeiboOnce.toString(),
		__commentWeibo.toString(),
		__forwardWeiboOnce.toString(),
		__forwardWeibo.toString(),
		__replyWeiboOnce.toString(),
		__replyWeibo.toString(),
	].join(';')});
}

function getInput() {
	var content = document.getElementById('content').value.trim();
	var counts = Number(document.getElementById('repeat_counts').value);
	var interval = Number(document.getElementById('repeat_interval').value);
	if (!content || !counts || !interval) {
		alert('请输入评论内容和重复次数！')
		return;
	}
	dict = {
		'content': content,
		'counts': counts,
		'interval': interval
	}
	//console.log失效，因为控制台是当前的网页的。调试方法如下：
/*	chrome.tabs.executeScript(null, {code: "\
console.log('content', '{content}');\
console.log('counts', '{counts}');\
console.log('interval', '{interval}');\
	".format(dict)});*/
}

function commentWeibo() {
	getInput();
	chrome.tabs.executeScript(null, {code: "\
__getBaseInformation_singleWeiboPage();\
__commentWeibo('{content}', {counts}, {interval}, mid, uid_sender, page_id);\
	".format(dict)});
	window.close();
}

function forwardWeibo() {
	getInput();
	chrome.tabs.executeScript(null, {code: "\
__getBaseInformation_singleWeiboPage();\
__forwardWeibo('{content}', {counts}, {interval}, mid, page_id);\
	".format(dict)});
	window.close();
}

function replyWeibo() {
	getInput();
	chrome.tabs.executeScript(null, {code: "\
__getInformation_singleWeiboPage();\
__replyWeibo('{content}', {counts}, {interval}, mid, uid_sender, page_id, comment_data_arr);\
	".format(dict)});
	window.close();
}

initInjectFuntions()
funcs = [commentWeibo, forwardWeibo, replyWeibo]
document.addEventListener('DOMContentLoaded', function () {
	var divs = document.querySelectorAll('div.list');// 这个document指的是popup.js所在的popup.html
	for (var i = 0; i < divs.length; i++) {
		divs[i].addEventListener('click', funcs[i]);// 为每一个popup的选项添加监听器
	}
});

