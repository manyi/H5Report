var H5=function(){
	this.id=('H5_'+Math.random()).replace('.','_')

	this.Elem=$('<div id="'+this.id+'" class="H5">').hide();
	
	this.page=[]; 

	$('body').append(this.Elem)

	/*添加一个Page页面*/
	this.addPage=function(name,text){
		var page=$('<div class="H5_page section">') 

		if(name!=undefined)
			page.addClass('h5_page_'+name)
		if(text!=undefined)
			page.text(text) 
		this.Elem.append(page)

 		this.page.push(page)
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
				 component=new H5ComponentBase(name,cfg);
				break;
			default: 
				break;
		} 
		page.append(component);
		return this;
	}
	/*H5对象初始化显示*/
	this.loader=function(){
		this.Elem.fullpage();
		this.Elem.show()
	}
	/*隐藏*/
	this.hideELem=function(){
		this.Elem.hide();
	}
	return this;
}