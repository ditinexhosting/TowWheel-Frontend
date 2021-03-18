import {
    StyleSheet,
} from 'react-native';
import { Colors, Mixins, Spacing, Typography } from 'src/styles'
import config from '../../config';

const styles = StyleSheet.create({
    header: {
        height: Mixins.scaleSize(80),
        width: Mixins.scaleSize(60),
        position: 'absolute',
        top: Mixins.STATUSBAR_HEIGHT,
        zIndex: 99
    },
    header_back: {
        marginLeft: Mixins.scaleSize(15),
        marginTop: Mixins.scaleHeight(15),
    },
    otp_top: {
        height: Mixins.scaleHeight(200),
        width: '100%'
    },
    otp_title: {
        fontSize: Typography.FONT_SIZE_25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.muted_text,
        marginTop: Spacing.SCALE_10
    },
    otp_text: {
        color: Colors.deep_gray,
        textAlign: 'center',
        marginTop: Spacing.SCALE_10,
        fontSize: Typography.FONT_SIZE_16,
    },
    loginContainer:{
        width: '100%',
        padding: Spacing.SCALE_20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    otpInputContainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: Spacing.SCALE_2
    },
    otpBoxEmpty:{
        backgroundColor: Colors.gray,
        margin: 0,
        borderRadius: 6,
        width: 50,
        height: 50,
        textAlign: 'center',
        fontSize: Typography.FONT_SIZE_18,
        color: Colors.black
    },
    otpBoxFilled:{
        backgroundColor: Colors.primary,
        margin: 0,
        borderRadius: 6,
        width: 50,
        height: 50,
        textAlign: 'center',
        fontSize: Typography.FONT_SIZE_18,
        color: Colors.white
    },
    resetText:{
        marginTop: Spacing.SCALE_10,
        color: Colors.muted_text
    },
    verifyButton:{
        borderRadius: 10,
        marginTop: Spacing.SCALE_15,
        marginHorizontal: Spacing.SCALE_5,
        padding: Spacing.SCALE_10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: Spacing.SCALE_50,
        overflow: 'hidden'
    },
    resetButton:{
        flex: 0,
        width: Mixins.scaleSize(50)
    },
    submit_button: {
        height: Mixins.scaleHeight(45),
        flex: 1,
        backgroundColor: Colors.very_light,
        borderRadius: 100,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    resend_button:{
        height: Mixins.scaleHeight(45),
        width: Mixins.scaleHeight(45),
        backgroundColor: Colors.very_light,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Spacing.SCALE_10
    },
    submit_button_text: {
        fontSize: Typography.FONT_SIZE_16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.primary,
    },
    resend: {
        height: 50,
        width: 150,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'flex-end',
        marginTop: Mixins.scaleHeight(60),
    },
    resend_button_text: {
        fontSize: Typography.FONT_SIZE_16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.white
    },
    resend_timer_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.muted_text
    },
    // profileSetup
    overlay: {
        position: 'absolute',
        justifyContent: 'flex-end',
        marginTop: (Mixins.DEVICE_HEIGHT + Mixins.STATUSBAR_HEIGHT)- Mixins.scaleHeight(555),
        height: Mixins.scaleHeight(555),
        width: Mixins.DEVICE_WIDTH,
    },
    profile_setup_container: {
        height: '100%',
        backgroundColor: Colors.background,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        elevation: 30,
        borderWidth: config.themeIsDark? 1 : 0,
        borderBottomWidth: 0,
        borderColor: Colors.deep_gray
    },
    dash: {
        width: Mixins.scaleSize(50),
        height: Mixins.scaleHeight(5),
        backgroundColor: Colors.deep_gray,
        borderRadius: 100,
        alignSelf: 'center',
        position: 'absolute',
        top: - Mixins.scaleHeight(15)
    },
    page_buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    page1_next_button: {
        height: Mixins.scaleHeight(45),
        flex: 1,
        marginHorizontal: Mixins.scaleSize(10),
        marginBottom: Mixins.scaleHeight(5),
        backgroundColor: Colors.very_light,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    step_indicator: {
        width: Mixins.scaleSize(380),
        alignSelf: 'center',
        marginVertical: Mixins.scaleHeight(5)
    },
    page: {
        width: Mixins.DEVICE_WIDTH,
        padding: Mixins.scaleSize(15),
    },
    page_title: {
        fontSize: Typography.FONT_SIZE_25,
        fontWeight: 'bold',
        color: Colors.muted_text
    },
    page_subtitle: {
        fontWeight: 'bold',
        color: Colors.deep_gray,
        marginTop: Mixins.scaleHeight(2)
    },
    form: {
        marginTop: Mixins.scaleHeight(15)
    },
    input: {
        marginBottom: Mixins.scaleHeight(10)
    },
    input_heading: {
        fontSize: Typography.FONT_SIZE_16,
        fontWeight: 'bold',
        color: Colors.muted_text
    },
    input_box: {
        borderBottomWidth: 1,
        marginTop: Mixins.scaleHeight(5),
        borderColor: Colors.deep_gray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white
    },
    input_text: {
        fontSize: Typography.FONT_SIZE_18,
        marginHorizontal: Mixins.scaleSize(10),
        flex: 1,
        color: Colors.medium
    },
    username_error: {
        color: Colors.error,
        fontSize: Typography.FONT_SIZE_12,
        marginLeft: Mixins.scaleSize(5)
    },
    bottom_gap: {
        height: Mixins.scaleHeight(20)
    },
    profilePicHolder: { 
        width: Mixins.scaleSize(180), 
        height: Mixins.scaleSize(180), 
        borderRadius: 100, 
        alignSelf: 'center',
        marginTop: Mixins.scaleHeight(20),
        justifyContent: 'center',
        alignItems: 'center' 
    },
    dp: {
        height: '100%',
        width: '100%',
        borderRadius: 100
    },
    select_button: {
        height: Mixins.scaleHeight(45),
        width: '80%',
        backgroundColor: Colors.medium,
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: Spacing.SCALE_20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    select_button_text: {
        fontSize: Typography.FONT_SIZE_16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.white,
        marginLeft: Mixins.scaleSize(10)
    },
    big_input_box: {
        borderBottomWidth: 1,
        marginTop: Mixins.scaleHeight(5),
        height: Mixins.scaleHeight(80),
        borderColor: Colors.deep_gray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white
    },
    big_input_text: {
        fontSize: Typography.FONT_SIZE_18,
        width: Mixins.scaleSize(250),
        color: Colors.medium,
        flex: 1,
        textAlignVertical: 'top',
    }
});


export default styles