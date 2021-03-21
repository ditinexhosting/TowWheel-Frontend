import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import style from './style'
import { Mixins } from 'src/styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'src/hooks'

const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={styles.flex1}>
            
        </View>
    )
}

export default Body


