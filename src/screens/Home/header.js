import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import styles from './style'
import { Colors, Styles, Mixins } from 'src/styles'
import { API_STORAGE } from 'src/config';
import { HeaderGradient } from 'src/components'
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ _this }) => {
    return (
        <HeaderGradient>  
            <PrimaryContent user={_this.userDetails} />
            <SecondaryButton />
        </HeaderGradient>
    )
}

const PrimaryContent = ({user})=>{
    return user ? (
        <View style={[Styles.flexRow,styles.headerContentWrapper]}>
            <TouchableOpacity style={styles.profilePicWrapper}>
                <Image source={{uri: API_STORAGE+user.profile_picture}} style={styles.profilePic} />
            </TouchableOpacity>
            <View style={Styles.paddingLeft10}>
                <Text numberOfLines={1} style={styles.name}>{user.name}</Text>
                <Text numberOfLines={1} style={styles.username}>@{user.username}</Text>
            </View>
        </View>
    ) : null
}

const SecondaryButton = ()=>{
    return(
        <TouchableOpacity style={[Styles.centerAll, Styles.gradientHeaderSecondaryIconWrapper]}>
                <View style={[Styles.centerAll]}>
                        <Icon name='bell-o' size={18} color={Colors.primary} />
                        <View style={[Styles.centerAll,Styles.gradientHeaderSecondaryBadge]}>
                            <Text style={Styles.gradientHeaderSecondaryBadgeText}>99+</Text>
                        </View>
                </View>
            </TouchableOpacity>
    )
}

export default Header


