import {
    StyleSheet,
} from 'react-native';
import { Colors, Mixins, Spacing, Typography } from 'src/styles'

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background
    },
    splash_top: {
        height: Mixins.scaleHeight(280),
        //width: Mixins.scaleHeight(100),
        resizeMode: 'contain',
        //transform: [{ rotate: '-360deg' }]
    },
    logo:{
        resizeMode: 'contain',
        width: Mixins.scaleSize(180),
        height: Mixins.scaleSize(70),
        marginTop: Mixins.scaleSize(20)
    },
    splash_loader: {
        height: Mixins.scaleHeight(150),
        width: '100%',
        resizeMode: 'contain',
    }
});

export default styles