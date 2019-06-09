import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import TodoInput from './todoInput/todoInput';
import TodoList from './todoList/todoList';

class TodoApp extends Component {

    // static navigationOptions=({navigation})=>{
    //     return{
    //         headerLeft:(
    //             <Button
    //             title='modal'
    //             onPress={()=>navigation.navigate('modal')}
    //             />
    //         )
    //     }
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Todo App</Text>
                <TodoInput />
                <Text style={{
                    marginTop: 5
                }}
                >Touch to delete</Text>
                <Button
                    title="go to blah"
                    onPress={() => this.props.navigation.navigate('blah', { newTitle: 'new Title' })}
                />
                <TodoList />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default TodoApp;