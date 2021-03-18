import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import styles from './style'
import { Colors, Styles, Mixins } from 'src/styles'
import { onboard_1, onboard_2 } from 'src/assets'
import { Container } from 'src/components'
import Slider from './slider'


const sliders = [{
  title: 'What I Believe',
  content: 'As long as you are happy, I dont care about anything else.',
  image: onboard_1
}, {
  title: 'What I Believe',
  content: 'As long as you are happy, I dont care about anything else.',
  image: onboard_2
}, {
  title: 'What I Believe',
  content: 'As long as you are happy, I dont care about anything else.',
  image: onboard_1
}]

const OnBoard = ({ navigation }) => {
  const [currentSlider, setCurrentSlider] = useState(0)

  useEffect(() => {

  })

  const changeSlider = (e) => {
    const widthValue = e.nativeEvent.contentOffset.x;
    const currentSlide = Math.floor(Math.floor(widthValue) / Math.floor(Mixins.DEVICE_WIDTH));
    if (currentSlide !== currentSlider)
      setCurrentSlider(currentSlide)
  }

  return (
    <Container isTransparentStatusBar={true} >
      <Slider _this={{ currentSlider, changeSlider, sliders }} />
      <View style={styles.bottomContainer} >
        <View style={[Styles.flexRow,Styles.centerAll]}>
          {sliders.map((e, i) => (
            <View key={i} style={[styles.indicators, { backgroundColor: i == currentSlider ? Colors.medium : Colors.white }]} />
          ))}
        </View>
        <TouchableOpacity
          style={styles.landing_button}
          onPress={()=>navigation.navigate('Login')}
        >
          <Text style={styles.landing_button_text}>Get Started</Text>
        </TouchableOpacity>
        <Text style={styles.terms}>Terms and Conditions</Text>
      </View>
    </Container>
  )
}

export default OnBoard


