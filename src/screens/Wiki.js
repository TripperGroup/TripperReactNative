import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import WikiCarousal from '../components/WikiCarousal';
export default function Wiki() {
  return (
    <ScrollView>
      <View>
        <Text style={styles.sectionHeader}>Elected articles</Text>
        <WikiCarousal />
      </View>
      <View>
        <Text style={styles.sectionHeader}>Lonely planet</Text>
        <WikiCarousal />
      </View>
      <View>
        <Text style={styles.sectionHeader}>Categories</Text>
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
