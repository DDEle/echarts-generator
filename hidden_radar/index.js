alert('CodingNow! 是 SESAxCPU 唯一理工科组织+唯一计算机社团联合举办、面向小白的编程教学活动，你即将看到的是' +
    '本活动的成品展示——只要认真跟着学，你也能能做出这样炫酷的网页！\n' +
    '\n' +
    '使用说明:\n' +
    '    第一部分是图表的一些选项，除了图表类型以外的部分都是修改成想要的内容便可以直接体现在下面的图表上。\n' +
    '    第二部分是图表的本体，它由百度开发的Echars生成，CodingNow! 课堂将会以这个为切入点详细讲解前端编程技巧。\n' +
    '    第三部分是图表的数据，由表格形式呈现，你可以点击上面的按钮自由添加/删除数据。\n' +
    '    点击确定即可查看 CodingNow! 报名链接以及本演示图表。');
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
    alert('由于一些未知错误，删增雷达图坐标功能暂时不可用，会产生未知的显示错误，敬请谅解！');
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
    alert('由于一些未知错误，删增雷达图坐标功能暂时不可用，会产生未知的显示错误，敬请谅解！');
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
        '<td><button onclick="deleteLine(this);updateRadarOps();updateRadarData()">－</button></td>';
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
        updateBarData();
    }
    else if (type === 'pie') {
        document.querySelectorAll('#piePanel')[0].removeAttribute('hidden');
        document.querySelectorAll('#pieDataDisp')[0].removeAttribute('hidden');
        document.querySelectorAll('#pieEcharts')[0].removeAttribute('hidden');
        updatePieData();
    }
    else if (type === 'line') {
        document.querySelectorAll('#linePanel')[0].removeAttribute('hidden');
        document.querySelectorAll('#lineDataDisp')[0].removeAttribute('hidden');
        document.querySelectorAll('#lineEcharts')[0].removeAttribute('hidden');
        updateLineData();
    }
    else if (type === 'radar'){
        document.querySelectorAll('#radarPanel')[0].removeAttribute('hidden');
        document.querySelectorAll('#radarDataDisp')[0].removeAttribute('hidden');
        document.querySelectorAll('#radarEcharts')[0].removeAttribute('hidden');
        updateRadarData();
    }
    /*reset default selected option*/
    var allOptions = document.querySelectorAll('.panel select option');
    for (var i = 0; i < allOptions.length; i++)/*un-select all*/{
        allOptions[i].removeAttribute('selected');
    }
    document.querySelectorAll('#barPanel select option')[0].setAttribute('selected','selected');
    document.querySelectorAll('#piePanel select option')[1].setAttribute('selected','selected');
    document.querySelectorAll('#linePanel select option')[2].setAttribute('selected','selected');
    document.querySelectorAll('#radarPanel select option')[3].setAttribute('selected','selected');
}


/*to get data*/
function getRows(chartType) /*return a array of rows of same SeriesName*/{
    var Trs = [...document.querySelectorAll('#' + chartType + 'DataDisp tbody tr')];
    return Trs.slice(0, Trs.length - 1);
    /*this nested function is working*/
}
function getAllRows(chartType) {
    var Trs = [...document.querySelectorAll('#' + chartType + 'DataDisp tbody tr')];
    return Trs.slice(0, Trs.length);
}
function getSeriesName /*get series name for a given row*/(theRow) {
    return theRow.querySelectorAll('.seriesNames')[0].innerHTML
    /*this nested function is working*/
}
function getKeyName(theRow) /*given a row and return the value of key*/{
    return theRow.querySelectorAll('.keys')[0].innerHTML
    /*this nested function is working*/
}
function getIndicators() {
    var Ths = document.querySelectorAll('#radarDataDisp thead tr')[1].querySelectorAll('th');
    var indicators = [];
    for (var i = 0; i < Ths.length; i++){
        var innerTh = Ths[i].innerHTML;
        innerTh = innerTh.replace(/<button[\s\S]*\/button>/, '');
        indicators[i] = innerTh;
    }
    return indicators;
}
function getValue(theRow) /*given a row and return the value of value*/{
    return theRow.querySelectorAll('.values')[0].innerHTML
    /*this nested function is working*/
}
function getRadarValues(theRow) {
    var valueCells = theRow.querySelectorAll('.values');
    var values = [];
    for(var i = 0; i < valueCells.length; i++){
        values[i] = parseFloat(valueCells[i].innerHTML);
    }
    return values
}
/*about algorithm*/
function makeUniGetter(getter)
    /*e.g. makeUniGetter(getKeyName)('bar') returns a array of unique key names of bar chart data table*/
{
    return function (chartType) {
        var Rows = getRows(chartType);
        if (chartType === 'radar'){
            Rows = getAllRows(chartType);
        }
        var STHs = new Array(Rows.length);
        for (var i = 0; i < Rows.length; i++) {
            STHs[i] = getter(Rows[i]);
        }
        return reRepeat(STHs);
        /*this nested function is working*/
    };
}
function getIndexs(SNs, KNs, theRow) {
    var SN = getSeriesName(theRow);
    var KN = getKeyName(theRow);
    return [SNs.indexOf(SN),KNs.indexOf(KN)]
}
function getIndexForPie(KNs, theRow) {
    var KN = getKeyName(theRow);
    return KNs.indexOf(KN)
}
function getIndexForRadar(SNs, theRow) {
    var SN = getSeriesName(theRow);
    return SNs.indexOf(SN)
}
function getGreatest(Nums) {
    var max = Nums[0];
    for(var i=1; i < Nums.length; i++){
        if(max<Nums[i]){max=Nums[i];}
    }
    return max;
}
function getGrrrrrrest(arrayOfNums){
    var max = getGreatest(arrayOfNums[0]);
    for (var i=1; i < arrayOfNums.length; i++){
        if(max < getGreatest(arrayOfNums[i])){
            max = getGreatest(arrayOfNums[i]);
        }
    }
    return max;
}


