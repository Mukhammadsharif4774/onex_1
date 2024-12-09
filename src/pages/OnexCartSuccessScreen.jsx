import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import QRCode from 'react-native-qrcode-svg';
import {useNavigation} from '@react-navigation/native';
import MarsSportSportHeader from '../components/OnexHeader';
import OnexButtonComponent from '../components/OnexButtonComponent';
import SuccessIcon from '../assets/success_icon.png';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'OnexHomeScreen'});
  };

  return (
    <View style={styles.container}>
      <MarsSportSportHeader />

      <Text style={styles.text}>Спасибо{'\n'} за заказ!</Text>

      <Image source={SuccessIcon} style={styles.image} />

      <View style={styles.qrContainer}>
        <QRCode
          value="https://www.syrovarnya.com/tashkent"
          size={Dimensions.get('window').width / 2.5}
          color={COLORS.blue}
        />
      </View>

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
  qrContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
  successIcon: {
    marginTop: 20,
    width: width * 0.5,
    height: width * 0.5,
    objectFit: 'contain',
    alignSelf: 'center',
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONTS.black,
    fontSize: 45,
    marginTop: '15%',
    backgroundColor: COLORS.blue,
    paddingVertical: 15,
  },
  image: {
    width: width * 0.35,
    height: width * 0.35,
    alignSelf: 'center',
    objectFit: 'contain',
    marginTop: 20,
  },
});
