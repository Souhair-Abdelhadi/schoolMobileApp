/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator} from 'react-navigation-stack';
import DriverProfile from './DriverProfile'
import Header from './DriverProfileHeader';



const screen = {

    DriverProfile: {
        screen: DriverProfile,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,

            };
        },

    },

};

const DriverStack = createStackNavigator(screen, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#292c31', height: 50 },
        headerTintColor: 'white',
    },

});





export default DriverStack;
