var title;
var xAxis;
var yAxis;
var type;

function deleteLine(thisButton) {
    var deleteThis = thisButton.parentNode.parentNode;
    deleteThis.parentNode.removeChild(deleteThis);
}
function reRepeat(seriesNames) {
    var arr = [];  
    for(var i = 0; i < seriesNames.length; i++){
        if(arr.indexOf(seriesNames[i]) === -1){
            arr.push(seriesNames[i]);
        }
    }
    return arr
}


/*about barChart table update*/
var barRows = document.querySelectorAll('#barDataDisp tbody tr');
var newBarRow = barRows[0].innerHTML;/*第一行内部代码*/
var barInputRow = barRows[barRows.length - 1].innerHTML;
function barSeriesNames() /*获得含有所有SeriesName的数组*/{
    var Names = [];
    var seriesObj = document.querySelectorAll('#barDataDisp .seriesNames'); /*第一列的单元格们*/
    for (var i = 0; i < seriesObj.length; i++){
        Names.push(seriesObj[i].innerHTML);
    }
    return Names;
}
function barOptionCode (SNs) {
    var code = '';
    for (var i = 0; i < SNs.length; i++){
        code += '<option value="'+ SNs[i] +'" class="barSeriesOps">';
    }
    return code;
}
function updateBarOps() {
    var onlyBarSNs = reRepeat(barSeriesNames());
    document.querySelectorAll('#barSeries')[0].innerHTML = barOptionCode(onlyBarSNs);
}

function submitBarData() {
    var series = document.querySelectorAll('#barSeriesNamesChCell input')[0].value;
    var key = document.querySelectorAll("#barKeyInput")[0].value;
    var value = document.querySelectorAll("#barValueInput")[0].value;
    deleteLine(document.querySelectorAll("#barDataDisp .submitCell button")[0]);
    document.querySelectorAll('#barDataDisp tbody')[0].innerHTML +=
        '<tr>' + newBarRow + '</tr>' +
        '<tr>' + barInputRow + '</tr>';
    var nowRows = document.querySelectorAll('#barDataDisp tbody tr');
    var lastDataRow = nowRows[nowRows.length - 2];
    lastDataRow.querySelectorAll('td')[0].innerHTML = series;
    lastDataRow.querySelectorAll('td')[1].innerHTML = key;
    lastDataRow.querySelectorAll('td')[2].innerHTML = value;/*finished inserting a new bar with data*/
    updateBarOps();
}





/*about lineChart table update*/
var lineRows = document.querySelectorAll('#lineDataDisp tbody tr');
var newLineRow = lineRows[0].innerHTML;/*第一行内部代码*/
var lineInputRow = lineRows[lineRows.length - 1].innerHTML;
function lineSeriesNames() /*获得含有所有SeriesName的数组*/{
    var Names = [];
    var seriesObj = document.querySelectorAll('#lineDataDisp .seriesNames'); /*第一列的单元格们*/
    for (var i = 0; i < seriesObj.length; i++){
        Names.push(seriesObj[i].innerHTML);
    }
    return Names;
}
function lineOptionCode (SNs) {
    var code = '';
    for (var i = 0; i < SNs.length; i++){
        code += '<option value="'+ SNs[i] +'" class="lineSeriesOps">';
    }
    return code;
}
function updateLineOps() {
    var onlyLineSNs = reRepeat(lineSeriesNames());
    document.querySelectorAll('#lineSeries')[0].innerHTML = lineOptionCode(onlyLineSNs);
}

function submitLineData() {
    var series = document.querySelectorAll('#lineSeriesNamesChCell input')[0].value;
    var key = document.querySelectorAll("#lineKeyInput")[0].value;
    var value = document.querySelectorAll("#lineValueInput")[0].value;
    deleteLine(document.querySelectorAll("#lineDataDisp .submitCell button")[0]);
    document.querySelectorAll('#lineDataDisp tbody')[0].innerHTML +=
        '<tr>' + newLineRow + '</tr>' +
        '<tr>' + lineInputRow + '</tr>';
    var nowRows = document.querySelectorAll('#lineDataDisp tbody tr');
    var lastDataRow = nowRows[nowRows.length - 2];
    lastDataRow.querySelectorAll('td')[0].innerHTML = series;
    lastDataRow.querySelectorAll('td')[1].innerHTML = key;
    lastDataRow.querySelectorAll('td')[2].innerHTML = value;/*finished inserting a new line with data*/
    updateLineOps();
}










