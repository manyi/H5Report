var H5=function(){
	this.id=('H5_'+Math.random()).replace('.','_')

	this.Elem=$('<div id="'+this.id+'" class="H5">').hide();

	$('body').append(this.Elem)

	this.addPage=function(name,text){
		var page=$('<div class="H5_page">')

		if(name!=undefined)
			page.addClass('h5_page_'+name)
		if(text!=undefined)
			page.addClass('h5_page_'+text)

		this.Elem.append(page)
		return this;
	}
	this.addComponent=function(name,text){

		return this;
	}

	this.loader=function(){
		this.Elem.show()
	}
	return this;
}