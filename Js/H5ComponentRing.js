/**
 * 环图组件
 */

var H5ComponentRing = function(name,cfg){
	var component = new H5ComponentBase(name,cfg)

	var w = cfg.width
	var h = cfg.height

	var cans = document.createElement('canvas')
	var ctx = cans.getContext('2d')
	cans.width = ctx.width = w
	cans.height = ctx.height = h
	component.append(cans)

	var r = w /2 //半径
	var step = cfg.data.length // 数组长度

	//首先画一个整圆，
	ctx.beginPath()
	ctx.fillStyle = '#FA6A6A'
	ctx.strokeStyle = '#FA6A6A'
	ctx.lineWidth = 1
	ctx.arc(r,r,r,0,2*Math.PI)
	ctx.fill() 
	var cans = document.createElement('canvas')
	var ctx = cans.getContext('2d')
	cans.width = ctx.width = w
	cans.height = ctx.height = h
	component.append(cans)
		
	var draw = function(per){
		var color = '#F7EAEA'
		if(per<0)
		{	
			//color = '#FA6A6A'
			per=0
		}
		ctx.clearRect(0,0,w,h)
		//在缩放一个圆，根据当前数据/2*Math.PI获取到所占角度填充颜色
		 
		ctx.beginPath()
		ctx.moveTo(r, r)///首先移动大中心点
		ctx.fillStyle = '#F7EAEA'
		ctx.strokeStyle = '#F7EAEA'
		ctx.lineWidth= 0
		var nowRate =2*Math.PI * cfg.data[0].per * per 
		console.log(nowRate+'----')
		var nowR= r *.8
		ctx.arc(r,r,nowR,0,nowRate) 
		ctx.fill() 
 
	
		ctx.beginPath()
		ctx.moveTo(r,r)
		ctx.fillStyle = '#FA6A6A'
		ctx.strokeStyle = '#FA6A6A' 
		ctx.lineWidth= 0
		var insideZoom = r * .6 
		
		ctx.arc(r,r,insideZoom,0,2*Math.PI * per)
		console.log(2*Math.PI * per)
		ctx.fill() 
		 ctx.closePath();
 	}
	

	

	component.on('onLoad',function(){
		var s = 0
		for(i=0;i<100;i++){
			setTimeout(function(){
				s+=.01
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
	return component
}