Ext.define('Shopware.apps.YjPriceTag.view.list.List', {

  
    extend:'Ext.grid.Panel',

    alias:'widget.pricetags-list',
    height:600,
    autoScroll:true,

    defaults: { flex: 1 },

    snippets:{
        columns:{
            name:'{s name=column/first_name}Name{/s}',
            active:'{s name=column/last_name}Active{/s}',
          
            remove:'{s name=column/delete}Delete Type Price Tag{/s}',
            edit:'{s name=column/detail}Show Price Tags details{/s}'
        },
        toolbar:{
            add:'{s name=toolbar/button_add}Add <i>new</i> style{/s}',
            search:'{s name=toolbar/search_empty_text}Search...{/s}'
        }
    },

  
    initComponent:function () {
        var me = this;
        me.registerEvents();
        me.columns = me.getColumns();
        me.dockedItems = [ me.getToolbar(), me.getPagingBar() ];
        me.callParent(arguments);
    },

    registerEvents:function () {
        this.addEvents(
            'editColumn','deleteColumn'
        );
    },

    
    getColumns:function () {
        var me = this;
            
        var columns = [{

            header: '&#009868;',
            width: 24,
            dataIndex:'id',
            height:35,
            renderer:me.renderSorthandleColumn
        },{
            header:'Font Family',
            dataIndex:'name',
            flex:1,
            height:35,
            renderer:me.fontFamilyColumnRenderer
        }, {
            xtype:'actioncolumn',
            width:50,
            padding:4,
            items:[ 
                {
                    iconCls:'sprite-pencil',
                    tooltip:me.snippets.columns.edit,
                    handler:function (view, rowIndex, colIndex, item) {
                        me.fireEvent('editColumn', view, rowIndex, colIndex, item);
                    }
                },
                 {
                    iconCls:'sprite-minus-circle',
                    tooltip:me.snippets.columns.remove,
                    action:'delete',
                     handler:function (view, rowIndex, colIndex, item) {
                        me.fireEvent('deleteColumn', view, rowIndex, colIndex, item);
                    }
                }
               
            ]
        }];
   
        return columns;
    },

 fontFamilyColumnRenderer: function (value) {
     
        return '<div style="display:block; font-size: 24px;margin:3px; height:35px; width:25px; font-family:'+value+';"">' + value + '</div>';
    },
 
    
    getToolbar:function () {
        var me = this;

        return Ext.create('Ext.toolbar.Toolbar', {
            dock:'top',
            ui: 'shopware-ui',
            padding:10,
            items:[
                {
                    iconCls:'sprite-plus-circle-frame',
                    text:me.snippets.toolbar.add,
                    action:'addPriceTag'
                },
                '->',
                {
                    xtype:'textfield',
                    name:'searchfield',
                    cls:'searchfield',
                    width:170,
                    emptyText:me.snippets.toolbar.search,
                    enableKeyEvents:true,
                    checkChangeBuffer:500
                },
                { xtype:'tbspacer', width:6 }
            ]
        });
    },
    getPagingBar:function () {
        var me = this;
        return Ext.create('Ext.toolbar.Paging', {
            store:me.store,
            dock:'bottom',
            displayInfo:true
        });
    },

     renderSorthandleColumn: function() {
        return '<div style="cursor: move;">&#009868;</div>';
    }

    
});