/* 基本散点图对象 */

var H5ComponentPoint =function ( name, cfg ) {
    var component = new H5ComponentBase(name,cfg);
    var base = cfg.data[0].per //以第一个数据的比例为大小的100%

    var points=[]
    //循环data，创建Div散点图
    $.each(cfg.data,function(index,elem){

        var point = $('<div class="point point_'+index+'" >') 

        var name = $('<div class="name">'+elem.title+'</div>')//创建存储name的div

        var perPoint = $('<div class="per">'+(elem.per*100)+'%</div>')//创建存储百分比的div

        name.append(perPoint);

        point.append(name)

        var per = (elem.per / base * 100) + '%'//计算百分百

        point.width(per).height(per)//设置宽度高度

        
        //设置背景色
        if(elem.bg){
            point.css('background-Color',elem.bg)
        }
        //设置子组件位置 ，以A为基准
        if(elem.left!==undefined && elem.top !==undefined){
            point.centerPos=((1-elem.per)/2)*100+"%"//初始位置设定
            point.css('opacity',0)//设置透明度
            point.left=elem.left//设置载入后设定的位置
            point.top=elem.top//设置载入后设定的位置
            point.css('left',point.centerPos).css('top',point.centerPos) //默认第一次的起始位置
            points.push(point)  
        }
          
        component.append(point)

    })  
    //重写point的load事件
    component.on('onLoad',function(){

        if(points.length){
            setTimeout(function(){
                for(var i=0;i<points.length;i++){ 
                    points[i].animate({left:points[i].left,top:points[i].top,opacity:1})
                }
            },500)
        }
        return false;
    })
    //重写point的leave事件
    component.on('onLeave',function(){
        if(points.length){
            for(var i=0;i<points.length;i++){ 
                points[i].animate({left:points[i].centerPos,top:points[i].centerPos,opacity:0})
            }
        }
        return false;
    })
    return component;
}
