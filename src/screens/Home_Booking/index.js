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
import { Mixins, Spacing, Typography } from 'src/styles'
import API from 'src/services/api'
import Geocoder from 'react-native-geocoding';
import { useDdux } from 'src/hooks'
import Body from './body'
import Header from './header'

var socket = null

const Booking = ({ route, navigation }) => {
  const isFocused = useIsFocused()
  const { destination = null, source = null } = route.params
  const Ddux = useDdux()
  const rideDetails = Ddux.cache('ride')
  const userDetails = Ddux.cache('user')
  const map = useRef(null)
  const [distanceTime, setDistanceTime] = useState({ distance: null, duration: null })
  const [towType, setTowType] = useState('BIKE')
  const [popupStep, setPopupStep] = useState(rideDetails != null ? 1 : 0)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [driverDistanceTime, setDriverDistanceTime] = useState({ distance: null, duration: null })
  const [, forceRender] = useReducer(x => x + 1, 0);
  const [isSortTypeCost, setIsSortTypeCost] = useState(false)
  const [driverList, setDriverList] = useState(null)

  useEffect(() => {
    if(rideDetails && rideDetails.available_drivers)
      driver_sorting()
  }, [rideDetails,isSortTypeCost])

  useEffect(() => {
    try {
      Geocoder.from(source)
        .then(data => {
          source.address = data.results[0].formatted_address
          forceRender()
        })
        .catch(e => {
          console.log(e)
        })
    }
    catch (e) {
      //console.log('>>> useEffect Geocoder')
    }
  }, [])


  useEffect(() => {
    if (isFocused && popupStep == 1) {
      socketHandler()
    }

    if (!isFocused) {
      if (socket)
        socket.close();
    }
  }, [isFocused, popupStep]);

  const driver_sorting=async()=>{
    let driver_list = [...rideDetails.available_drivers]
    for(let i=0;i<driver_list.length;i++)
    {
      let rating = 0
      for(let k = 0;k<driver_list[i].reviews.length;k++){
        rating += driver_list[i].reviews[k].rating
      }
      driver_list[i].average_rating = parseFloat(rating / driver_list[i].reviews.length || 0).toFixed(1)
    }
    if(isSortTypeCost)
      await driver_list.sort((a, b) => (a.vehicle_details.cost_per_km > b.vehicle_details.cost_per_km) ? 1 : -1)
    else await driver_list.sort((a, b) => a.average_rating < b.average_rating ? 1 : -1)
    setDriverList(driver_list)
  }

  /*
   * Socket Handler
   */
  const socketHandler = async () => {
    try {
      socket = await API.SOCKET('/user-ride-request')
      socket.on('connect', () => {
        socket.emit('initialize', { ride_id: rideDetails._id }, (response) => {
          Ddux.setCache('ride', {
            ...response,
            destination: { address: response.destination.address, latitude: response.destination.coordinates[1], longitude: response.destination.coordinates[0] },
            source: { address: response.source.address, latitude: response.source.coordinates[1], longitude: response.source.coordinates[0] }
          })
        })
      });

      socket.on('new_driver_update', (response) => {
        socket.emit('initialize', { ride_id: rideDetails._id }, (response) => {
          setSelectedDriver(prev => {
            if (!prev)
              return prev
            const isSelectedDriverStillAvailable = response.available_drivers.filter(driver_id => driver_id == selectedDriver?._id)
            if (isSelectedDriverStillAvailable.length < 1)
              return null
            else
              return prev
          })

          Ddux.setCache('ride', {
            ...response,
            destination: { address: response.destination.address, latitude: response.destination.coordinates[1], longitude: response.destination.coordinates[0] },
            source: { address: response.source.address, latitude: response.source.coordinates[1], longitude: response.source.coordinates[0] }
          })
        })
      })

      socket.on('disconnect', () => {

      });
    }
    catch (e) {
      //console.log('>>> Socket Initialize')
    }
  }

  const cancelRideRequest = async () => {
    socket.emit('cancel_ride_request', { ride_id: rideDetails._id }, (response) => {
      if (response) {
        setPopupStep(prev => 0)
        setSelectedDriver(null)
        Ddux.setCache('ride', null)
      }
    })
  }

  const hireMe = async () => {
    Ddux.setData('loading', true)

    socket.emit('hire_driver', { active_vehicle: selectedDriver.active_vehicle, driver_id: selectedDriver._id, cost: parseFloat(selectedDriver.vehicle_details.cost_per_km * rideDetails.distance).toFixed(2), ride_id: rideDetails._id }, (response) => {
      Ddux.setData('loading', false)
      if (response) {
        if (response == false)
          return Toast.show({ type: 'error', message: 'Oops! Driver is currently unavailable. Please try another driver.' })
        Ddux.setCache('ride', {
          ...response,
          destination: { address: response.destination.address, latitude: response.destination.coordinates[1], longitude: response.destination.coordinates[0] },
          source: { address: response.source.address, latitude: response.source.coordinates[1], longitude: response.source.coordinates[0] }
        })
        navigation.replace('Home_InProgress')
      }
    })
  }

  const createRideRequest = async () => {
    /*
     * API createRideRequest
     */
    Ddux.setData('loading', true)
    let response = await API.createRideRequest({
      source_address: source.address,
      destination_address: destination.address,
      source: [source.longitude, source.latitude],
      destination: [destination.longitude, destination.latitude],
      distance: distanceTime.distance, // In KM
      time: distanceTime.duration, // In minute,
      tow_type: towType
    })
    Ddux.setData('loading', false)
    if (!response.status) {
      return Toast.show({ type: 'error', message: response.error })
    }
    Ddux.setCache('ride', {
      ...response.data,
      destination: { address: destination.address, latitude: response.data.destination.coordinates[1], longitude: response.data.destination.coordinates[0] },
      source: { address: response.data.source.address, latitude: response.data.source.coordinates[1], longitude: response.data.source.coordinates[0] }
    })
    setPopupStep(1)
  }

  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation }} />
      <Body _this={{ navigation, destination, map, setDistanceTime, source, towType, setTowType, popupStep, setPopupStep, createRideRequest, rideDetails, cancelRideRequest, selectedDriver, setSelectedDriver, driverDistanceTime, setDriverDistanceTime, hireMe, isSortTypeCost, setIsSortTypeCost, driverList }} />
    </Container>
  )
}

export default Booking

