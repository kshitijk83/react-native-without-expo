import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const badge = (props) => {
    return (
        <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={props.name} size={props.size} color={props.color} />
        <View
            style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            3
            </Text>
        </View>
    </View>
    );
}

export default badge;