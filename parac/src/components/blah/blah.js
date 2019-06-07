import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class Blah extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('newTitle', 'error')
        }
    }
    render() {
        return (
            <View style={styles.blah}>
                <Text>Blah</Text>
                <Button
                    title="go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Button
                    title="change header title"
                    onPress={() => this.navigation.setParam('newTitle', 'again new title')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    blah: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Blah;