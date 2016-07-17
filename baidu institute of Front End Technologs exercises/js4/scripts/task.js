/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    //if (!document.getElementById) return false;
    var aqiCity = document.getElementById("aqi-city-input").value.trim();
    var aqiValue = document.getElementById("aqi-value-input").value.trim();
 	    var re = /^[a-zA-Z\u4E00-\u9FA5]+/;
 	    if (!aqiCity.match(re)) {
            alert("input is error,please input again");
 	    }

    	var vre = /^\d+$/g;
    	if (!aqiValue.match(vre)) {
            alert("input is error,please input again");
 	    }
        if(aqiValue.match(vre) && aqiCity.match(re))
    	aqiData[aqiCity] = aqiValue;
//此处我用test方法了，得不到正确的答案
//
    
}

/**
 * 渲染aqi-table表格
 */
console.log(aqiData);
function renderAqiList() {
    var aqitable = document.getElementById("aqi-table");
    //var aqiItem = document.createElement("tr");
    aqitable.innerHTML = "";
    // alert("wer"); 
   // aqitable.appendChild(aqiItem);
    
    for ( var aqiCity in aqiData) {
    	if (aqitable.childNodes.length === 0) {
    		// alert("wer"); 
            aqitable.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
        } 
       // alert("wer");   
        aqitable.innerHTML =  aqitable.innerHTML + "<tr><td>" + aqiCity + "</td><td>" + aqiData[aqiCity] + "</td><td><button class = 'delbtn'>删除</button></td></tr>";
        
        

    }

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
	var aqitr = target.parentElement.parentElement;
	delete aqiData[aqitr.children[0].innerHTML];
	renderAqiList();
  // do sth.
  
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addbtn = document.getElementById("add-btn");
    addbtn.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var aqitable = document.getElementById("aqi-table");
    var delbtn = aqitable.getElementsByClassName("del-btn");
    aqitable.addEventListener("click",function(e)
    {
    	if (e.target && e.target.nodeName == "BUTTON") {
    		delBtnHandle(e.target);
    	}
    });

}

init();
