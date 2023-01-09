/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {View, Dimensions, Alert, Pressable, Text, Image} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import ViewShot from 'react-native-view-shot';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const ref = useRef();
  const [uri, setUri] = useState('');
  const [board, setBoard] = useState('white');
  const [stroke, setStoke] = useState('black');
  const [strokeWidth, setStrokeWith] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  const onTouchMove = e => {
    // console.log(e.nativeEvent.locationX, e.nativeEvent.locationY);
    const newPath = [...currentPath];

    newPath.push(
      `${currentPath.length === 0 ? 'M' : ''}${e.nativeEvent.locationX.toFixed(
        0,
      )},${e.nativeEvent.locationY.toFixed(0)} `,
    );

    setCurrentPath(newPath);
  };

  const onTouchEnd = () => {
    const newPaths = [...paths];
    const newCurrentPath = [...currentPath];

    newPaths.push(newCurrentPath);
    setPaths(newPaths);
    setCurrentPath([]);
  };

  const save = () => {
    ref.current.capture().then(uri => {
      Alert.alert('file saved in', uri);
      setUri(uri);
    });
  };

  const newDesign = () => {
    setUri('');
    setCurrentPath([]);
    setPaths([]);
  };

  const clear = () => {
    setCurrentPath([]);
    setPaths([]);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flex: 1}} />
      {!uri && (
        <View style={{borderWidth: 2}}>
          <ViewShot
            ref={ref}
            options={{
              format: 'jpg',
              quality: 1,
            }}>
            <View
              style={{
                height: height * 0.7,
                width,
                borderColor: 'black',
                backgroundColor: board,
              }}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}>
              <Svg height={height * 0.7} width={width}>
                <Path
                  d={currentPath.join('')}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                />

                {paths.length > 0 &&
                  paths.map((item, index) => (
                    <Path
                      key={index}
                      d={item.join('')}
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                    />
                  ))}
              </Svg>
            </View>
          </ViewShot>
        </View>
      )}
      {!!uri && <Image source={{uri}} style={{height: height * 0.75, width}} />}
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {!uri && (
          <Pressable
            onPress={save}
            style={{
              backgroundColor: 'cyan',
              height: 50,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <Text style={{fontSize: 18}}>Save</Text>
          </Pressable>
        )}
        {!uri && (
          <Pressable
            onPress={clear}
            style={{
              backgroundColor: 'cyan',
              height: 50,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <Text style={{fontSize: 18}}>clear</Text>
          </Pressable>
        )}
        {!!uri && (
          <Pressable
            onPress={newDesign}
            style={{
              backgroundColor: 'cyan',
              height: 50,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <Text style={{fontSize: 18}}>new</Text>
          </Pressable>
        )}
        {!uri && (
          <Pressable
            onPress={() => setShowSettings(true)}
            style={{
              backgroundColor: 'cyan',
              height: 50,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <Text style={{fontSize: 18}}>Settings</Text>
          </Pressable>
        )}
      </View>
      <Filter
        stroke={stroke}
        board={board}
        strokeWidth={strokeWidth}
        showSettings={showSettings}
        setShowSettings={() => setShowSettings(false)}
        setStroke={setStoke}
        setBoard={setBoard}
        setStrokeWith={setStrokeWith}
      />
    </View>
  );
};

const Filter = ({
  stroke,
  board,
  strokeWidth,
  showSettings,
  setShowSettings,
  setStroke,
  setBoard,
  setStrokeWith,
}) => {
  if (!showSettings) {
    return null;
  }
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#00000070',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
        <Text style={{textAlign: 'center'}}>Settings :</Text>

        <Text style={{marginBottom: 10}}>Color :</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {['black', 'white', 'red', 'blue', 'cyan', 'yellow'].map(item => (
            <Pressable
              onPress={() => setStroke(item)}
              key={item}
              style={{
                width: 50,
                height: 20,
                backgroundColor: item,
                marginHorizontal: 5,
                borderColor: stroke === item ? 'cyan' : null,
                borderWidth: stroke === item ? 1 : null,
              }}
            />
          ))}
        </View>

        <Text style={{marginBottom: 10, marginTop: 20}}>Board :</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {['black', 'white', 'red', 'blue', 'cyan', 'yellow'].map(item => (
            <Pressable
              onPress={() => setBoard(item)}
              key={item}
              style={{
                width: 50,
                height: 20,
                backgroundColor: item,
                marginHorizontal: 5,
                borderColor: board === item ? 'cyan' : null,
                borderWidth: board === item ? 1 : null,
              }}
            />
          ))}
        </View>

        <Text style={{marginBottom: 10, marginTop: 20}}>Pen width :</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 10, 16, 32, 64].map(item => (
            <Pressable
              onPress={() => setStrokeWith(item)}
              key={item}
              style={{
                width: 20,
                height: 20,
                backgroundColor: 'white',
                marginHorizontal: 5,
                borderColor: strokeWidth === item ? 'cyan' : null,
                borderWidth: strokeWidth === item ? 1 : null,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={{alignSelf: 'center', marginVertical: 20}}
          onPress={setShowSettings}>
          <Text>Close Setting</Text>
        </Pressable>
      </View>
    </View>
  );
};
