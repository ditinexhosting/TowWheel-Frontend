import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import { useTheme } from 'src/hooks'
import style from './style'
import { Mixins, Typography } from 'src/styles'
import Config, { API_STORAGE } from 'src/config'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { tow_bike, tow_truck, tow_private, avatarGif } from 'src/assets'



const BottomPopup = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

    return (
        <View style={styles.bottomPopup}>
            <View style={styles.curveHeader}>
            </View>
            <TowSearchProgress _this={_this} />
        </View>
    )
}


const TowSearchProgress = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

    const renderItem = ({ item, index }) => {
        let rating = 0
        for (let i = 0; i < item.reviews.length; i++) {
            rating += item.reviews[i].rating
        }
        rating = parseFloat(rating / item.reviews.length || 0).toFixed(1)
        return (
            <TouchableWithoutFeedback onPress={() => _this.setSelectedDriver(item)} >
                <View style={[styles.renderItem, (_this.selectedDriver && _this.selectedDriver._id) ? styles.renderSelectedItem : null]}>
                    <Image source={{ uri: API_STORAGE + item.profile_picture }} style={styles.dp} />
                    <Text style={styles.itemName}>{item.user_details.name}</Text>
                    <Text style={styles.cost}><Text style={styles.currency}>$</Text> {parseFloat(item.vehicle_details.cost_per_km * _this.rideDetails.distance).toFixed(2)}</Text>
                    <View style={styles.rating}>
                        <Icon2 name='star' size={Typography.FONT_SIZE_16} color={Colors.primary} />
                        <Text style={styles.ratingValue}> {rating}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }


    return _this.rideDetails && (
        <View style={styles.content}>

            <View style={[styles.flexRow, styles.alignCenter, styles.spaceBetween, styles.headerDistanceTime]}>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon name='location' size={Typography.FONT_SIZE_22} color={Colors.black} />
                    <Text style={styles.distance}>{parseFloat(_this.rideDetails.distance).toFixed(1)} km</Text>
                </View>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon name='time' size={Typography.FONT_SIZE_22} color={Colors.black} />
                    <Text style={styles.distance}>{parseFloat(_this.rideDetails.time / 60).toFixed(1)} hr</Text>
                </View>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon2 name='usd' size={Typography.FONT_SIZE_20} color={Colors.black} />
                    <Text style={styles.distance}> {parseFloat(_this.rideDetails.payment_details.cost).toFixed(2)}</Text>
                </View>
            </View>

            <View style={[styles.flexRow, styles.alignCenter, styles.spaceBetween, styles.marginTop10]}>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon name='person' size={Typography.FONT_SIZE_22} color={Colors.black} />
                    <Text style={styles.distance}> {_this.rideDetails.user.name}</Text>
                </View>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <TouchableOpacity onPress={() => null} style={[styles.flexRow, styles.callChatButton]}>
                        <View style={styles.callChatButtonIcon}>
                            <Icon name='ios-call' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => null} style={[styles.flexRow, styles.callChatButton]}>
                        <View style={styles.callChatButtonIcon}>
                            <Icon name='chatbubbles-sharp' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.flex1, styles.marginTop10]}>
                <View style={[styles.flexRow, styles.alignCenter, styles.marginBottom5]}>
                    <Icon name='ios-location-sharp' size={Mixins.scaleSize(25)} color={Colors.ascent} />
                    <View>
                        <Text style={styles.locationTitle}>Pickup</Text>
                        <Text numberOfLines={1} style={styles.location}>{_this.rideDetails.source.address}</Text>
                    </View>
                </View>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon name='ios-location-sharp' size={Mixins.scaleSize(25)} color={Colors.primary} />
                    <View>
                        <Text style={styles.locationTitle}>Drop-off</Text>
                        <Text numberOfLines={1} style={styles.location}>{_this.rideDetails.destination.address}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={() => _this.cancelRideRequest()} style={[styles.marginBottom10, styles.flexRow, styles.continueButton]}>
                <Text style={styles.continueButtonText}>Start Tow Service</Text>
                <View style={styles.continueButtonIcon}>
                    <Icon name='ios-arrow-forward-sharp' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                </View>
            </TouchableOpacity>
        </View>
    )

}



{/*const TowSelector = ({ _this }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={styles.content}>
            <Text style={styles.popupTitle}>Select Tow</Text>
            <View style={[styles.flexRow, styles.spaceBetween]}>
                <TouchableOpacity onPress={() => _this.setTowType('BIKE')} style={[styles.towImageContainer, (_this.towType == 'BIKE') ? styles.towImageContainerSelected : null]}>
                    <Image source={tow_bike} style={styles.towImage} />
                    <Text style={styles.towName}>Tow Bike</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => _this.setTowType('TRUCK')} style={[styles.towImageContainer, (_this.towType == 'TRUCK') ? styles.towImageContainerSelected : null]}>
                    <Image source={tow_truck} style={styles.towImage} />
                    <Text style={styles.towName}>Tow Truck/Bus</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => _this.setTowType('PRIVATE')} style={[styles.towImageContainer, (_this.towType == 'PRIVATE') ? styles.towImageContainerSelected : null]}>
                    <Image source={tow_private} style={styles.towImage} />
                    <Text style={styles.towName}>Tow Private</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.flex1, styles.marginTop10]}>
                <View style={[styles.flexRow, styles.alignCenter, styles.marginBottom5]}>
                    <Icon name='ios-location-sharp' size={Mixins.scaleSize(25)} color={Colors.ascent} />
                    <View>
                        <Text style={styles.locationTitle}>Pickup</Text>
                        <Text numberOfLines={1} style={styles.location}>{_this.source.address}</Text>
                    </View>
                </View>
                <View style={[styles.flexRow, styles.alignCenter]}>
                    <Icon name='ios-location-sharp' size={Mixins.scaleSize(25)} color={Colors.primary} />
                    <View>
                        <Text style={styles.locationTitle}>Drop-off</Text>
                        <Text numberOfLines={1} style={styles.location}>{_this.destination.address}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => _this.createRideRequest()} style={[styles.marginBottom10, styles.flexRow, styles.continueButton]}>
                <Text style={styles.continueButtonText}>Continue</Text>
                <View style={styles.continueButtonIcon}>
                    <Icon name='ios-arrow-forward-sharp' size={Typography.FONT_SIZE_25} color={Colors.primary} />
                </View>
            </TouchableOpacity>
        </View>
    )

}*/}

export default BottomPopup