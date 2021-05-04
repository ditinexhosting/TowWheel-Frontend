import React, { useState, useEffect, useRef, useReducer } from 'react';
import {
  View,
  Text,
  BackHandler,
  Platform,
  Linking
} from 'react-native';
import styles from './style'
import Config from 'src/config'
import { useIsFocused } from '@react-navigation/native';
import { Container, Toast } from 'src/components'
import { Mixins, Spacing, Typography } from 'src/styles'
import API from 'src/services/api'
import { useDdux } from 'src/hooks'
import Body from './body'
import Header from './header'

var socket = null

const Chat = ({ route, navigation }) => {
  const { name, partner_id } = route.params
  const isFocused = useIsFocused()
  const Ddux = useDdux()
  const userDetails = Ddux.cache('user')

  const [chatData,setChatData] = useState([])
  
  
  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation, name }} />
      <Body _this={{ navigation, chatData }} />
    </Container>
  )
}

export default Chat

