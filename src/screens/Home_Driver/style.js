import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from 'src/styles'

const styles = ({ Colors }) => (StyleSheet.create({
    fullHeightContainer: {
        height: Mixins.DEVICE_HEIGHT,
        flex: 0,
        backgroundColor: Colors.black
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: 999,
        top: 0,
        left: 0,
        width: '100%'
    },
    hamburger: {
        width: Mixins.scaleSize(40),
        height: Mixins.scaleSize(40),
        resizeMode: 'contain',
        margin: Spacing.SCALE_10
    },
    map:{
        width: '100%',
        alignSelf: 'center',
        borderRadius: 20,
        height: Mixins.scaleSize(200),
        overflow: 'hidden'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    },
    modalView: {
        width: '100%',
        backgroundColor: Colors.background,
        borderRadius: 5,
        padding: Spacing.SCALE_15,
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    popupText: {
        textAlign: 'center',
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.primary
    },
    popupButton: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: Spacing.SCALE_10,
        marginTop: Spacing.SCALE_10
    },
    popupButtonText: {
        color: Colors.background,
        fontSize: Typography.FONT_SIZE_16
    },
    marker: {
        //width: 20,
        //height: 20,
    },
    markerImage: {
        width: Mixins.scaleSize(30),
        height: Mixins.scaleSize(30),
        resizeMode: 'contain',
        transform: [{
            rotate: '270deg'
        }]
    },
    content:{
        backgroundColor: Colors.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: Spacing.SCALE_10
    },
    popupTitle: {
        fontSize: Typography.FONT_SIZE_15,
        color: Colors.text,
        fontWeight: 'bold',
        marginBottom: Spacing.SCALE_5
    },
    avatarGif:{
        resizeMode: 'contain',
        width: Mixins.scaleSize(150),
        height: Mixins.scaleSize(150)
    },
})
);

export default styles