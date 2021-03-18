import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ImageBackground,
    TouchableWithoutFeedback
} from 'react-native';
import styles from './style'
import { Colors, Styles, Mixins } from 'src/styles'
import { loader_image } from 'src/assets'
import { API_STORAGE } from 'src/config';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from "moment";
import FeedHeader from './feedHeader'

const ALLOWED_MAX_BIO_LINES = 3

const NewFolks = ({ _this }) => {
    return (
        <View style={[Styles.flex1, Styles.paddingAll8]}>
            <Introductions _this={_this} />
        </View>
    )
}

const Introductions = ({ _this }) => {
    const renderItem = ({ item, index }) => {
        return <RenderItem _this={_this} item={item} index={index} />
    }

    const renderSeperator = () => {
        return (
            <View style={styles.feedSeperator}>
            </View>
        )
    }

    return (
        <FlatList
            contentContainerStyle={styles.flexGrow}
            style={[Styles.marginTop10]}
            data={_this.introductions}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeperator}
            keyExtractor={(item,index) => index+''}
            keyboardShouldPersistTaps='handled'
            onEndReachedThreshold={0.5}
            onEndReached={() => !_this.NO_MORE_DATA && !_this.refreshing && _this.getIntroductions()}
            refreshing={false}
            //refreshControl={null}
            onRefresh={() => !_this.refreshing && _this.getIntroductions(true)}
            ListHeaderComponent={<FeedHeader _this={_this} />}
            ListFooterComponent={<View style={[Styles.bottomNavigationContentOffset,Styles.centerAll]}>
                {!_this.NO_MORE_DATA && <Image source={loader_image} style={styles.loader} />}
            </View>}
        //extraData={selectedId}
        />

    )
}


const RenderItem = ({ _this, item, index }) => {
    const [liked, setLiked] = useState(false)
    let lastTap = null;
    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            _this.sendLike(item.profile_picture_id._id,!liked)
            setLiked(!liked)
        } else {
            lastTap = now;
        }
    }

    const onPressLike=()=>{
        _this.sendLike(item.profile_picture_id._id,!liked)
        setLiked(!liked)
    }

    return (
        <View styles={[Styles.fullWidth]}>
            <TouchableWithoutFeedback onPress={handleDoubleTap} styles={Styles.fullWidth}>
                <ImageBackground source={{ uri: API_STORAGE+item.profile_picture_id.picture }} style={styles.feedImage} >
                    <View style={styles.feedOverlay}>
                        <TouchableOpacity style={[Styles.paddingAll8]} onPress={()=>onPressLike()}>
                            <Icon name={liked ? 'heart' : 'heart-o'} size={35} color={liked ? Colors.secondary : Colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>_this.navigation.navigate('ProfileComments',item)} style={[Styles.paddingAll8]}>
                            <Icon name='comment-o' size={35} color={Colors.white} />
                        </TouchableOpacity>
                        <View style={[Styles.paddingAll8, Styles.flex1, Styles.flexWrapReverse]}>
                            <TouchableOpacity><Text style={styles.feedOverlayText}><Icon name='thumbs-o-up' size={15} color={Colors.white} /> {item.profile_picture_id.likes} likes </Text></TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
            <TouchableOpacity>
                <Text style={styles.feedName}>{item.name} <Icon name={item.gender == 'male' ? 'mars' : 'venus'} size={15} color={Colors.secondary} /> </Text>
            </TouchableOpacity>
            <Text style={styles.feedText}>Age : {Moment().diff(item.dob,'years',false)}</Text>
            <Text style={styles.feedText}>Location : {item.city}, {item.country}</Text>
            <RenderBio bio={item.bio} />
        </View>
    )
}

const RenderBio = ({ bio }) => {
    const [processedBio, setProcessedBio] = useState(bio)
    const [textWidth, setTextWidth] = useState(0)
    const [textContainerWidth, setTextContainerWidth] = useState(0)
    const [numberOfLine, setNumberOfLine] = useState(0)
    const [viewfullbio, setViewfullbio] = useState(false)

    useEffect(() => {
        if (textContainerWidth !== 0 && textWidth !== 0 && textContainerWidth - textWidth < 100) {
            setProcessedBio(processedBio.slice(0, -15))
        }
    }, [textWidth, textContainerWidth])

    const onTextLayout = (e) => {
        let lines = e.nativeEvent.lines
        if (numberOfLine == 0) {
            setNumberOfLine(lines.length)
        }
        if (textWidth == 0 && lines.length > ALLOWED_MAX_BIO_LINES) {
            let temp = ''
            for (let i = 0; i < ALLOWED_MAX_BIO_LINES; i++) {
                temp += lines[i].text
            }
            setProcessedBio(temp)
            setTextWidth(lines[ALLOWED_MAX_BIO_LINES - 1].width)
        }
    }

    const onLayout = ({ nativeEvent: { layout: { x, y, width, height } } }) => {
        if (textContainerWidth == 0)
            setTextContainerWidth(width)
    }

    return (
        <TouchableWithoutFeedback onPress={() => setViewfullbio(true)} >
            <Text onLayout={onLayout} onTextLayout={onTextLayout} style={styles.feedText}>{viewfullbio ? bio : processedBio}{numberOfLine > ALLOWED_MAX_BIO_LINES && viewfullbio == false && <Text style={styles.feedMore}>...more</Text>}</Text>
        </TouchableWithoutFeedback>
    )
}

export default NewFolks


