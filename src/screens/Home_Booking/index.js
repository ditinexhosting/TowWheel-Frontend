import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  BackHandler
} from 'react-native';
import styles from './style'
import Config from 'src/config'
import { Container, Toast } from 'src/components'
import { Mixins, Spacing, Typography } from 'src/styles'
import API from 'src/services/api'
import { useDdux } from 'src/hooks'
import Body from './body'
import Header from './header'

const Booking = ({ route, navigation }) => {
  const { destination = null, source = null } = route.params
  const Ddux = useDdux()
  const userDetails = Ddux.cache('user')
  const currentLocation = source
  const map = useRef(null)
  const [distanceTime, setDistanceTime] = useState({distance: null, duration: null})

  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation }} />
      <Body _this={{ navigation, destination, map, currentLocation, setDistanceTime }} />
    </Container>
  )
}

export default Booking

