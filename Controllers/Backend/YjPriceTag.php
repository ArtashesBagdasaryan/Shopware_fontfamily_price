<?php



class Shopware_Controllers_Backend_YjPriceTag extends  Shopware_Controllers_Backend_ExtJs
{
   /**
     * Disable template engine for all actions
     *
     * @return void
     */
    public function preDispatch()
    {
        if (!in_array($this->Request()->getActionName(), ['index', 'load'])) {
            $this->Front()->Plugins()->Json()->setRenderer(true);
        }
    }

  public function indexAction(){
   
 
  }

  public function saveAction(){
         $data = $this->Request()->getParam("save_req");
         $data = json_decode($data);
          
         if($data->id == '') {
               
             $this->createPriceStyle($data);
         } else {
             $this->updatePriceStyle($data);
         }     


  }

private function createPriceStyle($data) {
     try {  
         $sql = "SELECT `id` FROM `yj_price_types` WHERE `name`= ?";
         $font = Shopware()->Db()->fetchOne($sql,array($data->name));
           if($font != NULL || !empty($font)){return $this->View()->assign(array('message' => 'Font Family has exist'));}

         $sql = " INSERT INTO `yj_price_types`  SET  `name` = ?;";
            Shopware()->Db()->query($sql,array( $data->name ));
            $this->View()->assign(array('success' => true));
          } 
     catch (Exception $ex) {
       $this->View()->assign(array('success'=>'false','message'=>$ex->getMessage()));
         }
    }



private function updatePriceStyle($data) {
 $sql = " UPDATE `yj_price_types`SET  `name` = ?  WHERE  `id` = ? ;";

         try {
              Shopware()->Db()->query($sql,array($data->name,$data->id));
             $this->View()->assign(array('success' => true));
        } catch(Exception $ex) {
            $this->View()->assign(array('success'=>'false','message'=>$ex->getMessage()));
            return;
        }



}

  public function getListAction(){
        $limit = $this->Request()->getParams()["limit"];  

        try {
            $sql=  "SELECT `id`, `name` FROM `yj_price_types`   WHERE 1 ;";
        $data = Shopware()->Db()->fetchAll($sql);
      
        $this->View()->assign(array('success' => true, 'data' => $data, 'total' => count($data)));
        } catch (Exception $ex) {
           $this->View()->assign(array('success'=>'false','message'=>$ex->getMessage()));
        }
     
  }


      public function deleteAction(){

              $data = $this->Request()->getParams();
        
       try {
            $sql=  "DELETE   FROM `yj_price_types` WHERE `id` = ? ;";
          Shopware()->Db()->query($sql,array($data['id']));
      
        $this->View()->assign(array('success' => true));
        } catch (Exception $ex) {
           $this->View()->assign(array('success'=>'false','message'=>$ex->getMessage()));
        }
    
 }



}