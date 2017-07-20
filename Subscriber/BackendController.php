<?php
/**
 * (c) Artashes Baghdasaryan 
 *
 */

namespace YjPriceTag\Subscriber;

use Enlight\Event\SubscriberInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class BackendController implements SubscriberInterface
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * @param ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            'Enlight_Controller_Dispatcher_ControllerPath_Backend_YJPriceTag' => 'onGetBackendController',
        ];
    }

    /**
     * adds the templates and snippets dir
     *
     * @return string
     */
    public function onGetBackendController()
    {
        $this->container->get('template')->addTemplateDir($this->getPluginPath() . '/Resources/Views/');

        return $this->getPluginPath() . '/Controllers/Backend/YjPriceTag.php';
    }

    /**
     * @return string
     */
    private function getPluginPath()
    {
        return $this->container->getParameter('yj_price_tags.plugin_dir');
    }
}
