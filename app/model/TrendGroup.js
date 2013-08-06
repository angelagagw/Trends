Ext.define("MyTrends.model.TrendGroup", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'dateCreated', type: 'date' },
            { name: 'title', type: 'string' },
            { name: 'startdate', type: 'date' },
            { name: 'enddate', type: 'date' }
        ], 
        validations: [
            { type: 'presence', field: 'id' },
            { type: 'presence', field: 'dateCreated' },
            { type: 'presence', field: 'title', message: 'Please enter a title for this trend group.' }
        ]
    }
});
