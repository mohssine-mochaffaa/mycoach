import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity, Modal, Pressable,TextInput,ScrollView,Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import db from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Dimensions} from 'react-native'
import { getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import {getStorage} from "firebase/storage";
import {ref,uploadBytes , getDownloadURL, deleteObject } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from '@expo/vector-icons';


import { getAuth, deleteUser } from "firebase/auth";

 const Coach =({navigation,route})=> {
  const [isVisible,setIsVisible] = useState(false);
  const [isVisible2,setIsVisible2] = useState(false);
  const [isVisible4,setIsVisible4] = useState(false);

  const [image,setImage] = useState("")
  const [name,setName] = useState('')
  const [age,setAge] = useState('')
  const [gender,setGander] = useState('')
  const [code,setCode] = useState('')
  const [lundi,setLundi] = useState('')
  const [mardi,setMardi] = useState("")
  const [mercredi,setMercredi] = useState("")
  const [jeudi,setJeudi] = useState("")
  const [vendredi,setVendredi] = useState("")
  const [samedi,setSamedi] = useState("") 
  const [dimanche,setDimanche] = useState("")
  const [lundiT,setLundiT] = useState('')
  const [mardiT,setMardiT] = useState("")
  const [mercrediT,setMercrediT] = useState("")
  const [jeudiT,setJeudiT] = useState("")
  const [vendrediT,setVendrediT] = useState("")
  const [samediT,setSamediT] = useState("") 
  const [dimancheT,setDimancheT] = useState("")
  const [coach,setCoach] = useState('')
  const [client,setClien] = useState([])
  const [uid2,setUid2] = useState("")
  const [resume,setResume] = useState("")
  const [resume2,setResume2] = useState("")
  const [resume3,setResume3] = useState("")
  const [coachImage,setCoachImage] = useState('')
  const [imgSelected,setImgSelected] = useState(false)
  const [cleintNum,setCleintNum] = useState(0)

  const {uid,userC} = route.params || uid2;


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
      const imageRef = ref(storage, `image${uid2}.jpg`)
      const imeg = await fetch(result.uri);
      const bytes = await imeg.blob();
      await uploadBytes(imageRef, bytes).then(()=> { getDownloadURL(imageRef).then((url)=> {
        const docRef = doc(db, "coach" , uid2);
        updateDoc(docRef, {
            img:url,
          }); 
      } 
      );})
      
     
    }
  }


  const storeData= async()=>{
    try {
      await AsyncStorage.setItem(
        'uidStoragee',
        uid
      ).then(()=> getData());
    } catch (error) { 
      // Error saving data
      console.log(error) 
    }
  }

  const getData= async ()=>{
      const value  = await  AsyncStorage.getItem('uidStoragee');
      if (value !== null) {
        // We have data!!
        setUid2(value)  
        
      }
  }

  useEffect(()=>{
    const auth = getAuth();
    const user = auth.currentUser;

    storeData()

  },[])
  
  const getuid = async ()=>{
    const docRef = doc(db, "coach", uid || uid2);
    const docSnap = await  getDoc(docRef);
    if (docSnap) {
      const val = docSnap.data().name
      const valImg = docSnap.data().img
      setCoach(val)
      setCoachImage(valImg)
      console.log(valImg)
     
      
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const getCoach = async()=>{
    const docRef = doc(db, "coach", uid || uid2);
    const docSnap = await  getDoc(docRef);
    if (docSnap) {
      const val = docSnap.data().name
      const valImg = docSnap.data().img
      setCoach(val)
      setCoachImage(valImg)
      console.log(valImg)
     
      
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  useEffect(()=>{
   getCoach()
  },[isVisible4]);
  useEffect(async()=>{
    const docRef = doc(db, "coach", uid2);
    const docSnap = await  getDoc(docRef);
    if (docSnap) {
      const val = docSnap.data().name
      const valImg = docSnap.data().img
      setCoach(val)
      setCoachImage(valImg)
      console.log(valImg)
     
      
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  },[]);
  useEffect(()=>{
    getuid()
  },[isVisible])
 
  useEffect(()=>{
    const q = query(collection(db, "clients"), where("uid", "==", uid2 || uid));
    const clients = onSnapshot(q, (querySnapshot) => {
    const clinet = [];
  querySnapshot.forEach((doc) => {
    clinet.push(doc.data());
  });
  setClien(clinet) 
  getuid()
});

  },[])
  const add= async()=>{
  const docRef = setDoc(doc(db, "clients" , code), {
  code:code,
  name: name,
  age: age,
  gander:gender,
  uid:uid2,  
  coach:coach,
  img:"",
  phone:"",
  email:"",
  city:"",
  serv:"No service yet!",
  rec:"",
  date:"",
  fatique:"",
  souplesse:"",
  pompes:"",
  abdos:"",
  ruffier:"",
  fatique2:"",
  souplesse2:"",
  pompes2:"",
  abdos2:"",
  ruffier2:"",
  nutrition:"",
  nutrition2:"",
  nutrition3:"",
  nutrition4:"",
  nutrition5:"",
  nutrition6:"",
  nutrition7:"",
  form:"",
  formDate:"",
  lundi:"",
  mardi:"",
  mercredi:"",
  jeudi:"",
  vendredi:"",
  samedi:"",
  dimench:"",
  lundiT:"",
  mardiT:"",
  mercrediT:"",
  jeudiT:"",
  vendrediT:"",
  samediT:"",
  dimenchT:"",
  masseGrass:"0",
  visceralFat:"0",
  hydration:"0",
  masseMusculaire:"0",
  masseOsseuse:"0",
  tmb:"0",
  amr:"0",
  masseGrass2:"0",
  visceralFat2:"0",
  hydration2:"0",
  masseMusculaire2:"0",
  masseOsseuse2:"0",
  tmb:"0",
  amr:"0",
  kcal:0,
  bonFac:"",
  mobileFac:"",
  dateFac:"",
  qte:"",
  prix:"",
  descFac:"",
  qte2:"",
  prix2:"",
  descFac2:"",
  tva:"",
  remarque:"",
  remarqueDate:"",
  interdit:"",

  
});

setIsVisible(false)
  }
  const addplanning =()=>{
const newPlanning = doc(db, "planning", uid2);
 updateDoc(newPlanning, {
  lundi:lundi,
  mardi:mardi,
  mercredi:mercredi,
  jeudi:jeudi,
  vendredi:vendredi,
  samedi:samedi,
  dimench:dimanche,
  lundiT:lundiT,
  mardiT:mardiT,
  mercrediT:mercrediT,
  jeudiT:jeudiT,
  samediT:samediT,
  dimenchT:dimancheT,
  vendrediT:vendrediT,

});
setIsVisible2(false)
  }
  
  const addResume=()=>{
    const docRef = doc(db, "coach" , uid2);
    if (resume.length > 2) {
      updateDoc(docRef, {
        resume: resume,
        
      }); 
    }
    if (resume2.length > 2) {
      updateDoc(docRef, {
        resumePhone: resume2,
      }); 
    }
    if (resume3.length > 2) {
      updateDoc(docRef, {
        resumeExp: resume3
      }); 
    }
    setIsVisible4(false)
  }
  const handleDelete=()=>{
    
    Alert.alert("Delete account",`Delete ${coach} account `,[
      {text:"No", onPress:()=> console.log("no")},
      {text:"yes", onPress: ()=> {
       
          const auth = getAuth();
          const user = auth.currentUser; 
          const storage = getStorage();
          const desertRef = ref(storage, `image${uid2}.jpg`);
            deleteUser(user).then(()=>{
              deleteDoc(doc(db, "coach", uid2));
              deleteDoc(doc(db, "planning", uid2));
              deleteObject(desertRef)
                navigation.navigate('Home')
           }).catch((error) => {
        // An error ocurred
        console.log(error)
      });
        
      }} 
      
    ])
  }
  const updateCoach=async()=>{
    const docRef2 = doc(db, "coach" , uid || uid2);
    updateDoc(docRef2,{
  clientsNum: client.length, 
})
  }
  useEffect(()=>{
    updateCoach()
  },[isVisible4])
  useEffect(()=>{
    const docRef2 = doc(db, "coach" , uid || uid2);
    updateDoc(docRef2,{
  clientsNum: client.length, 
})
  },[isVisible])
  useEffect(()=>{
    const docRef2 = doc(db, "coach" , uid || uid2);
    updateDoc(docRef2,{
  clientsNum: client.length, 
})
  },[])
  useEffect(()=>{
    const docRef2 = doc(db, "coach" , uid || uid2);
    updateDoc(docRef2,{
  clientsNum: client.length, 
})
  },[client,client.length])
  
  return (
    <View style={styles.container}>
            <View style={styles.row1}><TouchableOpacity><Text style={styles.row1Text}>{coach}</Text></TouchableOpacity><View style={styles.row1But3}><Image style={{width:46,height:40,borderRadius:5}} source={{uri:coachImage}}/></View></View>

        <View style={styles.row1}><TouchableOpacity><Text style={styles.row1Text}>Profile</Text></TouchableOpacity><TouchableOpacity onPress={()=> setIsVisible4(true)} style={styles.row1But2}><Ionicons name="newspaper" size={24} color="#ff5d00" /></TouchableOpacity></View>

    <View style={styles.row1}><TouchableOpacity><Text style={styles.row1Text}>Nouveau client</Text></TouchableOpacity><TouchableOpacity onPress={()=> setIsVisible(true)} style={styles.row1But2}><FontAwesome name="user-plus" size={23} color="#ff5d00" /></TouchableOpacity></View>
    <View style={styles.row1}><Text style={styles.row1Text}>Clients ({client.length})</Text></View>
    <ScrollView style={{backgroundColor:"#ccc",marginBottom:50}}>
    {client.map((user)=> {return(
      <TouchableOpacity onPress={()=> navigation.navigate('Details',{name:user.name,code:user.code,weight2:user.weight,coach2:user.coach,img:user.img,uid2:uid2,uid:uid,cleintNum:cleintNum})} style={styles.clients}> 
        <Text>{user.name}</Text> 
        <Text>{user.age} years old</Text>
      </TouchableOpacity>
    )})} 
    </ScrollView>
    <Modal animationType="fade" visible={isVisible} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
    <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <ScrollView>
     <View style={styles.modal}>
     <Text style={styles.introModal}>Nouveau client</Text>
     <TextInput onChangeText={(e)=> setName(e)} style={styles.input} placeholder='Nom'/>
     <TextInput onChangeText={(e)=> setCode(e)} style={styles.input} placeholder='Code ID'/>
     <TextInput onChangeText={(e)=> setAge(e)} style={styles.input} placeholder='Age'/>
     <TextInput onChangeText={(e)=> setGander(e)} style={styles.input} placeholder='Gander'/>
     <TouchableOpacity onPress={add} style={styles.login}><Text style={styles.loginText}>Ajouter</Text></TouchableOpacity>
     </View>
     </ScrollView>
     </Modal>
     <Modal animationType="fade" visible={isVisible2} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
     <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible2(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <ScrollView style={{width:"100%"}}>
     <View style={styles.modal}>
     <Text style={styles.introModal}>Planning</Text> 
     <View style={{flexDirection:"row",}}><TextInput onChangeText={(e)=> setLundi(e)} style={styles.input} placeholder='Lundi'/><TextInput onChangeText={(e)=> setLundiT(e)} style={styles.input2}/></View>
     <View style={{flexDirection:"row",}}><TextInput onChangeText={(e)=> setMardi(e)} style={styles.input} placeholder='mardi'/><TextInput onChangeText={(e)=> setMardiT(e)} style={styles.input2}/></View>
     <View style={{flexDirection:"row",}}><TextInput onChangeText={(e)=> setMercredi(e)} style={styles.input} placeholder='mercredi'/><TextInput onChangeText={(e)=> setMercrediT(e)} style={styles.input2}/></View>
     <View style={{flexDirection:"row",}}><TextInput onChangeText={(e)=> setJeudi(e)} style={styles.input} placeholder='jeudi'/><TextInput onChangeText={(e)=> setJeudiT(e)} style={styles.input2}/></View>
     <View style={{flexDirection:"row",}}><TextInput onChangeText={(e)=> setVendredi(e)} style={styles.input} placeholder='vendredi'/><TextInput onChangeText={(e)=> setVendrediT(e)} style={styles.input2}/></View>
     <View style={{flexDirection:"row",}}><TextInput onChangeText={(e)=> setSamedi(e)} style={styles.input} placeholder='samedi'/><TextInput onChangeText={(e)=> setSamediT(e)} style={styles.input2}/></View>
     <View style={{flexDirection:"row",}}><TextInput onChangeText={(e)=> setDimanche(e)} style={styles.input} placeholder='dimanche'/><TextInput onChangeText={(e)=> setDimancheT(e)} style={styles.input2}/></View>
     <TouchableOpacity  style={styles.login}><Text style={styles.loginText}>Add planning</Text></TouchableOpacity>
     </View>
     </ScrollView>
     </Modal>
     <Modal animationType="fade" visible={isVisible4} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
     <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible4(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <ScrollView style={{width:"100%"}}>
     <View style={styles.modal}>
     <Text style={styles.introModal}>PROFILE</Text> 
     <TouchableOpacity onPress={pickImage} style={{backgroundColor:"green",padding:10,marginBottom:10,paddingLeft:15,paddingRight:15,borderRadius:3}}>{!imgSelected?<Text style={{color:"white"}}>Image de profile</Text>:<View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color:"white"}}>Image de profile</Text><AntDesign style={{marginLeft:5}} name="checkcircleo" size={24} color="white" /></View>}</TouchableOpacity>
     <TextInput onChangeText={(e)=>setResume2(e)} multiline={true} style={styles.input} style={{borderColor:'red',borderWidth:1,width:"70%",padding:10,marginBottom:15}} placeholder='Telephone'/>
     <TextInput onChangeText={(e)=>setResume(e)} multiline={true} style={styles.input} style={{borderColor:'red',borderWidth:1,width:"70%",padding:10,marginBottom:15}} placeholder='coach resume'/>
     <TextInput onChangeText={(e)=>setResume3(e)} multiline={true} style={styles.input} style={{borderColor:'red',borderWidth:1,width:"70%",padding:10,marginBottom:15}} placeholder='Experience'/>

     <TouchableOpacity onPress={addResume} style={styles.login}><Text style={styles.loginText}>Enregistrer</Text></TouchableOpacity>
     </View>
     </ScrollView>
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
    backgroundColor:"#f13a11",
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
    marginTop:0,
    marginBottom:40,
    fontWeight:'bold',
    fontSize:30,
  
  },
  input:{
    borderWidth:1, 
    borderColor:'#f13a11',
    borderRadius:10,
    width:"70%",
    height:50,
    paddingLeft:10,
    margin:10,
    marginBottom:15
  },
  input2:{
    borderWidth:1, 
    borderColor:'#f13a11',
    borderRadius:10,
    width:"20%",
    height:50,
    paddingLeft:10,
    margin:10,
  },
  login:{
    backgroundColor:"#f13a11",
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
row1But2:{
  backgroundColor:"white",
  padding:6,
  paddingLeft:10,
  paddingRight:10,
  borderRadius:5,
  borderWidth:1,
  borderColor:"#f13a11",
  width:50,
  alignItems:"center"
  
},
row1But3:{
  backgroundColor:"white",
  padding:0,
  paddingLeft:0,
  paddingRight:0,
  borderRadius:5,
  borderWidth:1,
  borderColor:"#f13a11",
  alignItems:"center"
  
},
});
export default Coach