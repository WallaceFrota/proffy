import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

import heartIcon from '../assets/images/icons/heart-icon.png';
import classIcon from '../assets/images/icons/teacher.png';

const { Navigator, Screen } = createBottomTabNavigator();

// navegação por tabs
function StudyTabs() {
    return (   
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20
                },
                labelStyle: {
                    fontWeight: '700',
                    fontSize: 13,
                    marginLeft: 16
                },
                inactiveBackgroundColor: "#fafafc",
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d'
            }}
        >
            <Screen 
                name="TeacherList"
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys',
                    // tabBarIcon: ({color, size, focused}) => {
                    //     return (
                    //         <Icon name="ios-easel" size={size} color={focused ? '#8257e5' : color}/>
                    //     )
                    // }
                    tabBarIcon: ({color, size, focused}) => {
                        return (
                            <Image source={classIcon} />
                        )
                    }
                }}
            />
            <Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({color, size, focused}) => {
                        return (
                            <Image source={heartIcon} />
                        )
                    }
                }}
            />
        </Navigator>

    )
};

export default StudyTabs;