import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity, Modal, Pressable,TextInput,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from "react"
import { doc, updateDoc,deleteDoc } from "firebase/firestore"; 
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from '../firebase';

 const Planning =({navigation,route})=> {
   

  return (
    <View style={styles.container}>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row1:{
    backgroundColor:"white",
    width:"100%",
    justifyContent:"space-between",
    flexDirection:"row",
    padding:10,
    marginTop:5,
    alignItems:"center",

  },
  row1But:{
    backgroundColor:"green",
    padding:6,
    paddingLeft:15,
    paddingRight:15,
    borderRadius:5,
    
  },
  row1ButText:{
    color:"white", 
    fontSize:18,
    fontWeight:"bold"
  },
  row1Text:{
    fontSize:18,
    fontWeight:"bold",
    color:"#6b6b6b",
  },
  row1Weight:{
      color:"black",
      fontWeight:"bold",
      fontSize:16,
  },
  row1Weight2:{
    color:"white",
    fontWeight:"bold",
    fontSize:16,
    backgroundColor:"red",
    paddingRight:4,
    paddingLeft:4,
    padding:3,
},
  modal:{
    justifyContent:'center',
    width:"100%",
    alignSelf:"center",
    alignItems:'center',
    height:'100%',
  },
  introModal:{
    alignItems:"center",
    alignSelf:'center',
    marginTop:-80,
    marginBottom:40,
    fontWeight:'bold',
    fontSize:30,
  },
  input:{
    borderWidth:1, 
    borderColor:'red',
    borderRadius:10,
    width:"70%",
    height:50,
    paddingLeft:10,
    margin:10,
  },
  login:{
    backgroundColor:"orange",
    padding:15,
    paddingLeft:30,
    paddingRight:30,
    marginTop:10,
    borderRadius:8,
  },
  loginText:{
    color:"white",
  },
});
export default Planning;