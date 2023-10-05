import { PermissionsAndroid, StyleSheet, Text, View , Button, Image, Platform, TextInput, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';


const Stack = createNativeStackNavigator();
const App = () => {
  // states
  const[screen,setScreen]=useState('Home')
  const [selectedImage, setSelectedImage] = useState(null);

  // try

  // const selectImage = async()=>{
    
  //   const options = {
  //     mediaType: 'photo', // You can also use 'video' or 'mixed'
  //     maxWidth: 800,
  //     maxHeight: 800,
  //     quality: 0.8,
  //   };

  //   launchImageLibrary(options, async(response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image selection');
  //     } else if (response.errorCode) {
  //       console.log('ImagePicker Error: ', response.errorMessage);
  //     } else {
  //       // Image selected, now upload it to the server
  //       const formData = new FormData();
  //       formData.append('image', {
  //         uri: response.uri,
  //         type: response.type,
  //         name: response.fileName,
  //       });
  //       const config = {
  //         method: 'POST',
  //         headers: {
  //          'Accept': 'application/json',
  //          'Content-Type': 'multipart/form-data',
  //         },
  //         body: formData,
  //        };

  //       const res = await fetch("http://192.168.101.190:5001/api/getbook/imagetest",config)
  //         const response = await res.json();
  //         console.log("Ok done")
  //     }
  //   });
  // }
  const selectImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.8,
    };
  
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image selection');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        // Assuming the first asset is the selected image
        const selectedImage = response.assets[0];
  
        // Now upload it to the server
        const formData = new FormData();
        formData.append('image', {
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.fileName,
        });
        const config = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        };
  
        try {
          const res = await fetch('http://192.168.101.190:5001/api/getbook/imagetest', config);
          const result = await res.json();
          console.log('Image Upload Successful:', result);
          setSelectedImage(result.imageUrl)
        } catch (error) {
          console.error('Image Upload Error:', error);
        }
      } else {
        console.log('Unexpected response:', response);
      }
    });
  };
  

  // use effect for screen 
  useEffect(()=>{
    PermissionsAndroid.check('android.permission.READ_MEDIA_IMAGES').then((results)=>{
      if(results===false){
        setScreen('Welcome')
      }
    })
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={screen} >
        <Stack.Screen name='Welcome' component={Welcome}  />
        <Stack.Screen name='Home' component={Home}  />
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})