/*下面是on"***"事件触发的一些修改Echarts的函数*/
function chTitle() {
    title = document.getElementById("title").value;
    option.title.text = title;
    myChart.setOption(option);
}
function chXAxis() {
    xAxis = document.getElementById("xAxis").value;
    option.xAxis.name = xAxis;
    myChart.setOption(option);
}
function chYAxis() {
    yAxis = document.getElementById("yAxis").value;
    option.yAxis.name = xAxis;
    myChart.setOption(option);
}
function chType() {
    type = document.getElementById("type").value;
    /*    option.series[0].type = type;
        if (type === "pie"){
            document.getElementById("dataDisp").innerHTML = defaultTable
            resetAll()
    }*/
    myChart.setOption(option);
}

function chData() {
    var keys = [];
    var keyCells = document.getElementsByClassName("keys");
    for (var i = 0; i < keyCells.length; i++){
        keys.push(keyCells[i].innerHTML);
    }
    var values = [];
    var valueCells = document.getElementsByClassName("values");
    for (var i_ = 0; i_ < valueCells.length; i_++){
        values.push(valueCells[i_].innerHTML);
    }

    option.xAxis.data = keys;
    option.series[0].data = values;
    myChart.setOption(option);
}

/*下面是Echarts部分*/
/*bar chart*/
var myChart = echarts.init(document.getElementById('echarts'));
var option = {
    title: {
        text: 'barECharts 示例'
    },
    tooltip: {},
    legend: {
        data:['销量', '利润']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [
        {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        },
        {
            name: '利润',
            type: 'bar',
            data: [20,  10, 10, 20, 36,5]
        }


    ],
    toolbox: {
        feature:{
            saveAsImage: {
                name: "CodingNow!-demoImage",
                title: "下载"
            }
        }
    }
};
myChart.setOption(option);


/*pie chart*/
var myPieChart = echarts.init(document.getElementById('pieEcharts'));
var pieOption = {
    title: {
        text: 'pieECharts 示例'
    },
    tooltip: {},
    series: [{
        name: '销量',
        type: 'pie',
        roseType: 'angle',
        data: [
            {value:235, name:'视频广告'},
            {value:274, name:'联盟广告'},
            {value:310, name:'邮件营销'},
            {value:335, name:'直接访问'},
            {value:400, name:'搜索引擎'}
            ]
    }],
    toolbox: {
        feature:{
            saveAsImage: {
                name: "CodingNow!-demoImage",
                title: "下载"
            }
        }
    }
};
myPieChart.setOption(pieOption);


/*line chart*/
var myLineChart = echarts.init(document.getElementById('lineEcharts'));
var lineOption = {
    title: {
        text: 'lineECharts 示例'
    },
    tooltip: {},
    legend: {
        data:['销量', '利润']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [
        {
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
        },
        {
            name: '利润',
            type: 'line',
            data: [20, 36, 10, 10, 20, 5]
        }
    ],
    toolbox: {
        feature:{
            saveAsImage: {
                name: "CodingNow!-demoImage",
                title: "下载"
            }
        }
    }
};
myLineChart.setOption(lineOption);


/*radar chart*/
var myRadarChart = echarts.init(document.getElementById('radarEcharts'));
var radarOption = {
    title: {
        text: 'radarECharts 示例'
    },
    tooltip: {},/*hover提示*/
    radar: {
        indicator: [
            { text: '指标一' },
            { text: '指标二' },
            { text: '指标三' },
            { text: '指标四' },
            { text: '指标五' }
        ],
        center: ['50%', '50%'],
        radius: '80%',
        startAngle: 90,
        splitNumber: 4,
        shape: 'circle',
        name: {
            formatter:'【{value}】',
            textStyle: {
                color:'#72ACD1'
            }
        },
        splitArea: {
            areaStyle: {
                color: ['#B8D3E4', '#96C5E3', '#7DB5DA', '#72ACD1']
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.8)'
            }
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: 'white'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.4)'
            }
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.4)'
            }
        }
    },
    legend:{
        bottom: 5,
        data: ['系列1', '系列2'],
        itemGap: 20,
        textStyle: {
            color: '#7bbaff',
            fontSize: 14
        },
        selectedMode: 'single'
    },
    series: [
        {
            name:'系列1',
            type:'radar',
            data:[
                [3,5,2,1,4],
                [5,3,4,1,5]
            ]
        },
        {
            name:'系列2',
            type:'radar',
            data:[
                [2,3,1,7,6],
                [1,6,7,3,2]
            ]
        }




    ]

};
myRadarChart.setOption(radarOption);



function resetAll(){
    chData();
    chTitle();
    chXAxis();
    chYAxis();
}
/*
/!*按照默认值修改图表*!/
chType();
resetAll();*/
