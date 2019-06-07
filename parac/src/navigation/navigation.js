import { createAppContainer, createStackNavigator } from 'react-navigation';
import todoApp from '../components/todoApp/todoApp';
import Blah from '../components/blah/blah';

const rootNavigator = createStackNavigator({
    todoApp: {
        screen: todoApp
    },
    blah: {
        screen: Blah
    }
},
    {
        initialRouteName: 'todoApp'
    })


export default createAppContainer(rootNavigator);
