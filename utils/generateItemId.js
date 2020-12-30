const generateItemId = (
    shopName,
    itemMainColor,
    itemSize,
    itemBigCategory
) => {
    const shopInfo = getShopInfo(shopName);
    const { shopId, itemIndex } = shopInfo;
    const itemColorId = getItemColorId(itemMainColor);
    const itemCategoryId = getItemCategoryId(itemBigCategory)
    return `${itemCategoryId}-${shopId}-${itemIndex}-${itemSize}-${itemColorId}`
}

const getShopInfo = shopName => {
    const shopId = '30';
    const itemIndex = '004';
    return {
        shopId: shopId,
        itemIndex: itemIndex
    }
}

const getItemColorId = itemMainColor => {
    '40'
}

const getItemCategoryId = itemBigCategory => {
    '2000'
}