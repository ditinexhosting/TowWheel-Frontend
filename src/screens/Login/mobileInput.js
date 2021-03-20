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
import Modal from 'react-native-modal';
import { KeyboardHandledView } from 'src/components'
import { useTheme } from 'src/hooks'
import { login } from 'src/assets'
import CountrySelection from './countrySelection'

const MobileInput = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    const onCountrySelect = (value)=>{
        _this.setCountryData(value)
        _this.setIsModalVisible(false)
        // TODO : Focus on phone input
    }
    return (
        <View style={styles.flex1}>
            <KeyboardHandledView offset={20}>
                <View style={styles.flex1, styles.alignCenter}>
                    <Image
                        style={styles.logo}
                        source={login}
                    />
                    <Text style={styles.title}>Get Started</Text>
                    <Text style={styles.subtitle}>Please enter mobile number to continue.</Text>
                </View>
            </KeyboardHandledView>
            <Modal
                style={styles.modal}
                isVisible={_this.isModalVisible}
                onBackdropPress={_this.setIsModalVisible(false)}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={800}
                backdropTransitionOutTiming={800}>
                <View style={styles.popup}>
                    <CountrySelection action={onCountrySelect} />
                </View>
            </Modal>
        </View>
    )
}

export default MobileInput