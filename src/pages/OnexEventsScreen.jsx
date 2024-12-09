import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import MarsSportSportHeader from '../components/OnexHeader';
import {useNavigation} from '@react-navigation/native';
import Event_1 from '../assets/event_1.png';
import Event_2 from '../assets/event_2.png';
import Event_3 from '../assets/event_3.png';
import Event_4 from '../assets/event_4.png';
import Event_5 from '../assets/event_5.png';

const events = [
  {title: 'Живая Музыка и Ужин', image: Event_1},
  {title: 'Вечерний Кулинарный Мастер-Класс', image: Event_2},
  {title: 'Семейные Выходные', image: Event_3},
  {title: 'Теннисный бранч', image: Event_4},
  {title: 'Олимпийский банкет', image: Event_5},
];

const EventButton = ({title, image, onPress, index}) => (
  <TouchableOpacity
    style={index === 0 ? styles.buttonFirst : styles.button}
    onPress={() => onPress(image)}>
    <Text style={index === 0 ? styles.titleFirst : styles.title}>{title}</Text>
  </TouchableOpacity>
);

export default function () {
  const navigation = useNavigation();

  const handlePress = image => {
    navigation.navigate('DrawerNavigator', {
      screen: 'OnexEventDetailScreen',
      params: {image},
    });
  };

  return (
    <View style={styles.container}>
      <MarsSportSportHeader />

      <View style={styles.content}>
        {events.map((event, index) => (
          <EventButton
            key={index}
            index={index}
            title={event.title}
            image={event.image}
            onPress={handlePress}
          />
        ))}
      </View>
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
    justifyContent: 'center',
    width: '75%',
    marginTop: 15,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: COLORS.blue,
    borderRadius: 25,
  },
  title: {
    fontSize: 23,
    fontFamily: FONTS.bold,
    color: COLORS.blue,
    textAlign: 'center',
    paddingLeft: 15,
  },
  content: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 20,
    width: width,
    marginTop: '10%',
  },
  buttonFirst: {
    justifyContent: 'center',
    width: '75%',
    marginTop: 15,
    backgroundColor: COLORS.blue,
    paddingVertical: 15,
    borderRadius: 25,
  },
  titleFirst: {
    fontSize: 23,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    textAlign: 'center',
    paddingLeft: 15,
  },
});
