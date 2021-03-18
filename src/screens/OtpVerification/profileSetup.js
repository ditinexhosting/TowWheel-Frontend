import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    TextInput,
    Animated,
    ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style'
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalSelector from 'react-native-modal-selector';
import ImagePicker from 'react-native-image-crop-picker';
import { Colors, Mixins, Spacing, Typography, Styles } from 'src/styles'
import { Container, KeyboardHandledView } from 'src/components'

const ProfileSetup = ({ _this }) => {
    const [currentPosition, setCurrentPosition] = useState(0) //stepper position
    const scrollView = useRef(null)

    useEffect(() => {
        show()
    }, []);
    const translateY = useRef(new Animated.Value(500)).current
    const opacity = translateY.interpolate({
        inputRange: [0, 250, 500],
        outputRange: [1, 0.5, 0]
    })
    const show = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start(() => {
        });
    };

    const navigatePage = (position) => {
        scrollView.current.scrollTo({
            x: position * Mixins.DEVICE_WIDTH,
            y: 0,
            animated: true,
        });
        setCurrentPosition(position)
    }

    return (
        <Animated.View
            style={[{ transform: [{ translateY }], opacity: opacity }, styles.overlay]}>
            <KeyboardHandledView style={styles.profile_setup_container} offset={1}>
                <View style={styles.dash} />
                <ScrollView
                    style={Styles.flex1}
                    ref={scrollView}
                    horizontal={true}
                    scrollEventThrottle={16}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                >
                    <Page_1 _this={_this} />
                    <Page_2 _this={_this} />
                    <Page_3 _this={_this} />
                </ScrollView>
                <View style={styles.page_buttons}>
                    {currentPosition != 0 &&
                        <TouchableOpacity
                            style={styles.page1_next_button}
                            onPress={() => navigatePage(currentPosition - 1)}
                        >
                            <Text style={styles.submit_button_text}>Back</Text>
                        </TouchableOpacity>
                    }
                    {currentPosition != 2 &&
                        <TouchableOpacity
                            style={styles.page1_next_button}
                            onPress={() => navigatePage(currentPosition + 1)}
                        >
                            <Text style={styles.submit_button_text}>Next</Text>
                        </TouchableOpacity>
                    }
                    {currentPosition == 2 &&
                        <TouchableOpacity
                            style={styles.page1_next_button}
                            onPress={() => _this.signUp()}
                        >
                            <Text style={styles.submit_button_text}>Submit</Text>
                        </TouchableOpacity>
                    }
                </View>
                <PageMark currentPosition={currentPosition} />
            </KeyboardHandledView>
        </Animated.View>
    )
}

