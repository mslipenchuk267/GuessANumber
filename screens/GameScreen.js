import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText';

import { Ionicons } from '@expo/vector-icons';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value, numOfRounds) => {
    return (
        <View key={value} style={styles.listItem}>
            <BodyText>#{numOfRounds}</BodyText>
            <BodyText>{value}</BodyText>
        </View>
    );
};

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    // After the first render, useState will recognize it has already been inited an won't
    //  reset the states bellow.
    const [currentGuess, setCurrentGuess] = useState([initialGuess]);
    const [pastGuesses, setPastGuesses] = useState([]);
    // these don't get re-rendered to these values each time 
    // Like state except it doesn't re-render everything, its value is just updated
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    // Executes after every render cycle, use this to check if person lost
    useEffect(() => {
        if (currentGuess === userChoice) {
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        // Check if user lying
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'Please do not lie to us:(',
                [{ text: 'Sorry!', style: 'cancel' }]
            );
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        let nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        if (nextNumber != userChoice) {
            while (pastGuesses.includes(nextNumber)) {
                nextNumber = generateRandomBetween(
                    currentLow.current,
                    currentHigh.current,
                    currentGuess
                );
            }
        }
        setCurrentGuess(nextNumber); // This will now re=render the component
        //setRounds(rounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name='md-remove' size={24} />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name='md-add' size={24} />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1,
        width: '80%',
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        width: '60%',
    }
});

export default GameScreen;