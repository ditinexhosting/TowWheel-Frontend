import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import style from './style'
import { Mixins } from 'src/styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'src/hooks'
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout } from 'react-native-maps';
import { avatarGif } from 'src/assets'

const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <>
            <View style={styles.map}>
                <MapView
                    style={styles.flex1}
                    ref={_this.map}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    onMapReady={() => _this.requestLocationPermission()}
                    loadingEnabled={true}
                    showsCompass={false}
                    //onUserLocationChange={_this.onUserLocationChange}
                    rotateEnabled={false}
                    //showsMyLocationButton={true}
                    initialRegion={_this.currentLocation}
                >
                    {
                        _this.nearbyTows.map(item => <MarkerRender key={item._id} item={item} />)
                    }
                </MapView>
            </View>
            <View style={[styles.flex1, styles.centerAll, styles.content]}>
                <Image source={avatarGif} style={styles.avatarGif} />
                <Text style={styles.popupTitle}>Waiting for ride request ..... </Text>
            </View>
        </>
    )
}

const MarkerRender = ({ item }) => {
    const [Colors, styles] = useTheme(style)
    const title = item.active_vehicle.type == 'BIKE' ? 'Tow Bike' : item.active_vehicle.type == 'TRUCK' ? 'Tow Truck/Bus' : 'Tow Private'
    const icon = item.active_vehicle.type == 'BIKE' ? tow_bike : item.active_vehicle.type == 'TRUCK' ? tow_truck : tow_private
    return (
        <Marker
            flat={true}
            title={title}
            coordinate={{ latitude: item.location.coordinates[1], longitude: item.location.coordinates[0] }}
            style={{
                transform: [{
                    rotate: item.location.heading === undefined ? '0deg' : `${item.location.heading}deg`
                }]
            }}
        >
            <View style={styles.marker}>
                <Image source={icon} style={styles.markerImage} />
            </View>
        </Marker>
    )
}

export default Body


