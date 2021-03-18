import React, { useState, useEffect, useContext, useMemo } from "react";
import { ThemeContext } from 'src/lib'
import { Styles } from 'src/styles'
/*
 * Hook for Theme and Language setup
 */
const useTheme = (style={}) => {
  const {colors, theme, changeTheme, themeKeys} = useContext(ThemeContext);
  const replaceWithColor = (match, capture) => {
    return colors ? colors[capture]+'\"' : '#FFF'+'\"'
  }
  const parsedStyle = JSON.parse(JSON.stringify(style).replace(/Colors.(.*?)\"/gi,replaceWithColor))
  const parsedCommonStyle = JSON.parse(JSON.stringify(Styles).replace(/Colors.(.*?)\"/gi,replaceWithColor))
  const styles = useMemo(() => ({...parsedCommonStyle,...parsedStyle}), [theme]);
  return [colors,styles,theme,changeTheme,themeKeys]
};


export default useTheme