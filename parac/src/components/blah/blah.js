import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { centerStyle } from '../../commonStyles/styles';

class Blah extends Component {
    // static navigationOptions = ({ navigation, navigationOptions }) => {
    //     return {
    //         title: navigation.getParam('newTitle', 'error'),
    //             headerStyle:{
    //                 backgroundColor: navigationOptions.headerTintColor
    //             },
    //             headerTintColor:navigationOptions.headerStyle.backgroundColor
    //     }
    // }
    render() {
        return (
            <View style={centerStyle.center}>
                <Text>Blah</Text>
                <Button
                    title="go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Button
                    title="change header title"
                    onPress={() => this.props.navigation.setParams({newTitle: 'again new title'})}
                />
            </View>
        );
    }
}

export default Blah;