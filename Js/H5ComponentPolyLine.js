/**
 * canvas绘制网格线图表组件
 */
var H5ComponentPolyLine = function(name,cfg){
	var component = new H5ComponentBase(name,cfg)
//创建一个画布 
	var cans = document.createElement('canvas')
	var ctx = cans.getContext('2d')//创建为2D
	var w = cfg.width
	var h = cfg.height
	
	
		
	cans.width = ctx.width = w //设置宽度
	cans.height = ctx.height =h //设置捣鼓、、高度
	//水平网格线
	var step = 10
	ctx.beginPath() 
	ctx.lineWidth = 1 
	ctx.strokeStyle = '#000'
	window.ctx = ctx 
	for (var i = 0; i < step + 1; i++) {	
		
		var y =(h / step)*i //每条线的Y
		ctx.moveTo(0, y)//起始的位置 
		ctx.lineTo(w,y)//结束的位置
		 
	} 

	//垂直网格线
	var lineCount = cfg.data.length+1

	var lineW = w/lineCount ;//计算每个Line的宽度//不一定要取>>	0 because存在余数的情况


	for(var i = 0 ; i < lineCount+1; i++)
	{ 
		var lW = lineW * i //每个宽度*i= 每个Line的X坐标
		ctx.moveTo(lW,0)//起始位置为0开始
 
		ctx.lineTo(lW,h)//结束为X坐标到表格的高度 
		if(cfg.data[i]){
			var text = $('<div class="text">')
			text.text(cfg.data[i].title)
			text.css('width',lineW/2).css('left',(lW/2-lineW/4)+lineW/2)
			component.append(text)
		} 
	}

	ctx.stroke()//结束画笔 
	component.append(cans)//追加到com内 
	//绘制折线
	var cans = document.createElement('canvas') 
	var ctx = cans.getContext('2d') 
	cans.width = ctx.width = w 
	cans.height = ctx.height = h 
	/**
	   * 绘制折现以及对应的数据和阴影
	   * @param  {floot} per 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
	   * @return {DOM}     Component元素
   */
	var draw=function(per){ 
		ctx.clearRect(0,0,w,h) 

		ctx.beginPath() 
		ctx.lineWidth = 1
		ctx.strokeStyle = 'red'

		var x = 0
		var y = 0
		var row_w = (w/(cfg.data.length+1))//宽度 / 数据长度 为每个点的宽度
		//画点
		for(i in cfg.data){//循环data
			var item = cfg.data[i]
			x = row_w*i +row_w 
			y = h -(item.per*h*per)
			ctx.moveTo(x, y) 
			ctx.arc(x,y,5,0,2*Math.PI)  
		}
		
		 
		//连线
		//先定位到起始位置
		ctx.moveTo(row_w,h -(cfg.data[0].per*h*per))
		//ctx.arc(row_w,h*(1-cfg.data[0].per),20,0,2*Math.PI)
		for(i in cfg.data){
			var item = cfg.data[i] 
			x = row_w * i + row_w 
			y= h -(item.per*h*per)//h* (1-item.per) 
			//画线
			ctx.lineTo(x,y) 
			ctx.fillStyle= item.bg?item.bg:'#595959' 
			ctx.fillText((item.per*100),x-5,y-10) //填充内容
		}
		ctx.stroke()
	 	//填充背景 
		ctx.lineTo(x,h)
		ctx.lineTo(row_w,h)
		ctx.fillStyle='rgba(255,0,0,.2)'
		ctx.fill()

		
		component.append(cans)
		
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
