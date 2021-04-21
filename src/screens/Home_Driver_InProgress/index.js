import React, { useState, useEffect, useRef, useReducer } from 'react';
import {
  View,
  Text,
  BackHandler
} from 'react-native';
import styles from './style'
import Config from 'src/config'
import { useIsFocused } from '@react-navigation/native';
import { Container, Toast } from 'src/components'
import Geolocation from 'react-native-geolocation-service';
import { Mixins, Spacing, Typography } from 'src/styles'
import API from 'src/services/api'
import { useDdux } from 'src/hooks'
import Body from './body'
import Header from './header'

var socket = null
var watchId = null

const InProgress = ({ route, navigation }) => {
  const { ride_details = null } = route.params
  const isFocused = useIsFocused()
  const Ddux = useDdux()
  const userDetails = Ddux.cache('user')
  const [rideDetails, setRideDetails] = useState(ride_details)
  const map = useRef(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [currentLocation,setCurrentLocation] = useState(null)
  const [popupStep, setPopupStep] = useState(0)
  const [, forceRender] = useReducer(x => x + 1, 0);


  useEffect(() => {
    socketHandler()
    onLocationChange()

    return () => {
      if (socket)
        socket.close();
      if (watchId)
        Geolocation.clearWatch(watchId);
    }
  }, []);

  useEffect(()=>{
    if (socket)
    socket.emit('update_driver_location', { driver_id: rideDetails.assigned_driver, location: currentLocation })
  },[currentLocation])

  /*
   * Socket Handler
   */
  const socketHandler = async () => {
    socket = await API.SOCKET('/user-driver-inprogress')
    socket.on('connect', () => {
      socket.emit('initialize_driver', { ride_id: rideDetails._id }, (response) => {
        setRideDetails(prev=>response)
      })
    });

    socket.on('disconnect', () => {

    });
  }

  const onLocationChange = () => {
    if (watchId)
      Geolocation.clearWatch(watchId);
    watchId = Geolocation.watchPosition(
      pos => {
        // Catch mocked data only for debugging
        if(pos.mocked){
          //console.log(pos)
        setCurrentLocation({heading: pos.coords.heading, latitude: pos.coords.latitude, longitude: pos.coords.longitude})
        }
      },
      e => {
        console.log('watchId Error => ', e)
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        //useSignificantChanges: true,
        //distanceFilter: 500, //500m
      }
    )
  }

  const cancelRideRequest = async () => {
    socket.emit('cancel_ride_request', { ride_id: rideDetails._id }, (response) => {
      if (response) {
        setPopupStep(prev => 0)
        Ddux.setCache('ride', null)
      }
    })
  }

  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation }} />
      <Body _this={{ navigation, map, rideDetails, currentLocation }} />
    </Container>
  )
}

export default InProgress

