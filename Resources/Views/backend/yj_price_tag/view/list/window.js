//


Ext.define('Shopware.apps.YjPriceTag.view.list.Window', {
    extend: 'Enlight.app.Window',
    alias:'widget.view-list-window',
    title:'Price Tags', 
    autoShow:true,
    layout:'fit',
     
  
     initComponent:function () {
        var me = this;
      
        me.items = [{
            xtype:'pricetags-list',
            store: me.store
        }];
      

        me.callParent(arguments);
    }
   
  
});