import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { firestore } from '../../firebase/firebase.utils';

import { selectCollection } from '../../redux/shop/shop.selectors';

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer
} from './collection.styles';

const CollectionPage = () => {
  // useEffect(() => {
  //   console.log('In subscribing');
  //   const unsubscribeFromCollections = firestore
  //     .collection('collections')
  //     .onSnapshot(snapshot => console.log(snapshot));
  //   // clean up function
  //   return () => {
  //     console.log('In unsubscribing');
  //     unsubscribeFromCollections();
  //   }
  // })

  // const params = useParams();
  // const collection = useSelector(selectCollection(params.collectionId));

  const { collectionId } = useParams();
  const collection = useSelector(selectCollection(collectionId));

  const { title, items } = collection;
  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

//export default connect(mapStateToProps)(CollectionPage);
export default CollectionPage;
