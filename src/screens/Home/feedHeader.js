import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    Easing
} from 'react-native';
import styles from './style'
import { Colors, Styles, Mixins } from 'src/styles'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_STORAGE } from 'src/config'

const FeedHeader = ({ _this }) => {

    return (
        <>
            <View style={[styles.feedHeaderContainer, Styles.headerMarginGap]}>
                <View style={[Styles.flexRow, Styles.spaceBetween]}>
                    <Text style={styles.title}>Recently Active</Text>
                    <TouchableOpacity>
                        <Text style={styles.subtitle}>See All</Text>
                    </TouchableOpacity>
                </View>
                <ActiveUsers _this={_this} />
            </View>
            <View style={[Styles.flexRow, Styles.spaceBetween, Styles.marginBottom10]}>
                <Text style={styles.title}>New Folks</Text>
                <TouchableOpacity>
                    <Text style={styles.subtitle}>Filter</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const ActiveUsers = ({ _this }) => {
    return (
        <View style={[Styles.flexRow, Styles.paddingTop10, Styles.alignCenter]}>
            {
                _this.recentlyActiveUsers.map((item, key) =>
                    <TouchableOpacity onPress={() => _this.navigation.navigate('Profile')} key={key} style={styles.recentActiveContainer}>
                        <LinearGradient
                            colors={Colors.onboard_gradient_top}
                            start={{ x: 0.0, y: 0.0 }}
                            end={{ x: 1.0, y: 1.0 }}
                            locations={[0, 1]}
                            style={styles.recentlyActiveProfilePicWrapper}
                        >
                            <Image source={{ uri: API_STORAGE + item.profile_picture_id.picture }} style={styles.recentlyActiveProfilePic} />
                        </LinearGradient>
                        <Text style={styles.recentlyActiveName}>{item.name.split(' ')[0]}</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}


export default FeedHeader


