import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import styles from './style'
import Config from 'src/config'
import { Colors, Styles, Mixins } from 'src/styles'
import { Container, Toast } from 'src/components'
import API from 'src/services/api'
import { useDdux, useStorage } from 'src/hooks'
import Body from './body'
import Header from './header'
import ProfileSetup from './profileSetup'

const OtpVerification = ({ route, navigation }) => {
  const Ddux = useDdux()
  const { mobile, country } = route.params
  const [profileSetupModal, setProfileSetupModal] = useState(false)
  const [otpValue, setOtpValue] = useState(['', '', '', ''])
  const [timerValue, setTimerValue] = useState(60)

  // signup
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [usernameStatus, setUsernameStatus] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState(null)
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [city, setCity] = useState('')
  const [bio, setBio] = useState('')
  const [relationStatus, setRelationStatus] = useState('')
  const [occupation, setOccupation] = useState('')
  const [hobbies, setHobbies] = useState('')
  const [dp, setDp] = useState(null)

  const inputRef = useRef([])

  useEffect(() => {
    let timer = null
    if (timerValue > 0) {
      timer = setTimeout(() => setTimerValue(timerValue - 1), 1000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [timerValue])

  const onOtpValueChange = (value, index) => {
    let temp = [...otpValue]
    temp[index] = value
    setOtpValue(temp)
    if (value !== '' && index !== 3)
      inputRef.current[index + 1].focus()
  }

  const resendOtp = async () => {
    /*
    * API Reset OTP
    */
    Ddux.setData('loading', true)
    let response = await API.sendOtp(mobile)
    Ddux.setData('loading', false)
    if (!response.status) {
      Toast.show({ type: 'error', message: response.error })
    }
    else {
      setTimerValue(60)
      setOtpValue(['', '', '', ''])
      Toast.show({ type: 'success', message: 'One Time Password is sent to your mobile.' })
      console.log('OTP >>> ', response.data.otp)
    }
  }

  const verifyOtp = async () => {
    /*
    * API Reset OTP
    */
    let otp = parseInt(otpValue.join(''))
    if (!Number.isInteger(otp) || otp < 1000)
      return Toast.show({ type: 'error', message: 'Please enter a valid code.' })
    Ddux.setData('loading', true)
    let response = await API.verifyOtp(mobile, otp)
    Ddux.setData('loading', false)
    if (!response.status) {
      Toast.show({ type: 'error', message: response.error })
    }
    else if (response.data.isUserExists) {
      //login
      response.data.token_expiry = new Date().getTime() + 45 * 60000;
      Config.session = { mobile: response.data.mobile, active_session_refresh_token: response.data.active_session_refresh_token, access_token: response.data.access_token, token_expiry: response.data.token_expiry }
      Ddux.setCache('user', response.data)
      navigation.replace('Dashboard')
    }
    else {
      //signup
      setProfileSetupModal(true)
    }
  }

  const checkUsername = async () => {
    /*
    * API Check Username
    */
    if (!username)
      return setUsernameStatus('Username Cannot Be Blank!')
    Ddux.setData('loading', true)
    let response = await API.checkUsername(username)
    Ddux.setData('loading', false)
    if (!response.status) {
      Toast.show({ type: 'error', message: response.error })
    }
    else if (!response.data.isExists) {
      setUsernameStatus('ok')
    }
    else {
      setUsernameStatus('Username Not Available! Try Another.')
    }
  }

  const signUp = async () => {
    /*
      * API SignUp
    */
    if (!name || !gender || !dob || !occupation || !city || !dp || usernameStatus != 'ok' || !bio || !relationStatus || !hobbies)
      return Toast.show({ type: 'error', message: 'All fields are required to go next!' })

    Ddux.setData('loading', true)
    let response = await API.signUp({ name, gender: gender.toLowerCase(), mobile, occupation, city, username, dob: dob.toString(), country, bio, relation_status: relationStatus, hobbies }, dp)
    Ddux.setData('loading', false)
    if (!response.status) {
      Toast.show({ type: 'error', message: response.error })
    }
    response.data.token_expiry = new Date().getTime() + 45 * 60000;
    Config.session = { mobile: response.data.mobile, active_session_refresh_token: response.data.active_session_refresh_token, access_token: response.data.access_token, token_expiry: response.data.token_expiry }
    Ddux.setCache('user', response.data)
    navigation.replace('Dashboard')
  }

  return (
    <Container style={{ height: Mixins.DEVICE_HEIGHT }}>
      <Header navigation={navigation} />
      <Body _this={{ navigation, resendOtp, verifyOtp, onOtpValueChange, otpValue, timerValue, inputRef }} />
      { profileSetupModal &&
        <ProfileSetup _this={{
          signUp,
          checkUsername,
          name, setName,
          username, setUsername,
          gender, setGender,
          dob, setDob,
          datePickerVisible,
          setDatePickerVisible,
          city, setCity,
          dp, setDp,
          bio, setBio,
          relationStatus, setRelationStatus,
          occupation, setOccupation,
          hobbies, setHobbies,
          usernameStatus, setUsernameStatus
        }} />
      }
    </Container>
  )
}

export default OtpVerification