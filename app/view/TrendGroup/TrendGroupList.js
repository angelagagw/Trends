Ext.define('MyTrends.view.TrendGroup.TrendGroupList', {
    extend: 'Ext.dataview.List',
    xtype: 'trendgrouplist',
	//fullscreen: true,

    config: {
    	//layout: 'fit',
    	title: 'myTrends',
    	store: 'TrendGroups',
    	itemTpl: '{title}',
    	//useComponents: true,
    	//defaultType: 'trendgrouplistitem'  

    },
    getNavBar: function(){
		return this.up("[xtype='main']").getNavigationBar();    
    },
    initialize: function () {
        var me = this;     
        me.callParent();
        console.log('1');

        me.on({
            painted: function (view) {
                var navBar = this.getNavBar();
              
                this.addButton = navBar.add({
                    xtype: 'button',
                    action: 'addtrendgroup', 
                    iconCls: 'add'
                });
                this.editButton = navBar.add({
                    xtype: 'button',
                    text: 'Edit', 
                    action: 'edittrendgroup'
                });
                this.captureViewButton = navBar.add({
                    xtype: 'button', 
                    text: 'Capture',
                    //iconCls: 'compose',
                    action: 'captureview',
                    align: 'right'
                });
            },
            deactivate: function (view) {
                var navBar = this.getNavBar();
                navBar.remove(this.addButton, true);
                navBar.remove(this.editButton, true);
                navBar.remove(this.captureViewButton, true);
            }
        });

    }
});
