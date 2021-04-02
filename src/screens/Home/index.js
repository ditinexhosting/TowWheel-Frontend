import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    View,
    Image,
    Text,
    Animated,
    Easing,
    PermissionsAndroid,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import style from './style'
import Geolocation from 'react-native-geolocation-service';
import Config from 'src/config'
import { Container, Toast } from 'src/components'
import API from 'src/services/api'
import Header from './header'
import Body from './body'
import Popup from './popup'
import verifyLoginSession from './verifyLoginSession'
import { useDdux, useTheme } from 'src/hooks'


var socket = null
var watchId = null

const RADIUS = 10000;
const latitudeDelta = 0.02
const longitudeDelta = 0.02

var isInitialized =  false

const Home = ({ navigation }) => {
    const isFocused = useIsFocused()
    const Ddux = useDdux()
    const userDetails = Ddux.cache('user')
    const [Colors, styles] = useTheme(style)
    const [permissionPopup, setPermissionPopup] = useState(false)
    const [nearbyTows, setNearbyTows] = useState([])
    const currentLocation = Ddux.data('current_location')
    const map = useRef(null)

    useEffect(()=>{
        verifyLoginSession(userDetails,Ddux)
    },[userDetails])

    useEffect(() => {
        if (isFocused) {
            //socketHandler()
            requestLocationPremission()
        }
        return () => {
            if (socket)
                socket.close();
            if (watchId)
                Geolocation.clearWatch(watchId);
        };
    }, [isFocused]);

    const requestLocationPremission = () => {
        try {
            if (Config.isAndroid)
                requestPermissionsAndroid()
            else
                requestPermissionsIOS()
        }
        catch (e) {
            console.log(e)
        }
    }

    const getNearestTows = async (location)=>{
      /*
       * API GetNearestTows
       */
      let response = await API.getNearestTows(location.latitude,location.longitude)
      if (!response.status) {
        return Toast.show({ type: 'error', message: response.error })
      }
      setNearbyTows(response.data)
    }

    const onDestinationSet = async (destination)=>{
        if(userDetails){

        }
        else{
            navigation.navigate('Login',{destination: destination})
        }
    }

    const onLocationAvailable = () => {
        watchId = Geolocation.watchPosition(
            pos => {
                if (map.current){
                    //console.log('location changed >> ',pos)
                    const currentGeoLocation = { latitude: pos.coords.latitude, longitude: pos.coords.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta }
                    Ddux.setData('current_location',currentGeoLocation)
                    if(!isInitialized){
                        isInitialized = true
                        getNearestTows(currentGeoLocation)
                        map.current.animateToRegion(currentGeoLocation, 1000);
                    }
                }
            },
            e => {
                console.log('watchId Error => ',e)
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                useSignificantChanges: true,
                distanceFilter: 500, //500m
            }
        )
    }

    const requestPermissionsAndroid = async () => {
        try {
            let granted = true
            let permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
            if (permission !== PermissionsAndroid.RESULTS.GRANTED)
                granted = false
            permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (permission !== PermissionsAndroid.RESULTS.GRANTED)
                granted = false
            if (!granted)
                setPermissionPopup(true)
            else {
                Geolocation.getCurrentPosition(
                info => { /*onLocationAvailable(info)*/ },
                    error => {
                        console.log('errroor ==>>', error)
                        setPermissionPopup(true)
                    },
                    { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
                );
            }

        } catch (err) {
            console.warn(err);
        }
    };

    const requestPermissionsIOS = async () => {
        try {
            let granted = true
            let always = await Geolocation.requestAuthorization('always')
            let whenInUse = await Geolocation.requestAuthorization('whenInUse')
            if (always !== 'granted' && whenInUse !== 'granted')
                granted = false

            if (!granted)
                setPermissionPopup(true)
            else {
                Geolocation.getCurrentPosition(
                info => { /*onLocationAvailable(info)*/ },
                    error => {
                        setPermissionPopup(true)
                    },
                    { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
                );
            }
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <Container isTransparentStatusBar={true} style={styles.fullHeightContainer}>
            <Header _this={{ navigation, onDestinationSet }} />
            <Body _this={{ map, currentLocation, navigation, onLocationAvailable, nearbyTows }} />
            <Popup _this={{ permissionPopup, setPermissionPopup, requestPermissionsAndroid, requestPermissionsIOS }} />
        </Container>
    )
}

export default Home


