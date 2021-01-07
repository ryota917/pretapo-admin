import * as gqlMutations from '../graphql/mutations'
import * as gqlQueries from '../graphql/queries' // read
import { API, graphqlOperation } from 'aws-amplify';

const colorMap = {
    red: 30
}
const categoryIndex = {
    BOTTOMS: 2000,
    TOPS: 1000,
}

export const generateItemId = (
    shopName,
    itemMainColor,
    itemSize,
    itemBigCategory
) => {
    const shopInfo = getShopInfo(shopName);
    const { shopId, itemIndex } = shopInfo;
    const itemColorId = getItemColorId(itemMainColor);
    const itemCategoryId = getItemCategoryId(itemBigCategory);
    updateShopIndex(shopId, itemIndex);
    return `${itemCategoryId}-${shopId}-${itemIndex}-${itemSize}-${itemColorId}`
}

const getShopInfo = async shopName => {
    const res = await API.graphql(graphqlOperation(gqlQueries.searchSupplierIndexs, {
        filter: {
            name: {
                eq: shopName
            }
        }
    }))
    const shopInfo = res.data.searchSupplierIndexs.items[0]
    return {
        shopId: shopInfo.id,
        itemIndex: shopInfo.index
    }
}

const updateShopIndex = async (shopId, itemIndex) => {
    const res = await API.graphql(
        {
            query: gqlMutations.updateSupplierIndex,
            variables: {
                input: {
                    {
                        id: shopId,
                        index: itemIndex,
                    }
                }
            }
        }
    )
    return res
}

const getItemColorId = itemMainColor => {
    return colorMap[itemMainColor]
}

const getItemCategoryId = itemBigCategory => {
    return categoryIndex[itemBigCategory]
}