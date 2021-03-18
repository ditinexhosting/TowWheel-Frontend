import React, { useState, useEffect, useRef } from 'react';
import {
    Animated,
    Easing
} from 'react-native';
import styles from './style'
import { Colors, Styles, Mixins } from 'src/styles'
import { splash_image } from 'src/assets'

const AnimatedSplash = () => {

    useEffect(() => {
        animate()
    })

    /* Rotation Animation */
    const rotateAnimatedValue = new Animated.Value(90);
    const rotationInterpolate = rotateAnimatedValue.interpolate({
        inputRange: [0, 90],
        outputRange: ['0deg', '180deg'],
    });
    const rotateAnimatedStyle = {
        transform: [{ rotate: rotationInterpolate }],
    };


    /* Size Animation */
    const widthAnimatedValue = new Animated.Value(100);
    const widthAnimatedStyle = {
        width: widthAnimatedValue,
    };

    const animate = () => {
        widthAnimatedValue.setValue(100)
        rotateAnimatedValue.setValue(90)
        const zoomIn = Animated.parallel([
            Animated.timing(
                widthAnimatedValue,
                {
                    toValue: 400,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }
            ),
            Animated.timing(
                rotateAnimatedValue,
                {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }
            )
        ])
        const zoomOut = Animated.parallel([
            Animated.timing(
                widthAnimatedValue,
                {
                    toValue: 100,
                    duration: 500,
                    delay: 3000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }
            ),
            Animated.timing(
                rotateAnimatedValue,
                {
                    toValue: 90,
                    duration: 500,
                    delay: 3000,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }
            )
        ])

        zoomIn.start(
            () => zoomOut.start(() => animate())
        )
    }

    return (
        <Animated.Image
            style={[styles.splash_top, widthAnimatedStyle, rotateAnimatedStyle]}
            source={splash_image}
        />
    )
}

export default AnimatedSplash