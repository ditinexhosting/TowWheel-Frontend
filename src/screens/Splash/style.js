import {
    StyleSheet,
} from 'react-native';
import { Mixins, Spacing, Typography } from 'src/styles'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FF0000',
    },
    logo:{
        resizeMode: 'contain',
        width: Mixins.scaleSize(250),
        height: Mixins.scaleSize(70),
    }
});

export default styles