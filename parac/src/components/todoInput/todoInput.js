import React, { Component } from 'react'
import { View, Button, StyleSheet, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { setTodo, addTodo } from '../../store/actions/todoActions'

class TodoInput extends Component {
    constructor(props) {
        super(props);
        this.state={
            input: ''
        }
    }

    onChangeHandler = (input) => {
        this.setState({input: input})
    }

    addHandler = () => {
        this.props.add(this.state.input);
    }

    render() {
        console.log(this.state.input);
        return (
            <View style={styles.inputContainer}>
                <View style={styles.inputCon}>
                    <TextInput
                        multiline={true}
                        placeholder='Enter Todo'
                        value={this.state.input}
                        onChangeText={(text) => this.onChangeHandler(text)}
                    />
                </View>
                <Button
                    style={styles.button}
                    title="Add"
                    onPress={() => this.addHandler()}
                />

            </View>
        )
    }
}

// const mapStatetoProps = state => {
//     return {
//         todoState: state.todo
//     }
// }

const dispatchStatetoProps = dispatch => {
    return {
        set: () => dispatch(setTodo()),
        add: (i) => dispatch(addTodo(i))
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

export default connect(null, dispatchStatetoProps)(TodoInput);