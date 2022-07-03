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
import { ScrollView, SafeAreaView, View, Text,Image } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import React from 'react';
import DriverHomeScreen from './DriverHomeScreen'
import DriverProfileScreen from './DriverProfileScreen'


function profileHeader(props) {


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                height: 100, alignItems: 'center', justifyContent: 'center',
                marginTop: "3%",
                marginBottom: "3%"
            }}>
                <View style={{
                    marginTop: "3%",
                    marginBottom: "3%"
                }}>
                    <Image source={require("../assets/VT_logo2r.jpg")}
                        style={{
                            marginTop: "8%",
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                        }}
                    />
                </View>
                <Text style={{ fontSize: 18 }}> School Time App </Text>
            </View>
            <ScrollView style={{ marginTop: "8%" }} >
                <DrawerItems {...props} />
            </ScrollView>
        </SafeAreaView>)

}

const Root = createDrawerNavigator(
    {

        Home: {
            screen: DriverHomeScreen,
            navigationOptions: {
                drawerIcon: (
                    <Image style={{ width: 24, height: 24 }}
                        source={require('../assets/home.png')}
                    />
                ),
            },

        },
        Profile: {
            screen: DriverProfileScreen,
            navigationOptions: {
                drawerIcon: (
                    <Image style={{ width: 24, height: 24 }}
                        source={require('../assets/about.png')}
                    />
                ),
            },
        },
       
    },
    {
        contentComponent: (props) => profileHeader(props)
    }
);




export default createAppContainer(Root);
