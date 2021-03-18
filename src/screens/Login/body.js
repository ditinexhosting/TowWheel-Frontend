import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import styles from './style'
import { Colors, Styles, Mixins } from 'src/styles'
import { Container, KeyboardHandledView } from 'src/components'
import { Countries } from 'src/utils/Countries';
import ModalSelector from 'react-native-modal-selector';
import { love_icon, login_couple } from 'src/assets'

const Body = ({ _this }) => {

    return (
        <KeyboardHandledView offset={20}>
            <View style={[Styles.flex1, styles.container]}>
            <View style={[Styles.flexRow, Styles.centerAll]}>
                <View style={styles.top_left}>
                <Image style={styles.love_icon} resizeMode="contain" source={love_icon} />
                <Text style={styles.title}>Login to a lovely life.</Text>
                </View>
                <Image style={styles.login_couple} resizeMode="contain" source={login_couple} />
            </View>
            <View style={styles.phone_input}>
                <Text style={styles.phone_text}>Enter your mobile number</Text>
                <View style={styles.phone_textinput}>
                <ModalSelector
                    data={Countries.map((item, index) => {
                    return { key: index, label: item.flag + ' ' + item.name + ' (' + item.dial_code + ')', value: item.dial_code, flag: item.flag, name: item.name }
                    })}
                    cancelStyle={{ display: 'none' }}
                    initValue={_this.country}
                    optionContainerStyle={{ backgroundColor: Colors.background }}
                    optionTextStyle={styles.country_selection_optionText}
                    onChange={(v) => {_this.setFlag(v.flag);_this.setCountryCode(v.name);_this.setCountry(v.value)}} >
                    <View style={[Styles.flexRow, Styles.centerAll]}>
                    <Text style={styles.country_flag}>{_this.flag}</Text>
                    <TextInput
                        style={styles.country_selection_textInput}
                        editable={false}
                        placeholder={_this.country}
                        value={_this.country} />
                    </View>
                </ModalSelector>
                <View style={styles.verticle_seperator}></View>
                <TextInput
                    style={[Styles.flex1, styles.phone_text_style]}
                    onChangeText={(value) => _this.setPhone(value)}
                    value={_this.phone}
                    placeholder=''
                    keyboardType="number-pad"
                />
                </View>
            </View>
            <TouchableOpacity
                style={styles.submit_button}
                onPress={() => _this.handleSubmit()}
            >
                <Text style={styles.submit_button_text}>Let's Go</Text>
            </TouchableOpacity>
            <Text style={styles.privacy_text}>By continue to login, you accept our company's 
                <TouchableOpacity>
                    <Text style={styles.bold_underlined_text}>Terms & conditions</Text>
                </TouchableOpacity> and 
                <TouchableOpacity>
                    <Text style={styles.bold_underlined_text}>Privacy policies</Text>
                </TouchableOpacity>
            </Text>
            </View>
        </KeyboardHandledView>
    )
}

export default Body