<?php
/**
 * @copyright  Copyright (c) 2017,ArtashesBaghdasaryan
 * @category   Shopware
 * @author     Artashes Baghdasaryan
 */
namespace YjPriceTag;

use Shopware\Components\Plugin;
use Shopware\Components\Plugin\Context\InstallContext;
use Shopware\Components\Plugin\Context\UninstallContext;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use YjPriceTag\Models\PriceType;
use Doctrine\ORM\Tools\SchemaTool;


class YjPriceTag extends Plugin
{
    /**
     * @param InstallContext $context
     * @throws \Exception
     */
    public function install(InstallContext $context)
    {
         $this->createSchema();
         $this->createTextFields();
   
        parent::install($context);
    }
    
     public function uninstall(UninstallContext $context)
    {
       $this->removeSchema();
       $this->removeTextFields();
        parent::uninstall($context);
    }

    
     public function build(ContainerBuilder $container) {
        $container->setParameter('yj_price_tags.plugin_dir', $this->getPath());
        $container->setParameter('yj_price_tags.view_dir', $this->getPath() . '/Resources/Views');
        parent::build($container);
    }
    

      private function createSchema()
    {
        $tool = new SchemaTool($this->container->get('models'));
        $classes = [
            $this->container->get('models')->getClassMetadata(PriceType::class)
        ];
        $tool->createSchema($classes);
    }

     private function createTextFields() { 
      try {
            $service = $this->container->get('shopware_attribute.crud_service');
            $priceType = new PriceType(); 
            $data = array(
                "tableName" => "s_articles_attributes",
                "columnType" => "single_selection",
                "columnName" => "yj_price_tags",
                "entity" => \YjPriceTag\Models\PriceType::class ,
                "label" => "Price Tag style ",
                "translatable" => true,
                "displayInBackend" => true,
                "configured" => true,
                "custom" => true,
                "displayField"=>'fontfamily'
            );
            $service->update(
                    $data['tableName'], $data['columnName'], $data['columnType'], $data
            );
            $data['tableName'] = 's_categories_attributes';
            $data['columnName'] = 'yj_price_tags';
    
           $service->update(
                    $data['tableName'], $data['columnName'], $data['columnType'], $data
               );
            Shopware()->Models()->generateAttributeModels(array('s_articles_attributes','s_categories_attributes'));
        } catch (Exception $ex) {
            return false;
        }
        return true;
    } 

    /**
     * Removes additional text fields
     * @return boolean
     */
    private function removeTextFields() {
      try {
            $service = $this->container->get('shopware_attribute.crud_service');
            $service->delete(
                    's_articles_attributes', 'yj_price_tags'
            );
            $service->delete(
                    's_categories_attributes', 'yj_price_tags'
            );

            Shopware()->Models()->generateAttributeModels(array('s_articles_attributes','s_categories_attributes'));
        } catch (Exception $ex) {
            return false;
        }
        return true;
    }

      private function removeSchema()
       {
        $tool = new SchemaTool($this->container->get('models'));
        $classes = [
            $this->container->get('models')->getClassMetadata(PriceType::class)
        ];
        $tool->dropSchema($classes);
       }
   
}

     
