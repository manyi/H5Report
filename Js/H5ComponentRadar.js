/**
 * canvas绘制雷达图表组件
 */
var H5ComponentRadar = function(name,cfg){
	var component = new H5ComponentBase(name,cfg)
	//创建一个画布 
	var cans = document.createElement('canvas')
	var ctx = cans.getContext('2d')//创建为2D
	var w = cfg.width
	var h = cfg.height 
	cans.width = ctx.width = w //设置宽度
	cans.height = ctx.height =h //设置捣鼓、、高度 
	component.append(cans)//追加到com内 
	
	var r = w /2 //半径
	var step = cfg.data.length
	//根据data数量画出对应的点
	/**
	 * 计算一个圆周上的坐标（计算多边形定点坐标）
	 * 已知：圆心坐标(a,b)、半径r；角度deg
	 * rad = ( 2 * Math.PI /360 ) * (360 / step) *i
	 * x = a + Math.sin( rad ) * r
	 * y = a + Math.cos( rad) * r
	 */

	var isBlue= false
	for(var s=10; s>0;s--)
	{	 
		ctx.beginPath() 
		for(var i=0; i<step;i++){
		 	var rad = (2 * Math.PI / 360) * ( 360 /step) * i
		 	
		 	var x = r + Math.sin( rad ) * r *(s/10)
		 	var y= r + Math.cos( rad ) *r *(s/10)
		 	ctx.lineTo(x,y) 
		}
		ctx.closePath()//结束画笔
		ctx.fillStyle = (isBlue =! isBlue) ? '#248edd':'#fff'
		ctx.fill()//填充 
	} 
	//绘制伞骨
	for (var i = 0; i < step; i++) {
		var rad = (2 * Math.PI /360) * (360/step) *i
		var x = r + Math.sin( rad )	 *r 
		var y= r +Math.cos( rad ) * r

		ctx.moveTo(r,r)
		ctx.lineTo(x,y)
		//绘制文字
		var text = $('<div class="text">')
		text.text(cfg.data[i].title)
		//计算文本偏移 
		if(x > w/2){
			text.css('left',x/2-5)
		}else{
			text.css('right',(w-x)/2-5)
		}
		if(y >h/2){
			text.css('top',y/2)
		}else{
			text.css('bottom',(h-y)/2)
		}
		text.css('opacity',0)
		component.append(text)
	}
	ctx.strokeStyle = '#80aac9' 
	ctx.stroke()//结束画笔 
	
	 
	//创建一个画布，绘制内容 
	var cans = document.createElement('canvas')
	var ctx = cans.getContext('2d')//创建为2D
	var w = cfg.width
	var h = cfg.height 
	cans.width = ctx.width = w //设置宽度
	cans.height = ctx.height =h //设置捣鼓、、高度 
	component.append(cans)//追加到com内 

	ctx.strokeStyle='#f00'
	var draw=function(per){ 
		ctx.clearRect(0,0,w,h)
		if(per>=1){
			$('.text').css('opacity',1)
		}else if(per<=1){
			$('.text').css('opacity',0)
		}

		//连线 
	  for(var i = 0;i<step;i++){
	  	var rad = (2*Math.PI/360) * (360 / step) *i
	  	var rate = (cfg.data[i].per)*per 
	  	var x = r + Math.sin(rad) * r * rate
	  	var y= r + Math.cos(rad) * r * rate  
	  	ctx.lineTo(x,y)  
	  }     
	  ctx.stroke(); 

	  //画点
	  ctx.fillStyle= 'red'
	  for(var i = 0;i<step;i++){
	  	var rad = (2*Math.PI/360) * (360 / step) *i
	  	var rate = (cfg.data[i].per)* per 
	  	var x = r + Math.sin(rad) * r * rate
	  	var y= r + Math.cos(rad) * r * rate 
	  	ctx.beginPath() 
	  	ctx.arc(x,y,5,0,2*Math.PI)  
	  	ctx.fill() 
	  	ctx.closePath()
	  }        
	}  
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
