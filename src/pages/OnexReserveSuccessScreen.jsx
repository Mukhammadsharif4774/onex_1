import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import MarsSportSportHeader from '../components/OnexHeader';
import OnexButtonComponent from '../components/OnexButtonComponent';
import Icon from '../assets/success_icon.png';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'OnexHomeScreen'});
  };

  return (
    <View style={styles.container}>
      <MarsSportSportHeader />

      <Text style={styles.text}>
        СТОЛИК {'\n'}
        ЗАРЕЗЕРВИРОВАН!
      </Text>

      <Text style={styles.description}>Приятного времяпровождения</Text>

      <Image
        source={Icon}
        style={{
          width: width * 0.35,
          height: width * 0.35,
          alignSelf: 'center',
          marginTop: 20,
          objectFit: 'contain',
        }}
      />

      <OnexButtonComponent
        text="На главную"
        style={styles.button}
        onPress={handleNavigateHome}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.white,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
  text: {
    color: COLORS.main,
    textAlign: 'center',
    fontFamily: FONTS.black,
    fontSize: 30,
    marginTop: '25%',
    paddingVertical: 40,
  },
  description: {
    backgroundColor: COLORS.blue,
    paddingVertical: 15,
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: 25,
    paddingHorizontal: 50,
  },
});
