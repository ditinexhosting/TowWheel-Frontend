import {
    StyleSheet,
} from 'react-native';
import { Colors, Mixins, Spacing, Typography } from 'src/styles'

const styles = StyleSheet.create({
    sliderContainer: {
        height: Mixins.scaleHeight(520),
    },
    gradient: {
        position: 'absolute',
        top: Mixins.scaleHeight(200),
        height: Mixins.scaleHeight(320),
        width: '100%'
    },
    sliderItem: {
        width: Mixins.DEVICE_WIDTH,
        height: '100%',
    },
    sliderItem_logo: {
        alignSelf: 'center',
        height: Mixins.scaleHeight(70),
        width: Mixins.scaleSize(70),
        marginTop: Mixins.scaleHeight(140)
    },
    sliderItem_title: {
        fontSize: Typography.FONT_SIZE_25,
        fontWeight: 'bold',
        marginHorizontal: Spacing.SCALE_16,
        color: Colors.primary,
        textAlign: 'center',
        color: Colors.white,
        marginTop: '5%'
    },
    sliderItem_content: {
        fontSize: Typography.FONT_SIZE_18,
        marginHorizontal: Spacing.SCALE_16,
        color: Colors.text,
        textAlign: 'center',
        marginTop: Spacing.SCALE_10,
        color: 'white'
    },
    sliderItem_image: {
        width: '100%',
        height: '100%'
    },
    indicators: {
        height: Mixins.scaleHeight(6),
        width: Mixins.scaleSize(40),
        borderRadius: 100,
        marginRight: Spacing.SCALE_10
    },
    bottomContainer:{
        backgroundColor: Colors.primary,
        flex: 1
    },
    landing_button: {
        height: Mixins.scaleHeight(45),
        width: '90%',
        backgroundColor: Colors.very_light,
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: Spacing.SCALE_20,
        justifyContent: 'center'
    },
    landing_button_text: {
        fontSize: Typography.FONT_SIZE_16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.primary,
    },
    terms: {
        textAlign: 'center',
        marginTop: Spacing.SCALE_10,
        color: Colors.white
    }
});


export default styles