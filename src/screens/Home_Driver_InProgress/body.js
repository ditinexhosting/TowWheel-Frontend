import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
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

const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    const onMapReadyHandler = useCallback(() => {
        _this.map.current.fitToSuppliedMarkers(['source', 'destination'])
    }, [_this.map])

    //const icon = _this.driverVehicleDetails && _this.driverVehicleDetails.vehicle_details.type == 'TRUCK' ? tow_truck : _this.driverVehicleDetails && _this.driverVehicleDetails.vehicle_details.type == 'BIKE' ? tow_bike : tow_private

    return (
        <View style={styles.flex1}>
            <MapView
                style={styles.flex1}
                ref={_this.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                followsUserLocation={true}
                onMapReady={() => onMapReadyHandler()}
                loadingEnabled={true}
                showsCompass={false}
                //onUserLocationChange={_this.onUserLocationChange}
                rotateEnabled={false}
                //showsMyLocationButton={true}
                initialRegion={{ latitude: _this.rideDetails.source.coordinates[1], longitude: _this.rideDetails.source.coordinates[0], latitudeDelta: 0.02, longitudeDelta: 0.02, }}
            >
                <Marker
                    identifier='source'
                    coordinate={{ latitude: _this.rideDetails.source.coordinates[1], longitude: _this.rideDetails.source.coordinates[0] }}
                    title={'Pick up point'}
                >
                    <Icon name='ios-location-sharp' size={40} color={Colors.ascent} style={{ alignSelf: 'baseline' }} />
                </Marker>
                <Marker
                    identifier='destination'
                    coordinate={{ latitude: _this.rideDetails.destination.coordinates[1], longitude: _this.rideDetails.destination.coordinates[0] }}
                    title={'Drop off point'}
                >
                    <Icon name='ios-location-sharp' size={40} color={Colors.primary} style={{ alignSelf: 'baseline' }} />
                </Marker>
                <MapViewDirections
                    origin={{ latitude: _this.rideDetails.source.coordinates[1], longitude: _this.rideDetails.source.coordinates[0] }}
                    destination={{ latitude: _this.rideDetails.destination.coordinates[1], longitude: _this.rideDetails.destination.coordinates[0] }}
                    apikey={GOOGLE_MAP_API_KEY}
                    strokeWidth={4}
                    strokeColor={Colors.primary}
                    optimizeWaypoints={false}
                    mode="DRIVING"
                    onReady={result => {
                        //console.log(result.distance, result.duration)
                        //_this.setDriverDistanceTime({ distance: result.distance, duration: result.duration })
                    }}
                />
                {/*<MapViewDirections
                    origin={{ latitude: _this.currentLocation.latitude, longitude: _this.currentLocation.longitude }}
                    destination={{ latitude: _this.rideDetails.source.coordinates[1], longitude: _this.rideDetails.source.coordinates[0] }}
                    apikey={GOOGLE_MAP_API_KEY}
                    strokeWidth={4}
                    strokeColor={Colors.ascent}
                    optimizeWaypoints={false}
                    onReady={result => {
                        console.log('Result >> ',result.distance,result.duration)
                        //_this.setDistanceTime({ distance: result.distance, duration: result.duration })
                    }}
                />*/}
            </MapView>
            <BottomPopup _this={_this} />
        </View>
    )
}

export default Body