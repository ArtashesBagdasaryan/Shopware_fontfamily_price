
//{block name="backend/yj_price_tag/app"}

Ext.define('Shopware.apps.YjPriceTag', {
    extend: 'Enlight.app.SubApplication',

    name:'Shopware.apps.YjPriceTag',
     loadPath: '{url action=load}',
      bulkLoad: true,
      controllers: [ 'Main' ],
      views: [ 'list.Window',
      'list.List' ,
      'detail.Window',
      'detail.Form' ],     
      models: [ 'Tags'],
      stores: [ 'Tags' ],
              
               
             launch: function() {
             return this.getController('Main').mainWindow;
         }



});

//{/block}