const Page_1 = ({ _this }) => {
    var maximumDate = new Date();
    maximumDate.setFullYear(maximumDate.getFullYear() - 16);


    return (
        <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
            <Text style={styles.page_title}>Provide Your Details</Text>
            <Text style={styles.page_subtitle}>Fill up all the required details. You can't edit your Username and DOB later.</Text>
            <View style={styles.form}>
                <View style={styles.input}>
                    <Text style={styles.input_heading}>Full Name</Text>
                    <View style={styles.input_box}>
                        <Icon name="user" size={25} color={Colors.deep_gray} />
                        <TextInput
                            placeholder={"John Smith"}
                            style={styles.input_text}
                            value={_this.name}
                            onChangeText={(e) => _this.setName(e)}
                        />
                    </View>
                </View>
                <View style={styles.input}>
                    <Text style={styles.input_heading}>Gender</Text>
                    <View style={styles.input_box}>
                        <Icon name="venus-mars" size={25} color={Colors.deep_gray} />
                        <ModalSelector
                            cancelStyle={{ display: 'none' }}
                            style={Styles.flex1}
                            optionContainerStyle={{ backgroundColor: Colors.background }}
                            data={[{ key: 'male', label: 'Male', value: 'Male' }, { key: 'female', label: 'Female', value: 'Female' }]}
                            optionTextStyle={{ color: Colors.text, alignSelf: 'flex-start' }}
                            onChange={(v) => _this.setGender(v.value)} >
                            <TextInput
                                placeholder={"Select Gender"}
                                style={styles.input_text}
                                value={_this.gender}
                                editable={false}
                            />
                        </ModalSelector>
                    </View>
                </View>
                <View style={styles.input}>
                    <Text style={styles.input_heading}>Birthday</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => _this.setDatePickerVisible(true)} style={styles.input_box}>
                        <Icon name="calendar-day" size={25} color={Colors.deep_gray} />
                        <TextInput
                            placeholder={"16/04/96"}
                            style={styles.input_text}
                            value={_this.dob ? _this.dob.toLocaleDateString() : ''}
                            editable={false}
                        />
                        <Icon1 name="calendar" size={30} color={Colors.deep_gray} />
                        <DateTimePickerModal
                            isVisible={_this.datePickerVisible}
                            mode="date"
                            maximumDate={maximumDate}
                            onConfirm={(e) => {
                                _this.setDatePickerVisible(false)
                                _this.setDob(e)
                                console.log(e)
                            }
                            }
                            onCancel={() => { _this.setDatePickerVisible(false) }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.input}>
                    <Text style={styles.input_heading}>Occupation</Text>
                    <View style={styles.input_box}>
                        <Icon name="user-md" size={25} color={Colors.deep_gray} />
                        <TextInput
                            placeholder={"Student"}
                            style={styles.input_text}
                            value={_this.occupation}
                            onChangeText={(e) => { _this.setOccupation(e) }}
                        />
                    </View>
                </View>
                <View style={styles.input}>
                    <Text style={styles.input_heading}>City</Text>
                    <View style={styles.input_box}>
                        <Icon name="building" size={25} color={Colors.deep_gray} />
                        <TextInput
                            placeholder={"Kolkata"}
                            style={styles.input_text}
                            value={_this.city}
                            onChangeText={(e) => _this.setCity(e)}
                        />
                    </View>
                </View>
                <View style={styles.bottom_gap} />
            </View>
        </ScrollView>
    )
}

