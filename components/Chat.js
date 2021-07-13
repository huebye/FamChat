
import React from 'react';
import { View, Text} from 'react-native';


export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backColor: this.props.route.params.backColor
        }
    }

  render() {

    let name = this.props.route.params.name; // OR ...
    // let { name } = this.props.route.params;

    this.props.navigation.setOptions({ title: name });
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.backColor}}>
        <Text style={{color: 'white', fontSize: 45, fontWeight: '500'}}>Hello {name}</Text>
      </View>
    )
  }
}