<?php
namespace YjPriceTag\Models;
use Doctrine\ORM\Mapping as ORM;
use Shopware\Components\Model\ModelEntity;
/**
 * @ORM\Entity(repositoryClass="Repository")
 * @ORM\Table(name="yj_price_types")
 */
class PriceType
{
    /**
     * @var integer
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;
    
    /**
     * @var string
     * @ORM\Column(name="name",type="string", nullable=false)
     */
    private $name;
    
    

  
   
    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

     /**
     * @param  $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }
    
    /**
     * @return int
     */
    public function getName()
    {
        return $this->name;
    }
    /**
     * @param string $int
     */
    public function setName($name)
    {
        $this->name = $name;
    }
 
   

    
    
   
}