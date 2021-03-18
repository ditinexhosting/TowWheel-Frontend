import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Image,
    Text
} from 'react-native';
import styles from './style'
import Config from 'src/config'
import { Colors, Styles } from 'src/styles'
import { splash_image, loader_image, logo } from 'src/assets'
import API from 'src/services/api'
import { useDdux, useStorage } from 'src/hooks'
import { Container } from 'src/components'
import AnimatedSplash from './AnimatedSplash'
var initial_loading_completed = false

const Splash = ({ navigation }) => {
    const Ddux = useDdux()
    const userDetails = Ddux.cache('user')

    useEffect(() => {
        initial_loading_completed = false
    }, [])
    
    useEffect(() => {
        if(userDetails!==null && !initial_loading_completed){
            initial_loading_completed=true
            //setTimeout(()=>loginByToken(),1000)
        }
    },[userDetails])

    const loginByToken = async()=>{
        let refresh_token = userDetails.active_session_refresh_token
        let mobile = userDetails.mobile
        if (refresh_token && mobile) {
            let response = await API.loginByToken(mobile, refresh_token)
            if (response.data && response.data.isUserExists) {
                response.data.token_expiry = new Date().getTime() + 45 * 60000;
                Config.session = {mobile: response.data.mobile, active_session_refresh_token: response.data.active_session_refresh_token, access_token: response.data.access_token, token_expiry: response.data.token_expiry}
                Ddux.setCache('user', response.data)
                return navigation.replace('Dashboard')
            }
            else
            {
                // clearAll()
                navigation.replace('Login')
            }
        }
        else
        {
            // clearAll()
            navigation.replace('Login')
        }
    }

    return (
        <Container isTransparentStatusBar={false}>
            <Text>Splash Screen</Text>
        {/*<View style={styles.backgroundContainer}>
            <AnimatedSplash />
            <Image
                style={styles.logo}
                source={logo}
            />
    </View>*/}
        </Container>
    )
}

export default Splash


