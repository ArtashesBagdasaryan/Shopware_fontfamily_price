//

Ext.define('Shopware.apps.YjPriceTag.store.Tags', {
            extend:'Ext.data.Store',
            pageSize: 20,
            autoLoad: true,
            limit:20,
            start:0,
            model: 'Shopware.apps.YjPriceTag.model.Tags',
            
          
});