import React, { Component } from 'react'
import { View, Button, StyleSheet, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { setTodo, addTodo } from '../../store/actions/todoActions'

class TodoInput extends Component {
    constructor(props) {
        super(props);

    }

    onChangeHandler = (input) => {
        this.props.set(input);
    }

    addHandler = (t) => {
        this.props.add(t);
    }

    render() {
        return (
            <View style={styles.inputContainer}>
                <View style={styles.inputCon}>
                    <TextInput
                        multiline={true}
                        placeholder='Enter Todo'
                        value={this.props.todoState.input}
                        onChangeText={(text) => this.onChangeHandler(text)}
                    />
                </View>
                <Button
                    style={styles.button}
                    title="Add"
                    onPress={(todo) => this.addHandler(todo)}
                />

            </View>
        )
    }
}

const mapStatetoProps = state => {
    return {
        todoState: state.todo
    }
}

const dispatchStatetoProps = dispatch => {
    return {
        set: () => dispatch(setTodo()),
        add: () => dispatch(addTodo())
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginTop: 50
    },
    inputCon: {
        width: '70%',
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    input: {
        width: '100%',
    },
    button: {
        width: '30%'
    }
})

export default connect(mapStatetoProps, dispatchStatetoProps)(TodoInput);