import { StyleSheet, Text, View,TouchableOpacity, Modal, Pressable,TextInput,ScrollView, Image, Alert } from 'react-native';
import db from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { Dimensions} from 'react-native'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { deleteUser } from "firebase/auth";
import { updateDoc,deleteDoc } from "firebase/firestore"; 
import {getStorage} from "firebase/storage";
import {ref,uploadBytes , getDownloadURL, deleteObject } from "firebase/storage";
import { useState } from 'react';




 const Reclamation=({route,navigation})=> {
     const {email,password,img,coach,uid} = route.params;
     const auth = getAuth()

const [isDeleted,setIsdeleted] = useState(false)
const [cuser,setCuser] = useState([])
     
      const login=()=>{ 
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user; 
          setIsdeleted(true);
          return user;
         
        })
        .catch(async(error) =>  {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          
    
        });
        
      }
     
     

     const handleDelete=()=>{
      Alert.alert("Delete account",`Delete ${coach} account `,[
        {text:"No", onPress:()=> console.log("no")},
        {text:"yes", onPress: async()=> {
          await login();
          const auth = getAuth();
          const user = auth.currentUser; 
const storage = getStorage();
          const desertRef = ref(storage, `image${uid}.jpg`);
            deleteUser(user).then(()=>{
              deleteDoc(doc(db, "coach", uid));
              deleteDoc(doc(db, "planning", uid));
              deleteObject(desertRef) || null;
              setIsdeleted(true);
                navigation.navigate('Admin')
           }).catch((error) => {
        // An error ocurred
        console.log(error)
      })
          ;
        }} 
      ])
    }



      
    
  return ( 
    <View style={styles.container}>
    <View style={{backgroundColor:"white",width:Dimensions.get('window').width}}>
    {img.length > 5? <View style={{alignSelf:"center"}}><Image source={{uri:img}} style={{width:150,height:150,borderRadius:550,margin:10}}/></View>:<View style={{width:150,height:150,borderRadius:150,backgroundColor:"gray",marginTop:10,marginBottom:10,alignSelf:"center"}}></View>}
    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:Dimensions.get('window').width,backgroundColor:"white",padding:10}}>
    <View style={{margin:5,marginLeft:5}}><Text style={{fontWeight:"700",fontSize:15}}>Name</Text></View><Pressable  style={{backgroundColor:"#f13a11",padding:5,marginRight:5,borderRadius:5}}><Text style={{color:"white"}}>{coach}</Text></Pressable>
    </View>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:Dimensions.get('window').width,backgroundColor:"white",padding:10}}>
   <View style={{margin:5,marginLeft:5}}><Text style={{fontWeight:"700",fontSize:15}}>Email</Text></View><Pressable  style={{backgroundColor:"#f13a11",padding:5,marginRight:5,borderRadius:5}}><Text style={{color:"white"}}>{email}</Text></Pressable>
    </View>
    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:Dimensions.get('window').width,backgroundColor:"white",padding:10}}>
    <View style={{margin:5,marginLeft:5}}><Text style={{fontWeight:"700",fontSize:15}}>Passwod</Text></View><Pressable  style={{backgroundColor:"#f13a11",padding:5,marginRight:5,borderRadius:5}}><Text style={{color:"white"}}>{password}</Text></Pressable>
    </View>
    
    <View style={styles.row1}><View><Text style={styles.row1Text}>Delete account</Text></View><TouchableOpacity onPress={handleDelete} ><Text style={styles.row1Weight2}>Delete</Text></TouchableOpacity></View>
</View>
<View style={{marginTop:10}}>
  {isDeleted? (
      <Text style={{backgroundColor:"red",color:"white",padding:5,borderRadius:3,fontSize:20,paddingHorizontal:20}}>Deleting...</Text>
  ):(<View></View>)}
</View>
    </View>
  
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d4d4d4',
        alignItems: 'center',
        width:Dimensions.get("window").width,
      },
      row1:{
        backgroundColor:"white",
        width:"100%",
        justifyContent:"space-between",
        flexDirection:"row",
        padding:10,
        marginTop:1,
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
      clients:{
        backgroundColor:"white",
        width:Dimensions.get('window').width,
        justifyContent:"space-between",
        flexDirection:"row",
        marginTop:5,
        alignItems:"center",
        padding:10,
    
      },
       row1Weight2:{
    color:"white",
    fontWeight:"bold",
    fontSize:16,
    backgroundColor:"#f13a11",
    paddingRight:4,
    paddingLeft:4,
    padding:3,
},
});

export default Reclamation