import { StyleSheet, Text, View,TouchableOpacity, Modal, Pressable,TextInput,ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';
import db from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Dimensions} from 'react-native'
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { updateDoc,deleteDoc } from "firebase/firestore"; 
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons';





 const Admin=({navigation})=> {
    const [isVisible,setIsVisible] = useState(false);
    const [isVisible2,setIsVisible2] = useState(false);
    const [isVisible3,setIsVisible3] = useState(false);
    const [isVisible4,setIsVisible4] = useState(false);


    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setpassword] = useState('')
    const [password2,setpassword2] = useState('')
    const [gender,setGander] = useState('')
    const [client,setClien] = useState([])
    const [coachPassword,setCoachPassword] = useState("") 
    const [coachEmail,setCoachEmail] = useState("");
    const [reclamation,setReclamation] = useState([])
    const [changed,setChanged] = useState(true)


  const addCoach=()=>{
    const auth = getAuth();
    createUserWithEmailAndPassword (auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        const docRef = setDoc(doc(db, "coach" , user.uid), {
            name:name,
            resume:"",
            coachPass:coachPassword,
            coachEmail:coachEmail,
            img:"",
            coachUid: user.uid
          });
          
          setIsVisible(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
      });
 
  }
  useEffect(()=>{
    const q = query(collection(db, "coach"));
    const clients = onSnapshot(q, (querySnapshot) => {
    const clinet = [];
  querySnapshot.forEach((doc) => {
    clinet.push(doc.data());
  });
  setClien(clinet) 
});

  },[])
  const changePassword=()=>{
    const docRef = doc(db, "admin" , "password");
    updateDoc(docRef, {
        value:password2
      }); 
      setIsVisible2(false)
  }

  useEffect(()=>{
    const q = query(collection(db, "clients"), where("rec", "!=", ""));
    const clients = onSnapshot(q, (querySnapshot) => {
    const reclame = [];
  querySnapshot.forEach((doc) => {
    reclame.push(doc.data());
  });
  setReclamation(reclame) 
  console.log(reclamation)
});

  },[])
  useEffect(()=>{
    const q = query(collection(db, "clients"), where("rec", "!=", ""));
    const clients = onSnapshot(q, (querySnapshot) => {
    const reclame = [];
  querySnapshot.forEach((doc) => {
    reclame.push(doc.data());
  });
  setReclamation(reclame) 
  console.log(reclamation)
});

  },[changed])
  
  const done2=(code)=>{
    const docRef = doc(db, "clients" , code);
    updateDoc(docRef, { 
        rec:"",
      }); 
      setChanged(!changed)
  }
  return ( 
    <View style={styles.container}>
        <View style={styles.row1}><TouchableOpacity><Text style={styles.row1Text}>New coach</Text></TouchableOpacity><TouchableOpacity onPress={()=> setIsVisible(true)} style={styles.row1But2}><Entypo name="add-user" size={23} color="#ff5d00" /></TouchableOpacity></View>
        <View style={styles.row1}><TouchableOpacity><Text style={styles.row1Text}>New password</Text></TouchableOpacity><TouchableOpacity onPress={()=> setIsVisible2(true)} style={styles.row1But2}><Entypo name="lock" size={23} color="#ff5d00" /></TouchableOpacity></View>
        <View style={styles.row1}><Text style={styles.row1Text}>All coachs ({client.length})</Text></View>  
        <ScrollView style={{backgroundColor:"#ccc"}}>
    {client.map((user)=> {return(
      <TouchableOpacity onPress={()=> navigation.navigate('Reclamation',{email:user.coachEmail,password:user.coachPass,img:user.img,coach:user.name,uid:user.coachUid})}  style={styles.clients}> 
      <Text style={{marginLeft:5}}>{user.name}</Text> 
      {user.img.length > 5?<Image source={{uri:user.img}} style={{width:50,height:50,borderRadius:50,margin:0,alignSelf:"center",marginBottom:0,borderWidth:2,borderColor:"#f13a11"}}/>:<View style={{margin:10}}><SimpleLineIcons name="user" size={30} color="black" /></View>}
      </TouchableOpacity>
    )})} 
    </ScrollView>
    <View style={styles.row1}><TouchableOpacity><Text style={styles.row1Text}>Reclamations ({reclamation.length})</Text></TouchableOpacity><TouchableOpacity onPress={()=>setIsVisible3(true)} style={styles.row1But2}><Ionicons name="enter" size={25} color="#ff5d00" /></TouchableOpacity></View>

        <Modal animationType="fade" visible={isVisible} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
        <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <View style={styles.modal}>
     <Text style={styles.introModal}>New coach</Text>
     <TextInput onChangeText={(e)=> setEmail(e) || setCoachEmail(e)} style={styles.input} placeholder='Email'/>
     <TextInput onChangeText={(e)=> setpassword(e) || setCoachPassword(e)} style={styles.input} placeholder='Password'/>
     <TextInput onChangeText={(e)=> setName(e)} style={styles.input} placeholder='Name'/>
     <TouchableOpacity onPress={addCoach} style={styles.login}><Text style={styles.loginText}>ADD</Text></TouchableOpacity>
     </View>
     </Modal>
     <Modal animationType="fade" visible={isVisible2} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
     <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible2(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <View style={styles.modal}>
     <Text style={styles.introModal}>New password</Text>
     <TextInput onChangeText={(e)=> setpassword2(e)} style={styles.input} placeholder='Password'/>
     <TouchableOpacity onPress={changePassword} style={styles.login}><Text style={styles.loginText}>Save</Text></TouchableOpacity>
     </View>
     </Modal>
     <Modal animationType="fade" visible={isVisible3} transparent={false}>
     <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible3(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     {reclamation.map((reclame)=>{
            return(
                <View style={{backgroundColor:"#ff5d00",padding:5,margin:15,borderRadius:5,width:"90%"}}>
                    <Text style={{color:"white",fontWeight:"bold",fontSize:17}}>{reclame.name}</Text>
                    <Text style={{color:"white",fontSize:15}}>{reclame.rec}</Text>
                    <Pressable onPress={()=> done2(reclame.code)} style={{backgroundColor:"white",width:60,alignItems:"center",marginTop:10,padding:3,borderRadius:5}}><Text>Delete</Text></Pressable>
                </View>
            )
        })}
     </Modal>
     
    </View>
  
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d4d4d4',
        alignItems: 'center',
        
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
      row1But2:{
        backgroundColor:"white",
        padding:6,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:5,
        borderWidth:1,
        borderColor:"#ff5d00"
        
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
        borderColor:'#ff5d00',
        borderRadius:10,
        width:"70%",
        height:50,
        paddingLeft:10,
        margin:10,
      },
      login:{
        backgroundColor:"#ff5d00",
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
        padding:5, 
    
      },
});

export default Admin