/*about operating barEChart */
function getBarData() {
    var barSeriesNames = makeUniGetter(getSeriesName)('bar');
    var barKeyNames = makeUniGetter(getKeyName)('bar');
    var barRows = getRows('bar');
    /*make a array of array of zeros*/
    var barData =new Array(barSeriesNames.length);
    for (var i = 0; i < barSeriesNames.length; i++){
        barData[i] = new Array(barKeyNames.length);
        for (var k = 0; k < barKeyNames.length; k++){
            barData[i][k] = 0;/*assign the inner array zeros*/
        }
    }
    for (var j = 0; j < barRows.length; j++){
        var barRow = barRows[j];
        var SN_KN = getIndexs(barSeriesNames,barKeyNames,barRow);
        barData[SN_KN[0]][SN_KN[1]] =
            getValue(barRow);
    }
    return[barSeriesNames, barKeyNames, barData]
}
function updateBarData() {
    barOption.legend.data = getBarData()[0];
    barOption.xAxis.data = getBarData()[1];
    var newSeries = new Array();
    for (var i = 0; i < getBarData()[0].length; i++){
        newSeries[i] = {name:'', type:'bar', data:''};
        newSeries[i].name = getBarData()[0][i];
        newSeries[i].data = getBarData()[2][i];
    }
    barOption.series = newSeries;
    echarts.dispose(document.getElementById('barEcharts'));
    myBarChart = echarts.init(document.getElementById('barEcharts'));
    myBarChart.setOption(barOption);
}


/*about operating pieEChart */
function getPieData() {
    var pieKeyNames = makeUniGetter(getKeyName)('pie');
    var pieRows = getRows('pie');
    /*make a array of zeros*/
    var pieData =new Array(pieKeyNames.length);
    for (var k = 0; k < pieKeyNames.length; k++){
        pieData[k] = 0;/*assign the inner array zeros*/
    }
    for (var j = 0; j < pieRows.length; j++){
        var pieRow = pieRows[j];
        var KN = getIndexForPie(pieKeyNames,pieRow);
        pieData[KN] =
            getValue(pieRow);
    }
    return[pieKeyNames, pieData]
}
function updatePieData() {
    var newSeriesData = new Array();
    for (var i = 0; i < getPieData()[0].length; i++){
        newSeriesData[i] = {name:'', value:0};
        newSeriesData[i].name = getPieData()[0][i];
        newSeriesData[i].value = getPieData()[1][i];
    }
    pieOption.series.data = newSeriesData;
    echarts.dispose(document.getElementById('pieEcharts'));
    myPieChart = echarts.init(document.getElementById('pieEcharts'));
    myPieChart.setOption(pieOption);
}


