var type;
function titleCase(str) /*change the first char to upper case*/ {
    var array = str.toLowerCase().split(" ");
    for (var i = 0; i < array.length; i++){
        array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
    }
    return array.join(" ");
}

function delObj(Obj) {Obj.parentNode.removeChild(Obj);}
function deleteLine(thisButton) {delObj(thisButton.parentNode.parentNode);}
function reRepeat(seriesNames) /*remove repeated elements from a given list*/{
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



/*about pieChart table update*/
var pieRows = document.querySelectorAll('#pieDataDisp tbody tr');
var newPieRow = pieRows[0].innerHTML;/*表格第一行内部代码*/
var pieInputRow = pieRows[pieRows.length - 1].innerHTML;/*表格最后一行内部代码*/
function submitPieData() {
    var key = document.querySelectorAll("#pieKeyInput")[0].value;
    var value = document.querySelectorAll("#pieValueInput")[0].value;
    deleteLine(document.querySelectorAll("#pieDataDisp .submitCell button")[0]);
    document.querySelectorAll('#pieDataDisp tbody')[0].innerHTML +=
        '<tr>' + newPieRow + '</tr>' + /*倒数第二行*/
        '<tr>' + pieInputRow + '</tr>'; /*最后一行*/
    var nowRows = document.querySelectorAll('#pieDataDisp tbody tr');
    var lastDataRow = nowRows[nowRows.length - 2];
    lastDataRow.querySelectorAll('td')[0].innerHTML = key;
    lastDataRow.querySelectorAll('td')[1].innerHTML = value;/*finished inserting a new pie with data*/
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



/*about radarChart table update*/
/*del a indicator*/
function delCol(thisButton, colNum) {
    var rows = document.querySelectorAll('#radarDataDisp tr');
    /*del the data cells first*/
    for (var i = 2; i < rows.length; i++){
        var deleteThis = rows[i].getElementsByTagName('td')[colNum];
        delObj(deleteThis);
    }
    /*than delete the cell containing the button*/
    delObj(thisButton.parentNode);
    /*decrease the colspan at last*/
    var newColspan = Number(document.querySelectorAll("#radarValueHead")[0].getAttribute("colspan")) - 1;
    document.querySelectorAll("#radarValueHead")[0].setAttribute('colspan', newColspan);
    /*reorder the argument for identifying finally*/
    resetRadarColNum();
}
function resetRadarColNum() {
    var radarIndiButtons = document.querySelectorAll('#radarTableHead button');
    for (var i = 1; i < radarIndiButtons.length; i++) {
        radarIndiButtons[i].setAttribute('onclick','delRow(this,' + i + ')');
    }
}
/*add a indicator*/
function addCol () {
    /*get the new indicator name*/
    var newIndi = document.querySelectorAll('#addRadarIndi')[0].value;
    /*increase the colspan*/
    var newColspan = Number(document.querySelectorAll("#radarValueHead")[0].getAttribute("colspan")) + 1;
    document.querySelectorAll("#radarValueHead")[0].setAttribute('colspan', newColspan);
    /*add indicators' row*/
    var radarIndis = document.querySelectorAll("#radarDataDisp thead tr")[1];
    radarIndis.innerHTML += '<th>' +
        newIndi + '<button onclick="delCol(this, 0)">－</button>' +
        '</th>';
    /*add data cells' row*/
    var radarDatas = document.querySelectorAll("#radarDataDisp tbody tr");
    var delRowButtonCellHtml = '<td class="values"></td>' +
        '<td><button onclick="deleteLine(this); updateRadarOps()">－</button></td>';
    for (var i = 0; i < radarDatas.length; i++) {
        var thisRow = radarDatas[i];
        var radarDataCells = thisRow.querySelectorAll('td');
        delObj(radarDataCells[radarDataCells.length-1]);
        thisRow.innerHTML += delRowButtonCellHtml
    }
    /*add input cells finally*/
    var addSVButtonHtml = document.querySelectorAll('#radarDataDisp tfoot .submitCell')[0].innerHTML;
    var inputHtml = document.querySelectorAll('#radarDataDisp tfoot td')[1].innerHTML;
    delObj(document.querySelectorAll('#radarDataDisp tfoot .submitCell')[0]);
    document.querySelectorAll('#radarDataDisp tfoot tr')[0].innerHTML += '<td>'+ inputHtml +'</td>' +
        '<td class="submitCell">' + addSVButtonHtml + '</td>';
}
/*update data*/
var radarRows = document.querySelectorAll('#radarDataDisp tbody tr');
var newRadarRow = radarRows[0].innerHTML;/*第一行内部代码*/
var radarInputRow = document.querySelectorAll('#radarDataDisp tfoot tr')[0].innerHTML;
function radarSeriesNames() /*获得含有所有SeriesName的数组*/{
    var Names = [];
    var seriesObj = document.querySelectorAll('#radarDataDisp .seriesNames'); /*第一列的单元格们*/
    for (var i = 0; i < seriesObj.length; i++){
        Names.push(seriesObj[i].innerHTML);
    }
    return Names;
}
function radarOptionCode (SNs) {
    var code = '';
    for (var i = 0; i < SNs.length; i++){
        code += '<option value="'+ SNs[i] +'" class="radarSeriesOps">';
    }
    return code;
}
function updateRadarOps() {
    var onlyRadarSNs = reRepeat(radarSeriesNames());
    document.querySelectorAll('#radarSeries')[0].innerHTML = radarOptionCode(onlyRadarSNs);
}
function submitRadarData() {
    var series = document.querySelectorAll('#radarSeriesNamesChCell input')[0].value;
    var valueObjs = document.querySelectorAll('#radarDataDisp tfoot .valueInputs');
    deleteLine(document.querySelectorAll("#radarDataDisp .submitCell button")[0]);
    /*start to add rows with new data*/
    document.querySelectorAll('#radarDataDisp tbody')[0].innerHTML +=
        '<tr>' + newRadarRow + '</tr>';
    document.querySelectorAll('#radarDataDisp tfoot')[0].innerHTML =
        '<tr>' + radarInputRow + '</tr>';
    var nowRows = document.querySelectorAll('#radarDataDisp tbody tr');
    var lastDataRow = nowRows[nowRows.length - 1];
    lastDataRow.querySelectorAll('td')[0].innerHTML = series;
    LRDataCells = lastDataRow.querySelectorAll('td');
    for (var i = 1; i < LRDataCells.length - 1; i++){
        LRDataCells[i].innerHTML = valueObjs[i-1].value;
    }
    /*just finished inserting a new radar with data*/
    updateRadarOps();
}



/*about the panel*/
function chTitle (chartType) /*universal change titles*/{
    var title = document.querySelectorAll('#'+ chartType +'Title')[0].value;
    eval(chartType +'Option').title.text = title;
    eval('my' + titleCase(chartType) + 'Chart').setOption(eval(chartType +'Option'));
}
function chAxis(chartType, XorY) /*universal change axis titles*/{
    var axis = document.querySelectorAll('#'+ chartType + titleCase(XorY) + 'Axis')[0].value;
    eval(chartType +'Option.'+ XorY +'Axis').name = axis;
    eval('my' + titleCase(chartType) + 'Chart').setOption(eval(chartType +'Option'));
}
function hideAll() {
    var elemsToHide = document.querySelectorAll('.panel, .dataDisp, .echarts');
    for (var i = 0; i < elemsToHide.length; i++){
        elemsToHide[i].setAttribute('hidden', 'hidden');
    }
}
function chType(currentChart) {
    type = document.querySelectorAll('#' + currentChart + 'Type')[0].value;
    hideAll();
    if (type === 'bar'){
        document.querySelectorAll('#barPanel')[0].removeAttribute('hidden');
        document.querySelectorAll('#barDataDisp')[0].removeAttribute('hidden');
        document.querySelectorAll('#barEcharts')[0].removeAttribute('hidden');
    }
    else if (type === 'pie') {
        document.querySelectorAll('#piePanel')[0].removeAttribute('hidden');
        document.querySelectorAll('#pieDataDisp')[0].removeAttribute('hidden');
        document.querySelectorAll('#pieEcharts')[0].removeAttribute('hidden');
    }
    else if (type === 'line') {
        document.querySelectorAll('#linePanel')[0].removeAttribute('hidden');
        document.querySelectorAll('#lineDataDisp')[0].removeAttribute('hidden');
        document.querySelectorAll('#lineEcharts')[0].removeAttribute('hidden');
    }
    else if (type === 'radar'){
        document.querySelectorAll('#radarPanel')[0].removeAttribute('hidden');
        document.querySelectorAll('#radarDataDisp')[0].removeAttribute('hidden');
        document.querySelectorAll('#radarEcharts')[0].removeAttribute('hidden');
    }
    eval('my' + titleCase(type) + 'Chart').setOption(emptyOption);
    eval('my' + titleCase(type) + 'Chart').setOption(eval(type +'Option'));
}


/*to get data*/
function getKVof(SeriesName, chartType) /*return a array of rows of same SeriesName*/{
    
}
function getKey(theRow) /*given a row and return the value of key*/{

}
function getvalue(theRow) /*given a row and return the value of value*/{

}
function getSeriesNames /*get SeriesNames without repetition*/(chartType) {

}
function getTitle(chartType) {

}
function getBarData() {
    var barSeriesName = getUniqueSeries('bar');
    var barKeyName = getUniqueKey('bar');
    for (i = 0; i < barseriesName.length; )

    var barData={
        title:'',
        seriesNames:[],
        values:[]
    }
    barData.title = getTitle('bar');
    barData.seriesNames = getSeriesNames('bar');
    for (??? barData.seriesNames ???){
        getKVof(seriesName, 'bar')
    }

}




/*下面是on"***"事件触发的一些修改Echarts的函数*/

/*function chData() {
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
}*/




/*下面是Echarts部分*/
/*bar chart*/
var myBarChart = echarts.init(document.getElementById('barEcharts'));
var barOption = {
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
myBarChart.setOption(barOption);


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
myRadarChart.setOption(radarOption);

var emptyOption = {};
/*
function resetAll(){
    chData();
    chTitle();
    chXAxis();
    chYAxis();
}*/
/*
/!*按照默认值修改图表*!/
chType();
resetAll();*/

chType('bar');