$(function() {
	var page = 1;
  	var i = 4;
	var $imgShow = $("#imgShow");
	var imgWidth = $("#content").width();
	var len = $imgShow.find("li").length;
	var page_count = Math.ceil(len / i); 
	//创建版面选择指示的小圆圈
	var item =""; 
	for (var j = 0; j < page_count; j++ ) {
    	item += "<span class = 'indication'></span>";
	}
	var $whichpage = $("#whichpage");
	$whichpage.append(item);
	$whichpage.find("span").eq((page-1)).addClass("checked").siblings().removeClass("checked"); 
	$("a.btn_l").click(function() {		
		if(!$imgShow.is(":animated")) {
			if( page == page_count) {
				page = 1;
				$imgShow.animate({left: "0"}, "slow");
			} else {
				$imgShow.animate({left: "-=" + imgWidth}, "slow");
				page++;
			}
		}
		$whichpage.find("span").eq((page-1)).addClass("checked").siblings().removeClass("checked"); 

	}); 
	$("a.btn_r").click(function() {
		if(!$imgShow.is(":animated")) {
			if( page == 1) {
				page = page_count;
				$imgShow.animate({left: "-=" + imgWidth*(page_count-1)}, "slow");
			} else {
				$imgShow.animate({left: "+=" + imgWidth}, "slow");
				page--;
			}
		}
		$whichpage.find("span").eq((page-1)).addClass("checked").siblings().removeClass("checked"); 

	}); 
	$whichpage.find("span").eq((page-1)).addClass("checked").siblings().removeClass("checked"); 
});