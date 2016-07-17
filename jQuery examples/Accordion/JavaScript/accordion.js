$(function(){
	$("#wrap ul li span").hover(function(){
		$(this).addClass("graphHover");//划入效果
	}, function() {
		$(this).removeClass("graphHover");//没有点击，就离开
	}).click(function() {
		$(this).toggleClass("graphClick").next().toggle(600)//如果span是点击过的，这时候就移除点击样式，如果之前
		//没有选中它就添加这个样式，然后找到图片，此时的
		//a是隐藏的就显示，显示的就隐藏，同时判断其他图片是否是显示的，如果有显示的就隐藏，
		//并且将点击效果移除
		.parent().siblings().find(".graphClick").removeClass("graphClick").next().hide();
		//if($(this).hasClass("graphClick")) {

		//}
	});
});