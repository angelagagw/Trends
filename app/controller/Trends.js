Ext.define("MyTrends.controller.Trends", {
    extend: "Ext.app.Controller",
    
    requires: [
    	'Ext.form.FieldSet',
    	'Ext.field.DatePicker'
    ],

    config: {
        refs: {
			Main: 'main',
        	TrendList: 'trendlist',
        	TrendAdd: 'trendadd',
        	TrendGroupAdd: 'trendgroupadd',
        },
     
    control: {
           'button[action=addtrend]': {
                tap: 'addTrend'
           },
           'button[action=savetrend]': {
                tap: 'saveTrend'
           },
           'trendgroupadd dataview': {
	           itemtap: 'onTrendItemTap'
           }, 
           'trendlist': {
	           itemtap: 'captureTrend'
           },
           'trendoccurancelist': {
	           itemtap: 'loadTrendGroupBarChart'
           }
           
        },
    },
    loadTrendGroupBarChart: function() 
    {
	   console.log('hi'); 
    },
    onTrendItemTap: function (dataitem, index, target, record, e) {
	  if (e.target.textContent == '-'){
		console.log('onTrendItemTap:delete');
        var store = Ext.getStore("Trends");
        store.remove(record);
        store.sync();
	  }
	  else {
	  	console.log('onTrendItemTap:edit');
		
		this.trendAdd = Ext.create('MyTrends.view.Trend.TrendAdd', { record: record });
		this.trendAdd.setValues(record);
        this.getMain().push(this.trendAdd);
	  };
    },
    
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    addTrend: function () 
    {
    	console.log('addTrend');
    	var now = new Date();
    	
        var trendId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
		var trendGroupId = this.getTrendGroupAdd().config.record.get('id')
		
		console.log(trendId);
		console.log(trendGroupId);
		
		var newTrend = Ext.create("MyTrends.model.Trend", {
            id: trendGroupId,
            trendid: trendId,
            dateCreated: now,
            title: ''
        });
		
		this.trendAdd = Ext.create('MyTrends.view.Trend.TrendAdd', { record: newTrend });
        this.getMain().push(this.trendAdd);
    },
    saveTrend: function ()
    {
	    console.log('saveTrend');
	    var trend = this.getTrendAdd();

        var currentTrend = trend.getRecord();
        var newValues = trend.getValues();

        currentTrend.set("title", newValues.title);
        var errors = currentTrend.validate();

        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.getByField('title')[0].getMessage(), Ext.emptyFn);
            currentTrend.reject();
            return;
        }

        var store = Ext.getStore('Trends');

        if (null == store.findRecord('trendid', currentTrend.data.id)) {
            store.add(currentTrend);
        }
        
        store.sync();

		this.getMain().pop();
    },
    captureTrend: function(dataitem, index, target, record, e)
    {
    	console.log('CaptureTrend')
	    var newTrendOccurance = Ext.create("MyTrends.model.TrendOccurance", {
            id: record.get('id'),
            trendid: record.get('trendid'),
            occurancedate: new Date()
        });
        
        console.log(newTrendOccurance);
        var store = Ext.getStore('TrendOccurances');

        store.add(newTrendOccurance);
        
        store.sync();
        
        console.log(store);
    }
    
});
