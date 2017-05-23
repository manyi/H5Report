/* 基本散点图对象 */

var H5ComponentPoint =function ( name, cfg ) {
    var component = new H5ComponentBase(name,cfg);
    var base = cfg.data[0][1] //以第一个数据的比例为大小的100%

    console.log(cfg.data)
    //循环data，创建Div散点图
    $.each(cfg.data,function(index,elem){
        var point = $('<div class="point point_'+index+'" >')
 

        var name = $('<div class="name">'+elem[0]+'</div>')
        var perPoint = $('<div class="per">'+(elem[1]*100)+'%</div>')

        name.append(perPoint);

        point.append(name)
        var per = (elem[1] / base * 100) + '%'//计算百分百

        point.width(per).height(per)

        if(elem[2]){
            point.css('background-Color',elem[2])
        }
        if(elem[3]!==undefined && elem[4] !==undefined){
            point.css({
                'left': elem[3],
                'top': elem[4] 
            });
        }

        component.append(point)

    })  
    return component;
}
