/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {View, Dimensions, Alert, Pressable, Text, Image} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import ViewShot from 'react-native-view-shot';

const width = Dimensions.get('screen').width;

export default () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const ref = useRef();
  const [uri, setUri] = useState('');

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

  const clear = () => {
    setCurrentPath([]);
    setPaths([]);
    setUri('');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ViewShot
        ref={ref}
        options={{
          format: 'jpg',
          quality: 1,
        }}>
        <View
          style={{height: width, width, borderWidth: 0.5, borderColor: 'brown'}}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}>
          <Svg height={width} width={width}>
            <Path d={currentPath.join('')} stroke={'red'} strokeWidth={1} />

            {paths.length > 0 &&
              paths.map((item, index) => (
                <Path
                  key={index}
                  d={item.join('')}
                  stroke={'red'}
                  strokeWidth={1}
                />
              ))}
          </Svg>
        </View>
      </ViewShot>
      {!!uri && <Image source={{uri}} style={{height: 100, width: 100}} />}
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
          flexDirection: 'row',
        }}>
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
      </View>
    </View>
  );
};
