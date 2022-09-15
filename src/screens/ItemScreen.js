import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  Text,
  FlatList} from "react-native";
import React, {useEffect, useState, useRef} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const PlayScreen = ({navigation, route}) => {

  const {data} = route.params;
  const [startGameState, setStartGameState] = useState([]);
  const [score, setScore] = useState(0);
  const [heart, setHeart] = useState(3);
  const [minutesCoutdown, setMinutesCoutdown] = useState(2);
  const [secondsCoutdown, setSecondsCoutdown] = useState(60);
  const [doubleClick, setDoubleClick] = useState(false);
  const [result, setResult] = useState(null);
  const num = 4;
  const indexOld = useRef(-1);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (secondsCoutdown > 0) {
        setSecondsCoutdown(secondsCoutdown - 1);
      }
      if (secondsCoutdown === 0 && minutesCoutdown > 0) {
        setMinutesCoutdown(minutesCoutdown - 1);
        setSecondsCoutdown(60);
      }
      if (secondsCoutdown === 0 && minutesCoutdown === 0) {
        onClickOKButton();
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [secondsCoutdown, minutesCoutdown]);

  const onClickIconImage = (value, index) => {
    const list = [...startGameState];
    list[index] = true;

    if (!doubleClick) {
      indexOld.current = index;
      setResult(value);
      setDoubleClick(true);
      setStartGameState(list);
      return false;
    }
    if (result.id === value.id) {
      setScore(score + 10);
    } else {
      setHeart(heart - 1);
      list[indexOld.current] = false;
      list[index] = false;
    }
    if (heart === 0) {
      navigation.goBack();
    }
    if (score === 110) {
      navigation.goBack();
    }
    setDoubleClick(false);
    setResult(null);
    setStartGameState(list);
  };

  const onClickOKButton = () => {
    setMinutesCoutdown(0);
    setSecondsCoutdown(0);
    const list = [...startGameState];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < data.length; index++) {
      list.push(false);
    }
    setStartGameState(list);
  };
  return (
    <ImageBackground source={images.background} style={appStyle.homeView}>
      <View style={appStyle.appBar}>
        <Text style={appStyle.turn}>
          SCORE:
          {score}
        </Text>
        {startGameState.length !== 0 && (
          <Text style={appStyle.turn}>
            HEART:
            {heart}
          </Text>
        )}
      </View>
      <View style={appStyle.centerView}>
        {startGameState.length === 0 && (
          <Text style={appStyle.timeText}>
            {`${minutesCoutdown} : ${secondsCoutdown}`}
          </Text>
        )}
        <FlatList
          data={data}
          numColumns={num}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onClickIconImage(item, index)}
              onLongPress={() => onClickIconImage(item, index)}
              disabled={
                startGameState.length === 0 ? true : startGameState[index]
              }
              style={appStyle.iconButton}>
              {startGameState.length === 0 ? (
                <Image source={item.image} style={appStyle.iconImage} />
              ) : (
                <Image
                  source={
                    startGameState[index] ? item.image : images.icon
                  }
                  style={appStyle.iconImage}
                />
              )}
            </TouchableOpacity>
          )}
        />
        {startGameState.length === 0 ? (
          <TouchableOpacity
            onPress={onClickOKButton}>
            <Image source={images.start} style={appStyle.startImage} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image source={images.back} style={appStyle.startImage} />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  appBar: {
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  turn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  centerView: {
    flex: 0.9,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  timeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  iconButton: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    alignItems: 'center',
  },
  iconImage: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    resizeMode: 'contain',
  },
  startImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
});

export default PlayScreen;