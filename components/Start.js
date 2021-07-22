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

 render() {
     //set title of screen
    this.props.navigation.setOptions({ title: 'FamChat' });
   return (
     <View style={{flex: 1, flexDirection: 'column', backgroundColor: this.state.backColor, alignItems: 'center', justifyContent: 'center'}}>
         <View style={{flex: 20, justifyContent:'center', position: 'relative', top: 60}}>
         <Text style={{textAlign: 'center', fontSize: 29,position: 'relative', right: 52, fontWeight: '600'}}>Welcome to </Text>
         <Text style={{textAlign: 'center', fontSize: 45, fontWeight: '900'}}>FamChat</Text>
         </View>
         <View style={styles.box2}>
         <TextInput
         style={{borderWidth: 1,borderColor: 'grey', textAlign: 'center', height: 40, backgroundColor: this.state.textInputColor, margin: 20}}
         onChangeText={(name) => this.setState({name})}
         value={this.state.text}
         placeholder='Your Name'
       />
       <Text style={{color: 'white', fontWeight: '500', textAlign: 'center', marginTop: 30}}>Choose Background Color:</Text>
       <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 0}}>
       <TouchableOpacity style={{width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFDD9A', margin: 10}} 
       onPress={() => this.setState({ backColor: '#FFDD9A', textInputColor: '#FFEECD', buttonColor: '#FFC148' })}
       accessible={true}
       accessibilityLabel="Option of 3 colors"
       accessibilityHint="Let’s you choose three different colors for the background color of your choice"
       accessibilityRole="button"
       >
       </TouchableOpacity>
       <TouchableOpacity style={{width: 50, height: 50, borderRadius: 25, backgroundColor: '#B0B8FF', margin: 10}} 
       onPress={() => this.setState({ backColor: '#B0B8FF', textInputColor: '#D2D7FF', buttonColor: '#8A6CFF' })}
       accessible={true}
       accessibilityLabel="Option of 3 colors"
       accessibilityHint="Let’s you choose three different colors for the background color of your choice"
       accessibilityRole="button"
       >
       </TouchableOpacity>
       <TouchableOpacity style={{width: 50, height: 50, borderRadius: 25, backgroundColor: '#ADFFDD', margin: 10}} 
       onPress={() => this.setState({ backColor: '#ADFFDD', textInputColor: '#D4FFED', buttonColor: '#548A73' })}
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
    }

  });