Ext.define('MyTrends.view.TrendGroup.TrendGroupEditList', {
    extend: 'Ext.DataView',
    xtype: 'trendgroupeditlist',
	//fullscreen: true,

    config: {
    	//layout: 'fit',
    	title: 'myTrends',
    	store: 'TrendGroups',
    	//itemTpl: '{title}',
    	useComponents: true,
    	defaultType: 'trendgrouplistitem'  

    },
    getNavBar: function(){
		return this.up("[xtype='main']").getNavigationBar();    
    },
    initialize: function () {
        var me = this;     
        me.callParent();

        me.on({
            painted: function (view) {
                var navBar = this.getNavBar();
              
                this.doneButton = navBar.add({
                    xtype: 'button',
                    text: 'Done', 
                    action: 'done',
                    align: 'right'
                });
                Ext.select('.x-button-back').hide();
            },
            deactivate: function (view) {
                var navBar = this.getNavBar();
                navBar.remove(this.doneButton, true);
                Ext.select('.x-button-back').show();
            }
        });

    }
});
