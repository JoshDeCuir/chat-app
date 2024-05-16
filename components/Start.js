import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ImageBackground } from 'react-native';


const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const image = require('../background-img/background1.jpg');

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode='cover' style={styles.image}>
      <Text style={styles.text}>Welcome!</Text>
      <View style={styles.containerGrey}>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Type your username here'
      />
      {/* Text indicating color selection*/}
      <Text style={styles.text1}>Choose Background Color:</Text>
      {/* Color selection buttons */}
      <View style={styles.colorButtonsContainer}>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel='More options'
          accessibilityHint='Lets you choose the background color of your chat'
          accessibilityRole='button'
          style={[
            styles.colorButton,
            {backgroundColor: '#003e87', opacity: selectedColor === '#003e87' ? 1: 0.7},
          ]}
          onPress={() => handleColorSelection('#003e87')}
          />
        <TouchableOpacity
          accessibilityLabel='More options'
          accessibilityHint='Lets you choose the background color of your chat'
          accessibilityRole='button'
          style={[
            styles.colorButton,
            {backgroundColor: '#43532d', opacity: selectedColor === '#43532d' ? 1: 0.7},
          ]}
          onPress={() => handleColorSelection('#43532d')}
          />
        <TouchableOpacity
          accessibilityLabel='More options'
          accessibilityHint='Lets you choose the background color of your chat'
          accessibilityRole='button'
          style={[
            styles.colorButton,
            {backgroundColor: '#558a99', opacity: selectedColor === '#558a99' ? 1: 0.7},
          ]}
          onPress={() => handleColorSelection('#558a99')}
          />
        <TouchableOpacity
          accessibilityLabel='More options'
          accessibilityHint='Lets you choose the background color of your chat'
          accessibilityRole='button'
          style={[
            styles.colorButton,
            {backgroundColor: '#558a3e', opacity: selectedColor === '#558a3e' ? 1: 0.7},
          ]}
          onPress={() => handleColorSelection('#558a3e')}
          />
        </View>
      <TouchableOpacity
        accessibilityLabel='More options'
        accessibilityHint='Lets you enter the chat'
        accessibilityRole='button'
        style={[styles.button, styles.buttonStartChatting]}
        onPress={() => navigation.navigate('Screen2', { name: name, selectedColor: selectedColor })}
      >
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>
    </View>
      </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
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
    marginTop: 10
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10
  },
  buttonStartChatting: {
    backgroundColor: '#0f2101',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center'
  },
});

export default Start;
