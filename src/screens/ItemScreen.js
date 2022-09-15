import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const ItemScreen = ({navigation, route}) => {
  const {background} = route.params;


  return (
    <View style={appStyle.homeView}>
      <ScrollView>
        <Image style={appStyle.welcomeImage} source={background} />
      </ScrollView>
    </View>
  );
};

export const brokenPlayImage = (x, y) =>
  StyleSheet.create({
    position: 'absolute',
    top: x,
    left: y,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  });


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  welcomeImage: {
    width: windowWidth,
    height: windowHeight,
    resizeMode: 'cover',
  },
});

export default ItemScreen;