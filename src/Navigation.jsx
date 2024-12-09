import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS} from './helpers/colors';
import OnexHomeScreen from './pages/OnexHomeScreen';
import OnexCartScreen from './pages/OnexCartScreen';
import OnexCartSuccessScreen from './pages/OnexCartSuccessScreen';
import OnexReservationScreen from './pages/OnexReservationScreen';
import OnexReservationSuccessScreen from './pages/OnexReserveSuccessScreen';
import OnexContactsScreen from './pages/OnexContactsScreen';
import OnexEventsScreen from './pages/OnexEventsScreen';
import OnexEventDetailScreen from './pages/OnexEventDetailScreen';
import CloseIcon from './assets/close_icon.png';
import CartIcon from './assets/drawer_cart.png';
import Logo from './assets/logo.png';
import OnexTranslationsScreen from './pages/OnexTranslationsScreen';

const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width,
          height,
          backgroundColor: COLORS.white,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {drawerScreens.map(({name, component}) => (
        <Drawer.Screen key={name} name={name} component={component} />
      ))}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const drawerItems = [
    {label: 'ГЛАВНАЯ', screen: 'OnexHomeScreen'},
    {label: 'КОРЗИНА', screen: 'OnexCartScreen'},
    {label: 'ТРАНСЛЯЦИИ', screen: 'OnexTranslationsScreen'},
    {label: 'КОНТАКТЫ', screen: 'OnexContactsScreen'},
    {label: 'РЕЗЕРВ СТОЛИКА', screen: 'OnexReservationScreen'},
    {label: 'СОБЫТИЯ', screen: 'OnexEventsScreen'},
  ];

  const navigateToScreen = screen => {
    navigation.navigate('DrawerNavigator', {screen});
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeIconContainer}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Image source={CloseIcon} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.mainContainer}>
        {drawerItems.map(({label, screen}) => (
          <TouchableOpacity
            key={screen}
            onPress={() => navigateToScreen(screen)}
            style={
              screen === 'OnexHomeScreen'
                ? styles.drawerItemFirst
                : styles.drawerItem
            }>
            <Text
              style={
                screen === 'OnexHomeScreen'
                  ? styles.itemTextFirst
                  : styles.itemText
              }>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => navigateToScreen('OnexCartScreen')}>
        <Image source={CartIcon} style={styles.cartIcon} />
      </TouchableOpacity>
    </View>
  );
}

const drawerScreens = [
  {name: 'OnexHomeScreen', component: OnexHomeScreen},
  {name: 'OnexCartScreen', component: OnexCartScreen},
  {name: 'OnexCartSuccessScreen', component: OnexCartSuccessScreen},
  {name: 'OnexReservationScreen', component: OnexReservationScreen},
  {
    name: 'OnexReservationSuccessScreen',
    component: OnexReservationSuccessScreen,
  },
  {name: 'OnexContactsScreen', component: OnexContactsScreen},
  {name: 'OnexEventsScreen', component: OnexEventsScreen},
  {name: 'OnexEventDetailScreen', component: OnexEventDetailScreen},
  {name: 'OnexTranslationsScreen', component: OnexTranslationsScreen},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
    height: height,
    width: width,
  },
  closeIconContainer: {
    position: 'absolute',
    left: 20,
    bottom: 40,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 20,
  },
  logo: {
    width: width * 0.8,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  mainContainer: {
    marginTop: 40,
    alignItems: 'center',
    width: width,
  },
  drawerItemFirst: {
    justifyContent: 'center',
    width: '75%',
    marginTop: 15,
    backgroundColor: COLORS.blue,
    paddingVertical: 15,
    borderRadius: 25,
  },
  drawerItem: {
    justifyContent: 'center',
    width: '75%',
    marginTop: 15,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: COLORS.blue,
    borderRadius: 25,
  },
  itemText: {
    fontSize: 23,
    fontFamily: FONTS.bold,
    color: COLORS.blue,
    textAlign: 'center',
    paddingLeft: 15,
  },
  itemTextFirst: {
    fontSize: 23,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    textAlign: 'center',
    paddingLeft: 15,
  },
  cartIcon: {
    width: 60,
    height: 70,
    alignSelf: 'center',
    objectFit: 'contain',
    position: 'absolute',
    top: 100,
  },
});
