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
    pieOption.series =[{
        type: 'pie',
        roseType: "angle",
        data: newSeriesData
    }];
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
        bottom: 3,
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
// baidu's demo
var dataBJ = [
    [55,9,56,0.46,18,6,1],
    [25,11,21,0.65,34,9,2],
    [56,7,63,0.3,14,5,3],
    [33,7,29,0.33,16,6,4],
    [42,24,44,0.76,40,16,5],
    [82,58,90,1.77,68,33,6],
    [74,49,77,1.46,48,27,7],
    [78,55,80,1.29,59,29,8],
    [267,216,280,4.8,108,64,9],
    [185,127,216,2.52,61,27,10],
    [39,19,38,0.57,31,15,11],
    [41,11,40,0.43,21,7,12],
    [64,38,74,1.04,46,22,13],
    [108,79,120,1.7,75,41,14],
    [108,63,116,1.48,44,26,15],
    [33,6,29,0.34,13,5,16],
    [94,66,110,1.54,62,31,17],
    [186,142,192,3.88,93,79,18],
    [57,31,54,0.96,32,14,19],
    [22,8,17,0.48,23,10,20],
    [39,15,36,0.61,29,13,21],
    [94,69,114,2.08,73,39,22],
    [99,73,110,2.43,76,48,23],
    [31,12,30,0.5,32,16,24],
    [42,27,43,1,53,22,25],
    [154,117,157,3.05,92,58,26],
    [234,185,230,4.09,123,69,27],
    [160,120,186,2.77,91,50,28],
    [134,96,165,2.76,83,41,29],
    [52,24,60,1.03,50,21,30],
    [46,5,49,0.28,10,6,31]
];
var dataGZ = [
    [26,37,27,1.163,27,13,1],
    [85,62,71,1.195,60,8,2],
    [78,38,74,1.363,37,7,3],
    [21,21,36,0.634,40,9,4],
    [41,42,46,0.915,81,13,5],
    [56,52,69,1.067,92,16,6],
    [64,30,28,0.924,51,2,7],
    [55,48,74,1.236,75,26,8],
    [76,85,113,1.237,114,27,9],
    [91,81,104,1.041,56,40,10],
    [84,39,60,0.964,25,11,11],
    [64,51,101,0.862,58,23,12],
    [70,69,120,1.198,65,36,13],
    [77,105,178,2.549,64,16,14],
    [109,68,87,0.996,74,29,15],
    [73,68,97,0.905,51,34,16],
    [54,27,47,0.592,53,12,17],
    [51,61,97,0.811,65,19,18],
    [91,71,121,1.374,43,18,19],
    [73,102,182,2.787,44,19,20],
    [73,50,76,0.717,31,20,21],
    [84,94,140,2.238,68,18,22],
    [93,77,104,1.165,53,7,23],
    [99,130,227,3.97,55,15,24],
    [146,84,139,1.094,40,17,25],
    [113,108,137,1.481,48,15,26],
    [81,48,62,1.619,26,3,27],
    [56,48,68,1.336,37,9,28],
    [82,92,174,3.29,0,13,29],
    [106,116,188,3.628,101,16,30],
    [118,50,0,1.383,76,11,31]
];
var dataSH = [
    [91,45,125,0.82,34,23,1],
    [65,27,78,0.86,45,29,2],
    [83,60,84,1.09,73,27,3],
    [109,81,121,1.28,68,51,4],
    [106,77,114,1.07,55,51,5],
    [109,81,121,1.28,68,51,6],
    [106,77,114,1.07,55,51,7],
    [89,65,78,0.86,51,26,8],
    [53,33,47,0.64,50,17,9],
    [80,55,80,1.01,75,24,10],
    [117,81,124,1.03,45,24,11],
    [99,71,142,1.1,62,42,12],
    [95,69,130,1.28,74,50,13],
    [116,87,131,1.47,84,40,14],
    [108,80,121,1.3,85,37,15],
    [134,83,167,1.16,57,43,16],
    [79,43,107,1.05,59,37,17],
    [71,46,89,0.86,64,25,18],
    [97,71,113,1.17,88,31,19],
    [84,57,91,0.85,55,31,20],
    [87,63,101,0.9,56,41,21],
    [104,77,119,1.09,73,48,22],
    [87,62,100,1,72,28,23],
    [168,128,172,1.49,97,56,24],
    [65,45,51,0.74,39,17,25],
    [39,24,38,0.61,47,17,26],
    [39,24,39,0.59,50,19,27],
    [93,68,96,1.05,79,29,28],
    [188,143,197,1.66,99,51,29],
    [174,131,174,1.55,108,50,30],
    [187,143,201,1.39,89,53,31]
];
var lineStyle = {
    normal: {
        width: 1,
        opacity: 0.5
    }
};
radarOption = {
    // tooltip: {},/*hover提示*/
    backgroundColor: '#161627',
    title: {
        text: '雷达图',
        textStyle: {
            color: '#eee'
        }
    },
    legend: {
        bottom: 0,
        data: ['北京', '上海', '广州'],
        itemGap: 5,
        textStyle: {
            color: '#fff',
            fontSize: 12
        },
        selectedMode: 'single'
    },
    radar: {
        indicator: [
            {name: 'AQI', max: 300},
            {name: 'PM2.5', max: 250},
            {name: 'PM10', max: 300},
            {name: 'CO', max: 5},
            {name: 'NO2', max: 200},
            {name: 'SO2', max: 100}
            /*auto if max is not assigned*/
        ],
        shape: 'circle',
        splitNumber: 5,
        name: {textStyle: /*color of indicator text*/{color: 'rgb(238, 197, 102)'}},
        splitLine: {
            lineStyle: {
                color: [
                    'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                    'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                    'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                ].reverse()
            }
        },
        splitArea: {show: false},
        axisLine: {lineStyle: {color: 'rgba(238, 197, 102, 0.5)'}},
        axisLable: {show: true}
    },
    series: [
        {
            name: '北京',
            type: 'radar',
            lineStyle: {
                normal: {
                    width: 1,
                    opacity: 0.5
                }
            },
            data: dataBJ/*a array of arrays*/,
            symbol: 'none',
            itemStyle: {
                normal: {
                    color: '#F9713C'
                }
            },
            areaStyle: {
                normal: {
                    opacity: 0.1
                }
            }
        },
        {
            name: '上海',
            type: 'radar',
            lineStyle: {
                normal: {
                    width: 1,
                    opacity: 0.5
                }
            },
            data: dataSH,
            symbol: 'none',
            itemStyle: {
                normal: {
                    color: '#B3E4A1'
                }
            },
            areaStyle: {
                normal: {
                    opacity: 0.05
                }
            }
        },
        {
            name: '广州',
            type: 'radar',
            lineStyle: {
                normal: {
                    width: 1,
                    opacity: 0.5
                }
            },
            data: dataGZ,
            symbol: 'none',
            itemStyle: {
                normal: {
                    color: 'rgb(238, 197, 102)'
                }
            },
            areaStyle: {
                normal: {
                    opacity: 0.05
                }
            }
        }
    ]
};
var myItemStyleColor = [
    '#F9713C',
    '#B3E4A1',
    '#eec566',
    '#df79f9',
    '#6c92f9',
    '#f96384'
];
myRadarChart.setOption(radarOption);

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
chTitle('bar');
chTitle('pie');
chTitle('line');
chTitle('radar');
chAxis('bar', 'x');chAxis('bar', 'y');
chAxis('line', 'x');chAxis('line', 'y');