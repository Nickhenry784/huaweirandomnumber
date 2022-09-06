import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


const ItemScreen = ({navigation, route}) => {

  const [text, setText] = useState(randomIntFromInterval(0,1000));
  const [score, setScore] = useState(0);
  const [number, onChangeNumber] = useState(null);

  const handleClickCheckBtn = async () => {
    var converter = require('number-to-words');
    const result = converter.toWords(text);
    if(result.toLocaleLowerCase() === number.toLocaleLowerCase()){
      setScore(score + 10);
      setText(randomIntFromInterval(0,1000));
      onChangeNumber(null);
    }else{
      navigation.goBack();
    }
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={appStyle.closeView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.btnback} style={appStyle.btnClose} />
        </TouchableOpacity>
        <Text style={appStyle.scoreText}>{`Score: ${score}`}</Text>
      </View>
      <View style={appStyle.centerView}>
        <Text style={appStyle.labelText}>{text}</Text>
      </View>
      <Text style={appStyle.label}>Input your value </Text>
      <View style={appStyle.bottomView}>
        <TextInput
          style={appStyle.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="text here"
        />
        <TouchableOpacity onPress={() => handleClickCheckBtn()}>
          <Image source={images.btncheck} style={appStyle.btn} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  input: {
    height: 60,
    backgroundColor: 'white',
    width: windowWidth * 0.7,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 30,
    fontFamily: 'fengardo-neue.regular',
    color: 'black',
  },
  closeView: {
    width: windowWidth,
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  centerView: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
  },
  labelText: {
    fontSize: 120,
    fontFamily: 'fengardo-neue.regular',
    color: 'black',
  },
  label: {
    fontSize: 30,
    fontFamily: 'fengardo-neue.regular',
    color: 'black',
    marginVertical: 20,
  },
  scoreText: {
    fontSize: 30,
    fontFamily: 'fengardo-neue.regular',
    color: 'black',
  },
  btnClose: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  btn: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ItemScreen;