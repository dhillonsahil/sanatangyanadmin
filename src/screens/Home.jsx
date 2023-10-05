import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { TabsDemo } from '../components/Tabs';

const Home = () => {
  return (
    <View style={styles.container}>
       <View className="mx-4 space-y-2 mt-3 mb-4 ">
        <View>
        <Text className="text-neutral-600 font-semibold" style={{fontSize:hp(3.5)  }}>Provide More Value</Text>
        </View>
        <Text className="text-neutral-600 font-semibold" style={{fontSize:hp(3.2)  }}>To Users <Text className="text-amber-400">By adding Content</Text></Text>
      </View>

      {/* Tabs */}
      <TabsDemo  />


    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
