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

const InProgress = ({ route, navigation }) => {
  const isFocused = useIsFocused()
  const Ddux = useDdux()
  const rideDetails = Ddux.cache('ride')
  const userDetails = Ddux.cache('user')
  const map = useRef(null)
  const [driverVehicleDetails, setDriverVehicleDetails] = useState(null)
  const [arrivingIn, setArrivingIn] = useState('0')
  const [, forceRender] = useReducer(x => x + 1, 0);

  useEffect(()=>{
    //console.log('Driver details changed >> ',driverVehicleDetails)
  },[driverVehicleDetails])


  useEffect(() => {
    if (isFocused) {
      socketHandler()
    }

    if (!isFocused) {
      if (socket)
        socket.close();
    }
  }, [isFocused]);

  /*
   * Socket Handler
   */
  const socketHandler = async () => {
    socket = await API.SOCKET('/user-driver-inprogress')
    socket.on('connect', () => {
      socket.emit('initialize_user', { ride_id: rideDetails._id }, (response) => {
        Ddux.setCache('ride', {
          ...rideDetails,
          ride_status: response.ride_status
        })
        setDriverVehicleDetails((prev)=>({driver_details: {...response.assigned_driver,...response.driver_details}, vehicle_details: response.assigned_vehicle}))
      })
    });
    
    socket.on('driver_location_changed',(response) => {
      
      setDriverVehicleDetails((prev)=>{
        let temp = {...prev}
        temp.driver_details.location.heading = response.heading
        temp.driver_details.location.coordinates = [response.longitude,response.latitude]
        //console.log('Location changed >>',temp)
        return temp
      })
    })

    socket.on('disconnect', () => {

    });
  }

  const cancelRideRequest = async () => {
    socket.emit('cancel_ride_request', { ride_id: rideDetails._id }, (response) => {
      if (response) {
        navigation.pop()
        Ddux.setCache('ride', null)
      }
    })
  }

  const callDriver = () => {
    let phoneNumber = `tel:${driverVehicleDetails.driver_details.mobile}`;
    Linking.openURL(phoneNumber);
  };

  
  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation }} />
      <Body _this={{ navigation, map, rideDetails, driverVehicleDetails, arrivingIn, setArrivingIn, cancelRideRequest, callDriver }} />
    </Container>
  )
}

export default InProgress

