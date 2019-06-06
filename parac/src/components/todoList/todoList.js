import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {delTodo} from '../../store/actions/todoActions';

class TodoList extends Component {

    constructor(props){
        super(props);
    }

    deleteHandler=(k)=>{
        this.props.del(k);
    }

    render() { 
        return ( 
            <FlatList
            style={{width: '100%', padding: 5, marginTop: 10}}
            data={this.props.todos}
            renderItem={({item})=>{
                return(<TouchableOpacity
                onPress={()=>this.deleteHandler(item.key)}
                >
                    <View style={styles.listItem}>
                        <Text>{item.data}</Text>
                    </View>
                </TouchableOpacity>)
            }}
            keyExtractor={(item)=>`item-${item.key}`}
            ItemSeparatorComponent={()=>(
                <View
                style={{
                height: 1,
                width: "100%",
                backgroundColor: "#CED0CE",
                }}
            />
            )}
            />
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        // marginBottom: 5,
        padding: 10,
        backgroundColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStatetoProps=state=>{
    return{
        todos: state.todo.todos
    }
}

const DispatchStoP=dispatch=>{
    return{
        del: (key)=>dispatch(delTodo(key))
    }
}

export default connect(mapStatetoProps, DispatchStoP)(TodoList);