const Page_2 = ({ _this }) => {


    const cropDpImage = (image) => {
        ImagePicker.openCropper({
            path: image.path,
            width: 350,
            height: 455,
            compressImageQuality: 0.8,
            compressImageMaxWidth: 350,
            compressImageMaxHeight: 455,
        }).then(image => {
            _this.setDp({ uri: image.path })
        }).catch(e => console.log(e));
    }

    const selectImageFromCamera = () => {
        ImagePicker.openCamera({}).then(image => {
            cropDpImage(image)
        })
            .catch(e => console.log(e));
    }

    const selectImageFromGallery = () => {
        ImagePicker.openPicker({}).then(image => {
            cropDpImage(image)
        })
            .catch(e => console.log(e));
    }

    return (
        <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
            <Text style={styles.page_title}>Upload Profile Picture</Text>
            <Text style={styles.page_subtitle}>You can choose picture from camera or your gallary.</Text>
            <View style={styles.profilePicHolder}>
                {_this.dp && <Image source={_this.dp} resizeMode="cover" style={styles.dp} />}
                {!_this.dp && <Icon1 name="user-circle" size={180} color={Colors.gray} />}
            </View>
            <TouchableOpacity
                style={styles.select_button}
                onPress={() => selectImageFromCamera()}
            >
                <Icon1 name="camera" size={30} color={Colors.white} />
                <Text style={styles.select_button_text}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.select_button}
                onPress={() => selectImageFromGallery()}
            >
                <Icon1 name="picture-o" size={30} color={Colors.white} />
                <Text style={styles.select_button_text}>Gallery</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const Page_3 = ({ _this }) => {

    return (
        <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
            <Text style={styles.page_title}>About Yourself</Text>
            <Text style={styles.page_subtitle}>Help people to know your nature.</Text>
            <View style={styles.form}>
                <View style={styles.input}>
                    <Text style={styles.input_heading}>Username</Text>
                    <View style={[styles.input_box,{borderColor: _this.usernameStatus?_this.usernameStatus=='ok'?Colors.success:Colors.error:Colors.deep_gray}]}>
                        <Icon name="user-tag" size={25} color={Colors.deep_gray} />
                        <TextInput
                            placeholder={"john16"}
                            style={styles.input_text}
                            value={_this.username}
                            onEndEditing={(e) => {_this.checkUsername()}}
                            onChangeText={(e) => {_this.setUsername(e)}}
                        />
                    </View>
                    {_this.usernameStatus!='' && _this.usernameStatus!='ok' &&
                        <Text style={styles.username_error}>{_this.usernameStatus}</Text>
                    }
                </View>
                <View style={styles.input}>
                    <Text style={styles.input_heading}>About You</Text>
                    <View style={styles.big_input_box}>
                        <TextInput
                            placeholder={"I am a simple guy. Recently had breakup and looking for a serious relation. Looking for a loyal and humerous partner."}
                            style={styles.big_input_text}
                            value={_this.bio}
                            onChangeText={(e) => _this.setBio(e)}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>
                </View>
                <View style={styles.input}>
                    <Text style={styles.input_heading}>Hobbies</Text>
                    <View style={styles.input_box}>
                        <Icon name="baseball-ball" size={25} color={Colors.deep_gray} />
                        <TextInput
                            placeholder={"Travelling,Cooking,Drumming"}
                            style={styles.input_text}
                            value={_this.hobbies}
                            onChangeText={(e) => { _this.setHobbies(e) }}
                        />
                    </View>
                </View>
                <View style={styles.input}>
                    <Text style={styles.input_heading}>Relationship Status</Text>
                    <View style={styles.input_box}>
                        <Icon1 name="heart" size={25} color={Colors.deep_gray} />
                        <ModalSelector
                            cancelStyle={{ display: 'none' }}
                            style={{ flex: 1 }}
                            data={[{ key: 'single', label: 'Single', value: 'Single' }, { key: 'in-relation', label: 'In A Relationship', value: 'In A Relationship' }, { key: 'married', label: 'Married', value: 'Married' }]}
                            optionContainerStyle={{ backgroundColor: Colors.background }}
                            optionTextStyle={{ color: Colors.text, alignSelf: 'flex-start' }}
                            onChange={(v) => _this.setRelationStatus(v.value)} >
                            <TextInput
                                placeholder={"Select Relationship Status"}
                                style={styles.input_text}
                                value={_this.relationStatus}
                                editable={false}
                            />
                        </ModalSelector>
                    </View>
                </View>
            </View>
            <View style={styles.bottom_gap} />
        </ScrollView>
    )
}
const PageMark = ({ currentPosition }) => {
    const [labels, setLabels] = useState(["Personal Details", "Profile Picture", "About Me"])

    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: Colors.medium,
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: Colors.primary,
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: Colors.primary,
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: Colors.secondary,
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 12,
        currentStepIndicatorLabelFontSize: 15,
        stepIndicatorLabelCurrentColor: Colors.primary,
        stepIndicatorLabelFinishedColor: Colors.primary,
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 12,
        currentStepLabelColor: Colors.secondary
    }

    return (
        <View style={styles.step_indicator}>
            <StepIndicator
                direction="horizontal"
                stepCount={labels.length}
                renderStepIndicator={({
                    position,
                    stepStatus,
                }) => {
                    if (stepStatus == 'finished')
                        return <Icon1 name="check" size={15} color={Colors.very_light} />
                    if (stepStatus == 'current')
                        return <Icon1 name="dot-circle-o" size={15} color={Colors.light} />
                }}
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
            />
        </View>

    )
}

export default ProfileSetup