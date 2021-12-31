import React from "react";
// import SHOP_DATA from "./shop.data";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// import { selectShopCollections } from "../../redux/shop/shop.selectors";
// import CollectionPreview from "../../components/collection-preview/collection-preview.component";
//import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { Route } from "react-router-dom";

//import { updateCollections } from "../../redux/shop/shop.actions";
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from "../collection/collection.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
        // state = {
        //   loading: true
        // };
      
        // unsubscribeFromSnapshot = null;
      
        componentDidMount() {
          // const { updateCollections } = this.props;
          // const collectionRef = firestore.collection('collections');
      
          // collectionRef.get().then(snapshot => {
          //         //console.log(snapshot);
          //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
          //   //console.log(collectionsMap);
          //   updateCollections(collectionsMap);
          //   this.setState({ loading: false });
          // });

          const { fetchCollectionsStartAsync } = this.props;
          fetchCollectionsStartAsync();
          
        }
      
        render() {
          const { match, isCollectionFetching } = this.props;
          //const { loading } = this.state;
          return (
            <div className='shop-page'>
              <Route
                exact
                path={`${match.path}`}
                render={props => (
                  <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
                )}
              />
              <Route
                path={`${match.path}/:collectionId`}
                render={props => (
                <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />
                )}
              />
            </div>
          );
        }
}


const mapStateToProps = createStructuredSelector({
  //collections: selectShopCollections
  isCollectionFetching: selectIsCollectionFetching
});

const mapDispatchToProps = dispatch => ({
  // updateCollections: collectionsMap =>
  //   dispatch(updateCollections(collectionsMap))
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPage);

//export default ShopPage;