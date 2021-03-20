import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from 'src/styles'

const style = ({ Colors }) => (StyleSheet.create({
    logo:{
        resizeMode: 'contain',
        width: Mixins.scaleSize(200),
        height: Mixins.scaleSize(250),
    },
    title:{
        fontSize: Typography.FONT_SIZE_20,
        color: Colors.text,
        fontWeight: 'bold'
    },
    subtitle:{
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.text,
    },
    modal:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    },
    popup: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        width: Mixins.scaleSize(300),
        height: Mixins.scaleSize(400),
        borderRadius: 10,
        padding: Spacing.SCALE_10
    },
})
);


export default style