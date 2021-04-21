import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Platform
} from 'react-native';
import { useTheme } from 'src/hooks'
import style from './style'
import { Mixins, Typography } from 'src/styles'
import { GOOGLE_MAP_API_KEY } from 'src/config'
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import BottomPopup from './bottomPopup'
import { tow_bike, tow_truck, tow_private } from 'src/assets'

console.disableYellowBox = true;

const EDGE_PADDING = {
    top: Mixins.scaleSize(50),
    right: Mixins.scaleSize(50),
    bottom: Mixins.scaleSize(50),
    left: Mixins.scaleSize(50)
}

var movedToRegion = false

const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    const onMapReadyHandler = useCallback(() => {
        _this.map.current.fitToSuppliedMarkers(['destination', 'source', 'driver'], { edgePadding: EDGE_PADDING, animated: true })
    }, [_this.map])

    const driverMarker = useRef(null)

    const driverMarkerInitialRegion = useRef(new AnimatedRegion({
        latitude: _this.rideDetails.source.latitude,
        longitude: _this.rideDetails.source.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    })).current

    useEffect(() => {
        if (_this.driverVehicleDetails) {

            const newCoordinate = { latitude: _this.driverVehicleDetails.driver_details.location.coordinates[1], longitude: _this.driverVehicleDetails.driver_details.location.coordinates[0], latitudeDelta: 0.02, longitudeDelta: 0.02 }

            if (Platform.OS === 'android') {
                if (driverMarker) {
                    driverMarker.animateMarkerToCoordinate(newCoordinate, 4000);//  number of duration between points
                }
            } else {
                driverMarkerInitialRegion.timing(newCoordinate, {
                    useNativeDriver: false
                }).start()
            }

            if(!movedToRegion && _this.map){
                movedToRegion = true
                setTimeout(()=>{
                    _this.map.current.fitToSuppliedMarkers(['source', 'driver','destination'], { edgePadding: EDGE_PADDING, animated: true })
                },3000)
            }
        }

        if(!_this.driverVehicleDetails)
        movedToRegion = false


    }, [_this.driverVehicleDetails])

    const icon = _this.driverVehicleDetails && _this.driverVehicleDetails.vehicle_details.type == 'TRUCK' ? tow_truck : _this.driverVehicleDetails && _this.driverVehicleDetails.vehicle_details.type == 'BIKE' ? tow_bike : tow_private

    return (
        <View style={styles.flex1}>
            <MapView
                style={styles.flex1}
                ref={_this.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={false}
                followsUserLocation={true}
                onMapReady={() => onMapReadyHandler()}
                loadingEnabled={true}
                showsCompass={false}
                //onUserLocationChange={_this.onUserLocationChange}
                rotateEnabled={false}
                //showsMyLocationButton={true}
                initialRegion={{ ..._this.rideDetails.source, latitudeDelta: 0.02, longitudeDelta: 0.02, }}
            >
                <Marker
                    identifier='source'
                    coordinate={{ latitude: _this.rideDetails.source.latitude, longitude: _this.rideDetails.source.longitude }}
                    title={'Pick up point'}
                >
                    <Icon name='ios-location-sharp' size={40} color={Colors.ascent} style={{ alignSelf: 'baseline' }} />
                </Marker>
                <Marker
                    identifier='destination'
                    coordinate={{ latitude: _this.rideDetails.destination.latitude, longitude: _this.rideDetails.destination.longitude }}
                    title={'Drop off point'}
                >
                    <Icon name='ios-location-sharp' size={40} color={Colors.primary} style={{ alignSelf: 'baseline' }} />
                </Marker>
                {_this.driverVehicleDetails &&
                    <Marker.Animated
                        ref={driverMarker}
                        flat={true}
                        anchor={{ x: 1, y: 0.5 }}
                        identifier='driver'
                        coordinate={driverMarkerInitialRegion}
                        title={_this.driverVehicleDetails.driver_details.name}
                    >
                        <Image source={icon} style={[styles.markerImage, {
                            transform: [{
                                rotate: _this.driverVehicleDetails.driver_details.location.heading === undefined ? '0deg' : `${_this.driverVehicleDetails.driver_details.location.heading + 270}deg`
                            }]
                        }]} />
                    </Marker.Animated>
                }
                {_this.driverVehicleDetails && _this.rideDetails.ride_status == 'accepted' &&
                    <MapViewDirections
                        origin={{ latitude: _this.driverVehicleDetails.driver_details.location.coordinates[1], longitude: _this.driverVehicleDetails.driver_details.location.coordinates[0] }}
                        destination={{ latitude: _this.rideDetails.source.latitude, longitude: _this.rideDetails.source.longitude }}
                        apikey={GOOGLE_MAP_API_KEY}
                        strokeWidth={4}
                        strokeColor={Colors.ascent}
                        optimizeWaypoints={false}
                        mode="DRIVING"
                        onReady={result => {
                            _this.setArrivingIn(result.duration)
                            //console.log(result.distance,result.duration)
                        }}
                    />
                }
                <MapViewDirections
                    origin={{ latitude: _this.rideDetails.source.latitude, longitude: _this.rideDetails.source.longitude }}
                    destination={{ latitude: _this.rideDetails.destination.latitude, longitude: _this.rideDetails.destination.longitude }}
                    apikey={GOOGLE_MAP_API_KEY}
                    strokeWidth={4}
                    strokeColor={_this.rideDetails.ride_status == 'accepted' ? Colors.primary : Colors.ascent}
                    optimizeWaypoints={false}
                    onReady={result => {
                        //_this.setDistanceTime({ distance: result.distance, duration: result.duration })
                    }}
                />
            </MapView>
            <BottomPopup _this={_this} />
        </View>
    )
}

export default Body

/*
coordinate={{ latitude: _this.driverVehicleDetails.driver_details.location.coordinates[1], longitude: _this.driverVehicleDetails.driver_details.location.coordinates[0] }}
*/