function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;

    } else {
        window.onload = function() {
        oldonload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
    //alert("sdfdhgd");
}

function prepareplaceholder() {
    if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/img1.jpg");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
	//console.log("asfdsfsggd");
	//alert("sdfdhgd");
}
function prepareGallery() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i = 0;i < links.length; i++){
		links[i].onclick = function(){
			return showPic(this);
		}
		links[i].onkeypress = links[i].onclick;
	}

}
//showPic：找出id属性值是palceholder
//
//
function showPic(whichpic) {
	//var text;
	var placeholder = document.getElementById("placeholder");
	if (!placeholder) return false;
	var source = whichpic.getAttribute("herf");
	placeholder.setAttribute("src",source);
	if (!document.getElementById("description")) return false;
	if (whichpic.getAttribute("title")){
		 var text = whichpic.getAttribute("title");
	}
	else{
		 var text = "";
	}
	var description = document.getElementById("description");
	if (description.firstChild.nodeType == 3){ //p元素只有一个子节点，所以选用firstchild
		description.firstChild.nodeValue = text; //来获取文本信息
	}
	return false;
	//console.trace();
}
addLoadEvent(prepareplaceholder);
addLoadEvent(prepareGallery);