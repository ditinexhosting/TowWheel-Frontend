//import {ENVIRONMENT as ENV, API_URL as API_LINK, API_STORAGE as API_STORAGES} from "@env"

import {
    Platform
} from 'react-native';

var config = {
    isAndroid: Platform.OS === "android" ? true : false,
    isIos: Platform.OS === "android" ? false : true,
    android_version: '1.0.0',
    ios_version: '1.0.0',
	online_session_timeout: 3, // in Minute
	session: null
}
export default config
export const BASE_WIDTH = 360
export const BASE_HEIGHT = 640
export const API_URL = 'http://192.168.0.114:3002'
export const API_STORAGE = 'http://192.168.0.114:3002'
export const LOCALES = {
	ENGLISH: { id: 1, name: "en", label: "ENGLISH" },
	ARABIC: { id: 2, name: "ar", label: "ARABIC" }
};
export const BUSINESS_CONTACT = '+919804874403'
export const BUSINESS_EMAIL = 'admin@ditinex.com'
export const DOMAIN = 'ditinex.com'
export const APP_URL = 'https://play.google.com/store/apps/details?id=com.ditinex.swipecrush' 
export const ENVIRONMENT = 'DEV'
