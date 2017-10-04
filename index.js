var title;
var xAxis;
var yAxis;
var type;



function submitData(thisButtion){
    var tableAdderKey = document.getElementById("keyInput");
    var tableAdderValue = document.getElementById("valueInput");
    var key = tableAdderKey.value;
    var value = tableAdderValue.value;
    deleteData(thisButtion)    /*删除数据输入行*/
    document.getElementById("tableBody").innerHTML +=
        "<tr> " +
            "<td class=\"keys\">" + key + "</td>" +
            "<td class='values'>" + value + "</td>" +
            "<td> " +
                "<button onclick='deleteData(this);chData()'>" + "－" + "</button>" +
            "</td>" +
        "</tr>" +
        "<tr> " +
            "<td>" + "<input id='keyInput' type='text' placeholder='在此输入key'>" + "</td>" +
            "<td>" + "<input id='valueInput' type='number' placeholder='在此输入value'>" + "</td>" +
            "<td> " +
                "<button onclick='submitData(this);chData()'>＋</button>" +
            "</td>" +
        "</tr>"
}

function deleteData(thisButton) {
    deleteThis = thisButton.parentNode.parentNode;
    deleteThis.parentNode.removeChild(deleteThis);
}












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

var myChart = echarts.init(document.getElementById('echarts'));

var option = {
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};

chData();
chTitle();
chType();
chXAxis();
chYAxis();


myChart.setOption(option);