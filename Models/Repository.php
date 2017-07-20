<?php

namespace YjPriceTag\Models;

use Doctrine\DBAL\Connection;
use Shopware\Components\Model\ModelRepository;

/**
 * Class Repository
 *
 * @package YjPriceTag\Models
 */
class Repository extends ModelRepository
{
    /**
     * Returns complete Contact Person data by id.
     *
     * @param $id
     * @return array
     * @throws \Exception
     */
    public function getPriceTypeById($id)
    {
        if( !$id || $id == '') {
            return array();
        } 
        
        /** @var Connection $connection */
        $connection = Shopware()->Container()->get('dbal_connection');
        $query = $connection->createQueryBuilder();

        $query->select([ 
            'id',
            'name'
         
            
        ])
            ->from('yj_price_tipes')
            ->where('id = :id')
            ->setParameter(':id', $id);
        
        $data = $query->execute()->fetchAll(\PDO::FETCH_ASSOC);
        
        return $data[0];
    }

 

    
}

    