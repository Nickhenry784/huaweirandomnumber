import { 
  StyleSheet, 
  View, Dimensions,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  Text,
  FlatList} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";
var converter = require('number-to-words');

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


const ItemScreen = ({navigation, route}) => {

  const [text, setText] = useState([randomIntFromInterval(0,100),randomIntFromInterval(0,300)]);
  const [result, setResult] = useState(randomPost([text[0] + text[1],randomIntFromInterval(0,600), randomIntFromInterval(0,600),randomIntFromInterval(0,600)]))
  const [score, setScore] = useState(0);
  const [time,setTime] = useState(10);
  const [answer, setAnswer] = useState(0);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(time > 0){
        setTime(time - 1);
      }
      if(time === 0){
        if(answer === text[0] + text[1]){
          setScore(score + 10);
          setText([randomIntFromInterval(0,100),randomIntFromInterval(0,300)]);
          setTime(10);
          setAnswer(0);
        }else{
          navigation.goBack();
        }
      }
    },1000);
    return () => {
      clearTimeout(timeOut);
    }
  },[time]);

  useEffect(() => {
    setResult(randomPost([text[0] + text[1],randomIntFromInterval(0,600), randomIntFromInterval(0,600),randomIntFromInterval(0,600)]));
  },[text]);

  const handleClickCheckBtn = (val) => {
    setAnswer(val);
    setTime(1);
  }

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.closeView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.btnback} style={appStyle.btnClose} />
        </TouchableOpacity>
        <Text style={appStyle.scoreText}>{`Score: ${score}`}</Text>
      </View>
      <Text style={appStyle.labelText}>{`${time}s`}</Text>
      <ImageBackground style={appStyle.centerView} source={images.textbox}>
        <Text style={appStyle.labelText}>{`${text[0]} + ${text[1]} = ?`}</Text>
      </ImageBackground>
      <Text style={appStyle.label}>Your answer</Text>
      <View style={appStyle.bottomView}>
        <FlatList 
          data={result}
          scrollEnabled
          horizontal={true}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleClickCheckBtn(item)}>
              <ImageBackground source={images.stone1} style={appStyle.btn}>
                <Text style={appStyle.labelAnswer}>{item}</Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export const randomPost = (list) => {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    list.splice(index,1);
    list.splice(randomIntFromInterval(0,3),0,element);
  }
  return list;
}

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
  okBtn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  popupBottomView: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  popupView: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 1, 1, 0.7)',
    position: 'absolute',
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
  },
  popupImage: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  input: {
    height: 60,
    backgroundColor: 'white',
    width: windowWidth * 0.7,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 30,
    fontFamily: 'chela-one.regular',
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
    width: windowWidth * 0.7,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  labelText: {
    fontSize: 30,
    marginVertical: 50,
    fontFamily: 'chela-one.regular',
    color: 'black',
  },
  label: {
    fontSize: 30,
    fontFamily: 'chela-one.regular',
    color: 'black',
    marginVertical: 20,
  },
  scoreText1: {
    fontSize: 20,
    fontFamily: 'chela-one.regular',
    color: 'white',
    position: 'absolute',
    top:"40%",
  },
  scoreText: {
    fontSize: 20,
    fontFamily: 'chela-one.regular',
    color: 'black',
  },
  btnClose: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  btn: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.15,
    marginHorizontal: 10,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelAnswer: {
    fontSize: 25,
    fontFamily: 'chela-one.regular',
    color: 'black',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ItemScreen;