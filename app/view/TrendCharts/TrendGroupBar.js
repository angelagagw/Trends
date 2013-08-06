Ext.define('MyTrends.view.TrendCharts.TrendGroupBar', {
  	extend: 'Ext.Container',
    xtype: 'trendgroupbar',
    
    config: {
        fullscreen: true,
		title: 'Canvas',
        layout: 'vbox'
    },
    

    initialize: function(){
        this.callParent(arguments);
        
        	var showChart = {
	        	xtype: 'button',
	        	action: 'showchart',
	        	text: 'showchart' 
	        	
        	}
           	var canvas = {
                xtype: 'container',
                itemId: 'imageCanvasContainer',
                flex: 1,
                items: [
                    {
                        xtype: 'canvas',
                        id: 'imageCanvas',
                        itemId: 'imageCanvas',
                        flex: 1,
                        listeners: {
                            scope: this,
                            tap: function(){
                                console.log('canvas tap event...');
                            }
                        }
                    }
                ]
			}
        
        
        this.add([
           showChart, 
           canvas
        ]);
        
    console.log(document.getElementById('imageCanvas'));
	}
});