import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';


// export const updateCollections = (collectionsMap) => ({
//   type: ShopActionTypes.UPDATE_COLLECTIONS,
//   payload: collectionsMap,
// });

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    // switch reducer state
    dispatch(fetchCollectionsStart())

    collectionRef.get().then(snapshot => {
      //console.log(snapshot);
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      //console.log(collectionsMap);
      //updateCollections(collectionsMap);
      dispatch(fetchCollectionsSuccess(collectionsMap))
      //this.setState({ loading: false });
    }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
  }
}