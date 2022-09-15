/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Button,
  TouchableOpacity,
  View,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';

import {items} from '../conf';
import { useDispatch } from 'react-redux';
import { images } from '../assets';
import {increamentByAmount} from '../redux/pointSlice';
import HMSIapModule from '@hmscore/react-native-hms-iap'

export default function App() {
  const [dataProduct,setDataProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // HMSIapModule.isSandboxActivated()
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    HMSIapModule.isEnvironmentReady(false)
      .then((isEnvReadyResult) => { 
        console.log(JSON.stringify(isEnvReadyResult));
        getProduct();
      })
      .catch((err) => { console.log(JSON.stringify(err)) });
    
  },[]);

  const handleCompletePurchase = (productId) => {
    Alert.alert(productId);
    switch (productId) {
      case items[0].sku:
        dispatch(increamentByAmount(items[0].value));
        break;
      case items[1].sku:
        dispatch(increamentByAmount(items[1].value));
        break;
      case items[2].sku:
        dispatch(increamentByAmount(items[2].value));
        break;
      case items[3].sku:
        dispatch(increamentByAmount(items[3].value));
        break;
      default:
        break;
    }
  };

  const getProduct = () => {
    const itemsSku = items.map(item => item.sku);
    const productInfoReq = {
      priceType: 0,
      skuIds: itemsSku,
    };
    HMSIapModule.obtainProductInfo(productInfoReq)
      .then(productInfoResult => {
        console.log(JSON.stringify(productInfoResult));
        setDataProduct(productInfoResult.productInfoList);
        if(productInfoResult.errMsg === "success"){
          setIsLoading(true);
        }
        
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  const buyProduct = productId => {
    const purchaseIntentReq = {
      priceType: 0,
      productId: productId,
      developerPayload: 'payload',
    };
    HMSIapModule.createPurchaseIntent(purchaseIntentReq)
      .then(purchaseResultInfo => {
        console.log(JSON.stringify(purchaseResultInfo));
        var inAppPurchaseData = JSON.parse(
          purchaseResultInfo.inAppPurchaseData,
        );
        if (inAppPurchaseData.purchaseState === 0) {
          var purchaseToken = inAppPurchaseData.purchaseToken;
          const consumeOwnedPurchaseReqID = {
            developerChallenge: 'success',
            purchaseToken: purchaseToken,
          };
          HMSIapModule.consumeOwnedPurchase(consumeOwnedPurchaseReqID)
            .then(consumeOwnedPurchaseResult => {
              console.log(JSON.stringify(consumeOwnedPurchaseResult));
              if (consumeOwnedPurchaseResult.returnCode === 0) {
                handleCompletePurchase(productId);
                Alert.alert("Success");
              }
            })
            .catch(err => {
              console.log(JSON.stringify(err));
            });
        }
        console.log(purchaseToken);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  return (
    <ImageBackground source={images.background} style={styles.homeView}>
    {!isLoading? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={styles.labelText}>In-app Purchase</Text>
          <View style={styles.itemList3}>
            <FlatList 
              data={dataProduct}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.item} onPress={() => buyProduct(item.productId)}>
                  <Text style={styles.descr}>{item.productName}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  items: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemsSubs: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  item: {
    margin: 5,
    width: 300,
    height: 100,
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSub: {
    margin: 5,
    width: 150,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  d: {
    width: 30,
    height: 20,
    marginRight: 5,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#212121',
  },
  descr: {
    fontSize: 14,
    color: '#212121',
    fontWeight: '500',
  },
  itemList: {},
  item2: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 3,
    elevation: 2,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item2Body: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemList3: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  item3: {
    width: '50%',
    padding: 5,
  },
  item3Content: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 3,
    elevation: 2,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});