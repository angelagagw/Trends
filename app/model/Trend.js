Ext.define("MyTrends.model.Trend", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'trendid',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'trendid', type: 'int' },
            { name: 'dateCreated', type: 'date' },
            { name: 'title', type: 'string' }
        ], 
        validations: [
            { type: 'presence', field: 'id' },
            { type: 'presence', field: 'dateCreated' },
            { type: 'presence', field: 'title', message: 'Please enter a title for this trend group.' }
        ]
    }
});
