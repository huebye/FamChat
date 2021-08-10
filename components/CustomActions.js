import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from "expo-location";


export default class CustomActions extends React.Component {
    
/**
 * allows user to pick an image from their library and sends a prop
 */
    imagePicker = async () => {
        // expo permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        try {
          if (status === "granted") {
            // pick image
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images, // only images are allowed
            }).catch((error) => console.log(error));
            // canceled process
            if (!result.cancelled) {
              const imageUrl = await this.uploadImageFetch(result.uri);
              this.props.onSend({ image: imageUrl });
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };

/**
 * allows user to take a picture and send it
 */
      takePhoto = async () => {
        const { status } = await Permissions.askAsync(
          Permissions.CAMERA,
          Permissions.CAMERA_ROLL
        );
        try {
          if (status === "granted") {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
            }).catch((error) => console.log(error));
    
            if (!result.cancelled) {
              const imageUrl = await this.uploadImageFetch(result.uri);
              this.props.onSend({ image: imageUrl });
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };

/**
 * allows user to share their location with someone else
 */
      getLocation = async () => {
        try {
          const { status } = await Permissions.askAsync(Permissions.LOCATION);
          if (status === "granted") {
            const result = await Location.getCurrentPositionAsync(
              {}
            ).catch((error) => console.log(error));
            const longitude = JSON.stringify(result.coords.longitude);
            const altitude = JSON.stringify(result.coords.latitude);
            if (result) {
              this.props.onSend({
                location: {
                  longitude: result.coords.longitude,
                  latitude: result.coords.latitude,
                },
              });
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };

/**
 * uploads Images to the firebase storage
 */
      uploadImageFetch = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
    
        const imageNameBefore = uri.split("/");
        const imageName = imageNameBefore[imageNameBefore.length - 1];
    
        const ref = firebase.storage().ref().child(`images/${imageName}`);
    
        const snapshot = await ref.put(blob);
    
        blob.close();
    
        return await snapshot.ref.getDownloadURL();
      };

/**
 * opens a list of actions when pressing '+' sign in textinput bar 
 */
    onActionPress = () => {

        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
          },
          async (buttonIndex) => {
            switch (buttonIndex) {
              case 0:
                console.log('user wants to pick an image');
                return this.imagePicker();
              case 1:
                console.log('user wants to take a photo');
                return this.takePhoto();
              case 2:
                console.log('user wants to get their location');
                return this.getLocation();
            }
          },
        );
      };

    render() {
        return (
            <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
       <View style={[styles.wrapper, this.props.wrapperStyle]}>
         <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
       </View>
     </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      width: 28,
      height: 28,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 20,
      borderColor: 'white',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
   });


/**
 * create a contextType that is being use by the onActionPress function and allows the function to be used as a proptype
 */
   CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
   };