import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Easing,
  Dimensions,
  ActivityIndicator,
  Image
} from 'react-native';
import { loader_image } from 'src/assets'
import { Styles, Colors, Spacing, Mixins } from 'src/styles'

const Loader=()=>{

	return (
		<View style={styles.backgroundContainer}>
			<ActivityIndicator />
		</View>
    );
}

const styles = StyleSheet.create({
  backgroundContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.7)",
      position: "absolute",
      width: Mixins.DEVICE_WIDTH,
      height: Mixins.DEVICE_HEIGHT + Mixins.STATUSBAR_HEIGHT,
      zIndex: 99
  },
  loader:{
      resizeMode: "cover",
      width: Mixins.scaleSize(200),
      height: Mixins.scaleSize(200),
      //backgroundColor: Colors.white,
  }
});

export default  Loader 



