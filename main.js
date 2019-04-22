var areaList=["华东","华南","华北"];
var productList=["手机","笔记本","智能音箱"];
window.onload=function(){
    produceCheckBox("selectArea",areaList);
    produceCheckBox("selectProduct",productList);
};

var selectArea=document.querySelector("#selectArea");
var fieldset=document.querySelector("fieldset");
var selectedRegion=[];
var selectedProduct=[];
var selectedData=[];
fieldset.onclick=function(){
    selectedData=filterSaleData(selectedProduct,selectedRegion,sourceData);
    var table_wrapper=document.querySelector("#table-wrapper");
    table_wrapper.innerHTML= tableHtmlGenerator(selectedRegion,selectedProduct,selectedData);

};

selectArea.onclick= function(e){
    //selectedRegion是选择的列表项下标，从0开始，0为全选按钮是否勾选
    selectedRegion=handleSelectGroup(e,"selectArea");

    for(var i in selectedRegion)
    {
        //因为areaList将全选这个项删除，所以列表序号减一
        selectedRegion[i]=areaList[selectedRegion[i]-1];
    }
};
selectProduct.onclick=function(e){
    selectedProduct=handleSelectGroup(e,"selectProduct");
    for(var i in selectedProduct)
    {
        selectedProduct[i]=productList[selectedProduct[i]-1];
    }
};

function produceCheckBox(wrapDiv,valueList){
    var innerHtml="<input type=\"checkbox\" id=\"all\"/>全选<br/>";
    for(var i=0;i<valueList.length;i++)
    {
        innerHtml=innerHtml+"<input type=\"checkbox\"/>"+valueList[i]+"<br/>";
    }
    document.querySelector("#"+wrapDiv).innerHTML=innerHtml;
}

function handleSelectGroup(e,wrapId){
    var cInputs=document.querySelectorAll("#"+wrapId+">input");
    var selectedItemLocal=[];
    if (e.target.id === "all") {
        // console.log("你单击了全选");
        var selectAll=false;
        //此时单击复选框已经起了作用
        if(e.target.checked===true)
        {
            selectAll=true;
        }
        for (let i = 1; i < cInputs.length; i++) {
            cInputs[i].checked = selectAll;
            selectedItemLocal.push(i);
       }
    }
    else{
        var len=cInputs.length;
        var checkedNum=0;
        for (let i = 1; i < len; i++) {
            if(cInputs[i].checked ===true)
            {
                // console.log(cInputs[i].checked);
                checkedNum++;
                selectedItemLocal.push(i);
            }
        }
        var selectAll=document.querySelector("#"+wrapId+">#all");
        if(checkedNum==len-1)
            selectAll.checked=true;
        else
            selectAll.checked=false;
    }
    return selectedItemLocal;
}
function filterSaleData(selectedproduct,selectedregion,sourceData){
    filteredData=[];
    for(i in sourceData)
    {
        if(selectedproduct.indexOf(sourceData[i].product)>-1&&
            selectedregion.indexOf(sourceData[i].region)>-1)
        {
            filteredData.push(sourceData[i]);
        }
    }
    return filteredData;

}
function tableHtmlGenerator(selectedRegion,selectedProduct, filtered_data) {
    var table_html="";
    
    if(selectedRegion.length==1&&selectedProduct.length>1)
    {
        // console.log("您只选择了一个地区且商品选择大于一");
        table_html = "<table>\
        <tr>\
            <th>地区</th><th>商品</th><th>1月</th><th>月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th>\
        </tr>"
        for(i in filtered_data)
        {
            if(i%selectedProduct.length==0)
            {
                table_html =table_html +"<tr><td  rowspan="+selectedProduct.length+">"
                    +filtered_data[i].region+"</td>"
            }
            else{
                table_html =table_html +"<tr>";
            }
            table_html =table_html +"<td>"+filtered_data[i].product+"</td>";
            for(var j in filtered_data[i].sale)
            {
                table_html =table_html +"<td>"+filtered_data[i].sale[j]+"</td>";
            }
            table_html =table_html +"</tr>";
        }
        table_html =table_html +"</table>"
    }
    else{
        table_html = "<table>\
        <tr>\
            <th>商品</th><th>地区</th><th>1月</th><th>月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th>\
        </tr>"
        for(i in filtered_data)
        {
            if(i%selectedRegion.length==0)
            {
                table_html =table_html +"<tr><td  rowspan="+selectedRegion.length+">"
                    +filtered_data[i].product+"</td>"
            }
            else{
                table_html =table_html +"<tr>";
            }
            table_html =table_html +"<td>"+filtered_data[i].region+"</td>";
            for(var j in filtered_data[i].sale)
            {
                table_html =table_html +"<td>"+filtered_data[i].sale[j]+"</td>";
            }
            table_html =table_html +"</tr>";
        }
        table_html =table_html +"</table>"
    }
    return table_html;
}