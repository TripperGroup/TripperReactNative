import React, { useContext, useState, useEffect } from 'react';
import { AuthContext, StateContext } from '../../App';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Platform,
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
  List,
} from 'react-native-paper';
import apiUrl from '../constant/api';
import axios from 'axios';
import FormData from 'form-data';
import { Formik } from 'formik';
import { colors } from '../constant/theme';
import { darkThemeAuth, lightThemeAuth } from '../constant/theme';

import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import manAvatar from '../../assets/man-avatar.jpg';
import womanAvatar from '../../assets/woman-avatar.jpg';

const ProfileEdit = () => {
  const paperTheme = useTheme();

  const theme = paperTheme.dark ? darkThemeAuth : lightThemeAuth;

  const { userId, userToken } = useContext(StateContext);

  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  //Avatar select Modal
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  async function fetchUser() {
    await axios
      .get(apiUrl + '/users/' + userId + '/', {
        headers: { Authorization: `Token ${userToken}` },
      })
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }
  async function handleProfileSubmit(value) {
    setLoading(true);
    console.log(value);

    await axios
      .patch(apiUrl + '/users/' + userId + '/', value, {
        headers: {
          authorization: `Token ${userToken}`,
        },
      })
      .then(() => {
        setLoading(false);
        setSubmitted(true);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }

  async function selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
      },
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
        source = response.uri;

        pathAvatar(source);
      }
    });
  }

  async function captureImage() {
    let options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    let source1;

    await launchCamera(options, (response) => {
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
        source1 = response.uri;
        if (source1 != null) {
          pathAvatar(source1);
        }
      }
    });
  }

  async function pathAvatar(file) {
    var formData = new FormData();
    console.log(file);
    formData.append('avatar', {
      uri:
        Platform.OS === 'android'
          ? file
          : file.replace('file://', ''),
      name: `dummy${Date.now()}.jpg`,
      type: 'image/*',
    });
    await axios
      .patch(apiUrl + '/users/' + userId + '/', formData, {
        headers: {
          authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setVisible(false);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }

  useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <PaperProvider theme={theme}>
      <ScrollView style={{ margin: 10 }}>
        {/* -----avatar */}
        <View
          style={{
            marginVertical: 20,
            alignSelf: 'center',
            alignContent: 'center',
          }}
        >
          <Avatar.Image
            size={100}
            source={
              user.avatar
                ? {
                    uri: user.avatar,
                  }
                : user.gender === 'WM'
                ? womanAvatar
                : manAvatar
            }
          />
        </View>
        <Button style={{ marginBottom: 10 }} onPress={showModal}>
          Change Avatar
        </Button>

        {/* -------form */}
        <Formik
          initialValues={{
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            about: user.about,
            email: user.email,
            phone: user.phone,
          }}
          enableReinitialize={true}
          onSubmit={(values) => handleProfileSubmit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <ScrollView>
              <TextInput
                label="User Name"
                placeholder={user.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                left={<TextInput.Icon name="account" />}
              />
              <TextInput
                label="Email"
                placeholder={user.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                left={<TextInput.Icon name="at" />}
              />
              <TextInput
                label="Phone"
                placeholder={user.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                left={<TextInput.Icon name="phone" />}
              />
              <TextInput
                label="First Name"
                placeholder={user.first_name}
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                value={values.first_name}
                left={<TextInput.Icon name="account-outline" />}
              />
              <TextInput
                label="Last Name"
                placeholder={user.last_name}
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                value={values.last_name}
                left={<TextInput.Icon name="account-child-outline" />}
              />
              <TextInput
                label="About"
                placeholder={user.about}
                onChangeText={handleChange('about')}
                onBlur={handleBlur('about')}
                value={values.about}
                color={colors.accent}
                left={<TextInput.Icon name="information-variant" />}
              />
              <Button
                mode="contained"
                onPress={handleSubmit}
                dark
                loading={loading}
                style={{ marginTop: 5 }}
              >
                {submitted
                  ? 'Profile Changed '
                  : loading
                  ? 'Checking changes'
                  : 'Change profile data'}
              </Button>
              {error ? <Text color="red">{error}</Text> : null}
            </ScrollView>
          )}
        </Formik>
      </ScrollView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            padding: 20,
            margin: 20,
            backgroundColor: paperTheme.dark ? 'black' : 'white',
          }}
        >
          <List.Section style={styles.container}>
            <List.Item
              title="From Gallery"
              onPress={() => selectImage()}
              left={() => (
                <List.Icon
                  style={styles.icon}
                  icon="image-multiple"
                />
              )}
            />
            <List.Item
              title="From Camera"
              onPress={() => captureImage()}
              left={() => (
                <List.Icon style={styles.icon} icon="camera" />
              )}
            />
          </List.Section>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({});
