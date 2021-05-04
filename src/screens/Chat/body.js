import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
    Animated,
    Easing,
    FlatList,
    ImageBackground
} from 'react-native';
import { useTheme } from 'src/hooks'
import style from './style'
import { Mixins, Typography } from 'src/styles'
import Icon from 'react-native-vector-icons/Ionicons';
import { chat_background } from 'src/assets'

import ChatInputBox from './chatInputBox'


const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

    const renderItem = ({ item, index }) => {
        <Text>cvdsv</Text>
        /*if(_this.userDetails._id == item.sender)
            return <SendBubble _this={_this} item={item} index={index} />

        return <RecievedBubble _this={_this} item={item} index={index} />*/
    }

    const renderSeperator = () => {
        return (
            <View style={{ height: Mixins.scaleHeight(10) }}/>
        )
    }

    return (
        <View style={styles.flex1}>
            <ImageBackground source={chat_background} style={styles.background} >
            <FlatList
                    contentContainerStyle={styles.paddingHorizontal10}
                    data={_this.chatData}
                    renderItem={renderItem}
                    ItemSeparatorComponent={renderSeperator}
                    keyExtractor={(item) => item._id}
                    keyboardShouldPersistTaps='handled'
                    onEndReached={() => null}
                    refreshing={false}
                    onRefresh={() => null}
                    inverted={true}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<View style={[styles.bottomChatContentOffset,styles.headerGap]}></View>}
                    ListHeaderComponent={<View style={styles.topChatContentOffset}></View>}
                />
                <ChatInputBox />
            </ImageBackground>
        </View>
    )
}

export default Body
