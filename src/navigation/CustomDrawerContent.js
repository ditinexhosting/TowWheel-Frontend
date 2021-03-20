import React, { useState, useEffect, useRef } from 'react';
import {
    Keyboard,
    Text,
    View,
    StyleSheet
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Screen from 'src/screens';
import { Mixins, Spacing, Typography } from 'src/styles';
import { useTheme, useLanguage } from 'src/hooks'
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomDrawerContent = ({ navigation, ...props }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <DrawerContentScrollView
            contentContainerStyle={{
                paddingTop: 0
            }}
            {...props}
        >
            <Header />
            {/*<DrawerItemList 
            activeTintColor={Colors.primary}
            activeBackgroundColor={Colors.secondary20}
            {...props} 
            />*/}
            <View style={styles.button}>
                <View style={styles.buttonIconWrapper}>
                    <Icon name='sign-in' color={Colors.white} size={Typography.FONT_SIZE_22} />
                </View>
                <Text style={styles.buttonText}>Sign In</Text>
            </View>
            <DrawerItem
                label="Help"
                onPress={() => Linking.openURL('https://mywebsite.com/help')}
            />
        </DrawerContentScrollView>
    );
}

const Header = () => {
    const [Colors, styles] = useTheme(style)
    const language = useLanguage().language
    return (
        <View style={styles.header}>
            <View style={styles.languageToggle}>
                <TouchableOpacity style={[styles.flex1, styles.marginBottom10]}>
                    <View style={[styles.languageButton,language=='en'?styles.languageButtonActive:null]}>
                        <Text style={styles.languageOption}>🇺🇸</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.flex1]}>
                    <View style={[styles.languageButton,language=='en'?styles.languageButtonActive:null]}>
                        <Text style={styles.languageOption}>🇮🇱</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = ({ Colors }) => (StyleSheet.create({
    header: {
        height: Mixins.scaleSize(140),
        backgroundColor: Colors.primary,
        marginBottom: Spacing.SCALE_20,
        position: 'relative'
    },
    button: {
        marginTop: Spacing.SCALE_30,
        width: Mixins.scaleSize(150),
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        padding: Spacing.SCALE_5
    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
        flex: 1,
        fontSize: Typography.FONT_SIZE_18
    },
    buttonIconWrapper: {
        backgroundColor: Colors.primary_light,
        height: Mixins.scaleSize(30),
        width: Mixins.scaleSize(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    languageToggle: {
        position: 'absolute',
        right: Spacing.SCALE_10,
        top: Spacing.SCALE_10
    },
    languageButton: {
        borderWidth: 2,
        borderColor: Colors.primary_light,
        padding: Spacing.SCALE_5,
        borderRadius: 50,
    },
    languageButtonActive:{
        backgroundColor: Colors.primary_light,
    },
    languageOption: {
        fontSize: Typography.FONT_SIZE_25
    }
}))


export default CustomDrawerContent