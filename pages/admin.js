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
import {getStorage} from "firebase/storage";
import {ref,uploadBytes , getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from '@expo/vector-icons';

 




 const Admin=({navigation})=> {
    const [isVisible,setIsVisible] = useState(false);
    const [isVisible2,setIsVisible2] = useState(false);
    const [isVisible3,setIsVisible3] = useState(false);
    const [isVisible4,setIsVisible4] = useState(false);
    const [isVisible12,setIsVisible12] = useState(false);
    const [imgTest,setImgTest] = useState('');
    const [imgSelected,setImgSelected] = useState(false)




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
    const [warnning3,setWarnning3] = useState("none")
    const [warnning3Text,setWarnning3Text] = useState("none")



  const addCoach=()=>{
    const auth = getAuth();
    createUserWithEmailAndPassword (auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        const docRef = setDoc(doc(db, "coach" , user.uid), {
            name:name,
            resume:"",
            resumePhone:"",
            resumeExp:"",
            coachPass:coachPassword,
            coachEmail:coachEmail,
            img:"",
            clientsNum:0,
            coachUid: user.uid
          });
          
          setIsVisible(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)

        setWarnning3("flex")
        setWarnning3Text(errorCode)
      });
 
  }


  const takeCoach = ()=>{
    const q = query(collection(db, "coach"));
    const clients = onSnapshot(q, (querySnapshot) => {
    const clinet = [];
  querySnapshot.forEach((doc) => {
    clinet.push(doc.data());
  });
  setClien(clinet) 
});
  }
  useEffect(()=>{
    takeCoach()

  },[])
  const changePassword=()=>{
    const docRef = doc(db, "admin" , "password");
    updateDoc(docRef, {
        value:password2
      }); 
      setIsVisible2(false)
  }

  const takeClient=()=>{
    const q = query(collection(db, "clients"), where("rec", "!=", ""));
    const clients = onSnapshot(q, (querySnapshot) => {
    const reclame = [];
  querySnapshot.forEach((doc) => {
    reclame.push(doc.data());
  });
  setReclamation(reclame) 
  console.log(reclamation)
});
  }
  useEffect(()=>{
   takeClient()

  },[])
  useEffect(()=>{
    takeClient()

  },[changed])
  
  const done2=(code)=>{
    const docRef = doc(db, "clients" , code);
    updateDoc(docRef, { 
        rec:"",
      }); 
      setChanged(!changed)
  }
  const goBack=()=>{
    setIsVisible(false)
    setWarnning3("none")
  }
  const pickImage = async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:false, 
      aspect:[4,3],
      quality:1
    })
    if(!result.cancelled){
      setImgSelected(true)
      const storage = getStorage();
      const imageRef = ref(storage, `homeImage.jpg`)
      const imeg = await fetch(result.uri);
      const bytes = await imeg.blob();
      setImgTest(result.uri)
      await uploadBytes(imageRef, bytes).then(()=> { getDownloadURL(imageRef).then((url)=> {
        const docRef = doc(db, "admin" , "homeImg");
        updateDoc(docRef, {
            src:url,
          }); 
      } 
      );})
      
     
    }
  }
  return ( 
    <View style={styles.container}>
        <View style={styles.row1}><TouchableOpacity><Text style={styles.row1Text}>Nouveau coach</Text></TouchableOpacity><TouchableOpacity onPress={()=> setIsVisible(true)} style={styles.row1But2}><Entypo name="add-user" size={23} color="#ff5d00" /></TouchableOpacity></View>
        <View style={styles.row1}><TouchableOpacity><Text style={styles.row1Text}>Nouveau mot de pass</Text></TouchableOpacity><TouchableOpacity onPress={()=> setIsVisible2(true)} style={styles.row1But2}><Entypo name="lock" size={23} color="#ff5d00" /></TouchableOpacity></View>
               <View style={styles.row1}><TouchableOpacity><Text style={styles.row1Text}>Home Image </Text></TouchableOpacity><TouchableOpacity onPress={()=> setIsVisible12(true)} style={styles.row1But2}><Entypo name="lock" size={23} color="#ff5d00" /></TouchableOpacity></View>
        <View style={styles.row1}><Text style={styles.row1Text}>coachs ({client.length})</Text></View>  
        <ScrollView style={{backgroundColor:"#ccc"}}>
    {client.map((user)=> {return(
      <TouchableOpacity onPress={()=> navigation.navigate('Reclamation',{email:user.coachEmail,password:user.coachPass,img:user.img,coach:user.name,uid:user.coachUid})}  style={styles.clients}> 
      <Text style={{marginLeft:5}}>{user.name} ({user.clientsNum})</Text>
      {user.img.length > 5?<Image source={{uri:user.img}} style={{width:50,height:50,borderRadius:50,margin:0,alignSelf:"center",marginBottom:0,borderWidth:2,borderColor:"#f13a11"}}/>:<View style={{margin:10}}><SimpleLineIcons name="user" size={30} color="black" /></View>}
      </TouchableOpacity>
    )})} 
    </ScrollView>
    <View style={styles.row1}><TouchableOpacity><Text style={styles.row1Text}>Reclamations ({reclamation.length})</Text></TouchableOpacity><TouchableOpacity onPress={()=>setIsVisible3(true)} style={styles.row1But2}><Ionicons name="enter" size={25} color="#ff5d00" /></TouchableOpacity></View>

        <Modal animationType="fade" visible={isVisible} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
        <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={goBack}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <View style={styles.modal}>
     <Text style={styles.introModal}>New coach</Text>
     <View style={{borderColor:"red",borderWidth:1,backgroundColor:"red",display:warnning3,alignItems:"center",justifyContent:"center",padding:10}}><Text style={{color:"white",fontWeight:"bold"}}>{warnning3Text}</Text></View>
     <TextInput onChangeText={(e)=> setEmail(e) || setCoachEmail(e)} style={styles.input} placeholder='Email'/>
     <TextInput onChangeText={(e)=> setpassword(e) || setCoachPassword(e)} style={styles.input} placeholder='Password'/>
     <TextInput onChangeText={(e)=> setName(e)} style={styles.input} placeholder='Name'/>
     <TouchableOpacity onPress={addCoach} style={styles.login}><Text style={styles.loginText}>ADD</Text></TouchableOpacity>
     </View>
     </Modal>
     <Modal animationType="fade" visible={isVisible2} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
     <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible2(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <View style={styles.modal}>
     <Text style={styles.introModal}>Nouveau mot de pass</Text>
     <TextInput onChangeText={(e)=> setpassword2(e)} style={styles.input} placeholder='Mot de pass'/>
     <TouchableOpacity onPress={changePassword} style={styles.login}><Text style={styles.loginText}>Enregistrer</Text></TouchableOpacity>
     </View>
     </Modal>
     <Modal animationType="fade" visible={isVisible12} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
     <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible12(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <View style={styles.modal}>
     <Text style={styles.introModal2}>Nouveau Image</Text>
          <TouchableOpacity onPress={pickImage} style={{backgroundColor:"green",padding:10,marginBottom:10,paddingLeft:15,paddingRight:15,borderRadius:3}}>{!imgSelected?<Text style={{color:"white"}}>Image de profile</Text>:<View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color:"white"}}>Image de profile</Text><AntDesign style={{marginLeft:5}} name="checkcircleo" size={24} color="white" /></View>}</TouchableOpacity>
     </View>
              <Image source={{uri:imgTest}} style={{width:Dimensions.get('window').width,resizeMode:"contain",borderColor:"green",borderWidth:2,flex:1}}/> 

     </Modal>
     <Modal animationType="fade" visible={isVisible3} transparent={false}>
     <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible3(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     {reclamation.map((reclame)=>{
            return(
                <View style={{backgroundColor:"#ff5d00",padding:5,margin:15,borderRadius:5,width:"90%"}}>
                    <Text style={{color:"white",fontWeight:"bold",fontSize:17}}>{reclame.name}</Text>
                    <Text style={{color:"white",fontSize:15}}>{reclame.rec}</Text>
                    <Pressable onPress={()=> done2(reclame.code)} style={{backgroundColor:"white",width:80,alignItems:"center",marginTop:10,padding:3,borderRadius:5}}><Text>Supprimer</Text></Pressable>
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
        width:Dimensions.get('window').width,
        alignSelf:"center",
        alignItems:'center',
        height:"100%",
        flex:1
      },
      introModal:{
        alignItems:"center",
        alignSelf:'center',
        marginTop:-80,
        marginBottom:40,
        fontWeight:'bold',
        fontSize:30,
      },
      introModal2:{
        alignItems:"center",
        alignSelf:'center',
        marginTop:0,
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