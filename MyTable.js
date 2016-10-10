var MyTable={};
MyTable.defaultConfig={
	con:$('body'),
	hasCURD:false
};

MyTable.show=function(config){
	//让用户配置与自定义插件的配置合并
	config=$.extend(this.defaultConfig,config);
	//拼接表格
	var $table=$("<table class='MyTable'></table>").appendTo(container);
	//创建表头
	var $head=$('<thead><tr></tr></thead>').appendTo($table);
	if(typeof config.titles==='undefined')
		for(pro in config.data[0])
			$('<td></td>').text(pro)
				.appendTo($head.find('tr'));
	else
		for(var i=0;i<config.titles.length;i++){
			$('<td></td>').text(config.titles[i])
				.appendTo($head.find('tr'));
		}
	if(config.hasCURD)
		$('<td>操作</td>').appendTo($head.find('tr'));
	//拼接表体
	var $body=$('<tbody></tbody>').appendTo($table);
	for(var i=0;i<config.data.length;i++){
		var $tr=$('<tr></tr>').appendTo($body);
		for(pro in config.data[i])
			$('<td></td>').text(config.data[i][pro]).appendTo($tr);
		//拼接操作td内容
		if(config.hasCURD)
			this.getLinks().appendTo($tr);
	}
}
MyTable.getLinks=function(){
	var $td=$('<td></td>');
	//逐个添加功能按钮
	//修改
	$("<a href='javascript:void(0)'>修改</a>")
	.click(function(){
		$(this).css('display','none')
		.next().css('display','none')
		.nextAll().css('display','inline-block');
		$(this).parent().siblings().each(function(i,v){
			$('<input>')
			.attr('data-old',$(v).text())
			.val($(v).text())
			.appendTo($(v).empty());
		})
	}).appendTo($td);
	//删除
	$("<a href='javascript:void(0)'>删除</a>")
	.click(function(){
		if(!confirm('真删?')) return;
		//进行删除操作
		$(this).closest('tr').remove();
	}).appendTo($td);
	//保存
	$("<a href='javascript:void(0)'>保存</a>")
	.css('display','none')
	.click(function(){
		$(this).css('display','none')
		.next().css('display','none')
		.end().prevAll().css('display','inline-block');
		$(this).parent().siblings().each(function(i,v){
			var text=$(v).find('input').remove().val();
			$(v).text(text);
		});
	}).appendTo($td);
	//取消
	$("<a href='javascript:void(0)'>取消</a>")
	.css('display','none')
	.click(function(){
		$(this).css('display','none')
		.prev().css('display','none')
		.prevAll().css('display','inline-block');
		$(this).parent().siblings().each(function(i,v){
			var text=$(v).find('input').remove().attr('data-old');
			$(v).text(text);
		});
	}).appendTo($td);
	return $td;
}