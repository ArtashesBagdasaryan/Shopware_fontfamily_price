
{extends file='parent:frontend/detail/data.tpl'}


 {block name='frontend_detail_data_price_default'}
 {if $yjFontFamily}

 <span class="price--content content--default" style="font-family:{$yjFontFamily};" >
<meta itemprop="price" content="{$sArticle.price|replace:',':'.'}">
{if $sArticle.priceStartingFrom && !$sArticle.liveshoppingData}{s name='ListingBoxArticleStartsAt' namespace="frontend/listing/box_article"}{/s} {/if}{$sArticle.price|currency} {s name="Star" namespace="frontend/listing/box_article"}{/s}
</span>
{else}
{$smarty.block.parent}

{/if}



 {/block}