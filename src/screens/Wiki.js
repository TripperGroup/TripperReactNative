import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import WikiCarousal from '../components/WikiCarousal';

import { MaterialIcon } from '../components/Icon';

export default function Wiki() {
  return (
    <ScrollView>
      <View>
        <Text style={styles.sectionHeader}>
          <MaterialIcon size={25} name="flare" /> Elected articles
        </Text>
        <WikiCarousal category={16} />
        <Text style={styles.sectionHeader}>
          <MaterialIcon size={25} name="page-last" /> Latest articles
        </Text>
        <WikiCarousal />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 25,
    fontWeight: '200',
    margin: 15,
  },
});
