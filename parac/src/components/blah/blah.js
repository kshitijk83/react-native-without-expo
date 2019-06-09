import React, { Component } from 'react';
import { View, Text, Button, DatePickerAndroid } from 'react-native';
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
    state={
        day: null,
        year: null,
        month: null
    }

    async datePickerHandler(){
        try{
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if(action!==DatePickerAndroid.dismissedAction){
                console.log('date picked');
                this.setState({
                    day,
                    year,
                    month
                })
            }
        } catch({code, message}){
            console.warn('error');
        }
    }

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
                <Button
                    title="open date picker"
                    onPress={() => this.datePickerHandler()}
                />
                <Text>the date you picked is: {`${this.state.day} ${this.state.month} ${this.state.year}`}</Text>
            </View>
        );
    }
}

export default Blah;