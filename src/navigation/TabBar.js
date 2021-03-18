import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Dimensions,
    Image,
    Animated,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ImageBackground,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Mixins, Spacing } from 'src/styles';
import { useTheme } from 'src/hooks'
import { BottomNavigationBar } from 'src/components';
import LinearGradient from 'react-native-linear-gradient';

const TabBar = ({ state, descriptors, navigation }) => {
    const iconList = {
        Home: 'home',
        ChatList: 'envelope',
        Roomlist: 'users',
        Peoples: 'search',
        Setting: 'cog'
    }
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    return (
        <View style={styles.container} pointerEvents="box-none">
            <BottomNavigationBar style={styles.svg} />
            {
                state.routes.map((route, index) => {
                    return (
                        <Tab key={index} route={route} state={state} descriptors={descriptors} navigation={navigation} index={index} iconList={iconList} />
                    )
                })
            }
        </View>
    );
}

const Tab = ({ route, state, descriptors, navigation, index, iconList }) => {
    const [Colors, Styles] = useTheme()
    const { options } = descriptors[route.key];
    const label =
        options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
                ? options.title
                : route.name;

    const isFocused = state.index === index;

    const onPress = () => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    };

    const onLongPress = () => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };

    if (index === Math.floor(state.routes.length / 2))
        return (
            <LinearGradient
                colors={isFocused?[Colors.bottom_tab_background,Colors.bottom_tab_background]:Colors.primary_gradient}
                start={{ x: 1.0, y: 0.0 }}
                end={{ x: 0.0, y: 1.0 }}
                locations={[0, 1]}
                style={[Styles.centerAll, styles.center_tab]} >
                <TouchableOpacity
                    style={[Styles.flex1, Styles.centerAll, styles.center_tab_touch]}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                >
                    <Icon name={iconList[route.name]} size={Mixins.scaleSize(30)} color={isFocused ? Colors.primary : Colors.white} />
                </TouchableOpacity>
            </LinearGradient>
        );
    else
        return (
            <TouchableOpacity
                style={[Styles.centerAll, styles.tab]}
                onPress={onPress}
                onLongPress={onLongPress}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
            >
                <Icon name={iconList[route.name]} size={Mixins.scaleSize(28)} color={isFocused ? Colors.primary : Colors.deep_gray} />
                {/*<Text numberOfLines={1} style={[styles.tab_label,{color: isFocused ?Colors.primary : Colors.deep_gray}]}>{label}</Text>*/}
            </TouchableOpacity>
        );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: Mixins.DEVICE_WIDTH,
        height: Mixins.NAVBAR_HEIGHT + Mixins.scaleSize(45),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingBottom: Spacing.SCALE_8
    },
    svg: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: Mixins.DEVICE_WIDTH,
        height: Mixins.NAVBAR_HEIGHT
    },
    center_tab: {
        width: Mixins.scaleSize(45),
        height: Mixins.scaleSize(45),
        top: - Mixins.scaleSize(20),
        borderRadius: 100,
    },
    center_tab_touch: {
        width: Mixins.scaleSize(45),
        height: Mixins.scaleSize(45),
        borderRadius: 100,
    },
    tab: {
        width: Mixins.scaleSize(65)
    }
});

export default TabBar