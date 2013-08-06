Ext.define('MyTrends.view.TrendGroup.TrendGroupListItem', {
	extend: 'Ext.dataview.component.DataItem',
	xtype: 'trendgrouplistitem', 
	requires: [
		'Ext.Button', 'Ext.field.Text', 'Ext.Component'
	],
	
	config: {
		dataMap: {
			getEditButton: {
				setText: 'title'
			}
		},
		layout: {
			type: 'hbox'
		},
		
		deleteButton: { 
			text: '-',  //iconCls: 'minus' ??
			ui: 'decline-round', 
			width: 35
			
		},
		
		editButton: {flex: 7,
			iconMask: 'true',
			ui: 'plain'
		}
		
	},
	

	applyEditButton: function(config) {
		return Ext.factory(config, Ext.Button, this.getEditButton());
	},
	
	updateEditButton: function(newEditButton, oldEditButton) {
		if (oldEditButton) {
			this.remove(oldEditButton);
		}
		
		if (newEditButton) {
			//newEditButton.on('tap', this.onEditButtonTap, this);
			this.add(newEditButton);
		}
	},

	applyDeleteButton: function(config) {
		return Ext.factory(config, Ext.Button, this.getDeleteButton());
	},
	
	updateDeleteButton: function(newDeleteButton, oldDeleteButton) {
		if (oldDeleteButton) {
			this.remove(oldDeleteButton);
		}
		
		if (newDeleteButton) {
			//newEditButton.on('tap', this.onEditButtonTap, this);
			this.add(newDeleteButton);
		}
	}

});

