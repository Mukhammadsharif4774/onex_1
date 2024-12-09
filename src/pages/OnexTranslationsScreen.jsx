import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import MarsSportSportHeader from '../components/OnexHeader';

export default function () {
  const renderBroadcast = (league, time, teams) => (
    <View style={styles.broadcast}>
      <View style={styles.leagueContainer}>
        <Text style={styles.league}>{league}</Text>
        <Text style={styles.matchTime}>{time}</Text>
      </View>
      <View style={styles.teamsContainer}>
        <Text style={styles.teams}>{teams}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MarsSportSportHeader />
      <Text style={styles.header}>Спортивные трансляции</Text>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 100}}>
        {renderBroadcast(
          'NHL',
          '15.01        00:15',
          'Montreal Canadiens\n' + 'Washington Capitals',
        )}
        {renderBroadcast(
          'MLB',
          '25.01 00:15',
          'Houston Astros\n' + 'St. Louis Cardinals',
        )}
        {renderBroadcast(
          'NFL',
          '28.01 00:05',
          'Philadelphia Eagles\n' + 'Los Angeles Rams',
        )}
        {renderBroadcast(
          'IPL',
          '30.01 00:00',
          'Kolkata Knight Riders\n' + 'Rajasthan Royals',
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    backgroundColor: COLORS.white,
  },
  header: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    margin: 20,
  },
  league: {
    fontSize: 35,
    fontFamily: FONTS.black,
    color: COLORS.black,
    width: 150,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  broadcast: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leagueContainer: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: 130,
  },
  teamsContainer: {
    width: '60%',
  },
  matchTime: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    textAlign: 'left',
    width: '60%',
    paddingVertical: 5,
    marginLeft: 5,
  },
  teams: {
    textAlign: 'left',
    fontFamily: FONTS.regular,
    fontSize: 21,
    color: COLORS.black,
    marginTop: 5,
    marginLeft: 5,
  },
});
