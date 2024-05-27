<h1>**Chat App**</h1>

*Objective:*

Develop a mobile chat application using React Native. This app offers a chat interface with features to share images and locations. It leverages Google Firebase for storing messages, photos, and locations.

*Dependencies:*
- React Native: Framework for building mobile applications using JavaScript and React.
- Expo: Development platform for building React Native applications.
- GiftedChat: Library for creating chat interfaces in React Native applications.
- Google Firebase: Cloud-based platform offering various services, including Firestore for real-time database and authentication.
- AsyncStorage: Local storage system in React Native for caching and persisting data.
- Expo ImagePicker: API for accessing the device's image picker to choose images from the gallery.
- Expo MediaLibrary: API for accessing and managing media assets on the device.
- Expo Location: API for obtaining location information from a device.
react-native-maps: Map components for React Native applications.
- MapView: Component from the react-native-maps library used to display maps in React Native applications.
  
*Features:*
- Users can enter their name and choose a background color for the chat screen before joining the chat.
- Send and receive messages.
- Send and receive images (from the media library or device's camera).
- Send and receive locations.
- Record, send, and receive audio.
- Users can view previous messages when offline.
  
*Installation:*
1. Clone the repository
    - git clone [https://github.com/JoshDeCuir/chat-app]

2. Install Node.js: To avoid potential conflicts, it is recommended to use a specific Node.js version.
    - nvm use 16.19.0

3. Install Expo CLI
    - npm install -g expo-cli

4. Install project dependencies
    - cd chat-app
    - npm install

5. Set up Firebase for your project
- Sign in to Google Firebase.
- Create a project.
- Set up Firestore Database (in production mode).
- Adjust Firestore rules:
   - allow read, write: if true;
- Register a web app (</>) in the Project Overview.
- Initialize Firebase by copying and pasting the provided Firebase configuration into your App.js.
  
6. Install Firebase in the project
    - npm install firebase

7. Download the Expo Go app on your mobile device
   
8. Start the project
    - npm start

*Running the App:*
- Scan the QR code generated by expo start with the Expo Go app to view the application on your mobile device.
