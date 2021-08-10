import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, Button, TouchableOpacity } from 'react-native';

export default class Start extends React.Component {
 constructor(props) {
   super(props);
   
   this.state = { name: '',
                  backColor: '#ADFFDD',
                  textInputColor: '#D4FFED',
                  buttonColor: '#548A73'   
                };
 }

setColorState(backColor, textInputColor, buttonColor) {
  this.setState({backColor, textInputColor, buttonColor})
};

 render() {

    this.props.navigation.setOptions({ title: 'FamChat' });//set title of screen
    
   return (
     <View style={{...styles.viewStyle,...{backgroundColor: this.state.backColor}}} >
         <View style={styles.titleBox}>
         <Text style={styles.title1}>Welcome to </Text>
         <Text style={styles.title2}>FamChat</Text>
         </View>
         <View style={styles.box2}>
         <TextInput
         style={{...styles.textInput,...{backgroundColor: this.state.textInputColor}}}
         onChangeText={(name) => this.setState({name})}
         value={this.state.text}
         placeholder='Your Name'
       />
       <Text style={styles.colorChoiceText}>Choose Background Color:</Text>
       <View style={styles.colorChoiceBox}>
       <TouchableOpacity style={styles.colorBtn1}
       onPress={() => this.setColorState('#FFDD9A', '#FFEECD','#FFC148')}
       accessible={true}
       accessibilityLabel="Option of 3 colors"
       accessibilityHint="Let’s you choose three different colors for the background color of your choice"
       accessibilityRole="button"
       >
       </TouchableOpacity>
       <TouchableOpacity style={styles.colorBtn2}
       onPress={() => this.setColorState('#B0B8FF', '#D2D7FF', '#8A6CFF')}
       accessible={true}
       accessibilityLabel="Option of 3 colors"
       accessibilityHint="Let’s you choose three different colors for the background color of your choice"
       accessibilityRole="button"
       >
       </TouchableOpacity>
       <TouchableOpacity style={styles.colorBtn3}
       onPress={() => this.setColorState('#ADFFDD','#D4FFED', '#548A73')}
       accessible={true}
       accessibilityLabel="Option of 3 colors"
       accessibilityHint="Let’s you choose three different colors for the background color of your choice"
       accessibilityRole="button"
       >
       </TouchableOpacity>
       </View>
       <Button
        color= '#3E4140'
       onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, backColor: this.state.backColor, position: 'relative', top: 20 })} // send props to Chat via navigator
        title="Enter Chat"
        />
        </View>
     </View>
   );
 }
}

const styles = StyleSheet.create({
    titleBox: {
      flex: 20, 
      justifyContent:'center', 
      position: 'relative', 
      top: 60
    },
    title1: {
      textAlign: 'center', 
      fontSize: 29,
      position: 'relative', 
      right: 52, 
      fontWeight: '600'
    },
    title2: {
      textAlign: 'center', 
      fontSize: 45, 
      fontWeight: '900'
    },
    box2: {
        flex: 40,
        backgroundColor: '#3E4140',
        padding: 20,
        marginBottom: 50,
        marginTop: 190,
        width: '90%',
        height: '70%',
        borderRadius: 5,
        paddingBottom: 30
    },
    viewStyle: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
    },
    textInput: {
      borderWidth: 1,
      borderColor: 'grey', 
      textAlign: 'center', 
      height: 40,
      margin: 20
    },
    colorBtn1: {
      width: 50, 
      height: 50,  
      borderRadius: 25, 
      backgroundColor: '#FFDD9A', 
      margin: 10
    },
    colorBtn2: {
      width: 50, 
      height: 50,  
      borderRadius: 25, 
      backgroundColor: '#B0B8FF', 
      margin: 10
    },
    colorBtn3: {
      width: 50, 
      height: 50,  
      borderRadius: 25, 
      backgroundColor: '#ADFFDD', 
      margin: 10
    },
    colorChoiceText: {
      color: 'white', 
      fontWeight: '500', 
      textAlign: 'center', 
      marginTop: 30
    },
    colorChoiceBox: {
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'center', 
      marginTop: 0
    }
  });