import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import MobileInput from './mobileInput'

const Body = ({ _this }) => {
    return (
        <MobileInput _this={_this} />
    )
}

export default Body