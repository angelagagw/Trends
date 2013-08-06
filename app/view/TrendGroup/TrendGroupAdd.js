Ext.define('MyTrends.view.TrendGroup.TrendGroupAdd', {
    extend: "Ext.form.Panel",
    xtype: 'trendgroupadd',
    config:
    {
        refs: {
        	TrendList: 'trendlist'
        },
        title: 'Add Trend Group',
        fullscreen: true,
        ui: 'dark',
        scrollable: false, 
        layout: {
            type: 'vbox'
        },
    },
    
    getNavBar: function(){
		return this.up("[xtype='main']").getNavigationBar();    
    },
    
    getEndDate: function(endDate){
    	if (endDate == null)
    	{
	    	var nextMonth = new Date();
	    	nextMonth.setMonth(nextMonth.getMonth() + 1);
		    return nextMonth;
		}
		else
		{
			return endDate;
		}   
    },
    
    getStartDate: function(startDate){
    	if (startDate == null)
    	{
	    	return new Date();
		}
		else
		{
			return startDate;
		}   
    },
    
    initialize: function () {
        var me = this;     
        me.callParent();
        this.setRecord(this.config.record);		
        
        var trendTitle = {
            xtype: 'textfield',
            name: 'title',
            label: 'Title',
            value: this.config.record.get('title'),
            required: true
        };

        var trendStartDate = {
            xtype: 'datepickerfield',
            name: 'startdate',
            label: 'Start Date',
            value: this.getStartDate(this.config.record.get('startdate'))
        };

        var trendEndDate = {
            xtype: 'datepickerfield',
            name: 'enddate',
            label: 'End Date',
            value: this.getEndDate(this.config.record.get('enddate'))
        };
        
        var addTrend = {
	        xtype: 'button',
	        text: 'Add Trend',
	        action: 'addtrend'
        };
      
        this.add([
            { 
            	xtype: "fieldset",
                items: [trendTitle, trendStartDate, trendEndDate]
            },
            
            {	xtype: "fieldset", 
            	//layout: 'vbox', 
	            items: [addTrend] //, trendList]
            },
            {
		    	xtype: 'dataview',
		    	store: 'Trends',
		    	itemTpl: '{title}',
		    	useComponents: true,
		    	defaultType: 'trendlistitem' ,
		    	flex: 1
			}	
        ]);
        
        me.on({
            painted: function (view) {
                var navBar = this.getNavBar();
              
                this.saveButton = navBar.add({
                    xtype: 'button',
                    text: 'Save', 
                    action: 'savetrendgroup',
                    align: 'right'
                });
                Ext.select('.x-button-back').hide();
            },
            deactivate: function (view) {
                var navBar = this.getNavBar();
                navBar.remove(this.saveButton, true);
                Ext.select('.x-button-back').show();
            }
        });
    }
});