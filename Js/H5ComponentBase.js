/* 基本图文组件对象 */

var H5ComponentBase =function ( name, cfg ) {
    var cfg = cfg || {};
    var id = ( 'h5_c_'+Math.random() ).replace('.','_') ;

    // 把当前的组建类型添加到样式中进行标记
    var cls = ' h5_component_'+cfg.type; 
    var component = $('<div class="h5_component '+cls+' h5_component_name_'+name+'" id="'+id+'">');

    cfg.text   &&  component.text(cfg.text);
    cfg.width  &&  component.width(cfg.width/2);
    cfg.height &&  component.height(cfg.height/2);
    
    cfg.css && component.css( cfg.css );
    cfg.bg  && component.css('backgroundImage','url('+cfg.bg+')');

    //判断是否需要居中
    if(cfg.center === true){
        component.css({ 
            marginLeft : (cfg.width/4 * -1) + 'px',
            left:'50%'
        })
    }

    //  自定义的参数
    if( typeof cfg.onclick === 'function' ){
        component.on('click',cfg.onclick);
    }
    //组件载入事件
    component.on('onLoad',function(){  
        component.addClass(cls+'_load').removeClass(cls+'_leave');
        cfg.animateIn && component.animate(cfg.animateIn );
        return false;
    })
    //组件移出事件
    component.on('onLeave',function(){
        component.addClass(cls+'_leave').removeClass(cls+'_load');
        cfg.animateOut && component.animate( cfg.animateOut );
        return false;
    }) 
    return component;
}