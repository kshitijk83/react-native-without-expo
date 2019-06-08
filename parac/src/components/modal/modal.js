import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { centerStyle } from '../../commonStyles/styles';

class Modal extends Component {
    
    render(){
        return (
            <View style={centerStyle.center}>
                <Text>
                    this is modal
                </Text>
                <Button
                title="go back"
                onPress={()=>this.props.navigation.goBack()}
                />
            </View>
        );
    }
}

export default Modal;