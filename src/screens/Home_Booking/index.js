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
import Geocoder from 'react-native-geocoding';
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
  const [pickupPoint, setPickupPoint] = useState(null)
  const [towType, setTowType] = useState('BIKE')

    useEffect(()=>{
        Geocoder.from(currentLocation)
        .then(data=>{
            setPickupPoint(data.results[0].formatted_address)
        })  
        .catch(e=>{
            console.log(e)
        })      
    },[])

  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation }} />
      <Body _this={{ navigation, destination, map, currentLocation, setDistanceTime, pickupPoint,towType, setTowType }} />
    </Container>
  )
}

export default Booking

