
Ext.define('Shopware.apps.YjPriceTag.controller.Main', {
    extend: 'Enlight.app.Controller',

 
    
    init: function() {
        var me = this;
         
           me.control({
             'pricetags-list':{
                editColumn: me.onEditTagsDetail,
                deleteColumn:me.onDeleteSingleTag
            },
            'pricetags-list textfield[name=searchfield]':{
                change:me.onSearchField
            },
             'pricetags-list button[action=addPriceTag]':{
                click:me.openTagssDetailPage
            },
             'yj-pricetags-view-detail-panel button[action=save]':{
                  click:me.saveStyle
             },
             'yj-pricetags-view-detail-panel button[action=DestroyDetailWindow]':{
                  click:me.destroyDetailWindow
             }

        });
             var store =  me.getStore('Tags');
                 store.load({
                      callback: function() {
                       me.mainWindow = me.getView('list.Window').create({ store: store }).show();
                                  }
        });

    },
      onDeleteSingleTag: function (grid, rowIndex, colIndex, item) {
        var store  = grid.getStore(),
            record = store.getAt(rowIndex);

        var message = Ext.String.format('{s name=dialog_delete_form_message}Are you sure you want to delete the selected Price font-family : ([0])?{/s}', record.get('fontfamily'));

        Ext.MessageBox.confirm('{s name=dialog_delete_form_title}Delete form{/s}', message, function (response) {
            if (response !== 'yes') {
                return false;
            }

            record.destroy({
                callback: function() {
                    store.load();
                }
            });

        });
    },
       
        onEditTagsDetail:function (view, rowIndex) {
                    var me = this,
                        listStore = me.subApplication.getStore('Tags'),
                        record = listStore.getAt(rowIndex);
                        me.openTagsDetailPage(record); 
                    },

          openTagssDetailPage:function () {
             var me = this;
              var detailWindow = me.subApplication.getView('detail.Window').create().show();  
                },
 
                saveStyle:function(btn){
                    var  me         = this,
                        win        = btn.up('window'),
                        formPanel  = win.down('form'),
                        form       = formPanel.getForm(),
                        record     = form.getFieldValues(),
                        fieldStore = me.mainWindow.down('grid').store;

                         Ext.Ajax.request({
                          url: '{url controller="YjPriceTag" action="save"}',
                              method: 'POST',
                               params: {
                                 save_req: Ext.encode(record)
                             },
                        success: function (transport) {
                          
                            formPanel.setLoading(false);
                            formPanel.loadRecord(record);
                            fieldStore.getProxy().extraParams.formId = record.id;
                            fieldStore.load();
                            win.close();
                             Shopware.Notification.createGrowlMessage('The Style for price tag   has been created successfully.');
                        },
                        failure: function (transport) {
                           Shopware.Notification.createGrowlMessage('There is an error occurred while saving....'); }                        
                 });
                     
    },
                       
                         
                

        destroyDetailWindow:function(btn){
              var  me = this, win = btn.up('window');
                   win.close();
            },

    

     
      openTagsDetailPage: function(record) {
                    var me = this,
                        detailStore = me.subApplication.getStore('Tags'),
                         win = me.getView('detail.Window').create().show(),
                         formPanel  = win.down('form'),
                         form       = formPanel.getForm();
                       win.setLoading(true);
                        form.loadRecord(record);
                      win.setLoading(false);
        },
    
        onSearchField:function (field) {
         
        var me = this,
                searchString = Ext.String.trim(field.value),
                 grid =field.up('grid');
                
           var store = grid.getStore();
            //scroll the store to first page 
            store.currentPage = 1;

            //If the search-value is empty, reset the filter
            if ( searchString.length === 0 ) {
                store.clearFilter();
            } else {
                //This won't reload the store
                store.filters.clear();
            
       store.filter('fontfamily', searchString);       } 
          

            return true;
        }


});