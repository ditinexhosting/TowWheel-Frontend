import {
    StyleSheet,
} from 'react-native';
import { Colors, Mixins, Spacing, Typography } from 'src/styles'

const styles = StyleSheet.create({
    container: {
        marginTop: Mixins.scaleHeight(30),
        alignItems: 'center',
    },
    love_icon: {
        height: Mixins.scaleSize(50),
        width: Mixins.scaleSize(50)
    },
    title: {
        fontSize: Typography.FONT_SIZE_35,
        fontWeight: 'bold',
        marginLeft: Spacing.SCALE_8,
        color: Colors.text
    },
    login_couple: {
        height: Mixins.scaleSize(220),
        width: Mixins.scaleSize(220),
        borderWidth: 1
    },
    top_left: {
        width: Mixins.scaleSize(125),
        justifyContent: 'center',
        alignItems: 'center'
    },
    phone_input: {
        marginTop: Spacing.SCALE_40
    },
    country_selection_optionText: {
        color: Colors.muted_text, 
        alignSelf: 'flex-start'
    },
    country_flag:{
        fontSize: Typography.FONT_SIZE_18,
        marginRight: Spacing.SCALE_5
    },
    country_selection_textInput: {
        width: Mixins.scaleSize(40),
        color: Colors.black,
        fontSize: Typography.FONT_SIZE_20,
        fontWeight: 'bold'
    },
    phone_text: {
        fontSize: Typography.FONT_SIZE_20,
        fontWeight: 'bold',
        color: Colors.muted_text,
        marginBottom: Spacing.SCALE_10
    },
    phone_textinput: {
        width: Mixins.scaleSize(320),
        backgroundColor: Colors.textInput_grey,
        borderRadius: 10,
        height: Mixins.scaleHeight(45),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.SCALE_10
    },
    phone_text_style: {
        fontSize: Typography.FONT_SIZE_20,
        fontWeight: 'bold',
    },
    verticle_seperator:{
        height: '70%',
        width: 2,
        backgroundColor: Colors.gray,
        marginRight: Spacing.SCALE_5
    },
    submit_button: {
        height: Mixins.scaleHeight(45),
        width: '90%',
        backgroundColor: Colors.very_light,
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: Spacing.SCALE_40,
        justifyContent: 'center'
    },
    submit_button_text: {
        fontSize: Typography.FONT_SIZE_16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.primary,
    },
    privacy_text: {
        color: Colors.deep_gray,
        width: Mixins.scaleSize(250),
        textAlign: 'center',
        marginTop: Spacing.SCALE_5,
    },
    bold_underlined_text: {
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});


export default styles