import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from 'src/styles'

const style = ({ Colors }) => (StyleSheet.create({
    title: {
        fontSize: Typography.FONT_SIZE_18,
        color: Colors.background
    },
    background:{
        width: Mixins.DEVICE_WIDTH,
        flex: 1,
        resizeMode: 'cover'
    },
    commentInputContainer:{
        width: '100%',
        padding: Spacing.SCALE_16,
        paddingTop: Spacing.SCALE_5,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    inputBoxWrapper:{
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: Spacing.SCALE_8,
        borderRadius: 25,
        paddingHorizontal: Mixins.scaleSize(15)
    },
    inputBox:{ 
        padding: 0,
        fontSize: Typography.FONT_SIZE_18,
        width: '100%'
    },
    sendButton:{
        width: Mixins.scaleSize(38),
        height: Mixins.scaleSize(38),
        marginLeft: Spacing.SCALE_8,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black,
    }
})
);


export default style