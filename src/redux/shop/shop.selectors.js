import { createSelector } from "reselect";

// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// }

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

// find collection id matching the url parameter of our collection id map
// export const selectCollection = collectionParam => 
//     createSelector(
//         [selectCollections],
//         collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionParam])
//     )

// when we have a set of data as object not array, we can simplify the method
export const selectCollection = collectionParam => 
    createSelector(
        [selectCollections],
        collections => collections[collectionParam]
    )