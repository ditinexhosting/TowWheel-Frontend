import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import style from './style'
import { Mixins } from 'src/styles'
import { KeyboardHandledView } from 'src/components'
import { Countries } from 'src/utils/Countries';
import ModalSelector from 'react-native-modal-selector';

const Body = ({ _this }) => {

    return (
        <KeyboardHandledView offset={20}>
            
        </KeyboardHandledView>
    )
}

export default Body