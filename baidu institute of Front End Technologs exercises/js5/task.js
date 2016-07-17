/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();//获取当前的时间
  var m = dat.getMonth() + 1;//获取当前的月份
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
};

/**
 * 渲染图表
 */
var cityselect = document.getElementById("city-select");
//console.log(aqiChartWrap = document.getElementsByTagName("aqi-chart-wrap").innerHTML);
function renderChart() {
    var color = "";
    var items = "";
   // alert("sfds");
    for (var i in chartData) {
      color = "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
      //items += "<div title = '+ i + " " + chartData[i]'  + " >";
     //items +="<div>sfddagfgda</div>";
     //alert("sfds");

      items += "<div title = '" + i + "  空气质量:" + chartData[i] + "'style = 'height:" + chartData[i] + "px; background-color: " + color +";'></div>";

    }
    document.getElementById("aqi-chart-wrap").innerHTML = items;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
    if (pageState.nowGraTime == this.value) {
      return;
    } else {
      pageState.nowGraTime = this.value;
    }
  // 设置对应数据
    initAqiChartData(); 
  // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  if (pageState.nowSelectCity == this.value) {
    return;
  } else {
    pageState.nowSelectCity = this.value;
  }
  // 设置对应数据
    initAqiChartData();
  // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var formgratime = document.getElementById("form-gra-time");
    var grainput = formgratime.getElementsByTagName("input");
   // for (var i in grainput) {//为什么这个不一样，这个会有六个，说明包括关闭标签
      for (var i = 0; i < grainput.length; i++) {
      grainput[i].onclick = graTimeChange;
       //alert("hihi");
    }
    
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    
    //cityselect.innerHTML = "";
    var cityitem = "";
    for (var i in aqiSourceData) {
        cityitem += "<option>" + i + "</option>";
        
    }
    cityselect.innerHTML = cityitem;
   // console.log(cityselect.innerHTML);
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
    cityselect.onchange = citySelectChange;//jQuery中使用change，而js是onchange
    //alert("sdfdsgf");
}
//console.log(cityselect.innerHTML);
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
    //for (var i in aqiSourceData) {
      //if(pageState.nowSelectCity === i)
  
   var aqiNow = aqiSourceData[pageState.nowSelectCity];
   //for (var i in aqiNow) {
 console.log(aqiNow);
  // }
   if (pageState.nowGraTime == "day") {
    chartData = aqiNow; 
    console.log(chartData);

   } 
   if (pageState.nowGraTime == "week") {
   /* var dataset = "";
    //var datavalue = "";
    var j = 0;
   
    for (var key in aqiNow) {
      dataset[j][0] = key;
      dataset[j][1] = aqiNow[key];
      j++;
    }
    //取得一个月第一天是周几
    var onestr = dataset[0].getday();
    //取得这一个月的最大天数
    var monstr = new Date(dataset[j][0].getFullYear(), dataset[j][0].getMonth(), 0);
    var monthnum =  monstr.getDate();
    //第一周的平均数
    var sum1 = 0;
    var oneweek = 0;
    //var weeknum =["一","二","三","四"];
    if (onestr === 0) {
      oneweek = 1;
    } else {
       oneweek= 8-onestr;
    }
    var ii = 0;
    for ( ; ii < oneweek; ii++ ) {
       sum1 +=  dataset[ii][1];

    }
    chartData[0] = sum1 / oneweek;
    sum1 = 0;

    //计算中间全是七天的周的空气质量的平均值
    var  weeknum = (monthnum - oneweek) % 7;//一共有几周
    var lastweek = (monthnum - oneweek) / 7;
    for (var m = 1; m < weeknum; m++) {
             for ( ; ii < (m*7+oneweek); ii++) {
               sum1 += dataset[ii][1];
             }
             chartData[m] = sum1 / 7;
             sum1 = 0;
        }
    
    if (!lastweek) {
       for ( ;ii < monthnum; ii++) {
         sum1 += dataset[ii][1];
       }
       chartData['第' + (weeknum + 1) + '周'] = sum1 / lastweek; 
       //month ++;
    }
  */
  //alert("sfd");
 chartData = { };
 var sum = 0;
 var week = 1;
 var month = 0;
 var monthmaxnum = 0;
 var daysum = 0;
 var countsum = 0;
 var xx = [];
 var yy = 0;
    for (var item in aqiNow) {
      var date = new Date(item);
      console.log(item);
      if (date.getMonth() === month) {
        
         monthmaxnum =  (new Date(date.getFullYear(), (parseInt(date.getMonth(),10)+1), 0)).getDate();
         //获取月份发生错误，有好几种方法，我最开始采用的是data.getMonth()
         //http://jishu.admin5.com/biancheng/131217/419.html
        xx[yy++] = monthmaxnum;
        console.log(xx);
         //console.log(monthmaxnum);
         sum += aqiNow[item];
         daysum++;
         countsum++;
        if (date.getDay() === 0 ) {
          chartData[date.getFullYear() + '-' + (date.getMonth()+1) + '月' +'第' + week + '周'] = Math.floor(sum / countsum);
          week++;
          countsum = 0;
          sum = 0;
          
        }
        if(date.getDay() !== 0 && daysum === monthmaxnum) {
          chartData[date.getFullYear() + '-' + (date.getMonth()+1) + '月' + '第' + week + '周'] = Math.floor(sum / countsum);
          sum = 0;
          //week = 1;
         // month++;
        }
        if(daysum === monthmaxnum) {
            week = 1;
            month ++;
            daysum = 0;
          }
      }

    }
  // console.log(chartData);
   }
  // 按月计算
  if (pageState.nowGraTime == "month"){
    chartData = { };
    var sum = 0;
    var daysum = 0;
    var month = 0; 
   // var date = new Date("")
    for (var item in aqiNow) {
      if (new Date(item).getMonth() === month)
      {
        sum += aqiNow[item];
        daysum++; 
      }
       
       if (new Date(item).getMonth() !== month) {
        
        chartData['第' + (month+1) + '月'] = Math.floor(sum / daysum);
        month++;
        daysum = 1;
        sum = aqiNow[item]; //这个一点是结合点评和前人的例子得到的
       }
    }
    if (daysum !==1) {
      chartData['第' + (month+1) + '月'] = Math.floor(sum / daysum);
    }
    //}
  }
  //console.log(chartData);
  // 处理好的数据存到 chartData 中
       
}
//console.log(chartData);
/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
//https://github.com/Phoebe-Perry/ife_baidu_2016/tree/gh-pages/second_phase/ife-baidu_task_17