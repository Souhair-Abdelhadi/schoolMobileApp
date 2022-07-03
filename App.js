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
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import InitLoading from './InitialeLoading/Loading'
import StudentMainScreen from './studentComponents/MainStackNav'
import DriverMainScreen from './driverComponents/MainStackNav'
import DriverLogin from './driverComponents/DriverLogin'
import StudentLogin from './studentComponents/StudentLogin'
import React from 'react';
import {View,Image,StyleSheet,Animated,Text,TouchableOpacity,SafeAreaView} from 'react-native'
import Card from "./components/cards/driverCard"
import { ScrollView } from 'react-native-gesture-handler';
const Loading = createStackNavigator({

 Loading : InitLoading,

},
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export default createAppContainer(
  createSwitchNavigator({
    InitLoading: Loading,
    StudentMainScreen: StudentMainScreen,
    DriverMainScreen: DriverMainScreen,
    DriverLogin: DriverLogin,
    StudentLogin: StudentLogin,
  },

    {
      initialRouteName: "InitLoading"
    }

  )
)



/*

export default class App extends React.Component{

  constructor(props){
      super(props)

      this.state =  {
        parent_cord : {
          latitude: 37.78825,
          longitude: -7.575438,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        bus_cord : {
          latitude: 33.565500456301066,
          longitude: -7.573587090607804,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,

        }
      }

  }

  

  componentDidMount(){

  }

  componentWillUnmount(){
    
  }

  render() {
    return (
       
      <SafeAreaView style={styles.container}  >

      <View>

        <MapView
          initialRegion={this.state.parent_cord}
          region={this.state.parent_cord}
        >

          <Marker
            key={192}
            coordinate={{ latitude : this.state.bus_cord.latitude, longitude : this.state.bus_cord.longitude}}
            title="Maps test"
            description = "Description"
            pinColor = "black"
          />

        </MapView>


      </View>

      </SafeAreaView>

    );
  }


} 


const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "white",
    borderWidth : 2,
    borderColor : "gray"
  }
})


*/


/*

export default class App extends React.Component{



  state = {
    test : new Animated.Value(0),
    test2 : new Animated.Value(-50),
    test1 : new Animated.Value(0),
    test12 : new Animated.Value(-160),
    test3 : new Animated.Value(0),
    test13 : new Animated.Value(-270),
    test4 : new Animated.Value(0),
    test14 : new Animated.Value(-314),
    test5 : new Animated.Value(0),
    test15 : new Animated.Value(-156),
    test6 : new Animated.Value(0),
    test16 : new Animated.Value(-160),
    test7 : new Animated.Value(0),
    test17 : new Animated.Value(-50),
    test0 : new Animated.Value(0),
  }


  componentDidMount(){

    Animated.timing(this.state.test,{
      toValue  : -25,
      duration : 1000,
      useNativeDriver: false,
    }).start()
    Animated.timing(this.state.test2,{
      toValue  : -25,
      duration : 1000,
      useNativeDriver: false,
    }).start()

    Animated.timing(this.state.test1,{
      toValue  : -80,
      duration : 1200,
      useNativeDriver: false,
    }).start()
    Animated.timing(this.state.test12,{
      toValue  : -80,
      duration : 1200,
      useNativeDriver: false,
    }).start()

    Animated.timing(this.state.test3,{
      toValue  : -135,
      duration : 1300,
      useNativeDriver: false,
    }).start()
    Animated.timing(this.state.test13,{
      toValue  : -135,
      duration : 1300,
      useNativeDriver: false,
    }).start()


    Animated.timing(this.state.test4,{
      toValue  : -157,
      duration : 1400,
      useNativeDriver: false,
    }).start()
    Animated.timing(this.state.test14,{
      toValue  : -157,
      duration : 1400,
      useNativeDriver: false,
    }).start()

    Animated.timing(this.state.test5,{
      toValue  : -128,
      duration : 1500,
      useNativeDriver: false,
    }).start()
    Animated.timing(this.state.test15,{
      toValue  : -128,
      duration : 1500,
      useNativeDriver: false,
    }).start()

    Animated.timing(this.state.test6,{
      toValue  : -80,
      duration : 1600,
      useNativeDriver: false,
    }).start()
    Animated.timing(this.state.test16,{
      toValue  : -80,
      duration : 1600,
      useNativeDriver: false,
    }).start()

    Animated.timing(this.state.test7,{
      toValue  : -25,
      duration : 1700,
      useNativeDriver: false,
    }).start()
    Animated.timing(this.state.test17,{
      toValue  : -25,
      duration : 1700,
      useNativeDriver: false,
    }).start()

    Animated.timing(this.state.test0,{
      toValue  : 1,
      duration : 3000,
      useNativeDriver: false,
    }).start()

    

  }

  componentWillUnmount(){


  }


  render() {
    return (
       

      <View style={styles.container} >


        <View style={styles.toCenter} >
          <View style={[styles.shape,{backgroundColor : "rgba(255, 0, 0, 0.4)",top : -2 }]} />
          
          <Animated.View style={[styles.shape,{backgroundColor : "rgba(0, 0, 255, 0.4)",
           transform : [{rotate : this.state.test2.interpolate({
             inputRange : [-50,-25],
             outputRange : ['0deg','30deg']
           })}], top : this.state.test, left : this.state.test2.interpolate({
             inputRange : [-50,-25],
             outputRange : [0,-45]
           })  } ]} />

          <Animated.View style={[styles.shape,{backgroundColor : "rgba(0, 200, 255, 0.4)",
           transform : [{rotate : this.state.test12.interpolate({
             inputRange : [-160,-80],
             outputRange : ['0deg','90deg']
           })}], top : this.state.test1, left : this.state.test12.interpolate({
             inputRange : [-160,-80],
             outputRange : [0,-70]
           })  } ]} />

           
          <Animated.View style={[styles.shape,{backgroundColor : "rgba(0, 255, 0, 0.4)",
           transform : [{rotate : this.state.test13.interpolate({
             inputRange : [-270,-135],
             outputRange : ['0deg','125deg']
           })}], top : this.state.test3, left : this.state.test13.interpolate({
             inputRange : [-270,-135],
             outputRange : [0,-50]
           })  } ]} />


          <Animated.View style={[styles.shape,{backgroundColor : "rgba(200, 255, 0, 0.4)",
           transform : [{rotate : this.state.test14.interpolate({
             inputRange : [-314,-157],
             outputRange : ['0deg','180deg']
           })}], top : this.state.test4, left : this.state.test14.interpolate({
             inputRange : [-314,-157],
             outputRange : [0,2]
           })  } ]} />

          <Animated.View style={[styles.shape,{backgroundColor : "rgba(200, 0, 255, 0.4)",
           transform : [{rotate : this.state.test15.interpolate({
             inputRange : [-156,-128],
             outputRange : ['0deg','250deg']
           })}], top : this.state.test5, left : this.state.test15.interpolate({
             inputRange : [-156,-128],
             outputRange : [0,65]
           })  } ]} />

          <Animated.View style={[styles.shape,{backgroundColor : "rgba(200, 200, 255, 0.4)",
           transform : [{rotate : this.state.test16.interpolate({
             inputRange : [-160,-80],
             outputRange : ['0deg','90deg']
           })}], top : this.state.test6, left : this.state.test16.interpolate({
             inputRange : [-160,-80],
             outputRange : [0,78]
           })  } ]} />

          <Animated.View style={[styles.shape,{backgroundColor : "rgba(250, 100, 100, 0.4)",
           transform : [{rotate : this.state.test17.interpolate({
             inputRange : [-50,-25],
             outputRange : ['0deg','330deg']
           })}], top : this.state.test7, left : this.state.test17.interpolate({
             inputRange : [-50,-25],
             outputRange : [0,55]
           })  } ]} />

        </View>

        <Animated.View style={[styles.textView, {opacity : this.state.test0}]}>
             <Text style={styles.text} >By SOUHIAR ABDELHADI</Text>
           </Animated.View>

      </View>
    );
  }


}

const styles = StyleSheet.create({

  container : {
    flex : 1,
    backgroundColor : "black",
  },
  toCenter :  {
    marginHorizontal : "40%",
    marginVertical : "70%"
  },

  shape : {
    height : 120,
    width : 80,
    borderWidth : 2,
    borderColor : "white",
    borderRadius : 60,
    position : "absolute",

  },
  textView : {
    justifyContent : 'center',
    alignSelf  : 'center',
  },
  text : {
    fontSize : 26,
    color : "white",
    fontWeight : 'bold',
    fontStyle : 'italic'

  }




})

*/

// export default class App extends React.Component{


  
//   state = {
//     array :  [{
//       driverId : "feferefhuifhiheiuhf",
//       driverName : "opf eudoe",
//       driverAge : 22,
//       distance : 257,
//       mute : true
//     },
//     {
//       driverId : "ezyuiyeiy",
//       driverName : "zuei eudoe",
//       driverAge : 32,
//       distance : 157,
//       mute : false
//     },
//     {
//       driverId : "cbjbvbvkjcjn",
//       driverName : "cndjni eudoe",
//       driverAge : 28,
//       distance : 357,
//       mute : true
//     },
//     ],
//   }

//   render() {
//     return (
//        <View style={{flex : 1}} >
//          <ScrollView>


//           {this.state.array.map((value,index)=>{
//             return (
//               <View key={index} >
//                 <Card  
//                     driverId = {value.driverId}
//                     driverName = {value.driverName}
//                     driverAge = {value.driverAge}
//                     driverImage = {typeof value.driverImage == 'undefined' ? null : value.driverImage}
//                     distance = {value.distance}
//                     mute = {value.mute}
//                 />
//               </View>
//             )
//           })}


//          </ScrollView>
//        </View>
//     );
//   }




// }



// export default class App extends React.Component{


//   state = {

//   }

//   componentDidMount(){



//   }

//   componentWillUnmount(){



//   }

//   render(){
//     return (

//       <View style={{ backgroundColor: "black",height : "100%" }}  >

//         <View style={styles.card} >

//           <View style={styles.imageAndName} >

//             <Image
//               source={{ uri: "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png" }}
//               style={styles.image}
//             />
//             <View style={styles.Name} >
//               <Text style={styles.NameStyle} >SOUHAIR</Text>
//               <Text style={styles.NameStyle} >ABDELHADI</Text>
//             </View>

//           </View>
//           <View style={styles.otherInformation} >
//             <View style={styles.information} >
//               <Text style={styles.informationStyle} > Driver Age : <Text style={{ color: "gray" }} > 22 years  </Text> </Text>
//             </View>
//             <View style={styles.information} >
//               <Text style={styles.informationStyle} > Current Distance : <Text style={{ color: "gray" }} > 1562 m  </Text> </Text>
//             </View>
//             <View style={styles.information} >
//               <Text style={styles.informationStyle} > Notify from this driver  : <Text> true  </Text> </Text>
//             </View>
//           </View>


//         </View>

//       </View>

//     )
//   }


// }

// const styles = StyleSheet.create({

//   card : {
//     backgroundColor : "#292c31",
//     height : 300,
//     width : "90%",
//     marginTop : "5%",
//     alignSelf : 'center',
//     borderWidth : 2,
//     borderColor : "gray",
//     borderBottomLeftRadius : 30,
//     borderBottomRightRadius : 30
//   },
//   imageAndName : {
//     position : 'absolute',
//     marginTop : "4%",
//     width : "90%",
//     alignSelf : "center",
//     flexDirection : 'row',
//   },
//   image : {
//     width : 90,
//     height : 90,
//     borderRadius : 90/2,
//     borderWidth : 3,
//     borderColor : "white",
    
//   },
//   Name : {
//     position : 'absolute',
//     marginLeft : "45%",
//     marginTop : "6%",
//   },
//   NameStyle : {
//     fontSize : 18,
//     color : "#fbfbfb",

//   },
//   otherInformation  : {
//     position : 'absolute',
//     top : "45%",
//     width : "90%",
//     alignSelf : "center"
//   },
//   information : {
//     marginTop : "5%",
//   },
//   informationStyle : {
//     color : "#fbfbfb",
//     fontSize : 18,

//   }

// })




// export default class App extends React.Component{


//   state = {
//     fadeAnim : new Animated.Value(0),
//   }

 

//   render() {

//     return (
//       <View style={styles.container}>
//         {/* <Text style={styles.text}> Loading ... </Text>
//                 <ActivityIndicator size="large" color="red" /> */}

//          <Animated.View style={{ opacity : this.state.fadeAnim}} >

//           <Image source={require('./assets/VT_logo2r.jpg')} style={styles.circle} />

//          </Animated.View>
            
//       </View>
//     );
//   }



// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: 'center',

//   },
//   text: {
//     fontSize: 26,
//     fontWeight: "bold",
//     padding: 80,
//   },
//   circle : {

//     width: 150,
//     height: 150,
//     borderRadius : 150/2,

//   },
 
// })
 


//---------------------------------------------------------------

/*

  export default class App extends React.Component{

    state = {
      pointSize : 5,
      rotate : new Animated.Value(0)

    }



    onStartRotatePoint = () => {
      Animated.timing(
        this.state.rotate,
        {
          toValue: 100, // value/step to change color value
          duration: 3000, // the duration of color animation  
          useNativeDriver: false, // ‘useNativeDriver’ makes our animations run faster by creating a thread 
        }
      ).start((e) => { 
        
        this.onStartRotatePoint()
        if(e.finished){
          this.setState({rotate : new Animated.Value(0)})
        }

       });
    }

  
    

    componentDidMount(){

      this.onStartRotatePoint()
    
    }

    componentWillUnmount(){

    }

    render(){
      console.log(this.state.rotate)
      return(

          <View style={styles.container}>

            <View style={styles.loading}>
                <Animated.View  style={[styles.rotatingPoint, {
                  height:40,width:40,borderRadius : 40/2,alignSelf:'center',
                  transform: [{ translateX: this.state.rotate

                  }, {
                    translateY: this.state.rotate
                    }]
                  }]} />
            </View>


          </View>

        );



    }



  }


  const styles = StyleSheet.create({
    container : {
      flex : 1,
    },
    loading : {
      marginHorizontal : '50%',
      marginVertical:'50%',
      alignSelf : 'center',
    },
    rotatingPoint : {
      backgroundColor: 'black',
    }
  })


*/


// export default class App extends React.Component{





//   render(){

//     return(
//       <View style={{flex:1}}>

//         {
//           true == true ? (<TouchableOpacity onPress={() => {
//             this.setState({ muteVolume: require('./assets/volume.png'), unmuteVolume: require('./assets/mute.png') })
//             this.Toggle(data.mute, JSON.parse(JSON.stringify(data.driver)).driverId)
//           }} style={{  alignSelf: 'center',backgroundColor : "red" }} >
//             <Image source={require('./assets/volume.png')} style={{ tintColor: "green" }}  />
//           </TouchableOpacity>)

//             :
//             (<TouchableOpacity onPress={() => {
//               this.setState({ unmuteVolume: require('./assets/volume.png'), muteVolume: require('./assets/mute.png') })
//               this.Toggle(data.mute, JSON.parse(JSON.stringify(data.driver)).driverId)
//             }} style={{  alignSelf: 'center', backgroundColor: "red"  }} >
//               <Image source={require('./assets/mute.png')} style={{tintColor : "red"}} />
//             </TouchableOpacity>)
//         }
      
//       </View>
//     )


//   }



// }