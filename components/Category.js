import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import Animated, {FadeInDown} from 'react-native-reanimated'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {CategoryData} from '../constant'
import CachedImage from './CachedImage'

const Category = ({categories, active, handleChangeCategory}) => {
    return(
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            classname='space-x-4'
            contentContainerSylte={{paddingHorizontal:15}}
            >
                {
                    categories.map((cat,index) => {
                        let isActive=cat.strCategory==active
                        let activeButtonClass = isActive? 'bg-amber-400':'bg-black/10'
                        return(
                            <TouchableOpacity
                                key={index}
                                onPress={()=>{handleChangeCategory(cat.strCategory)}}
                                className='flex items-center space-y-1'>
                                    <View className = {'rounded-full p-[7px]' +activeButtonClass}>
                                        <CachedImage uri={cat.strCategoryThumb} style={{width:hp(7), height:hp(7)}} className="rounded-full"></CachedImage>
                                    </View>
                                        <Text className="text-natural-600 " style={{fontSize:hp(1.6)}}>{cat.strCategory}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
                
            </ScrollView>
        </Animated.View>
    )
}

export default Category