import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../components/AppContext';
import OnexCartItemComponent from '../components/OnexCartItemComponent';
import OnexButtonComponent from '../components/OnexButtonComponent';
import MarsSportSportHeader from '../components/OnexHeader';
import {COLORS, FONTS, height, width} from '../helpers/colors';

export default function () {
  const navigation = useNavigation();
  const {shouldRefresh} = useContext(AppContext);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cartList');
      setCart(storedCart ? JSON.parse(storedCart) : []);
    };

    fetchCart();
  }, [shouldRefresh]);

  useEffect(() => {
    const calculatedPrice = cart.reduce(
      (sum, item) => sum + item.price * item.count,
      0,
    );
    setTotalPrice(calculatedPrice);
  }, [cart]);

  const handleOrder = () => {
    const destinationScreen = cart.length
      ? 'OnexCartSuccessScreen'
      : 'OnexHomeScreen';
    navigation.navigate('DrawerNavigator', {screen: destinationScreen});
  };

  return (
    <View style={styles.container}>
      <MarsSportSportHeader />

      {!cart.length && (
        <>
          <Text style={styles.text}>В КОРЗИНЕ ПУСТО...</Text>
        </>
      )}

      {cart.length > 0 && (
        <>
          <View style={{height: height * 0.7}}>
            <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
              {cart.map((item, index) => (
                <OnexCartItemComponent item={item} key={index} />
              ))}
            </ScrollView>
          </View>
        </>
      )}

      {cart.length ? (
        <View style={[styles.row, styles.summaryContainer]}>
          <Text style={styles.sumTitle}>К оплате:</Text>
          <Text style={styles.sum}>${totalPrice}</Text>
        </View>
      ) : (
        ''
      )}

      <OnexButtonComponent
        text={cart.length ? `ЗАКАЗАТЬ` : 'На главную'}
        style={styles.orderButton}
        onPress={handleOrder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: COLORS.white,
  },
  flex: {
    height: 200,
  },
  main: {
    paddingBottom: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 40,
  },
  empty: {
    marginTop: 20,
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  emptyIcon: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  summaryContainer: {
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    width,
    position: 'absolute',
    bottom: 120,
  },
  sumTitle: {
    fontSize: 25,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: 'center',
  },
  sum: {
    fontSize: 30,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: 'center',
    marginLeft: 20,
  },
  orderButton: {
    position: 'absolute',
    bottom: 50,
  },
  text: {
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: FONTS.black,
    fontSize: 24,
    marginVertical: '25%',
  },
});
