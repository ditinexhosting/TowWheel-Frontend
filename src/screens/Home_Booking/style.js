import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from 'src/styles'

const style = ({ Colors }) => (StyleSheet.create({
    title: {
        fontSize: Typography.FONT_SIZE_20,
        color: Colors.text,
        fontWeight: 'bold'
    }
})
);


export default style