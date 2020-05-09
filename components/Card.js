import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    // I am passing in styles to override the default card style via props
    // This way I ensure the card will be styled dynamicaly based on the content
    return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5,
        padding: 20,
        borderRadius: 10
    }
});

export default Card;