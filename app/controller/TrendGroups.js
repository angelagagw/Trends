Ext.define("MyTrends.controller.TrendGroups", {
    extend: "Ext.app.Controller",
    
    requires: [
    	'Ext.form.FieldSet',
    	'Ext.field.DatePicker'
    ],

    config: {
        refs: {
			Main: 'main',
			TrendGroupAdd: 'trendgroupadd',
			TrendGroupList: 'trendgrouplist', 
			TrendGroupEditList: 'trendgroupeditlist'
			
        },
         control: {
           'button[action=addtrendgroup]': {
                tap: 'addTrendGroup'
           },
           'button[action=savetrendgroup]': {
	           tap: 'saveTrendGroup'
           },
           'button[action=edittrendgroup]': {
	           tap: 'editTrendGroups'
           },
           'button[action=done]': {
	           tap: 'onDoneTap'
           },
           'button[action=captureview]': {
	           tap: 'onCaptureViewTap'
           },
           'trendgrouplist': {
	           itemtap: 'viewTrendGroup'
           },
           'trendgroupeditlist': {
	           itemtap: 'onTrendGroupEditItemTap'
           }
        },
        
    },
    
    onCaptureViewTap: function (button, e) {
    	if (e.target.textContent == 'Capture')
    	{
	    	e.target.textContent = 'View';
	    	this.getMain().setNavigationMode('View');
    	}
    	else
    	{
	    	e.target.textContent = 'Capture';
	    	this.getMain().setNavigationMode('Capture');
    	};
    },
    
    onDoneTap: function(){
		this.getMain().pop();
    },
    
    editTrendGroups: function() {
		this.trendGroupEditList = Ext.create('MyTrends.view.TrendGroup.TrendGroupEditList');
        this.getMain().push(this.trendGroupEditList);
    },
    
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    addTrendGroup: function () {
		console.log('addTrendGroup');  
		
		var now = new Date();
        var trendGroupId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
		
		var newTrendGroup = Ext.create("MyTrends.model.TrendGroup", {
            id: trendGroupId,
            dateCreated: now,
            title: "",
            startdate: "",
            enddate: ""
        });
		
		Ext.getStore('Trends').filter('id', trendGroupId);
		
		this.trendGroupAdd = Ext.create('MyTrends.view.TrendGroup.TrendGroupAdd', { record: newTrendGroup });
        this.getMain().push(this.trendGroupAdd);
    },
    
    viewTrendGroup: function(dataitem, index, target, record, e) {
		if (this.getMain().navigationmode == 'Capture')
		{ 
	  		console.log('viewTrendGroup:Capture');
	  		
	  		Ext.getStore('Trends').filter('id', record.get('id'));
		
	  			
			this.trendList = Ext.create('MyTrends.view.Trend.TrendList');
	        this.getMain().push(this.trendList);
	  		
		}
		else
		{
	  		console.log('viewTrendGroup:View');
	  		
	  		//Ext.getStore('TrendOccurances').filter('id', record.get('id'));
	  		this.trendGroupBar = Ext.create('MyTrends.view.TrendCharts.TrendGroupBar');
	  		//this.getMain().pop();
	  		//Ext.Viewport.add(this.trendGroupBar);
	  		//this.trendGroupBar.show();
	        this.getMain().push(this.trendGroupBar);
			//this.trendOccuranceList = Ext.create('MyTrends.view.Trend.TrendOccuranceList');
	        //this.getMain().push(this.trendOccuranceList);
		};  	
	  	
    },
    
    onTrendGroupEditItemTap: function (dataitem, index, target, record, e) {
	  if (e.target.textContent == '-'){
		console.log('onTrendGroupEditItemTap:delete');
        var store = Ext.getStore("TrendGroups");
        store.remove(record);
        
		var innerStore = Ext.getStore('Trends');
		innerStore.filter('id', record.get('id'));
		for (var i=innerStore.getCount();i>= -1;i--)
		{ 
			innerStore.removeAt(i);
		};		
		innerStore.sync();
		
        store.sync();
	  }
	  else {
	  	console.log('onTrendGroupEditItemTap:edit');
	  	
		Ext.getStore('Trends').filter('id', record.get('id'));
		
		this.trendGroupAdd = Ext.create('MyTrends.view.TrendGroup.TrendGroupAdd', { record: record });
		this.trendGroupAdd.setValues(record);
        this.getMain().push(this.trendGroupAdd);
	  };
    },
    
    saveTrendGroup: function () {
	    console.log('saveTrendGroup');
	    var trendGroup = this.getTrendGroupAdd();

        var currentTrendGroup = trendGroup.getRecord();
        var newValues = trendGroup.getValues();

        currentTrendGroup.set("title", newValues.title);
        currentTrendGroup.set("startdate", newValues.startdate);
        currentTrendGroup.set("enddate", newValues.enddate);
        var errors = currentTrendGroup.validate();

        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.getByField('title')[0].getMessage(), Ext.emptyFn);
            currentTrendGroup.reject();
            return;
        }

        var store = Ext.getStore('TrendGroups');

        if (null == store.findRecord('id', currentTrendGroup.data.id)) {
            store.add(currentTrendGroup);
        }
        
        store.sync();

		this.getMain().pop();

    },
    
    launch: function () {
        this.callParent(arguments);
        console.log('launch');
        Ext.getStore('TrendGroups').load();
        Ext.getStore('Trends').load();
        Ext.getStore('TrendOccurances').load();
    }
});
