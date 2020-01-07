import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ResetButton(props) {
    return (
        <TouchableOpacity onPress={() => props.onReset()}>
            <View style={styles.button}>
                <Text style={{color: 'white'}}>RESET</Text>
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