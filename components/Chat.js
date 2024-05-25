import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, selectedColor, userID } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    if (isConnected) {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
      newMessages.forEach(message => {
        addDoc(collection(db, 'messages'), message);
      });
    } else {
      Alert.alert('No internet connection', 'Messages will be sent when the connection is restored.');
    }
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#000' },
          left: { backgroundColor: '#FFF' }
        }}
      />
    );
  }

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  }

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} userID={userID} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const unsubMessages = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        }));
        cacheMessages(newMessages);
        setMessages(newMessages);
      });

      return () => unsubMessages();
    } else {
      loadCachedMessages();
    }
  }, [db, isConnected, navigation, name]);

  return (
    <View style={[styles.container, { backgroundColor: selectedColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userID, name: name }}
      />
      {(Platform.OS === 'android' || Platform.OS === 'ios') && (
        <KeyboardAvoidingView behavior='height' />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
