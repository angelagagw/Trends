Ext.define('MyTrends.view.Trend.TrendList', {
    extend: 'Ext.List',
    xtype: 'trendlist',

    config: {
    	title: 'myTrends',
    	store: 'Trends',
    	itemTpl: '{title}'

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