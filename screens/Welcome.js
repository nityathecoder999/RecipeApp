import { View, Text ,Image} from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
const Welcome = () => {
  const firstRing = useSharedValue(0);
  const secondRing = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(()=>{
    firstRing.value = 0;
    secondRing.value =0;
    setTimeout(()=>{
     firstRing.value = withSpring(firstRing.value+hp(5.9))
    },300)
    setTimeout(()=>{
      secondRing.value = withSpring(secondRing.value+hp(4.7))
     },500)
     setTimeout(()=>{
      navigation.navigate('Home')
     },2000)
  },[])
  return (
    <View className="flex-1 justify-center items-center space-y-10" style={{backgroundColor:'#387F39'}}>
      <StatusBar style="light" />
      <Animated.View className="bg-white/20 rounded-full " style={{padding:firstRing}}>
       <Animated.View className="bg-white/20 rounded-full " style={{padding:secondRing}}>
        <Image style={{height:hp(23),width:hp(23), borderRadius:150}} source={{uri:'https://logo.com/image-cdn/images/kts928pd/production/b374a124fc505ab3255fadae257d90e8e4a4855e-449x432.png?w=1080&q=72'}}></Image>
       </Animated.View>
      </Animated.View>
      <View className="flex items-center space-y-2">
        <Text style={{fontSize:hp(7)}} className="font-bold tracking-widest text-white ">
          FlavorFul
        </Text>
        <Text style={{fontSize:hp(3)}} className="font-bold tracking-widest text-white ">
          Anyone can cook tasty food
        </Text>
      </View>
    </View>
  )
}

export default Welcome