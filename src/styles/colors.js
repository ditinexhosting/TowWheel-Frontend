
const LIGHT_THEME = {
    primary: '#F92452',
    secondary: '#EF515F',
    medium: '#F4838A',
    light: '#FBD0CA',
    very_light: '#FDE4DC',
    gray: '#CCCDD0',
    deep_gray: '#949DA6',
    white: '#FFFFFF',
    black: '#000000',
    background: '#FFFFFF',
    text: '#000000',
    muted_text: '#424242',
    primary_gradient: ['#F92452','#ff5858'],
    onboard_gradient_top: ['rgba(0, 0, 0, 0)','#F92452'],
    textInput_grey: '#e7e7e7',
    bottom_tab_background: '#F1F2F4',
    active: '#82CC00',
    inactive: '#DF3D2E',
    send_chat_body: '#0078FF',
    recieve_chat_body: '#FFF',
    room_notification_bg: 'rgba(0,0,0,0.1)',
    success: 'green',
    error: 'red',
    accept: '#32CD32',
    reject: 'tomato'
}

const DARK_THEME = {
    ...LIGHT_THEME,
    primary: '#c31432',
    white: '#FFFFFF',
    black: '#000000',
    background: '#23212C',
    text: '#FFF',
    primary_gradient: ['#c31432','#240b36'],
    onboard_gradient_top: ['rgba(0, 0, 0, 0)','#c31432'],
    muted_text: '#DDDDDD',
    bottom_tab_background: '#2a2836',
    room_notification_bg: 'rgba(255,255,255,0.1)',
}

export const Themes = {
    primary : LIGHT_THEME,
    dark : DARK_THEME
}

export default LIGHT_THEME

