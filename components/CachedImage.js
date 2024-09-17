import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';
import ImageResizer from 'react-native-image-resizer';

const CachedImage = (props) => {
    const [cachedSource, setCachedSource] = useState(null);
    const { uri } = props;

    useEffect(() => {
        const getCachedImage = async () => {
            try {
                const cachedImageData = await AsyncStorage.getItem(uri);
                if (cachedImageData) {
                    setCachedSource({ uri: cachedImageData });
                } else {
                    const response = await fetch(uri);
                    const imageBlob = await response.blob();
                    const base64Data = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(imageBlob);
                    });

                    // Compress the image before storing it
                    const resizedImageUri = await ImageResizer.createResizedImage(
                        base64Data,
                        800, // Max width
                        600, // Max height
                        'JPEG', // Format
                        80 // Quality
                    );

                    await AsyncStorage.setItem(uri, resizedImageUri.uri);
                    setCachedSource({ uri: resizedImageUri.uri });
                }
            } catch (error) {
                console.log(error);
                setCachedSource({ uri });
            }
        };
        getCachedImage();
    }, [uri]);

    return (
        <Animated.Image source={cachedSource} {...props} />
    );
};

export default CachedImage;