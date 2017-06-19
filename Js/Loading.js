/**
 * 重写loader 实现图片loading
 */
var H5_loading = function(images,firstPage){
	var id = this.id  
	if(this._images === undefined){
		this._images = (images || []).length //第一次进入，将images长度赋值给_images或者定义一个数组
		this._loaded = 0 //默认开始加载资源数量
		this._firstPage = firstPage
		window[id] = this //把当前对象存储在全局对象window中，用来进行某个图片加载完成后回调
 
		for(s in images){
			var item = images[s]//循环获取目标img路径

			var  img = new Image //创建Img对象
			img.onload = function(){
				window[id].loader()
			} 
			img.src = item;
		}
		$('.loading_rate').text('0%');
		return this
	}else{
		this._loaded++  
		var rate = this._loaded / this._images * 100 >>>0  
		$('.loading_rate').text(rate+'%');
		if(this._loaded<this._images){
			return this
		}
		
	}
	window[id] = null
	this.Elem.fullpage({
			onLeave:function(){//离开事件 
				$(this).find('.h5_component').trigger('onLeave')
			},
			afterLoad:function(){//载入事件 
				$(this).find('.h5_component').trigger('onLoad')
			},
			afterRender:function(){//页面加载完成后执行方法
					//$(this).find('.h5_component').trigger('onLoad')
			}

		}); 
		this.page[0].find('.h5_component').trigger('onLoad')
		this.Elem.show() 
		if(this._firstPage){
			$.fn.fullpage.moveTo(this._firstPage)
		}

}