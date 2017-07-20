//
Ext.define('Shopware.apps.YjPriceTag.view.detail.Window', {
    extend: 'Enlight.app.Window',
    alias : 'widget.contactpersons-detail-editwindow',

    title : '{s name=title_details}Add Price Tag{/s}',

    layout: 'fit',
    height :500,
    width: 1000,


    initComponent : function () {
        var me = this;

        me.items = [{
            xtype:'yj-pricetags-view-detail-panel'       
        }];

        me.callParent(arguments);
    }
});