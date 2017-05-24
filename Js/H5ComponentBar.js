/* 基本散点图对象 */

var H5ComponentBar =function ( name, cfg ) {
    var component = new H5ComponentBase(name,cfg)
    
    $.each(cfg.data,function(inx,Elem){
    	var line = $('<div class="line">')
    	var name = $('<div class="name">')
    	var rate = $('<div class="rate">')
    	var per = $('<div class="per">') 

    	name.text(Elem.title)

    	var bgStyle=''
    	if(Elem.bg){
    		bgStyle='style="background-Color:'+Elem.bg+'"'
    	}
    	rate.html('<div class="bg" '+bgStyle+'></div>')
    	var width = Elem.per*100+'%'
	
		rate.css('width',width)    	
    	per.text(width)
    	

    	line.append(name).append(rate).append(per)
    	
    	component.append(line)

    })
    
    return component;
}
