import {View, Text, Image} from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Animated from 'react-native-reanimated'


const CachedImage = (props) => {
    const [cachedSource, setCachedSource] = useState(null)
    const {uri} = props;

    useEffect (() => {
        const getCachedImage = async () => {
            try{
                const cachedImageData = await AsyncStorage.getItem(uri);
                if(cachedImageData){
                    setCachedSource({uri:cachedImageData})
                }
                else{
                    const response = await fetch(uri);
                    const imageblob = await response.blob();
                    const base64Data= await new Promise((resolve)=>{
                        const reader = new FileReader()
                        reader.onloadend=()=>{
                            resolve(reader.result)
                        }
                    })
                    await AsyncStorage.setItem(uri,base64Data)
                    setCachedSource({uri:base64Data})
                }
            }catch(error){
            console.log(error)
            setCachedSource({uri})
        }
        }
        getCachedImage()
    },[])
    return (
        <Animated.Image source={cachedSource} {...props}/>
    )
}

export default CachedImage