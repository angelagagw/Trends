Ext.define('MyTrends.view.Trend.TrendAdd', {
    extend: "Ext.form.Panel",
    xtype: 'trendadd',
    config:
    {
        title: 'Add Trend Group',
        fullscreen: true,
        ui: 'dark',
        layout: {
            type: 'vbox'
        },
    },
    
    getNavBar: function(){
		return this.up("[xtype='main']").getNavigationBar();    
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
  
        this.add([
            { 
            	xtype: "fieldset",
                items: [trendTitle]
            }
        ]);
        
        me.on({
            painted: function (view) {
                var navBar = this.getNavBar();
              
                this.saveButton = navBar.add({
                    xtype: 'button',
                    text: 'Save', 
                    action: 'savetrend',
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