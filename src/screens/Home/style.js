import {
    StyleSheet,
} from 'react-native';
import { Colors, Mixins, Spacing, Typography } from 'src/styles'

const styles = StyleSheet.create({
    headerContentWrapper: {
        height: 75,
        width: '70%',
        paddingLeft: Spacing.SCALE_10
    },
    profilePicWrapper: {
        borderWidth: 2,
        borderColor: Colors.white,
        borderRadius: 100,
        overflow: 'hidden',
        width: 62,
        height: 62,
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 100
    },
    name: {
        color: Colors.very_light,
        fontSize: Typography.FONT_SIZE_20,
        width: Mixins.scaleSize(190)
    },
    username: {
        color: Colors.text,
        fontSize: Typography.FONT_SIZE_12,
        width: Mixins.scaleSize(190),
        letterSpacing: 1
    },
    title: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: Typography.FONT_SIZE_16
    },
    subtitle: {
        color: Colors.deep_gray,
        fontSize: Typography.FONT_SIZE_14
    },
    feedHeaderContainer:{
        height: 150,
        overflow:'hidden',
    },
    recentActiveContainer:{
        width: '25%'
    },
    recentlyActiveProfilePic: {
        width: Mixins.scaleSize(70),
        height: Mixins.scaleSize(70),
        borderRadius: 100
    },
    recentlyActiveProfilePicWrapper: {
        padding: 1.5,
        borderRadius: 100,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    recentlyActiveName: {
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.text
    },
    feedImage: {
        width: '100%',
        aspectRatio: 1 / 1.3,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    feedOverlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        minHeight: 50,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    feedOverlayText: {
        color: Colors.white,
        textAlign: 'right'
    },
    feedName: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: Typography.FONT_SIZE_16
    },
    feedText: {
        color: Colors.deep_gray,
        fontSize: Typography.FONT_SIZE_16
    },
    feedSeperator: {
        width: '100%',
        height: 30
    },
    feedMore: {
        color: Colors.light
    },
    loader: {
        resizeMode: "cover",
        width: Mixins.scaleSize(200),
        height: Mixins.scaleSize(200),
    }
});

export default styles