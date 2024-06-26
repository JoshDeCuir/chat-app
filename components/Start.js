import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [username, setUsername] = useState('');
  const [background, setBackground] = useState('');
  const colors = ['#003e87', '#43532d', '#558a99', '#558a3e'];
  const image = require('../background-img/background1.jpg');

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate('Chat', { name: username, selectedColor: background, userID: result.user.uid });
        Alert.alert('Signed in Successfully!');
      })
      .catch((error) => {
        Alert.alert('Unable to sign in, try again.');
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode='cover' style={styles.image}>
        <Text style={styles.text}>Welcome!</Text>
        <View style={styles.containerGrey}>
          <TextInput
            style={styles.textInput}
            value={username}
            onChangeText={setUsername}
            placeholder='Type your username here'
          />
          <Text style={styles.text1}>Choose Background Color:</Text>
          <View style={styles.colorButtonsContainer}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.colorButton, { backgroundColor: color }, background === color && styles.selectedColor]}
                onPress={() => setBackground(color)}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={signInUser}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  containerGrey: {
    width: '88%',
    height: '44%',
    justifyContent: 'center',
    backgroundColor: 'grey',
    bottom: 0,
    alignItems: 'center',
    marginBottom: '6%',
    borderRadius: 30,
  },
  text: {
    color: 'white',
    fontSize: 36,
  },
  text1: {
    fontSize: 16,
    color: 'black',
    fontWeight: '300',
    marginTop: 10,
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
  },
  selectedColor: {
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#0f2101',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Start;
