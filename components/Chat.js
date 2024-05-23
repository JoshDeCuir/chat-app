import React, { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, selectedColor } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    newMessages.forEach(message => {
      addDoc(collection(db, 'messages'), message);
    });
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          },
          left: {
            backgroundColor: '#FFF'
          }
        }}
      />
    );
  }

  useEffect(() => {
    navigation.setOptions({ title: name });

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        _id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis())
      }));
      setMessages(newMessages);
    });

    return () => unsubMessages();
  }, [db, name, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: selectedColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
