import React, { useContext, useState, useEffect } from 'react';
import { AuthContext, StateContext } from '../../App';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Platform,
  Image,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Provider as PaperProvider,
  useTheme,
  Avatar,
  Modal,
  Portal,
  Title,
} from 'react-native-paper';
import apiUrl from '../constant/api';
import axios from 'axios';
import FormData from 'form-data';
import { Formik } from 'formik';
import { colors } from '../constant/theme';
import { darkThemeAuth, lightThemeAuth } from '../constant/theme';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {
  tripCategories,
  tripActivitiesList,
} from '../constant/dataMap';

import { Picker } from '@react-native-picker/picker';

import { MaterialIcon, ActivitieIcon } from '../components/Icon';
import { icon } from '../constant/selectorIcon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import DocumentPicker from 'react-native-document-picker';

import manAvatar from '../../assets/man-avatar.jpg';
import womanAvatar from '../../assets/woman-avatar.jpg';

const TripAdd = ({ navigation }) => {
  const paperTheme = useTheme();

  const theme = paperTheme.dark ? darkThemeAuth : lightThemeAuth;

  const { userId, userToken } = useContext(StateContext);

  const [trip, setTrip] = useState('');
  const [error, setError] = useState('');
  const [tripImage, setTripImage] = useState('');
  const [tripJson, setTripJson] = useState('');
  const [tripActivities, setTripActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleTripSubmit(values) {
    setLoading(true);

    console.log(values);

    var formData = new FormData();

    tripImage != ''
      ? formData.append('image', {
          uri:
            Platform.OS === 'android'
              ? tripImage
              : tripImage.replace('file://', ''),
          name: `dummy${Date.now()}.jpg`,
          type: 'image/*',
        })
      : null;
    tripJson != ''
      ? formData.append('geo_json', {
          uri:
            Platform.OS === 'android'
              ? tripJson.uri
              : tripJson.uri.replace('file://', ''),
          name: `dummy${Date.now()}.json`,
          type: '*/*',
        })
      : null;

    formData.append('auther', values.auther);
    values.start_date != ''
      ? formData.append('start_date', values.start_date)
      : null;
    values.end_date != ''
      ? formData.append('end_date', values.end_date)
      : null;

    formData.append('subject', values.subject);
    formData.append('description', values.description);
    formData.append('category', values.category);

    for (key in tripActivities) {
      formData.append('activities', tripActivities[key]);
    }

    await axios
      .post(apiUrl + '/tripPost/', formData, {
        headers: {
          authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setLoading(false);
        setSubmitted(true);
        navigation.navigate('Trips');
      })
      .catch(function (error) {
        setLoading(false);
        if (error.response.data != null) {
          setError(JSON.stringify(error.response.data, null, 2));
        } else {
          setError('error');
        }
        setLoading(false);
      });
  }

  async function selectGeoJson() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      setTripJson(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  async function selectImage() {
    let options = {
      title: 'You can choose one image',
      storageOptions: {
        skipBackup: true,
      },
      maxHeight: 300,
      maxWidth: 300,
    };

    let source;

    await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton,
        );
      } else {
        source = response;
        setTripImage(source.uri);
      }
    });
  }

  const onSelectedActivitiesChange = (selectedItems) => {
    setTripActivities(selectedItems);
    console.log(JSON.stringify(tripActivities));
  };

  useEffect(() => {}, []);

  return (
    <PaperProvider theme={theme}>
      <ScrollView style={{ margin: 10 }}>
        {/* -------form */}
        <Formik
          initialValues={{
            subject: '',
            category: '',
            description: '',
            start_date: '',
            end_date: '',
            //image: tripImage,
            //geo_json: tripJson.uri,
            auther: userId,
            // activities: tripActivities,
          }}
          enableReinitialize={true}
          onSubmit={(values) => handleTripSubmit(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <ScrollView>
              <View style={{ height: 200 }}>
                <Picker
                  selectedValue={values.category}
                  style={{ height: 50, width: '100%' }}
                  onValueChange={(itemValue, itemIndex) => {
                    setFieldValue('category', itemValue);
                  }}
                >
                  {Object.entries(tripCategories).map(
                    ([key, value]) => (
                      <Picker.Item
                        key={key}
                        label={value}
                        value={key}
                      />
                    ),
                  )}
                </Picker>
              </View>
              <TextInput
                label="Trip Subject"
                placeholder="ex: Khalkhal to Asalem Hiking"
                onChangeText={handleChange('subject')}
                onBlur={handleBlur('subject')}
                value={values.subject}
                left={<TextInput.Icon name="book" />}
                style={{ marginBottom: 5 }}
              />
              <TextInput
                label="Trip Description"
                multiline={true}
                numberOfLines={10}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                left={<TextInput.Icon name="text-box-outline" />}
              />

              <Button
                mode="outlined"
                onPress={() => selectImage()}
                dark
                style={{ marginVertical: 5 }}
                icon="image"
              >
                Trip Image
              </Button>
              {tripImage != '' ? (
                <View style={{ marginVertical: 5 }}>
                  {/* <Image
                    style={{ marginVertical: 5 }}
                    source={{ uri: tripImage }}
                  /> */}
                  <Text style={{ alignSelf: 'center' }}>
                    Image selected
                  </Text>
                </View>
              ) : null}
              {/* <Title style={{ margin: 10, marginTop: 10 }}>
                Activities
              </Title> */}
              <SectionedMultiSelect
                items={tripActivitiesList}
                IconRenderer={icon}
                uniqueKey="id"
                subKey="children"
                selectText="Choose some activities..."
                readOnlyHeadings={true}
                onSelectedItemsChange={onSelectedActivitiesChange}
                selectedItems={tripActivities}
                colors={{ primary: colors.accent }}
              />

              <DatePicker
                style={{ width: '100%' }}
                mode="date"
                date={values.start_date}
                placeholder="Select trip start date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2021-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={(date) => {
                  setFieldValue('start_date', date);
                }}
                customStyles={{
                  dateInput: { borderWidth: 1, borderRadius: 5 },
                }}
              />
              <DatePicker
                style={{ width: '100%', marginVertical: 10 }}
                mode="date"
                date={values.end_date}
                placeholder="Select trip end date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2021-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={(date) => {
                  setFieldValue('end_date', date);
                }}
                customStyles={{
                  dateInput: { borderWidth: 1, borderRadius: 5 },
                }}
              />

              <Button
                mode="outlined"
                onPress={() => selectGeoJson()}
                dark
                style={{ marginVertical: 5 }}
                icon="go-kart-track"
              >
                Trip Track (geojson)
              </Button>

              <Text
                style={{ marginVertical: 5, alignSelf: 'center' }}
              >
                {tripJson.name}
              </Text>

              <Button
                mode="contained"
                onPress={handleSubmit}
                dark
                loading={loading}
                style={{ marginTop: 5 }}
                icon=""
              >
                {submitted
                  ? 'Trip Submitted '
                  : loading
                  ? 'Checking Values'
                  : 'Submit Trip'}
              </Button>
              {error ? (
                <Text style={{ color: 'red', marginTop: 5 }}>
                  {error}
                </Text>
              ) : null}
            </ScrollView>
          )}
        </Formik>
      </ScrollView>
    </PaperProvider>
  );
};

export default TripAdd;

const styles = StyleSheet.create({});
