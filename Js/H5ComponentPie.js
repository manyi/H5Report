/**
 * 饼图组件
 */


var H5ComponentPie = function(name,cfg){
	var component = new H5ComponentBase(name,cfg)

	var w = cfg.width
	var h = cfg.height 
	var cans = document.createElement('canvas')
	var ctx = cans.getContext('2d')//创建为2D 
	cans.width = ctx.width = w //设置宽度
	cans.height = ctx.height =h //设置捣鼓、、高度 
	component.append(cans)//追加到com内 


	var r = w /2
	var step = cfg.data.length
	//底层圆//废弃底层
	/*ctx.beginPath()
	ctx.fillStyle = '#eee'
	ctx.strokeStyle = '#eee'
	ctx.lineWidth = 1
	ctx.arc(r,r,r,0,2*Math.PI)
	$(cans).css('z-index',1)
	ctx.fill()
	ctx.stroke()
	*/
	//数据层
	var cans = document.createElement('canvas')
	var ctx = cans.getContext('2d')//创建为2D 
	cans.width = ctx.width = w //设置宽度
	cans.height = ctx.height =h //设置捣鼓、、高度 
	$(cans).css('z-index',2)
	component.append(cans)//追加到com内 
	 
	var colors = ['red','blue','gray','yellow','green']
	var sAngel = 1.5 * Math.PI //起始位置
	var eAngel = 0//结束位置
	var aAngel = Math.PI * 2 //周
 
	 
	for(var i=0;i<step;i++){
		var item = cfg.data[i] 
		var color = item.bg || (item.bg=colors.pop()) 
		eAngel = sAngel + aAngel * item.per //结束位置==开始位置+周*百分比
		ctx.beginPath()
		ctx.fillStyle = color
		ctx.strokeStyle = color
		ctx.lineWidth = .1
		ctx.moveTo(r,r)//移动到中心点
		ctx.arc(r,r,r,sAngel,eAngel)
		ctx.fill()
		ctx.stroke() 
		
		sAngel=eAngel;//开始位置等于上次结束位置 
		var text = $('<div class="text" >')
		text.text(item.title)
		var per = $('<div class="per">')
		per.text(item.per*100+'%')
		text.append(per)
		var x = r  + Math.sin(.5*Math.PI-sAngel) * r 
		var y = r  + Math.cos(.5 * Math.PI -sAngel) *r 
		
		if(x>w/2){
			text.css('left',x/2)
		}else{
			text.css('right',(w-x)/2+10)
		}
		if(y>h/2){
			text.css('top',y/2)
		}else{
			text.css('bottom',(h-y)/2+10)
		} 
		if(item.bg){
			text.css('color',item.bg)
		}
		component.append(text)
	}
	 
	//数据层
	var cans = document.createElement('canvas')
	var ctx = cans.getContext('2d')//创建为2D 
	cans.width = ctx.width = w //设置宽度
	cans.height = ctx.height =h //设置捣鼓、、高度 
	$(cans).css('z-index',3)
 
	ctx.fillStyle = '#fff'
	ctx.strokeStyle = '#fff'
	ctx.lineWidth = 0

	component.append(cans)//追加到com内  
	var draw=function(per){
		//遮罩圆
		ctx.clearRect(0,0,w,h);
		ctx.beginPath()
		ctx.moveTo(r,r)
		if(per<=0)
		{
			ctx.arc(r,r,r,0,2*Math.PI) 
			component.find('.text').css('opacity',0)
		}else{
			ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true) 
		}
		ctx.fill()
		ctx.stroke()
		if(per>=1){
			console.log(per)
			component.find('.text').css('transition','all 0s')
			H5ComponentPie.reSort(component.find('.text'))
			component.find('.text').css('transition','all 1s')
			component.find('.text').css('opacity',1)
			ctx.clearRect(0,0,x,h)
		}
	} 
	draw(0)//默认初始化给0
	component.on('onLoad',function(){
		var s=0;
		for(i=0;i<100;i++){
			setTimeout(function(){
				s+=.01;
				draw(s)
			},i*10+500) 
		}
	})
	component.on('onLeave',function(){
		var s=1
		for(i=0;i<100;i++){
			setTimeout(function(){
				s-=.01
				draw(s)
			},i*10)
		}
	}) 
	return component;
}
/**
 * 判断两数据是否相交 X
 * @param shadowA_x[left,left+width]
 * @param shadowB_x[left,left+width]
 * 相交判定
 * shadowA_x[0]>shadowB_x[0] && shadowA_x[0]<shadowB_x[1]
 * shadowA_x[1]>shadowB_x[0] && shadowA_x[1]<shadowB_x[1]
 * Y top,top+height
 */
H5ComponentPie.reSort = function(list){
	var compare = function(domA,domB){
		 //  元素的位置，不用 left，因为有时候 left为 auto
    var offsetA = $(domA).offset();
    var offsetB = $(domB).offset();

    //  domA 的投影
    var shadowA_x = [ offsetA.left,$(domA).width()  + offsetA.left ];
    var shadowA_y = [ offsetA.top ,$(domA).height() + offsetA.top ];

    //  domB 的投影
    var shadowB_x = [ offsetB.left,$(domB).width()  + offsetB.left ];
    var shadowB_y = [ offsetB.top ,$(domB).height() + offsetB.top  ];

    //  检测 x
    var intersect_x = ( shadowA_x[0] > shadowB_x[0] && shadowA_x[0] < shadowB_x[1] ) || ( shadowA_x[1] > shadowB_x[0] &&  shadowA_x[1] < shadowB_x[1]  );

    //  检测 y 轴投影是否相交
    var intersect_y = ( shadowA_y[0] > shadowB_y[0] && shadowA_y[0] < shadowB_y[1] ) || ( shadowA_y[1] > shadowB_y[0] &&  shadowA_y[1] < shadowB_y[1]  );
		
		return intersect_x && intersect_y
	}
	var reset = function(domA,domB){
		if($(domA).css('left')!='auto'){
			$(domA).css('left',parseInt($(domA).css('left'))+$(domB).height())
		}
		 
		if($(domA).css('top')!='auto'){
			$(domA).css('top',parseInt($(domA).css('top'))+$(domB).height())
		}
		if($(domA).css('bottom')!='auto'){
			$(domA).css('bottom',parseInt($(domA).css('bottom'))+$(domB).height())
		}

	}

	  //  定义将要重排的元素
  var willReset = [list[0]];

  $.each(list,function(i,domTarget){
    if( compare(willReset[willReset.length-1] , domTarget ) ){
      willReset.push(domTarget);  //  不会把自身加入到对比
    }
  });

  if(willReset.length >1 ){
      $.each(willReset,function(i,domA){
          if( willReset[i+1] ){
            reset(domA,willReset[i+1]);
          }
      });
      H5ComponentPie.reSort( willReset );
  }   
}
