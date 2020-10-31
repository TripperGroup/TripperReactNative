import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import GeoJson from '../../assets/map.json';
import CustomIcon from '../components/CustomIcon.js';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoibW9oYW1tYWRtYXNvIiwiYSI6ImNrZ3BnZTR5ODF3NjUzMG5hOTh3MXAzZmYifQ.s-ODBr1-sxflNwRKRuX7XQ',
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

export default class App extends Component {
  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              zoomLevel={9}
              centerCoordinate={[
                51.839332580566406,
                36.50411700054829,
              ]}
            />
            <MapboxGL.UserLocation
              renderMode="normal"
              visible={true}
              showsUserHeadingIndicator
            />
            <MapboxGL.PointAnnotation
              coordinate={[51.739332580566406, 36.50411700054829]}
              id="test"
              title="Test"
            >
              <CustomIcon name="1" size={50} />
            </MapboxGL.PointAnnotation>
            <MapboxGL.ShapeSource
              id="smileyFaceSource"
              shape={GeoJson}
            >
              <MapboxGL.LineLayer id="smileyFaceFill" />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
}
