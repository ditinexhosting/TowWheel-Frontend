import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style'
import { Colors, Styles } from 'src/styles'
import { logo_icon } from 'src/assets'

const Slider = ({ _this }) => {
    const scrollView = useRef(null)

    return (
        <View style={styles.sliderContainer}>
            <ScrollView
                style={Styles.flex1}
                ref={scrollView}
                horizontal={true}
                scrollEventThrottle={16}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={(e) => _this.changeSlider(e)}
            >
                {
                    _this.sliders.map((slide, i) => (
                        <View style={styles.sliderItem} key={i}>
                            <Image style={styles.sliderItem_image} resizeMode="cover" source={slide.image} />
                            <LinearGradient
                                colors={Colors.onboard_gradient_top}
                                start={{ x: 0.0, y: 0.0 }}
                                end={{ x: 0.0, y: 1.0 }}
                                locations={[0, 1]}
                                style={styles.gradient}>
                                <Image style={styles.sliderItem_logo} resizeMode="contain" source={logo_icon} />
                                <Text style={styles.sliderItem_title}>{slide.title}</Text>
                                <Text style={styles.sliderItem_content}>{slide.content}</Text>
                            </LinearGradient>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default Slider