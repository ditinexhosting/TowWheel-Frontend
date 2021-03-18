import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import styles from './style'
import { Colors, Styles, Mixins } from 'src/styles'
import { otp_top, love_icon, asset_back } from 'src/assets'
import { Container, KeyboardHandledView } from 'src/components'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const Body = ({ _this }) => {

  return (
    <KeyboardHandledView style={Styles.flex1} offset={20}>
      <View style={[Styles.centerAll]}>
        <Image style={styles.otp_top} resizeMode="cover" source={otp_top} />
      </View>
      <Text style={styles.otp_title}>Verification</Text>
      <Text style={styles.otp_text}>Please enter your confirmation code.</Text>
      <View style={styles.loginContainer}>
        <OtpInputBox _this={_this} />
        <Text style={styles.resetText}>{_this.timerValue > 0 && `Re-send Code in ${_this.timerValue}`}</Text>
        <View style={[Styles.flexRow, Styles.centerAll, Styles.marginTop20]}>
          <TouchableOpacity
            style={styles.submit_button}
            onPress={() => _this.verifyOtp()}
          >
            <Text style={styles.submit_button_text}>Continue</Text>
          </TouchableOpacity>
          {_this.timerValue == 0 && <TouchableOpacity
            style={styles.resend_button}
            onPress={() => _this.resendOtp()}
          >
            <Icon
              name="reload"
              size={30}
              color={Colors.primary}
            />
          </TouchableOpacity>}
        </View>
      </View>
    </KeyboardHandledView>
  )
}


const OtpInputBox = ({ _this }) => {
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

export default Body