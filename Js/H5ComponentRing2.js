var H5ComponentRing = function(name,cfg){
	cfg.type='pie'
	if(cfg.data.length>1){
		cfg.data = [cfg.data[0]]
	}
	var component = new H5ComponentBase(name,cfg)
	
	var mask = $('<div class="mask">')
	component.addClass('h5_component_ring')
	component.append(mask)
	var text = component.find('.text')
	text.attr('style','')
	if(cfg.data[0].bg){
		text.css('color',cfg.data[0].bg)
	}
	mask.append(text)

	return component;
}