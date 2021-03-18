import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Mixins } from 'src/styles'
import { useTheme } from 'src/hooks' 

const Container = ({ isTransparentStatusBar = false, ...props }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={[styles.flex1, styles.container, props.style]}>
            {isTransparentStatusBar==false && <MyStatusBar />}
            {props.children}
        </View>
    );
}

const MyStatusBar = ()=>{
    const [Colors, styles] = useTheme(style)
    return(
        <View style={[styles.statusBar,{height: Mixins.STATUSBAR_HEIGHT}]}>
        </View>
    )
}


const style = {
    container:{
        backgroundColor: 'Colors.white'
    },
    statusBar:{
        backgroundColor: 'Colors.primary'
    }
};

export default Container



