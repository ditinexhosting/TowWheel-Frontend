import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './style'
import { Container, KeyboardHandledView, Toast } from 'src/components'
import { Colors, Mixins, Spacing, Typography, Styles } from 'src/styles'
import API from 'src/services/api'
import { useDdux } from 'src/hooks'
import Body from './body'

const Login = ({ route,navigation }) => {
  const Ddux = useDdux()
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('India')
  const [country, setCountry] = useState('+91')
  const [flag, setFlag] = useState('🇮🇳')

  const handleSubmit = async() => {
    Ddux.setData('loading', true)
    if (phone.length<10)
      return Toast.show({ type: 'error', message: 'Invalid mobile number.' })

    /*
     * API Login
     */
    let mobileNumber = country.slice(1)+phone
    let response = await API.sendOtp(mobileNumber)
    if (!response.status) {
      Toast.show({ type: 'error', message: response.error })
    }
    else {
      Ddux.setData('signup_session',{mobile: mobileNumber, country: countryCode})
      navigation.replace('OtpVerification',{mobile: mobileNumber, country: countryCode})
      console.log('OTP >>> ',response.data.otp)
    }
    Ddux.setData('loading', false)
  }

  const _this = {
    phone,setPhone,
    country,setCountry,
    flag,setFlag,
    handleSubmit,
    setCountryCode
  }

  return (
    <Container>
      <Body _this={_this} />
    </Container>
  )
}

export default Login


