import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import WikiCarousal from '../components/WikiCarousal';
export default function Wiki() {
  return (
    <ScrollView>
      <View>
        <Text style={styles.sectionHeader}>Elected articles</Text>
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
