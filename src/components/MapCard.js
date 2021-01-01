import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import GeoJson from '../../assets/map.json';
import { MaterialIcon, ActivitieIcon } from './Icon';
import { Text } from 'react-native-paper';
import axios from 'axios';
import pinIcon from '../../assets/pin.png';
import { useNavigation } from '@react-navigation/native';

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

const styles1 = {
  icon: {
    iconImage: pinIcon,
  },
  path: {
    color: 'red',
  },
};

export default function MapCard(props) {
  const navigation = useNavigation();

  const [point, setPoint] = useState([]);

  function fetchPoint() {
    //shoud refactor and migrate to server proccess. average of all points.
    var json;
    if (props.data.geo_json != null) {
      var config = {
        method: 'get',
        url: props.data.geo_json,
        headers: {},
      };
      axios(config)
        .then(function (response) {
          json = JSON.stringify(response.data);
          json = JSON.parse(json);
          json = json['features'][0]['geometry']['coordinates'][0];
          setPoint(json);
        })
        .catch(function (error) {
          console.log('map fetching' + error);
          setPoint([0, 0]);
        });
    } else {
      setPoint([0, 0]);
    }

    // return json.features[0].geometry.coordinates;
  }

  useEffect(() => {
    fetchPoint();
    MapboxGL.setTelemetryEnabled(true);
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera zoomLevel={6} centerCoordinate={point} />
          <MapboxGL.ShapeSource
            id="ShapeSource"
            url={props.data.geo_json}
          >
            <MapboxGL.SymbolLayer
              id="SymbolLayer"
              style={styles1.icon}
            />
            <MapboxGL.LineLayer style={styles1.path} id="LineLayer" />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>
    </View>
  );
}
