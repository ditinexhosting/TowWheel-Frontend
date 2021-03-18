import React, { useState, useEffect, useRef } from 'react';
import {
  Keyboard
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Screen from 'src/screens';
import { Colors, Styles, Mixins } from 'src/styles';
import TabBar from './TabBar';
  
  const Tab = createBottomTabNavigator();
  const Dashboard = () => {

    const [isKeyboardVisible,setKeyboardVisibility] = useState(false)

    useEffect(() => {
      Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
      return () => {
        Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      };
    }, []);
  
    const _keyboardDidShow = () => {
      setKeyboardVisibility(true)
    };
  
    const _keyboardDidHide = () => {
      setKeyboardVisibility(false)
    };

    
    return (
      <Tab.Navigator
        initialRouteName="Home"      
        swipeEnabled={true}        
        backBehavior="none"
        tabBarOptions={{
          showLabel: false,
          showIcon: true,
          keyboardHidesTabBar: true,
          inactiveTintColor: Colors.white,
          activeTintColor: Colors.primary,
          style: Styles.bottomNavigationBar,
        }}
        tabBar={props => isKeyboardVisible ? null : <TabBar {...props}/>}
      >
        <Tab.Screen name="Roomlist">
          {props => <Screen.Roomlist {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Peoples">
          {props => <Screen.Peoples {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Home">
          {props => <Screen.Home {...props} />}
        </Tab.Screen>
        <Tab.Screen name="ChatList">
          {props => <Screen.ChatList {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Setting">
          {props => <Screen.Setting {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }


export default Dashboard