import React from 'react';
import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function StartButton(props) {
    return (
        <TouchableOpacity onPress={() => props.onStart()} >
            <View style={styles.button}>
                <Text style={{ color: 'white' }}>START</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 5,
        backgroundColor: '#4682B4',
        padding: 10,
        borderRadius: 5
    }
})