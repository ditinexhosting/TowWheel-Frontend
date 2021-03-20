import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Mixins } from 'src/styles'

const Container = ({ isTransparentStatusBar = false, ...props }) => {
    return (
        <View style={[styles.container, props.style]}>
            {isTransparentStatusBar==false && <MyStatusBar />}
            {props.children}
        </View>
    );
}

const MyStatusBar = ()=>{
    return(
        <View style={[styles.statusBar,{height: Mixins.STATUSBAR_HEIGHT}]}>
        </View>
    )
}


const styles = {
    container:{
        flex: 1,
        backgroundColor: '#F2F3F8'
    },
    statusBar:{
        backgroundColor: '#040505'
    }
};

export default Container