/*about operating lineEChart */
function getLineData() {
    var lineSeriesNames = makeUniGetter(getSeriesName)('line');
    var lineKeyNames = makeUniGetter(getKeyName)('line');
    var lineRows = getRows('line');
    /*make a array of array of zeros*/
    var lineData =new Array(lineSeriesNames.length);
    for (var i = 0; i < lineSeriesNames.length; i++){
        lineData[i] = new Array(lineKeyNames.length);
        for (var k = 0; k < lineKeyNames.length; k++){
            lineData[i][k] = 0;/*assign the inner array zeros*/
        }
    }
    for (var j = 0; j < lineRows.length; j++){
        var lineRow = lineRows[j];
        var SN_KN = getIndexs(lineSeriesNames,lineKeyNames,lineRow);
        lineData[SN_KN[0]][SN_KN[1]] =
            getValue(lineRow);
    }
    return[lineSeriesNames, lineKeyNames, lineData]
}
function updateLineData() {
    lineOption.legend.data = getLineData()[0];
    lineOption.xAxis.data = getLineData()[1];
    var newSeries = new Array();
    for (var i = 0; i < getLineData()[0].length; i++){
        newSeries[i] = {name:'', type:'line', data:''};
        newSeries[i].name = getLineData()[0][i];
        newSeries[i].data = getLineData()[2][i];
    }
    lineOption.series = newSeries;
    echarts.dispose(document.getElementById('lineEcharts'));
    myLineChart = echarts.init(document.getElementById('lineEcharts'));
    myLineChart.setOption(lineOption);
}



/*about operating radarEChart*/
function getRadarData() {
    var radarSeriesNames = makeUniGetter(getSeriesName)('radar');
    var radarIndicators = getIndicators();
    var radarRows = getAllRows('radar')/*checked*/;
    /*make a array of nul*/
    var radarData = new Array(radarSeriesNames.length);
    for (var i = 0; i < radarSeriesNames.length; i++){
        radarData[i] = [];
    }
    for (var j = 0; j < radarRows.length; j++){
        var radarRow = radarRows[j];
        var seriesIndex = getIndexForRadar(radarSeriesNames, radarRow);
//        console.log(radarData);
//        console.log(seriesIndex);
        radarData[seriesIndex].push(getRadarValues(radarRow));
    }
    return[radarSeriesNames, radarIndicators, radarData];
}
function updateRadarData() {
    radarOption.legend.data = getRadarData()[0];
    var indicators = getRadarData()[1];
    var newIndicator = [];
    var maxValue = getGreatest(getRadarData()[2][0][0]);/*init max value*/
    for (var k = 0; k < getRadarData()[2].length; k++){
        if (maxValue < getGrrrrrrest(getRadarData()[2][k])){
            maxValue = getGrrrrrrest(getRadarData()[2][k])
        }
    }
    for (var i =0; i < indicators.length; i++){
        newIndicator[i] = {
            name: indicators[i],
            max: maxValue
        }
    }
    var newSeries = [];
    for (var j = 0; j < getRadarData()[0].length; j++){
        newSeries[j] = {
            name:'',
            data:'',
            type:'radar',
            symbol: 'none',
            itemStyle: {
                normal: {color: ''}
            },
            lineStyle: {normal: {width: 1, opacity: 0.5}},
            areaStyle: {normal: {opacity: 0.05}}
        };
        newSeries[j].name = getRadarData()[0][j];
        newSeries[j].data = getRadarData()[2][j];
        newSeries[j].itemStyle.normal.color = myItemStyleColor[j % 6];
    }
    radarOption.radar.indicator = newIndicator;
    radarOption.series = newSeries;
    echarts.dispose(document.getElementById('radarEcharts'));
    myRadarChart = echarts.init(document.getElementById('radarEcharts'));
    myRadarChart.setOption(radarOption);
}











/*下面是Echarts部分*/
/*bar chart*/
var myBarChart = echarts.init(document.getElementById('barEcharts'));
var barOption = {
    title: {
        text: 'barECharts 示例'
    },
    tooltip: {},
    legend: {
        data:['销量', '利润'],
        bottom: 5
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
    backgroundColor: '#2c343c',

    title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip : {
        trigger: 'item'
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:274, name:'联盟广告'},
                {value:235, name:'视频广告'},
                {value:400, name:'搜索引擎'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut'
        }
    ]
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
        data:['销量', '利润'],
        bottom: 5
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

chType('pie');
chTitle('bar');
chTitle('pie');
chTitle('line');
chTitle('radar');
chAxis('bar', 'x');chAxis('bar', 'y');
chAxis('line', 'x');chAxis('line', 'y');