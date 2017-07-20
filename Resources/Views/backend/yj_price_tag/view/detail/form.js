

//

Ext.define('Shopware.apps.YjPriceTag.view.detail.Form', {
    extend  : 'Ext.panel.Panel',
    alias: 'widget.yj-pricetags-view-detail-panel',
     layout: 'anchor',
      defaults: { anchor: '100%' },
    initComponent: function() {
        var me = this;

        me.items = [   
                {
                    xtype: 'panel',
                    region: 'west',
                    itemId: 'ConfigurationForm',
                    items:[
                     { xtype:'form',
                      items:[me.getBasicInfoItems()]
                      
                    },
                   me.createPreview()    ]
                },
    
                    ];
        me.dockedItems = me.getButtons();

        me.callParent(arguments);

       
    },

   
    getButtons: function() {
        return Ext.create('Ext.toolbar.Toolbar', {
            ui: 'shopware-ui',
            dock: 'bottom',
            cls: 'shopware-toolbar',
            items: ['->', 
            {
                text: '{s name=button_save_form}Save{/s}',
                action: 'save',
                cls: 'primary',
                formBind: true
            },
            {
                text: '{s name=button_cancel_form}Cancel{/s}',
                action: 'DestroyDetailWindow',
                cls: 'secondary',
                formBind: true,

                }
            
            ]
        });
    },

    getBasicInfoItems:function() {
        var me = this;
        return me.basicInfo = Ext.create('Ext.form.FieldSet', {
            title: 'Price configuration',
            layout: 'anchor',
            padding:10,
            defaults: { anchor: '100%' },
            items: [ {
                xtype:'hiddenfield',
                name:'id'
            }
            ,{
                xtype:'combo',
                fieldLabel:'Font Family',
                name:'name',
                id:'YJFontFamily',
                valueField: 'name',
                queryMode:'local',
                store:['system-ui','serif','sans-serif','monospace','cursive','fantasy','Lucida Console',
                'unset','Times New Roman','"Palatino Linotype", "Book Antiqua", Palatino, serif'],
                displayField:'name',
                autoSelect:true,
                editable: true,
                forceSelection:true
            },{
                xtype : 'base-element-color',
                fieldLabel:'Text color',
                 name:'color'
             },
             
            {
           xtype:'button',
           padding:5,
           margin:10,
           cls: 'primary',
           text: 'preview',
           handler: function() {
            var form = this.up('form').getForm(),
           FirstForm =this.up('form').up('panel'),
           values = form.getValues(),
           style = Ext.getCmp('PreviewContainer').body.dom.style;

           style.fontFamily=values.fontfamily;
           style.color=values.color; 
        }
    }
             ]
        });
    }
    ,
     createPreview: function() {
       

        return Ext.create('Ext.panel.Panel', {
            title: 'Previews',
             id:'PreviewContainer',
            iconCls: 'sprite-globe--arrow',
            region: 'center',
            height:100,
            style: {
                'margin': 'auto',
                'font-size':'20px'
            },
            html:'<div  style=" text-align: center; font-size: 40px; " >€0.00 *</div>'
 
        });
    }
  
});