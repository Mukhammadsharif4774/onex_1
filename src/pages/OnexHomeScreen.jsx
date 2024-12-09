import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import {AppContext} from '../components/AppContext';
import MarsSportSportHeader from '../components/OnexHeader';
import MarsSportMenuComponent from '../components/OnexMenuComponent';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {onexProducts} from '../helpers/onexProducts';

const categories = [
  {label: 'Закуски', image: require('../assets/category_1.png')},
  {label: 'Основные блюда', image: require('../assets/category_2.png')},
  {label: 'Десерты', image: require('../assets/category_3.png')},
  {label: 'Напитки', image: require('../assets/category_4.png')},
];

const OnwSportCategoryButton = ({label, active, onPress, image}) => (
  <TouchableOpacity onPress={onPress} style={styles.categoryButton}>
    <Image source={image} style={active ? styles.imageActive : styles.image} />
    <Text style={styles.category}>{label}</Text>
  </TouchableOpacity>
);

export default function OnexHomeScreen() {
  const [category, setCategory] = useState(0);
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);

  const handleCategoryChange = index => {
    setCategory(index);
    toggleRefresh(!shouldRefresh);
  };

  return (
    <View style={styles.container}>
      <MarsSportSportHeader />

      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <OnwSportCategoryButton
            key={index}
            label={item.label}
            active={category === index}
            onPress={() => handleCategoryChange(index)}
            image={item?.image}
          />
        ))}
      </View>

      <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
        {onexProducts[category].map((product, index) => (
          <MarsSportMenuComponent key={index} item={product} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  categoryContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    width,
    marginVertical: 15,
  },
  categoryButton: {
    width: '24%',
    height: 100,
  },
  category: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 16,
    paddingHorizontal: 2,
    marginTop: 10,
    textAlign: 'center',
    paddingVertical: 5,
    verticalAlign: 'middle',
  },
  main: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    borderRadius: 15,
  },
  imageActive: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.main,
    width: 70,
    height: 70,
    alignSelf: 'center',
  },
});
