Ext.define('MyTrends.view.Trend.TrendOccuranceList', {
    extend: 'Ext.List',
    xtype: 'trendoccurancelist',

    config: {
    	title: 'myTrends',
    	store: 'TrendOccurances',
    	itemTpl: '{trendid} - {occurancedate}'

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