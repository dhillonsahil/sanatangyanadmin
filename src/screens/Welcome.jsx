import { Button, StyleSheet, Text, View } from 'react-native'
import React  from 'react'
import { PermissionsAndroid } from 'react-native'

const Welcome = (props) => {
    const takePermissions =async ()=>{
        try {

             await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO])
             PermissionsAndroid.check('android.permission.READ_MEDIA_IMAGES').then((results)=>{
                if(results===true){
                    props.navigation.replace('Home')
                }
            })           
        } catch (error) {
            console.log("Error")
        }
    }
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Button  onPress={()=>takePermissions()} title='Allow Storage Permssions'/>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})