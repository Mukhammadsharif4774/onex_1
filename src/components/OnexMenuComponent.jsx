import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS, width} from '../helpers/colors';

export default function ({item}) {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [added, setAdded] = useState(false);

  const updateCart = useCallback(async () => {
    const cartList = await AsyncStorage.getItem('cartList');
    const cartArray = cartList ? JSON.parse(cartList) : [];
    const isProductInCart = cartArray.some(cart => cart.name === item.name);
    setAdded(isProductInCart);
  }, [item.name]);

  const handleCartUpdate = async action => {
    const cartList = await AsyncStorage.getItem('cartList');
    let cartArray = cartList ? JSON.parse(cartList) : [];

    if (action === 'add') {
      if (!cartArray.some(cart => cart.name === item.name)) {
        cartArray.push({...item, count: 1});
      }
    } else if (action === 'remove') {
      cartArray = cartArray.filter(cart => cart.name !== item.name);
    }

    await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
    toggleRefresh(prev => !prev);
  };

  const toggleCart = () => {
    added ? handleCartUpdate('remove') : handleCartUpdate('add');
  };

  useEffect(() => {
    updateCart();
  }, [updateCart, shouldRefresh]);

  return (
    <View style={styles.main}>
      <Image source={item?.image} style={styles.image} />

      <View style={{width: '60%', justifyContent: 'space-between'}}>
        <Text style={styles.title}>{item?.name}</Text>

        <Text style={styles.description}>{item?.description}</Text>

        <View style={styles.row}>
          <Text style={styles.price}>{item?.price} $</Text>

          <TouchableOpacity onPress={toggleCart}>
            <Text style={styles.button}>{added ? 'УБРАТЬ' : 'КУПИТЬ'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignSelf: 'center',
    height: 130,
    marginTop: 35,
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '40%',
    height: 130,
    borderRadius: 12,
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    width: '100%',
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: COLORS.black,
    width: '100%',
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  price: {
    fontSize: 18,
    fontFamily: FONTS.black,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginRight: 15,
    color: COLORS.black,
    borderRadius: 15,
    borderColor: COLORS.main,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  button: {
    fontFamily: FONTS.black,
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.white,
    borderColor: COLORS.main,
    backgroundColor: COLORS.main,
    borderWidth: 1,
    width: width * 0.3,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 15,
  },
});
