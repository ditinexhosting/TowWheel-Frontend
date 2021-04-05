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
import { Mixins } from 'src/styles'
import { GOOGLE_MAP_API_KEY } from 'src/config'
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import { tow_bike, tow_truck, tow_private } from 'src/assets'

const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    const onMapReadyHandler = useCallback(() => {
        _this.map.current.fitToSuppliedMarkers(['source','destination'])
      }, [_this.map])
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
                initialRegion={_this.currentLocation}
            >
                <Marker
                    identifier='source'
                    coordinate={{ latitude: _this.currentLocation.latitude, longitude: _this.currentLocation.longitude }}
                    title={'Pick up point'}
                >
                    <Icon name='ios-location-sharp' size={40} color={Colors.ascent} style={{ alignSelf: 'baseline' }} />
                </Marker>
                <Marker
                    identifier='destination'
                    coordinate={{ latitude: _this.destination.location.lat, longitude: _this.destination.location.lng }}
                    title={'Drop off point'}
                >
                    <Icon name='ios-location-sharp' size={40} color={Colors.primary} style={{ alignSelf: 'baseline' }} />
                </Marker>
                <MapViewDirections
                    origin={{ latitude: _this.currentLocation.latitude, longitude: _this.currentLocation.longitude }}
                    destination={{ latitude: _this.destination.location.lat, longitude: _this.destination.location.lng }}
                    apikey={GOOGLE_MAP_API_KEY} //'AIzaSyBKrN8DqBl6I_3Y5vl0R77nuBEZEoXsK1U'
                    strokeWidth={4}
                    strokeColor={Colors.primary}
                    optimizeWaypoints={false}
                    onReady={result => {
                        _this.setDistanceTime({ distance: result.distance, duration: result.duration })
                    }}
                />
            </MapView>
        </View>
    )
}

export default Body