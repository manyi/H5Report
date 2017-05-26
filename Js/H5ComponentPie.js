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
	//底层圆
	ctx.beginPath()
	ctx.fillStyle = '#eee'
	ctx.strokeStyle = '#eee'
	ctx.lineWidth = 1
	ctx.arc(r,r,r,0,2*Math.PI)
	$(cans).css('z-index',1)
	ctx.fill()
	ctx.stroke()

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
		var x = r + Math.sin(.5*Math.PI-sAngel) * r 
		var y = r + Math.cos(.5 * Math.PI -sAngel) *r
		
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
			ctx.arc(r,r,r+10,0,2*Math.PI) 
		}else{
			ctx.arc(r,r,r+10,sAngel,sAngel+2*Math.PI*per,true) 
		}
		ctx.fill()
		ctx.stroke()
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
