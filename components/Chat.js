
import React from 'react';
import { View, Platform, KeyboardAvoidingView} from 'react-native';
import CustomActions from './CustomActions';
import { GiftedChat, Bubble, InputToolbar, SystemMessage, Day, Composer, Send } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backColor: this.props.route.params.backColor, // gets backColor as a props from Start.js
            messages: [],
            uid: 0,
            isConnected: false,
        }

        // Initialize Firebase
        if (!firebase.apps.length) {
          firebase.initializeApp({
            apiKey: "AIzaSyAW0LCmy1ck_ZPDwI9QMljtzPFqIzqDvVs",
            authDomain: "famchat-725cf.firebaseapp.com",
            projectId: "famchat-725cf",
            storageBucket: "famchat-725cf.appspot.com",
            messagingSenderId: "690011239151",
            appId: "1:690011239151:web:856ebd40885099a41fe11a",
            measurementId: "G-NED6RF4YMG"
          });
        };

        //reference the collection in firebase
      this.referenceChatMessages = firebase.firestore().collection("messages");
    };

      // when component is mounted the message is being set 
      componentDidMount() {

        NetInfo.fetch().then(connection => {
          if (connection.isConnected) {
            this.setState({
              isConnected: true,
            });
            this.referenceChatMessages = firebase.firestore().collection("messages");
              this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);

            this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
              if (!user) {
                firebase.auth().signInAnonymously();
              }
    
              this.setState({
                uid: user.uid,
                messages: []
              });
              AsyncStorage.setItem('uid', this.state.uid);
            });
          } else {
            this.setState({
              isConnected: false,
            });
            this.getMessages();
            this.getUid();
          }
        });
      }

      componentWillUnmount() {
        this.referenceChatMessages = () => {}
     };

     async getMessages() {
      let messages = '';
      try {
        messages = await AsyncStorage.getItem('messages') || [];
        this.setState({
          messages: JSON.parse(messages)
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    async getUid() {
      let uid = '';
      try {
        uid = await AsyncStorage.getItem('uid');
        this.setState({
          uid: uid
        });
      } catch (error) {
        console.log(error.message);
      }
    }

      onCollectionUpdate = (querySnapshot) => {

        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
          // get the QueryDocumentSnapshot's data
          var data = doc.data();
          messages.push({
            _id: data._id,
            text: data.text,
            createdAt: new Date(),
            user: data.user,
            image: data.image || null,
            location: data.location || null,
          });
        });
        this.setState({
          messages,
        });
      };

// save message on firebase server 

      addMessages = () => {
        const messages = this.state.messages[0];
        firebase.firestore().collection('messages').add({
          _id: messages._id,
        text: messages.text || null ,
        createdAt: messages.createdAt,
        image: messages.image || null,
        location: messages.location || null,
        user: {
          _id: messages.user._id,
          name: messages.user.name,
        },
        }).then()
        .catch((error) => console.log('error', error));
      };

      async saveMessages() {
        try {
          await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
          console.log(error.message);
        }
      }

      async deleteMessages() {
        try {
          await AsyncStorage.removeItem('messages');
          this.setState({
            messages: []
          })
        } catch (error) {
          console.log(error.message);
        }
      }

      onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }),
        () => {
          this.addMessages();
          this.saveMessages();
        }
        );
      };

// custom designt for the text message bubbles being send and recieved       
      renderBubble(props) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#CECECE'
              }
            }}
            textStyle={{
                right: {
                    color: 'black'
                }
            }}
          />
        )
      }

//custom desing for the input bar       

      renderInputToolbar(props) {
        if (this.state.isConnected === false) {
        } else {
          return(
            <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: "inherit",
              borderTopColor: "#3E4140",
              padding: 4,
              color: "black"
            }}
            />
          );
        }
      }

//custom design for the system message text 
      customSystemMessage(props) {
          return (
              <SystemMessage 
              {...props}
              textStyle={{ color:'#3E4140'}}
              />
          )
      };

//custom desing for the day text 
      customDay(props) {
        return (
            <Day 
            {...props}
            textStyle={{ color:'#3E4140'}}
            />
        )
    };

//custom design for the placeholder input text 
    customComposer(props) {
        if(this.state.backColor === '#ADFFDD' || this.state.backColor === '#FFDD9A') {
            return (
                <Composer 
            {...props}
            placeholderTextColor= '#949393'
            />
            )
        } else return (
            <Composer 
            {...props}
            placeholderTextColor= 'white'
            />
        )
    };

 // custom design for the send button   
    customSend(props) {
        return(
        <Send 
        {...props}
        textStyle={{
            color: 'black',
        }}
        label={'Send'}
        />
        )
    }

    renderCustomActions = (props) => {
      return <CustomActions {...props} />;
    };

    renderCustomView(props) {
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

  render() {

    let name = this.props.route.params.name; // OR ...
    // let { name } = this.props.route.params;

    this.props.navigation.setOptions({ title: name });
    return (
        <View style={{flex: 1, backgroundColor: this.state.backColor}}>
        <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        messages={this.state.messages}
        renderUsernameOnMessage={true}
        renderCustomView={this.renderCustomView}
        renderActions={this.renderCustomActions}
        renderInputToolbar={this.renderInputToolbar.bind(this)}
        renderSystemMessage={this.customSystemMessage.bind(this)}
        renderDay={this.customDay.bind(this)}
        renderComposer={this.customComposer.bind(this)}
        renderSend={this.customSend.bind(this)}
        timeTextStyle={{ left: { color: '#3E4140' },right: { color:'#3E4140'} }}
        onSend={messages => this.onSend(messages)}
        user={{
            _id: this.state.uid,
            name: name
        }}
        />

        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
 }
        </View>
    )
  }
}