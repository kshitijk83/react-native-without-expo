import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'

class TodoList extends Component {

    render() { 
        return ( 
            <FlatList
            data={this.props.todos}
            renderItem={()=>{
                
            }}
            />
         );
    }
}

const mapStoP=state=>{
    return{
        todos: state.todo.todos
    }
}

// const DispatchStoP=dispatch=>{
//     return{
//         add
//     }
// }
 
export default connect(mapStoP, null)(TodoList);