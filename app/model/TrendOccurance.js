Ext.define("MyTrends.model.TrendOccurance", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'occurancedate',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'trendid', type: 'int' },
            { name: 'occurancedate', type: 'date' }
        ], 
        validations: [
            { type: 'presence', field: 'id' },
            { type: 'presence', field: 'dateCreated' },
            { type: 'presence', field: 'title', message: 'Please enter a title for this trend group.' }
        ]
    }
});
