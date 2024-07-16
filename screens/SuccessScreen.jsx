import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import successSticker from '../assets/correct.png'
import { useNavigation, CommonActions  } from '@react-navigation/native';

const SuccessScreen = () => {
    const navigation = useNavigation();

    
  const handlePurchase = () => {
    navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: 50, height: 50}}>
        <Image source={successSticker} style={{width: '100%', objectFit: 'cover', height: '100%'}}/>
      </View>
      <View style={{justifyContent: 'center', alignItems:'center', marginTop: 24}}>
        <Text style={{fontSize:24, fontWeight: 'bold'}}>Successfully Paid</Text>
      </View>
      <View style={{justifyContent: 'center', alignItems:'center', marginTop: 24}}>
        <TouchableOpacity onPress={handlePurchase} style={{borderWidth: 1, paddingHorizontal:24, paddingVertical: 16, borderRadius: 10}}>
        <Text style={{fontSize:14}}>Return back home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SuccessScreen