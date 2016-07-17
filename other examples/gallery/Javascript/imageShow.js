$(function() {
	var x = 10;//这里不能加px
	var y = 20;
	$("a.tooltip").mouseover(function(e){
		this.myTitle = this.title;
		this.title = "";
		var imgTitle = this.myTitle? "<br />" + this.myTitle : " ";//三元运算结构：第一个参数一定是布尔值
		var tooltip = "<div id = 'tooltip'><img src = '" + this.href + "'alt = 'zchiohoih'/>" + imgTitle + "</div>";
		$("ul").after(tooltip);
		$("#tooltip")
		.css({"top": (e.pageY + y) + "px",
	          "left": (e.pageX + x) + "px"
	}).show("fast");//如果被选元素被隐藏，则显示这些元素，fast为显示的速度

	}).mouseout(function() {
		this.title = this.myTitle;
		$("#tooltip").remove();
	}).mousemove(function(e) {
		$("#tooltip")
		.css({"top": (e.pageY + y) + "px",
	          "left": (e.pageX + x) + "px"
	});
	});
	//.mousemove(function(){

	//})//当鼠标指针在指定的元素中移动时，就会发生 mousemove 事件。
})
//拼写错误href 写成了herf,导致图片不显示，粗心啊
//