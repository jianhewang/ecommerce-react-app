import React, { useEffect } from "react";
// import SHOP_DATA from "./shop.data";
import { connect } from "react-redux";
//import { createStructuredSelector } from "reselect";
// import { selectShopCollections } from "../../redux/shop/shop.selectors";
// import CollectionPreview from "../../components/collection-preview/collection-preview.component";
//import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { Route } from "react-router-dom";

//import { updateCollections } from "../../redux/shop/shop.actions";
// thunk
//import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
// saga
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
//import { selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";

//import WithSpinner from "../../components/with-spinner/with-spinner.component";

//import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
//import CollectionPage from "../collection/collection.component";
import CollectionPageContainer from "../collection/collection.container";

//const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
//const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({fetchCollectionsStart, match}) => {
  
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart])

  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
        // render={props => (
        //   <CollectionsOverviewWithSpinner isLoading={!isCollectionLoaded} {...props} />
        // )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
        // render={props => (
        // <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />
        // )}
      />
    </div>
  );
}

// class ShopPage extends React.Component {
//         // state = {
//         //   loading: true
//         // };
      
//         // unsubscribeFromSnapshot = null;
      
//         componentDidMount() {
//           // const { updateCollections } = this.props;
//           // const collectionRef = firestore.collection('collections');
      
//           // collectionRef.get().then(snapshot => {
//           //         //console.log(snapshot);
//           //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//           //   //console.log(collectionsMap);
//           //   updateCollections(collectionsMap);
//           //   this.setState({ loading: false });
//           // });

//           //const { fetchCollectionsStartAsync } = this.props;
//           const { fetchCollectionsStart } = this.props;
//           //fetchCollectionsStartAsync();
//           fetchCollectionsStart();

//         }
      
//         render() {
//           //const { match, isCollectionFetching, isCollectionLoaded } = this.props;
//           const { match } = this.props;
//           //const { loading } = this.state;
//           return (
//             <div className='shop-page'>
//               <Route
//                 exact
//                 path={`${match.path}`}
//                 component={CollectionsOverviewContainer}
//                 // render={props => (
//                 //   <CollectionsOverviewWithSpinner isLoading={!isCollectionLoaded} {...props} />
//                 // )}
//               />
//               <Route
//                 path={`${match.path}/:collectionId`}
//                 component={CollectionPageContainer}
//                 // render={props => (
//                 // <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />
//                 // )}
//               />
//             </div>
//           );
//         }
// }


// const mapStateToProps = createStructuredSelector({
//   //collections: selectShopCollections
//   isCollectionFetching: selectIsCollectionFetching,
//   isCollectionLoaded: selectIsCollectionsLoaded
// });

const mapDispatchToProps = dispatch => ({
  // updateCollections: collectionsMap =>
  //   dispatch(updateCollections(collectionsMap))
  // fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);

//export default ShopPage;