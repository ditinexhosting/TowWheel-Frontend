import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Image,
    Text,
    Animated,
    Easing
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from './style'
import { Colors, Styles } from 'src/styles'
import { Container, Toast } from 'src/components'
import API from 'src/services/api'
import Header from './header'
import { useDdux } from 'src/hooks'
import NewsFeed from './newsFeed'

var PAGINATION_INDEX = 1
var NO_MORE_DATA = false

const Home = ({ navigation }) => {
    const isFocused = useIsFocused()
    const Ddux = useDdux()
    const userDetails = Ddux.cache('user') || {}
    const introductionFeeds = Ddux.cache('introductions') || []
    const recentlyActiveUsers = Ddux.cache('recentlyActive') || []

    const [introductions, setIntroductions] = useState(introductionFeeds)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (isFocused == true) {
            getRecentlyActiveUsers()
            getIntroductions(true)
        }
    }, [isFocused])

    const getRecentlyActiveUsers = async () => {
        let response = null
        response = await API.getRecentlyActiveUsers()
        if (!response.status) {
            return Toast.show({ type: 'error', message: response.error })
        }
        Ddux.setCache('recentlyActive',response.data)
    }

    const getIntroductions = async (reset = false) => {
        //Calling twice due to low number of data
        let response = null
        setRefreshing(true)
        if (reset){
            PAGINATION_INDEX = 1
            NO_MORE_DATA = false
        }
        response = await API.getIntroductions(PAGINATION_INDEX)
        if (!response.status) {
            return Toast.show({ type: 'error', message: response.error })
        }
        PAGINATION_INDEX++
        if (response.data.length > 0){
            if(reset)
                setIntroductions(response.data)
            else
                setIntroductions([...introductions,...response.data])
            Ddux.setCache('introductions',response.data)
        }
        else
            NO_MORE_DATA = true
        setRefreshing(false)
    }

    const sendLike = async (id, isLiked) => {
        let response = null
        response = await API.sendLike(id, isLiked)
        if (!response.status) {
            //handle error
        }
    }

    return (
        <Container isTransparentStatusBar={true}>
            <Header _this={{ navigation, userDetails }} />
            <NewsFeed _this={{ navigation, introductions, getIntroductions, refreshing, NO_MORE_DATA, sendLike, recentlyActiveUsers }} />
        </Container>
    )
}

export default Home


