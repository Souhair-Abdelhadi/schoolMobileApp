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
import React from 'react'
import {
    SafeAreaView, View, Text, ScrollView, StyleSheet,TouchableOpacity,Platform
} from 'react-native'
import { database } from 'react-native-firebase'
import Geolocation from 'react-native-get-location'
import BackgroundTimer from 'react-native-background-timer';
import RGeolocation from "react-native-geolocation-service"



export default class DriverHome extends React.Component {


    constructor(props){

        super(props);

        this.GetMyLocation()



    }

    state = {


        isActivated: false,
        schoolRef : this.props.navigation.getParam("schoolRef") ,
        driverId: this.props.navigation.getParam("driverId"),
        driverLatitude : null,
        driverLongitude : null,
        timerThread : BackgroundTimer,
    }



    GetMyLocation = () => {

        //  await Geolocation.getCurrentPosition({
        //     enableHighAccuracy: true,
        //     timeout: 15000,
        // })
        //     .then(location => {
        //         console.log(location);
        //         this.setState({
        //             driverLatitude : location.latitude,
        //             driverLongitude : location.longitude
        //         })
        //     })
        //     .catch(error => {
        //         const { code, message } = error;
        //         this.setState({
        //             driverLatitude: null,
        //             driverLongitude: null
        //         })
        //     })

        RGeolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                this.setState({
                    driverLatitude : position.coords.latitude,
                    driverLongitude : position.coords.longitude
                })
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )

    }


    shareDriverCoordinates = () =>{

            if (Platform.OS === 'android' ){

                //this.setState({timerThread : BackgroundTimer});
                // execute this code every 5 sec in the background to share driver coordinates with the database
                this.state.timerThread.runBackgroundTimer(()=>{

                    database().ref("/ecoles/"+this.state.schoolRef+"/ActiveState/")
                    .once('value',(snap)=>{

                        if(snap.val() == true ){
                            // get driver coordinates
                            // this.GetMyLocation();
                            //access driver data in database and check if it's there than take actions
                            database().ref("/ecoles/" + this.state.schoolRef + "/drivers/" + this.state.driverId)
                                .once('value', (snap) => {
                                    console.log("check executed", snap.val())
                                    if (snap.val() != null) {
                                        console.log("check executed 2")

                                        if (this.state.driverLatitude != null && this.state.driverLongitude != null) {
                                            console.log("check executed 3")

                                            // update driver coordinates in database with the ones in state object driverLatitude and driverLongitude
                                            database().ref("/ecoles/" + this.state.schoolRef + "/drivers/" + this.state.driverId)
                                                .update({
                                                    driverLatitude: this.state.driverLatitude,
                                                    driverLongitude: this.state.driverLongitude,

                                                })
                                                .catch(e => console.log(e));


                                        }
                                    }

                                })
                                .catch(e => console.log(e));
                        }
                        else{

                            this.state.timerThread.stopBackgroundTimer();
                            this.props.navigation.navigate('DriverLogin');

                        }
                    })



                },3000)


            }


    }

    stopShareDriverCoordinates = () => {

       if(Platform.OS === 'android'){

           this.state.timerThread.stopBackgroundTimer();
       }




    }

    requestLocation = async () => {
        try {
            const check = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if(check === PermissionsAndroid.RESULTS.GRANTED){
                this.shareDriverCoordinates()
            }
            else {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    title: "Geolocation permisson",
                    message:"Action neccessry for the app to work properly",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                    } 
                )
                if(granted === PermissionsAndroid.RESULTS.GRANTED){
                    this.shareDriverCoordinates()
                }
                else{
                    Alert.alert('Error',
                    "For the app to work propermy you need give access to gps.",
                    [{ text: 'UNDERSTOOD', onPress: () => this.requestLocation() }]);
        
        
                }
            }
        } catch (error) {
            Alert.alert('Error',
            "Error happend when trying to get gps data.",
            [{ text: 'UNDERSTOOD', onPress: () => this.requestLocation() }]);

        }

    }

   
    componentDidMount(){

        database().ref("/ecoles/" + this.state.schoolRef + "/ActiveState/")
        .once('value', (snap) => {

            if(snap.val() == false){

                this.props.navigation.navigate('DriverLogin');
            }

        })
        .catch(e=>console.log(e));

        this.myLocation = setInterval(() => {
            RGeolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    this.setState({
                        driverLatitude : position.coords.latitude,
                        driverLongitude : position.coords.longitude
                    })
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            )  
        }, 3000);


    }

    componentWillUnmount() {
        clearInterval(this.myLocation)
        if(this.state.isActivated){
            this.state.timerThread.stopBackgroundTimer()
        }

        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }



    render() {

        return (

            <SafeAreaView style={styles.container}>

                <ScrollView>

                <View style={{ display: !this.state.isActivated ? 'flex' : 'none' }}>

                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {
                        this.setState({ isActivated: true })
                        this.shareDriverCoordinates();
                    }} >

                        <View style={[styles.circle, { backgroundColor: '#292c31', }]} >

                            <Text style={styles.text} >Activate listener</Text>

                        </View>


                    </TouchableOpacity>

                </View>

                <View style={{ display: this.state.isActivated ? 'flex' : 'none' }}>

                    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => {
                        this.setState({ isActivated: false })
                        this.stopShareDriverCoordinates();
                    }} >

                        <View style={[styles.circle, { backgroundColor: 'red', }]} >

                            <Text style={styles.text} >Deactivate  listener</Text>

                        </View>

                    </TouchableOpacity>

                </View>

                </ScrollView>

            </SafeAreaView>

        )
    }

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    circle: {
        height: 200,
        width: 200,
        borderRadius: 200 / 2,

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: '40%',
        alignSelf: 'center'
    },
    TouchableOpacity: {
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: '50%',

    }



})