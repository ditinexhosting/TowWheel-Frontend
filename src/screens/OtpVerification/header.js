import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import styles from './style'
import { Colors, Styles, Mixins } from 'src/styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import { otp_top, love_icon, asset_back } from 'src/assets'
import LinearGradient from 'react-native-linear-gradient';

const Header = ({ navigation }) => {
    return (
        <ImageBackground style={styles.header} source={asset_back} resizeMode="cover">
          <TouchableOpacity
            onPress={()=>navigation.pop()}
            style={styles.header_back}
          >
            <Icon name="chevron-left" size={30} color={Colors.white} />
          </TouchableOpacity>
        </ImageBackground>
    )
}

export default Header


