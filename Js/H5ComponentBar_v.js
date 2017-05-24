/**
 * 柱状图垂直组件
 */
var H5ComponentBar_v=function(name,cfg){
	 var component=new H5ComponentBar(name,cfg)

	var cLen = component.find('.line').length//获取line的个数
	var width = (100/cLen)>>0 //计算平均宽度

	var comLine = component.find('.line');
	comLine.css('width',width+'%');//给每个line重新赋值宽度

	$.each(component.find('.rate'),function(indx,Elem){
		var w = $(this).css('width');
		$(this).height(w).width('');
	})

	$.each(component.find('.per'),function(){
		$(this).appendTo($(this).prev())
	})
	return component;
}