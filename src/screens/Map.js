import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import GeoJson from '../../assets/map.json';
import { MaterialIcon, ActivitieIcon } from '../components/Icon';
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

export default function Map() {
  const navigation = useNavigation();

  const [trips, setTrips] = useState([]);
  const [points, setPoints] = useState([]);

  async function fetchTrips() {
    await axios
      .get(apiUrl + '/trip/', {})
      .then(function (response) {
        setTrips(response.data.results);
        console.log(trips);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const styles1 = {
    icon: {
      iconImage: pinIcon,
    },
    text: {
      textField: 'mamad',
    },
  };

  // function fetchPoints(trips) {
  //   //shoud refactor and migrate to server proccess. average of all points.
  //   for (var key in trips) {
  //     let json;
  //     if (trips[key].geo_json != null) {
  //       fetch(trips[key].geo_json)
  //         .then((response) => {
  //           json = response.json();
  //         })
  //         .then((data) => console.log(data));
  //       points.push(
  //         json.features.geometry.filter(function (item) {
  //           return item.type == 'Point';
  //         }),
  //       );
  //     }
  //   }
  // }

  useEffect(() => {
    fetchTrips();
    MapboxGL.setTelemetryEnabled(true);
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera
            zoomLevel={4}
            centerCoordinate={[53.688, 33]}
          />
          {/* <MapboxGL.UserLocation
            renderMode="normal"
          /> */}
          {/* <MapboxGL.PointAnnotation
            coordinate={[51.739332580566406, 36.50411700054829]}
            id="test"
            title="Test"
          >
            <CustomIcon name="1" size={50} />
          </MapboxGL.PointAnnotation> */}
          {trips.map((item) =>
            item.geo_json != null ? (
              <MapboxGL.ShapeSource
                key={item.id}
                id={item.id.toString() + 'source'}
                url={item.geo_json}
                onPress={() =>
                  navigation.navigate('TripDetail', {
                    name: item.subject,
                    tripId: item.id,
                  })
                }
              >
                <MapboxGL.SymbolLayer
                  id={item.id.toString() + 'text'}
                  style={{
                    textField: item.subject,
                    textColor: 'green',
                    textHaloColor: 'white',
                    textHaloWidth: 1,
                    textSize: 25,
                  }}
                />
                <MapboxGL.SymbolLayer
                  id={item.id + 'icon'}
                  style={styles1.icon}
                />
                <MapboxGL.LineLayer id={item.id + 'line'} />
              </MapboxGL.ShapeSource>
            ) : null,
          )}
        </MapboxGL.MapView>
      </View>
    </View>
  );
}
