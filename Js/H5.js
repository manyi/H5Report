 /**
  * [H5 description]
  * 添加组件和页面
  */
var H5 = function(){
	this.id=('H5_'+Math.random()).replace('.','_')

	this.Elem=$('<div id="'+this.id+'" class="H5">').hide();
	
	this.page=[]; 

	$('body').append(this.Elem)

	/*添加一个Page页面*/
	this.addPage=function(name){
		var page=$('<div class="H5_page section">') 

		if(name!=undefined)
			page.addClass('h5_page_'+name) 
		 
		this.Elem.append(page)
 		this.page.push(page)
 		if(typeof this.whenAddPage === 'function'){
 			 
 			this.whenAddPage()
 		}
 		
		return this;
	}
	/*添加一个组件*/
	this.addComponent=function(name,cfg){ 
		var cfg = cfg ||{};
		cfg= $.extend({
			type:'base'
		},cfg);
		var component;
		var page=this.page.slice(-1)[0];
		switch (cfg.type) {//判断组件类型
			case 'base':
				component = new H5ComponentBase(name,cfg)
				break 
			case 'point':
				component = new H5ComponentPoint(name,cfg)
				break 			
			case 'bar':
				component = new H5ComponentBar(name,cfg)
				break 			
			case 'bar_v':
				component = new H5ComponentBar_v(name,cfg)
				break 	
			case 'PolyLine':
				component = new H5ComponentPolyLine(name,cfg)
				break
			case 'Pie':
				component = new H5ComponentPie(name,cfg)
				break
			case 'Radar':
				component = new H5ComponentRadar(name,cfg)
				break
			case 'Ring':
				component = new H5ComponentRing(name,cfg)
				break  			
			default: 
				break 		
		} 
		page.append(component);
		return this;
	}
	/*H5对象初始化显示*/
	this.loader=function(firstPage){
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
		if(firstPage){
			$.fn.fullpage.moveTo(firstPage)
		}
	}
	/*隐藏*/
	this.hideELem=function(){
		this.Elem.hide();
	}
	if(typeof H5_loading === 'function'){
		this.loader= H5_loading
	} 
	return this;
}