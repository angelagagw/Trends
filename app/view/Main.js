Ext.define('MyTrends.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'main',
    navigationmode: '',
    
    requires: [
        'Ext.Img'
    ],
    
	config: {
        navigationBar: {
            backButton: {
                align: 'right',
            }
        },
 
        items: [
            {
                xtype: 'trendgrouplist'
            }
        ]
    },
    
    setNavigationMode: function(navigationmode){
	    this.navigationmode = navigationmode;
    }, 
    
    initialize: function() 
    {
	    this.navigationmode = 'Capture'
	}
});
