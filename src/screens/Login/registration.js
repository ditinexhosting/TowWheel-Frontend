import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import style from './style'
import { Mixins } from 'src/styles'
import { KeyboardHandledView } from 'src/components'
import { useTheme } from 'src/hooks'
import { verification } from 'src/assets'

const Registration = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

    return (
        <View style={styles.flex1}>
            <KeyboardHandledView offset={20}>
                <View style={styles.flex1, styles.alignCenter}>
                    <Image
                        style={styles.logo}
                        source={verification}
                    />
                    <Text style={styles.title}>Signup</Text>
                    <Text style={styles.subtitle}>Welcome onboard. Let's get started.</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputNumber}
                            onChangeText={(text)=>_this.setUserDetails({..._this.userDetails,name: text})}
                            value={_this.userDetails.name}
                            placeholder="Please enter your name."
                            placeholderTextColor={Colors.muted_text}
                            //autoFocus={true}
                        />
                    </View>
                    <TouchableOpacity onPress={()=>_this.onSignup()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Get Started</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardHandledView>
        </View>
    )
}

const OtpInputBox = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={styles.otpInputContainer}>
            <TextInput
                style={_this.otpValue[0] == '' ? styles.otpBoxEmpty : styles.otpBoxFilled}
                autoFocus={true}
                onChangeText={(value) => _this.onOtpValueChange(value, 0)}
                value={_this.otpValue[0]}
                maxLength={1}
                keyboardType='numeric'
                ref={el => _this.inputRef.current[0] = el}
            />
            <TextInput
                style={_this.otpValue[1] == '' ? styles.otpBoxEmpty : styles.otpBoxFilled}
                onChangeText={(value) => _this.onOtpValueChange(value, 1)}
                value={_this.otpValue[1]}
                maxLength={1}
                keyboardType='numeric'
                ref={el => _this.inputRef.current[1] = el}
            />
            <TextInput
                style={_this.otpValue[2] == '' ? styles.otpBoxEmpty : styles.otpBoxFilled}
                onChangeText={(value) => _this.onOtpValueChange(value, 2)}
                value={_this.otpValue[2]}
                maxLength={1}
                keyboardType='numeric'
                ref={el => _this.inputRef.current[2] = el}
            />
            <TextInput
                style={_this.otpValue[3] == '' ? styles.otpBoxEmpty : styles.otpBoxFilled}
                onChangeText={(value) => _this.onOtpValueChange(value, 3)}
                value={_this.otpValue[3]}
                maxLength={1}
                keyboardType='numeric'
                ref={el => _this.inputRef.current[3] = el}
            />
        </View>
    )
}

export default Registration