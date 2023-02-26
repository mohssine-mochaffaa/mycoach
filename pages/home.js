import {Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View,Dimensions } from 'react-native';
import {useState,useEffect} from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import db from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';




 const Home =({navigation})=> {
   const [isVisible,setIsVisible] = useState(false)
   const [isVisible2,setIsVisible2] = useState(false)
   const [isVisible3,setIsVisible3] = useState(false)
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   const [adminPass,setAdminPass] = useState(null)
   const [pass,setPass] = useState('');
   const [clientPassword,setClientPassword] = useState('')  
   const [warnning,setWarnning] = useState("none")
   const [warnning2,setWarnning2] = useState("none")
   const [warnning3,setWarnning3] = useState("none")
   const [home,setHome] = useState('')



const auth = getAuth()

  const login=()=>{ 
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user; 
      if (user) {
        setIsVisible(false)
          navigation.navigate("Coach", {uid:user.uid,userC:user});
          console.log("changed")
      }else{
        console.log("not changed")

      }
    })
    .catch(async(error) =>  {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      setWarnning('flex');

    });
    
  }

  const login2=()=>{
    if (pass === adminPass) {
      setIsVisible2(false)
      navigation.navigate("Admin")
    }
    else{
      console.log("nop " + pass + "yes")
      setWarnning3('flex');
    }
  }



  
    const getData = async()=>{
      const docRef = doc(db, "admin", "password");
    const docSnap = await  getDoc(docRef);
    if (docSnap) {
      const val = docSnap.data().value
      setPass(val)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    }
    useEffect(() => {
      getData();
     },[])
  useEffect( () => {
    getData()
  },[isVisible2])
  

  const getData2 = async()=>{
    const docRef = doc(db, "admin", "homeImg");
  const docSnap = await  getDoc(docRef);
  if (docSnap) {
    const val = docSnap.data().src
    setHome(val)
  } else { 
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  }
  useEffect( () => {
    getData2()
  },[])
  useEffect( () => {
    getData2();
  },[isVisible2])




  const loginClient= async()=>{
    const docRef = doc(db, "clients", clientPassword);
    const docSnap = await  getDoc(docRef);
    if (docSnap.exists()) {
      
      setIsVisible3(false)
        navigation.navigate("Client",{uid:docSnap.data().uid,code:docSnap.data().code})
    } else {
      // doc.data() will be undefined in this case
      
      setWarnning2('flex');

    }
    
  }

const goBack=()=>{
  setIsVisible2(false);
  setWarnning3('none')
}
  
  return (
    <View style={styles.container}> 
    <Image source={require('../assets/coachApp2.jpg')} style={{width:100,height:100,borderRadius:100,marginTop:10,marginBottom:0}}/> 
    <View style={{flexDirection:"row",marginBottom:10}}><Text style={{fontSize:24,fontWeight:"bold",fontFamily:"serif"}}>sports</Text><Text style={{fontSize:24,fontWeight:"bold",color:'#f13a11',fontFamily:"serif",letterSpacing:1}}> finest</Text></View>
    <View style={styles.containerflex}>  
    <Text style={styles.introText}>SIGN IN</Text>  
    <TouchableOpacity onPress={()=> setIsVisible3(true) || setWarnning2("none")} style={styles.but2}><Text style={styles.but2Text}>Mon compte</Text></TouchableOpacity>
    <TouchableOpacity onPress={()=> setIsVisible(true) || setWarnning("none")} style={styles.but1}><Text style={styles.but1Text}>COACH</Text></TouchableOpacity>
    <TouchableOpacity onPress={()=> setIsVisible2(true) || setWarnning3("none")} style={styles.but1}><Text style={styles.but1Text}>Administration</Text></TouchableOpacity>
    </View>
    <Image source={{uri:home}} style={{width:Dimensions.get('window').width,flex:1,resizeMode:"center"}}/> 
 
    <Modal animationType="fade" visible={isVisible2} transparent={false} style={{justifyContent:"center",alignItems:"center"}}> 
    <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={goBack}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <View style={styles.modal}>
     <Text style={styles.introModal}>Administration</Text>
     <View style={{borderColor:"red",borderWidth:1,backgroundColor:"red",display:warnning3,alignItems:"center",justifyContent:"center",padding:10}}><Text style={{color:"white",fontWeight:"bold"}}>Invalid password</Text></View>
     <TextInput onChangeText={(e)=> setAdminPass(e)} style={styles.input} placeholder='Password'/>
     <TouchableOpacity onPress={login2} style={styles.login}><Text style={styles.loginText}>Login</Text></TouchableOpacity>
     </View>
     </Modal>
    <Modal animationType="fade" visible={isVisible} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
    <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <View style={styles.modal}>
     <Text style={styles.introModal}>COACH</Text> 
     <View style={{borderColor:"red",borderWidth:1,backgroundColor:"red",display:warnning,alignItems:"center",justifyContent:"center",padding:10}}><Text style={{color:"white",fontWeight:"bold"}}>Invalid coach email or password</Text></View>
     <TextInput onChangeText={(e)=> setEmail(e)} style={styles.input} placeholder='Email'/>
     <TextInput onChangeText={(e)=> setPassword(e)} style={styles.input} placeholder='Password'/>
     <TouchableOpacity onPress={login} style={styles.login}><Text style={styles.loginText}>Login</Text></TouchableOpacity>
     </View>
     </Modal>
     <Modal animationType="fade" visible={isVisible3} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
     <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible3(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <View style={styles.modal}>
     <Text style={styles.introModal}>Mon compte</Text> 
     <View style={{borderColor:"red",borderWidth:1,backgroundColor:"red",display:warnning2,alignItems:"center",justifyContent:"center",padding:10}}><Text style={{color:"white",fontWeight:"bold"}}>Invalid password</Text></View>
     <TextInput onChangeText={(e)=> setClientPassword(e)} style={styles.input} placeholder='Password'/> 
     <TouchableOpacity onPress={loginClient} style={styles.login}><Text style={styles.loginText}>Login</Text></TouchableOpacity>
     </View>
     </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"100%",
    backgroundColor:"white",
    alignItems: 'center',
  },
  containerflex:{
    flex:0,
    width:"90%",
    backgroundColor:'#f13a11',
    borderRadius:5,
    borderBottomEndRadius:5,
    borderBottomStartRadius:5,
    paddingBottom:10,
    marginBottom:0
   
    
  },
  but1:{
    backgroundColor:'white', 
    padding:12,
    alignSelf:'center',
    width:"80%",
    margin:17,
    paddingLeft:30,
    paddingRight:30,
    borderRadius:30,
    marginBottom:8,
    marginTop:8,

  },
  but2:{
    backgroundColor:'white',
    width:"80%",
    padding:12,
    alignSelf:'center',
    margin:17,
    paddingLeft:30,
    paddingRight:30,
    borderRadius:30,
    marginBottom:8,
    marginTop:8,

  },
  but1Text:{
    color:"black",
    fontWeight:"bold",
    fontSize:17,
    alignSelf:"center"

  },
  but2Text:{
    color:"black",
    fontWeight:"bold",
    fontSize:17,
    alignSelf:"center"
  },
  introText:{
    fontSize:19,
    fontWeight:"bold",
    color:'white',
    fontFamily:"serif",
    alignSelf:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:5,
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
});
export default Home

/*/  /*/