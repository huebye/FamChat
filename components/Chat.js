
import React from 'react';
import { View, Platform, KeyboardAvoidingView} from 'react-native';
import { GiftedChat, Bubble, InputToolbar, SystemMessage, Day, Composer, Send } from 'react-native-gifted-chat'
import { color } from 'react-native-reanimated';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backColor: this.props.route.params.backColor, // gets backColor as a props from Start.js
            messages: [],
        }
    }

// when component is mounted the message is being set 
    componentDidMount() {
        this.setState({
            messages: [
                {
                  _id: 1,
                  text: 'Hello developer',
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                  },
                 },
                 {
                  _id: 2,
                  text: 'This is a system message',
                  createdAt: new Date(),
                  system: true,
                 },
              ],
        })
      }

      onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }

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
      customtInputToolbar(props) {
        return (
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
      };

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

  render() {

    let name = this.props.route.params.name; // OR ...
    // let { name } = this.props.route.params;

    this.props.navigation.setOptions({ title: name });
    return (
        <View style={{flex: 1, backgroundColor: this.state.backColor}}>
        <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        messages={this.state.messages}
        renderInputToolbar={this.customtInputToolbar.bind(this)}
        renderSystemMessage={this.customSystemMessage.bind(this)}
        renderDay={this.customDay.bind(this)}
        renderComposer={this.customComposer.bind(this)}
        renderSend={this.customSend.bind(this)}
        timeTextStyle={{ left: { color: '#3E4140' },right: { color:'#3E4140'} }}
        onSend={messages => this.onSend(messages)}
        user={{
            _id: 1,
        }}
        />

        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
 }
        </View>
    )
  }
}