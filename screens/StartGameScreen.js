import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton'

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState(''); //all input is a string that has to be converted
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        // Replace anything that isn't a number with an empty string
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
        setConfirmed(false);
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false); // This stops the Start Game card from rendering
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber < 1) {
            Alert.alert('Invalid Number!',
                'Enter a number between 1 & 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        // Remember state calls are batched together and occur when components re-render
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber); // Convert text to int
        Keyboard.dismiss();
    }

    // Check if user confirmed their number
    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a New Game!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
                    <Input
                        style={styles.input}
                        maxLength={2}
                        keyboardType='number-pad'
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button} >
                            <Button
                                title='Reset'
                                onPress={resetInputHandler}
                                color={Colors.accent}
                            />
                        </View>
                        <View style={styles.button} >
                            <Button
                                title='Confirm'
                                onPress={confirmInputHandler}
                                color={Colors.primary}
                            />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans'
    }
});

export default StartGameScreen;