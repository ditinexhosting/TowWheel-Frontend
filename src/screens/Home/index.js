import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Image,
    Text,
    Animated,
    Easing
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from './style'
import { Colors, Styles } from 'src/styles'
import { Container, Toast } from 'src/components'
import API from 'src/services/api'
import Header from './header'
import { useDdux, useTheme } from 'src/hooks'

const Home = ({ navigation }) => {
    const isFocused = useIsFocused()
    const Ddux = useDdux()

    return (
        <Container isTransparentStatusBar={true}>
            <Header _this={{navigation}} />
            
        </Container>
    )
}

export default Home


