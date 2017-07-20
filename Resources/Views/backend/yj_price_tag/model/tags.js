//
//{block name="backend/YjPriceTag/model/Tags"}
Ext.define('Shopware.apps.YjPriceTag.model.Tags', {
  extend: 'Ext.data.Model',
  idProperty:'id',
    fields:[
        { name:'id', type:'int' },
        { name:'name', type:'string' }
       

   
    ],
    
      /**
     * Configure the data communication
     * @object
     */
    proxy:{
        /**
         * Set proxy type to ajax
         * @string
         */
        type:'ajax',

        /**
         * Configure the url mapping for the different
         * store operations based on
         * @object
         */
        api:{
            read:'{url controller="YjPriceTag" action="getList"}',
            destroy:'{url controller="YjPriceTag" action="delete"}'
         
        },

        /**
         * Configure the data reader
         * @object
         */
         reader:{
            type:'json',
            root:'data',
            totalProperty:'total'
           
        }

    },
    
});
// {/block}