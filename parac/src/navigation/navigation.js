import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import todoApp from '../components/todoApp/todoApp';
import Blah from '../components/blah/blah';
// import Modal from '../components/modal/modal';
import Badge from '../UI/Badge/badge';
import Ionicons from 'react-native-vector-icons/Ionicons';

const getTabBarIcon = (navigation, focused, tintColor)=>{
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if(routeName=='todoApp'){
            iconName = `ios-information-circle${focused?'':'-outline'}`;
            IconComponent = Badge;
        } else if(routeName=='blah'){
            iconName = `ios-options${focused?'':''}`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />
    }

const rootNavigator = createBottomTabNavigator({
    todoApp: {
        screen: todoApp
    },
    blah:{
        screen: Blah
    }
},
{
    defaultNavigationOptions:({navigation})=>({
        tabBarIcon: ({focused, tintColor})=> getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions:{
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
    }
}
)

export default createAppContainer(rootNavigator);





// const mainStack = createStackNavigator({
    //     todoApp: {
//         screen: todoApp
//     },
//     blah: {
//         screen: Blah
//     }
// },
//     {
//         initialRouteName: 'todoApp',
//         defaultNavigationOptions:{
//             headerStyle:{
//                 backgroundColor: '#000'
//             },
//             headerTintColor: '#fff',
//         }
//     })

// const rootNavigator = createStackNavigator({
//     main:{
//         screen: mainStack
//     },
//     modal:{
//         screen: Modal
//     }
// },{
//     mode: 'modal',
//     headerMode: 'none'
// }
// )


