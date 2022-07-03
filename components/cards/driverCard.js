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
import {View,Image,StyleSheet,Animated,Text,TouchableOpacity} from 'react-native'
import RNSecureStorage , {ACCESSIBLE} from 'rn-secure-storage'



export default class DriverCard extends React.Component{


    state = {
      muteVolume: require('../../assets/mute.png') ,
      unmuteVolume: require('../../assets/volume.png'),
      mute : this.props.mute,
    }
  

    Toggle = (isMute,id) =>{
      this.setState({mute : !isMute})
      RNSecureStorage.get(id).then((data)=>{
          var value = JSON.parse(data).mute
          RNSecureStorage.set(id,JSON.stringify({mute : !value}),{accessible : ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
          .then(()=>{
              console.log("mute value is changed")
          })
          .catch(e=>console.log("toggle",e))
      })
      .catch(e=>console.log(e))
      
      return !isMute;
  }

    componentDidMount(){
  
  
  
    }
  
    componentWillUnmount(){
  
  
  
    }
  
    render(){
      return (
        <View key={this.props.driverId}  style={styles.card} >

                                    <View style={styles.imageAndName} >

                                    {this.props.driverImage == null ? <Image
                                        source={{ uri: "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png" }}
                                            style={styles.image}
                                        /> : 
                                        <Image
                                            source={{ uri: this.props.driverImage }}
                                            style={styles.image}
                                        />
                                    }
                                        <View style={styles.Name} >
                                            <Text style={styles.NameStyle} >{this.props.driverName}</Text>
                                            {/* <Text style={styles.NameStyle} >ABDELHADI</Text> */}
                                        </View>

                                    </View>
                                    <View style={styles.otherInformation} >
                                        <View style={styles.information} >
                                            <Text style={styles.informationStyle} > Driver Age               : <Text style={{ color: "gray" }} > {this.props.driverAge} years  </Text> </Text>
                                        </View>
                                        <View style={styles.information} >
                                            <Text style={styles.informationStyle} > Current Distance   : <Text style={{ color: "gray" }} > {this.props.distance}  </Text> </Text>
                                        </View>
                                        <View style={styles.information} >
                                            <View style={{ flexDirection: 'row' }} >
                                                <Text style={styles.informationStyle} >  Notify ?                   :  </Text>


                                                {
                                                    this.state.mute == true ? (<TouchableOpacity onPress={() => {
                                                        this.Toggle(this.state.mute, this.props.driverId)
                                                    }} style={{ alignSelf: 'center' }} >
                                                        <Image source={this.state.unmuteVolume} style={{ tintColor: "green" }} />
                                                    </TouchableOpacity>)

                                                        :
                                                        (<TouchableOpacity onPress={() => {
                                                            this.Toggle(this.state.mute, this.props.driverId)
                                                        }} style={{ alignSelf: 'center' }} >
                                                            <Image source={this.state.muteVolume} style={{ tintColor: "red" }} />
                                                        </TouchableOpacity>)
                                                }

                                            </View>
                                        </View>
                                    </View>


                                </View>
      )
    }
  
  
  }
  
  const styles = StyleSheet.create({
  
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