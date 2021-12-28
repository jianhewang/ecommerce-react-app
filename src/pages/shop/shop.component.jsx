import React from "react";
// import SHOP_DATA from "./shop.data";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
// import { selectShopCollections } from "../../redux/shop/shop.selectors";
// import CollectionPreview from "../../components/collection-preview/collection-preview.component";

import { Route } from "react-router-dom";

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from "../collection/collection.component";

const ShopPage = ({ match }) => (

        <div className="shop-page">
           <Route exact path={`${match.path}`} component={CollectionsOverview} />
           <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
        </div>
    
)

// const mapStateToProps = createStructuredSelector(
//     {collections: selectShopCollections}
// )

// export default connect(mapStateToProps)(ShopPage);

export default ShopPage;