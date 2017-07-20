<?php

namespace YjPriceTag\Subscriber;

use \Enlight\Event\SubscriberInterface;
use \Symfony\Component\DependencyInjection\ContainerInterface;

class Frontend implements SubscriberInterface {

  private $container;
  
  public function __construct(ContainerInterface $container) {
    $this->container = $container;
  }

  public static function getSubscribedEvents() {

    return array(
      'Enlight_Controller_Action_PostDispatchSecure_Frontend_Listing' => 'onPostDispatchListing',
      'Enlight_Controller_Action_PostDispatchSecure_Frontend_Detail' => 'onPostDispatchDetail'
      );
  }
  public function onPostDispatchListing(\Enlight_Controller_ActionEventArgs $args) {
   $controller = $args->get('subject');
   $view = $controller->View();
   $request = $controller->Request();
   $actionName = $request->getActionName();  
   $view->addTemplateDir($this->getPluginPath());    
   $sCategoryContent = $view->getAssign("sCategoryContent");
   $attr= $sCategoryContent["attribute"]["yj_price_tags"] ;
    if ( $attr == NULL || $attr == '' ) {return; }  
  try {
      $sql= "SELECT `name` FROM `yj_price_types` WHERE `id` = ? ;";
      $fontfamily = Shopware()->Db()->fetchOne($sql, array($attr));

  } catch (Exception $e) {
    return;
  }
       $view->assign('yjFontFamily',$fontfamily);
       $view->addTemplateDir($this->getPluginPath());    
       $view->extendsTemplate('frontend/price_tag/listing/listing.tpl');
 }




 public function onPostDispatchDetail(\Enlight_Controller_ActionEventArgs $args) {
   $controller = $args->get('subject');
   $view = $controller->View();
   $request = $controller->Request();
   $actionName = $request->getActionName();  
  $sArticle = $view->getAssign("sArticle");
  $attr = $sArticle["yj_price_tags"];

  if ( $attr == NULL || $attr == '' ) { return ;}   
  $fontfamily = $this->getFontFamily($attr);
      if ( $fontfamily == NULL || $fontfamily == '' || empty($fontfamily) ) {return;}

   $view->assign('yjFontFamily',$fontfamily);
    $view->addTemplateDir($this->getPluginPath());    
       $view->extendsTemplate('frontend/price_tag/detail/data.tpl');
 
 }
  private function getFontFamily($attr){
      try {
           $sql= "SELECT `name` FROM `yj_price_types` WHERE `id` = ? ;";
           $fontfamily = Shopware()->Db()->fetchOne($sql, array($attr));
            return $fontfamily;  
            } catch (Exception $e) {
          return;
        }

   }
      /**
     * @return string
     */
      private function getPluginPath()
      {
        return Shopware()->Container()->getParameter('yj_price_tags.view_dir');
      }

    }
