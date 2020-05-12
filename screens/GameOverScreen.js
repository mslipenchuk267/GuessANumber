import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
    return (
            <ScrollView>
                <View style={styles.screen}>
                    <TitleText style={styles.resultTitle}>Game Over!</TitleText>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/success.png')} local image
                            //source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/1/12/K2_2006b.jpg'}} // web image
                            style={styles.image}
                            resizeMode='cover'
                            fadeDuration={200} />
                    </View>
                    <View style={styles.resultContainer}>
                        <BodyText style={styles.resultText}>
                            Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds
                to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                        </BodyText>
                    </View>
                    <MainButton onPress={props.onRestart} >
                        NEW GAME
            </MainButton>
                </View>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        borderRadius: Dimensions.get('window').width / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    resultTitle: {
        marginTop: Dimensions.get('window').height / 30
    }
});

export default GameOverScreen;