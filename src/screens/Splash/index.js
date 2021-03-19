import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
import style from './style'
import { logo } from 'src/assets'
import { Container } from 'src/components'
import { useTheme } from 'src/hooks'

const Splash = ({ navigation }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <Container style={styles.centerAll} isTransparentStatusBar={false}>
            <Image
                style={styles.logo}
                source={logo}
            />
        </Container>
    )
}

export default Splash


