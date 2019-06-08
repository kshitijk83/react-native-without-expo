import { createAppContainer, createStackNavigator } from 'react-navigation';
import todoApp from '../components/todoApp/todoApp';
import Blah from '../components/blah/blah';
import Modal from '../components/modal/modal';

const mainStack = createStackNavigator({
    todoApp: {
        screen: todoApp
    },
    blah: {
        screen: Blah
    }
},
    {
        initialRouteName: 'todoApp',
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor: '#000'
            },
            headerTintColor: '#fff',
        }
    })

const rootNavigator = createStackNavigator({
    main:{
        screen: mainStack
    },
    modal:{
        screen: Modal
    }
},{
    mode: 'modal',
    headerMode: 'none'
}
)


export default createAppContainer(rootNavigator);
