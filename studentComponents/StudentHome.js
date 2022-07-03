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
import {SafeAreaView,View,Text,
    ScrollView,StyleSheet,PermissionsAndroid,
    Animated, Modal,TouchableOpacity,
    AppState,ActivityIndicator,Platform,BackHandler,Alert,Image
} from 'react-native'
import firebase, {config, database} from 'react-native-firebase'
import RNSecureStorage , {ACCESSIBLE} from 'rn-secure-storage'
import Geolocation from 'react-native-get-location'
import RGeolocation from "react-native-geolocation-service"
import systemVolume from 'react-native-system-setting'
import Slider from '@react-native-community/slider'
import Sound from 'react-native-sound'
import BackgroundTimer from 'react-native-background-timer';
import LaunchApplication from 'react-native-bring-foreground';
import PushNotification from "react-native-push-notification";
import Card from '../components/cards/driverCard'


export default class StudentHome extends React.Component{


    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
        systemVolume.getVolume('music').then((value) => {
            this.setState({ volumeValue: value })
        })
            .catch(e => console.log(e))
        
    }


    state = {
        appState: AppState.currentState,
        driverName: null,
        driverLatitude: null,
        driverLongitude: null,
        distance: null,
        driverAge: null,
        schoolRef : this.props.navigation.getParam("schoolRef"),
        firstMount : true,
        volumeValue : 0.5,
        array : [],
        mapArray : [],
        database : database(),
        distancesObj : {},
        lat : 0,
        lon : 0,
        modalDrivers: [],
        modalMounted: false,
        modalPreviousMounted : false,
        sound: new Sound("ringtone.mp3", Sound.MAIN_BUNDLE, error => {
            if (error) {
                console.log("failed to load the ringtone", error)


            }
            
        }),
        timerThread : BackgroundTimer,
        checkTimeThread: BackgroundTimer,
        timerThreadMounted : false,
        checkTimeThreadMounted : false,
        outOfTime : false,
        noData :false,
        loading : true,
        muteVolume: require('../assets/mute.png') ,
        unmuteVolume: require('../assets/volume.png'),

    }


    requestLocation = async () => {
        try {
            const check = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if(check === PermissionsAndroid.RESULTS.GRANTED){
                this.getDataListener()
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
                    this.getDataListener()
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


    animateBackgroundColor = () => {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1, // value/step to change color value
                duration: 2000, // the duration of color animation  
                useNativeDriver: false, // ‘useNativeDriver’ makes our animations run faster by creating a thread 
            }
        ).start(() => { this.animateBackgroundColor() });
    }

    GetMyLocation = async () => {
        
        await Geolocation.getCurrentPosition({
            enableHighAccuracy: false,
            timeout: 2000,
            maximumAge: 3600000,
        }).then(location => {
            console.log("my device location",location);
           this.setState({
               lat : location.latitude,
               lon : location.longitude
           })
       })
       .catch(error => {
           const { code, message } = error;
           console.log("message:",message)
           this.setState({
               lat: 0,
               lon: 0
           })
       })         
    }

    


    haversine(lat1, lon1, lat2, lon2)
	{
		// distance between latitudes
		// and longitudes
		let dLat = (lat2 - lat1) * Math.PI / 180.0;
		let dLon = (lon2 - lon1) * Math.PI / 180.0;
		
		// convert to radiansa
		lat1 = (lat1) * Math.PI / 180.0;
		lat2 = (lat2) * Math.PI / 180.0;
		
		// apply formulae
		let a = Math.pow(Math.sin(dLat / 2), 2) +
				Math.pow(Math.sin(dLon / 2), 2) *
				Math.cos(lat1) *
				Math.cos(lat2);
		let rad = 6371000;
		let c = 2 * Math.asin(Math.sqrt(a));
        console.log(" haversaine distance : ",Math.floor(rad * c))
		return rad * c;
		
	}



    //calculate the distance between two coordinates points

    DistanceBetweenTwoPoint(lat2, lon2, lat1, lon1,driver) {

        console.log("lat1 :",lat1,"lon1 : ",lon1)
        
        const radlat1 = lat1* Math.PI/180.0
        const radlat2 = lat2 * Math.PI/180.0
        const radlon1 = lon1* Math.PI/180.0
        const radlon2 = lon2 * Math.PI/180.0
        const r = 6371000; // km
        const dlat = radlat2 - radlat1; // lat lon in radians
        const dlon = radlon2 - radlon1;

        const a = Math.pow(Math.sin(dlat / 2),2) +
            Math.pow(Math.sin(dlon / 2),2) * Math.cos(radlat1) * Math.cos(radlat2);
        const c = 2 * Math.asin(Math.sqrt(a));

        const d = r * c; // in km
        console.log("--------------------------------------------")
        console.log("d = ",d)
        console.log("--------------------------------------------")
        
        // show alert notification with a sound

        if( Math.floor(d) < 100 && this.state.modalMounted === false  && this.state.modalPreviousMounted === false && driver[0].mute === false ){
            this.state.modalDrivers.length=0
            this.setState({ modalDrivers : [driver[0].driver] })
            this.setState({modalMounted : true,modalPreviousMounted : true})
            if(this.state.appState =='background' ){
                console.log("app should come to foreground now")
                LaunchApplication.open("com.schooltime")
                this.showNotification()

            }
            

            BackgroundTimer.setTimeout(()=>{
                this.setState({
                    modalPreviousMounted: false
                })
                console.log("timer executed , modal can show now if the condition is verified")
            },60*1000*30)

            if(this.state.modalDrivers.length < 2){
                this.playRingtone()
            }
        }

        console.log("the distance in metres :", d);

        return Math.trunc(d);



    }



     Toggle = (isMute,id) =>{
         RNSecureStorage.get(id).then((data)=>{
             var value = JSON.parse(data).mute
             RNSecureStorage.set(id,JSON.stringify({mute : !value}),{accessible : ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
             .then(()=>{
                 for(var i in this.state.array){
                     if(this.state.array[i].driver.driverId == id)
                     {
                         this.state.array[i].mute = !value
                        //  this.setState({array : this.state.array})
                         return;
                     }
                 }
             })
             .catch(e=>console.log("toggle",e))
         })
         .catch(e=>console.log(e))
         return !isMute;
     }


     playRingtone = () => {

        const sound = new Sound("ringtone.mp3", Sound.MAIN_BUNDLE, error => {
            this.setState({ sound })
            sound.setVolume(this.state.volumeValue)
            if (error) {
                console.log("failed to load the ringtone", error)


            }
            else {

                sound.play(success => {

                    if (!success) {

                        Alert.alert("There was an error playing this audio");

                    }
                    else {
                        console.log("ringtone finished with success,another one will start")
                        this.playRingtone()
                    }
                })
            }


        })
    }

    _handleAppStateChange = nextAppState => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            console.log("app is on foreground",nextAppState);
        
        }
        else {
            console.log("app is on the background",nextAppState)
            
        }
        this.setState({ appState: nextAppState });
    };



    showNotification = () => {

        PushNotification.localNotification({
            /* Android Only Properties */
            channelId: "schooltimeId", // (required) channelId, if the channel doesn't exist, notification will not trigger.
            showWhen: false, // (optional) default: true
            autoCancel: true, // (optional) default: true
            largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
            bigLargeIcon: "ic_launcher", // (optional) default: undefined
            color: "red", // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            priority: "high", // (optional) set notification priority, default: high
            visibility: "public", // (optional) set notification visibility, default: private
            ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
            onlyAlertOnce: true, // (optional) alert will open only once with sound and notify, default: false

            invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

            /* iOS only properties */
            category: "", // (optional) default: empty string

            /* iOS and Android properties */
            title: "The bus is arrived", // (optional)
            message: "The bus is outside , walk your child to it ", // (required)
            userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
            playSound: false, // (optional) default: true
            soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            // repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        });
    }



    getDataListener = () =>{

        if(!this.state.timerThreadMounted){
        
        this.setState({ timerThreadMounted: true })
     
        this.state.timerThread.runBackgroundTimer(() => {
            //code that will be called every 5 seconds 

            if (((new Date().getHours() >= 7) && (new Date().getHours() <= 8)) ||
               ( (new Date().getHours() >= 10) && (new Date().getHours() <= 11)) ||
                ((new Date().getHours() >= 13) && (new Date().getHours() <= 14)) ||
                ((new Date().getHours() >= 15) && (new Date().getHours() <= 16)) ||
                ((new Date().getHours() >= 18) && (new Date().getHours() <= 19)) 
            ) {
                this.setState({ outOfTime: false });
                console.log("background timer executed ---------------")
                RNSecureStorage.get("schoolRef")
                    .then((data) => {
                        if (data !== null) {
                            this.setState({ loading : false });
                            this.state.database.ref("/ecoles/" + JSON.parse(data).schoolRef+"/ActiveState/")
                            .once("value",(snap)=>{
                                if(snap.val() == true){
                                    this.state.database.ref("/ecoles/" + JSON.parse(data).schoolRef + "/drivers/")
                                        .once('value', (snap) => {
                                            this.setState({ array: [...[]] })
                                            this.state.array.length = 0
                                            if (snap.val() != null) {

                                                // console.log(snap.val(), "snap")

                                                snap.forEach(async (val) => {

                                                    await RNSecureStorage.get(val.val().driverId).then((data) => {

                                                        // console.log(val.val(), "first RNSecureStorage", JSON.parse(data).mute)
                                                        firebase.database().ref("/drivers/"+val.val().driverId)
                                                        .once('value',(snapshot)=>{
                                                            // console.log("driver name : ",snapshot.val().driverName)
                                                            this.setState({
                                                                array: [{ driver: snapshot.val(), mute: JSON.parse(data).mute, distance: this.DistanceBetweenTwoPoint(val.val().driverLatitude, val.val().driverLongitude, this.state.lat, this.state.lon, [{ driver: val.val(), mute: JSON.parse(data).mute }]) }, ...this.state.array]
                                                            })
                                                        })
                                                        // this.setState({
                                                        //     array: [{ driver: val.val(), mute: JSON.parse(data).mute, distance: this.DistanceBetweenTwoPoint(val.val().driverLatitude, val.val().driverLongitude, this.state.lat, this.state.lon, [{ driver: val.val(), mute: JSON.parse(data).mute }]) }, ...this.state.array]
                                                        // })
                                                    })
                                                        .catch(async e => {
                                                            const data = JSON.stringify({ mute: false })
                                                            await RNSecureStorage.set(val.val().driverId, data, { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY })
                                                                .then(() => {
                                                                    // console.log(val.val(), "second RNSecureStorage")
                                                                    
                                                                    firebase.database().ref("/drivers/" + val.val().driverId)
                                                                        .once('value', (snapshot) => {
                                                                            console.log("driver name : ",snapshot.val().driverName)
                                                                            this.setState({
                                                                                array: [{ driver: snapshot.val(), mute: false, distance: this.DistanceBetweenTwoPoint(val.val().driverLatitude, val.val().driverLongitude, this.state.lat, this.state.lon, [{ driver: val.val(), mute: JSON.parse(data).mute }]) }, ...this.state.array]
                                                                            })
                                                                        })
                                                                    // this.setState({
                                                                    //     array: [{ driver: val.val(), mute: false, distance: this.DistanceBetweenTwoPoint(val.val().driverLatitude, val.val().driverLongitude, this.state.lat, this.state.lon, [{ driver: val.val(), mute: JSON.parse(data).mute }]) }, ...this.state.array]
                                                                    // })

                                                                })
                                                                .catch(e => console.log(e))




                                                        })

                                                })
                                            }

                                            else {

                                                this.setState({ array: [...[]] });
                                                this.state.array.length = 0;
                                                this.setState({ noData: true });


                                            }
                                        })
                                        .catch(e => console.log(e))
                                }
                                else {

                                    this.state.checkTimeThread.stopBackgroundTimer();
                                    this.props.navigation.navigate('DriverLogin');
                                    
                                }
                            })
                        }
                        else{
                            this.state.checkTimeThread.stopBackgroundTimer();
                            this.props.navigation.navigate('DriverLogin');
                        }
                        //return
                    })
                    .then(() => {
                        this.setState({ mapArray: this.state.array })
                    })
                    .catch(e => console.log(e))
           
                }
                
                else{
                    console.log("time out of range");
                    this.setState({ array: [...[]] });
                    this.setState({ outOfTime : true});
                }

        },
            4000);

    

        }
    }

    stopGetDataListener = () =>{

        if(this.state.timerThreadMounted){

        this.setState({timerThreadMounted : false })
        this.state.timerThread.stopBackgroundTimer();

    }
    }

    startTimeChecker = () =>{

        if (!this.state.checkTimeThreadMounted){
            this.setState({ checkTimeThreadMounted: true })


        this.state.checkTimeThread.runBackgroundTimer(() => {
            console.log("time checker executed")
            if ((new Date().getHours() >= 7) && (new Date().getHours() <= 19)) {

                this.getDataListener()
                this.state.checkTimeThread.stopBackgroundTimer()
                this.state.checkTimeThread.stop()
                this.setState({ checkTimeThreadMounted: false })

            }

        }, 6000);

    }

    }


    handleBackButton() {
        return true;
    }

    showDistance = (distance) =>{
        var v_distance = distance / 1000
        if(v_distance < 1){
            return distance + " m"
        }
        else{
            return v_distance + " km"
        }
    }

    componentDidMount() {
        
        systemVolume.addVolumeListener((volumeData )=>{

            this.setState({ volumeValue : volumeData.value });
            console.log("type of volume value : ",typeof volumeData,volumeData)

        })

        AppState.addEventListener("change", this._handleAppStateChange);

        BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
        
        if(Platform.OS === 'android'){

            this.myLocation = setInterval(() => {
                RGeolocation.getCurrentPosition(
                    (position) => {
                        console.log(position);
                        this.setState({
                            lat : position.coords.latitude,
                            lon : position.coords.longitude
                        })
                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                )  
            }, 3000);

            console.log("local time hours", new Date().getHours());
            console.log("local time hours", new Date().getUTCHours());
            //this.getDataListener()
           this.requestLocation()
        
        }


       

        this.animateBackgroundColor();

       
         this.backgroundColorVar = this.animatedValue.interpolate(
            {
                inputRange: [0, 1],
                outputRange: ['#ff002f', '#54212b']
            });

    }


    componentWillUnmount() {


        
        if(Platform.OS === 'android'){
            clearInterval(this.myLocation)
            this.state.checkTimeThread.stopBackgroundTimer()
            this.state.timerThread.stopBackgroundTimer()
        }

        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
        
        // clearInterval(this.intervale);

        this.animatedValue.stopAnimation();

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);


    }



    render() {
  
        
        return (

            <SafeAreaView style={styles.container}>


            <Modal visible={this.state.modalMounted}>

                    <SafeAreaView style={styles.modalContainer} >

                        <View key={"fferihirhfhipe"} >
                            <Slider
                                maximumValue={1}
                                minimumValue={0}
                                thumbTintColor={"blue"}
                                maximumTrackTintColor={"red"}
                                minimumTrackTintColor={"white"}
                                value={this.state.volumeValue}
                                onValueChange={(value) => {
                                    this.setState({ volumeValue: value })
                                    this.state.sound.setVolume(value)
                                    this.state.sound.setVolume(value)
                                    systemVolume.setVolume(value, "music")

                                }}
                                style={{ marginTop: "3%" }}

                            />
                        </View>

                        <ScrollView>

                            <View style={styles.bloc} key={"fhirpjcjpc"}>
                                <Text style={styles.ModalText} >The bus is arrived</Text>
                            </View>

                            <View style={styles.bloc} key={"fepccbvmfv"} >
                                <Text style={styles.ModalText} > the driver(s) : </Text>
                                {this.state.modalDrivers.map(data => {
                                    return (
                                        <Text style={styles.ModalText} key={"eyziyeiufh"} > { JSON.parse(JSON.stringify(data)).driverName} </Text>
                                    )
                                })}
                            </View>

                            <View  key={"fpcncxks"}>

                                <TouchableOpacity style={styles.circle} onPress={() => {
                                    this.setState({ modalMounted: false,modalDrivers : [...[]] })
                                    this.state.sound.stop()
                                    console.log("stop pressed , modal disappeared")
                                }} >

                                    <Animated.View style={[styles.AnimatedCircle, { backgroundColor: this.backgroundColorVar }]} key={"uppcpdv"}  >

                                        <Text style={[styles.ModalText, { marginTop: "30%" }]}>Stop</Text>

                                    </Animated.View>
                                </TouchableOpacity>

                            </View>


                        </ScrollView>


                    </SafeAreaView>

            </Modal>

               <View style={{marginTop : '3%'}} >               
                <ScrollView >
  
                   {this.state.outOfTime == true ? (
                       <View key="szuysizysiuz" style={styles.outOfTime} >
                            <Text style={styles.outOfTimeText} > No information is available to show  </Text>
                       </View>
                    ) : (this.state.loading == true ? (<SafeAreaView style={{ flex: 1 }} >


                        <View style={{ flex: 1, alignSelf: 'center', marginTop: "50%" }} >

                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', marginBottom: "8%" }} > Loading Data  </Text>

                            <ActivityIndicator size={'large'} color={"cyan"}  />

                        </View>


                        </SafeAreaView>) : this.state.mapArray.map((data,index) => {



                            return (

                                <View key={index} >
                                    <Card  
                                        driverId = {data.driver.driverId}
                                        driverName = {data.driver.driverName}
                                        driverAge = {data.driver.driverAge}
                                        driverImage = {data.driver.driverImage}
                                        distance = {this.showDistance(data.distance)}
                                        mute = {data.mute}
                                    />
                                </View>
                            )
                        }) ) }

                </ScrollView>
                </View>

            </SafeAreaView>

        )
    }

}






const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#393f47',
    },
    titleView: {
        marginBottom: "2%",
        marginTop: "2%",
        borderBottomWidth: 5,
        borderBottomColor: '#85c3c7',
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4d6091',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#29215b',
    },
    imageCircleView: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
    },
    item: {
        marginBottom: "4%",
        marginTop: "4%",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "black",
    },

    ModalText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "white",

    },
    bloc: {
        marginTop: "30%",
        marginBottom: "3%",
        alignSelf: 'center'
    },

    circle: {
        marginTop: "30%",
        marginBottom: "3%",
        borderWidth: 2,
        height: 100,
        width: 100,
        borderRadius: 100 / 2,
        alignSelf: 'center',
        alignItems: 'center',
    },
    AnimatedCircle: {
        borderWidth: 2,
        height: 100,
        width: 100,
        borderRadius: 100 / 2,
        alignSelf: 'center',
        alignItems: 'center',
        borderColor: "white",

    },
    outOfTime : {

        marginVertical : '50%',
        alignSelf : 'center',
    },
    outOfTimeText : {
        fontSize : 24,
        fontWeight : 'bold',
        color : 'white',

    },
    card : {
        backgroundColor : "#292c31",
        height : 300,
        width : "90%",
        marginTop : "5%",
        alignSelf : 'center',
        borderWidth : 2,
        borderColor : "rgba(198, 194, 196, 0.4)",
        borderBottomLeftRadius : 30,
        borderBottomRightRadius : 30
      },
      imageAndName : {
        position : 'absolute',
        marginTop : "4%",
        width : "90%",
        alignSelf : "center",
        flexDirection : 'row',
      },
      image : {
        width : 90,
        height : 90,
        borderRadius : 90/2,
        borderWidth : 3,
        borderColor : "white",
        
      },
      Name : {
        position : 'absolute',
        marginLeft : "45%",
        marginTop : "10%",
      },
      NameStyle : {
        fontSize : 18,
        color : "#fbfbfb",
    
      },
      otherInformation  : {
        position : 'absolute',
        top : "45%",
        width : "90%",
        alignSelf : "center"
      },
      information : {
        marginTop : "5%",
      },
      informationStyle : {
        color : "#fbfbfb",
        fontSize : 18,
    
      }




})



