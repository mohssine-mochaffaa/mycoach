import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity, Modal, Pressable,TextInput,ScrollView,Platform,Image,Alert, RefreshControl, ImageBackground } from 'react-native';
import { useEffect,useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { Dimensions} from 'react-native'
import * as ImagePicker from "expo-image-picker";
import { updateDoc,deleteDoc } from "firebase/firestore"; 
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import db from '../firebase';
import {getStorage} from "firebase/storage";
import {ref,uploadBytes , getDownloadURL} from "firebase/storage";

 const Client =({route})=> {
  const {uid,code} = route.params;
  const[image,setImage] = useState('')
  const[image2,setImage2] = useState('')
  const[image3,setImage3] = useState('')
  const[image4,setImage4] = useState('')
  const[image5,setImage5] = useState('')
  const[imagee2,setImagee2] = useState('')
  const[imagee3,setImagee3] = useState('')
  const[imagee4,setImagee4] = useState('')
  const[imagee5,setImagee5] = useState('')
  const [nom,setNom] = useState('')
  const [phone,setPhone] = useState('')
  const [city,setCity] = useState('')
  const [email,setEmail] = useState('')
  const [phone2,setPhone2] = useState('')
  const [city2,setCity2] = useState('')
  const [email2,setEmail2] = useState('')
  const [resume,setResume] = useState('')
  const [isVisible,setIsVisible] = useState(false)
  const [isVisible5,setIsVisible5] = useState(false)
  const [isVisible6,setIsVisible6] = useState(false)
  const [isVisible10,setIsVisible10] = useState(false)
  const [isVisible11,setIsVisible11] = useState(false)
  const [isVisible12,setIsVisible12] = useState(false)
  const [isVisible13,setIsVisible13] = useState(false)

  const [refreshing,setRefreshing] = useState(false)
  const [num, setNum] = useState(0)
  const [service,setService] = useState(null);
  const [service2,setService2] = useState("");
  const [color1,setColor1] = useState("white")
  const [color2,setColor2] = useState("white")
  const [color3,setColor3] = useState("white")
  const [color4,setColor4] = useState("black")
  const [color5,setColor5] = useState("black")
  const [color6,setColor6] = useState("black")
  const [reclame,setReclame] = useState("")
  const [fatique,setFatique] = useState("");
  const [souplesse,setSouplesse] = useState("");
  const [pomps,setPomps] = useState("");
  const [abdos,setAbdos] = useState("");
  const [ruffier,setRuffier] = useState("");
  const [coachImage,setCoachImage] = useState("");
  const [coach,setCoach] = useState("")
  const [nutrition,setNutrition] = useState("");
  const [nutrition2,setNutrition2] = useState("");
  const [nutrition3,setNutrition3] = useState("");
  const [nutrition4,setNutrition4] = useState(null);
  const [nutrition5,setNutrition5] = useState("");
  const [nutrition6,setNutrition6] = useState("");
  const [nutrition7,setNutrition7] = useState("");
  const [form,setForm] = useState('');
  const [formDate,setFormDate] = useState('');
  const [isLoading,setIsLoading] = useState(true);
  const [imgSelected,setImgSelected] = useState(false)



   const [planning2,setPlanning2] = useState([]);
  useEffect(async()=>{
  const docRef = doc(db, "clients", code);
  const docSnap = await getDoc(docRef);

if (docSnap) {
  const data = docSnap.data();
  setPlanning2(data)
} else {
  // doc.data() will be undefined in this case 
  console.log("No such document!");
}
},[]);
useEffect(async ()=>{
  if (Platform.OS !== 'web') {
    const {status} = await ImagePicker.requestMediaLibraryPermissionAsync();
    if(status !== 'granted'){
      console.log("no permission")
    }
  }
},[])
const PickImage = async ()=>{
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing:false, 
    aspect:[4,3],
    quality:1
  })
  if(!result.cancelled){
    setImgSelected(true) ;
    const storage = getStorage();
    const imageRef = ref(storage, `${nom}.jpg`)
    const imeg = await fetch(result.uri);
    const bytes = await imeg.blob();
    await uploadBytes(imageRef, bytes).then(()=> { getDownloadURL(imageRef).then((url)=> {
      const docRef = doc(db, "clients" , code);
      updateDoc(docRef, {
          img:url,
        }); 
    } 
    );})
    
   
  }
}
useEffect(async()=>{
  const docRef = doc(db, "coach", uid);
  const docSnap = await getDoc(docRef);

if (docSnap) {
  const data = docSnap.data(); 
  setResume(data.resume)
  setCoachImage(data.img)
  setCoach(data.name)
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
},[])
useEffect(async()=>{
  const docRef = doc(db, "clients", code);
  const docSnap = await getDoc(docRef);

if (docSnap) {
  const data = docSnap.data();
  setImage(data.img)
  setImage2(data.img1)
  setImage3(data.img2)
  setImage4(data.img3)
  setImage5(data.img4)

  setNom(data.name)
  setPhone(data.phone)
  setEmail(data.email)
  setCity(data.city)
  setService2(data.serv)

  setAbdos(data.abdos)
  setPomps(data.pompes)
  setSouplesse(data.souplesse)
  setFatique(data.fatique)
  setRuffier(data.ruffier)
  setNutrition(data.nutrition)
  setNutrition2(data.nutrition2)
  setNutrition3(data.nutrition3)
    setNutrition4(data.nutrition4)
  setNutrition5(data.nutrition5)
  setNutrition6(data.nutrition6)
  setNutrition7(data.nutrition7)
  setImage(data.img)
  setImage2(data.img1)
  setImage3(data.img2)
  setImage4(data.img3)
  setImage5(data.img4)
  setImagee2(data.img5)
  setImagee3(data.img6)
  setImagee4(data.img7)
  setImagee5(data.img8)
  setForm(data.form);
  setFormDate(data.formDate); 


  
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
setIsLoading(false)
},[])
useEffect(async()=>{
  const docRef = doc(db, "clients", code);
  const docSnap = await getDoc(docRef);

if (docSnap) {
  const data = docSnap.data();
  setImage(data.img)
  setImage2(data.img1)
  setImage3(data.img2)
  setImage4(data.img3)
  setImage5(data.img4)
  setImagee2(data.img5)
  setImagee3(data.img6)
  setImagee4(data.img7)
  setImagee5(data.img8)
  setNom(data.name)
  setPhone(data.phone)
  setEmail(data.email)
  setCity(data.city)
  setService2(data.serv)
  setAbdos(data.abdos)
  setPomps(data.pompes)
  setSouplesse(data.souplesse)
  setFatique(data.fatique)
  setRuffier(data.ruffier)
  setNutrition(data.nutrition)
  setNutrition2(data.nutrition2)
  setNutrition3(data.nutrition3)
  setNutrition4(data.nutrition4)
  setNutrition5(data.nutrition5)
  setNutrition6(data.nutrition6)
  setNutrition7(data.nutrition7)
  setForm(data.form);
  setFormDate(data.formDate);

} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
},[isVisible])



const done=()=>{
  const docRef = doc(db, "clients" , code);
  updateDoc(docRef, {
      phone:phone2 || phone,
      email:email2 || email,
      city:city2 || city,
      serv:service || service2,
      rec:reclame || "",
    }); 
    setIsVisible(false)
}
const  refreshed  = async () => {
  setRefreshing(true)
  const docRef = doc(db, "clients", code);
  const docSnap = await getDoc(docRef);

if (docSnap) {
  const data  = docSnap.data();
  setImage(data.img)
  setNom(data.name)
  setPhone(data.phone)
  setEmail(data.email)
  setCity(data.city)
  setAbdos(data.abdos)
  setPomps(data.pompes)
  setSouplesse(data.souplesse)
  setFatique(data.fatique)
  setRuffier(data.ruffier)
  setNutrition(data.nutrition)
  setNutrition2(data.nutrition2)
  setNutrition3(data.nutrition3)
  setNutrition4(data.nutrition4)
  setNutrition5(data.nutrition5)
  setNutrition6(data.nutrition6)
  setNutrition7(data.nutrition7)
  setImage(data.img)
  setImage2(data.img1)
  setImage3(data.img2)
  setImage4(data.img3)
  setImage5(data.img4)
  setImagee2(data.img5)
  setImagee3(data.img6)
  setImagee4(data.img7)
  setImagee5(data.img8)
  setForm(data.form);
  setFormDate(data.formDate);

   
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
await setRefreshing(false)
}
    
const reclamer=()=>{
  done();
  setIsVisible6(false)
}
  

  return (
    <View style={styles.container}>
    
    <ScrollView refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={refreshed}/>}>
    <View style={{borderBottomWidth:1,borderLeftWidth:1,borderRightWidth:1,borderColor:"#dedede",backgroundColor:"white",paddingBottom:15,width:Dimensions.get('window').width,borderRadius:22}}>
    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:Dimensions.get('window').width,backgroundColor:"white"}}>
      <Text style={{fontSize:18,margin:5,marginLeft:12,fontWeight:"bold"}}>{nom}</Text>
      <View style={{flexDirection:"row",alignItems:"center"}}>
      <TouchableOpacity style={{backgroundColor:"#f13a11",padding:6,borderRadius:5}} onPress={()=> setIsVisible(true)}><Text style={{color:"white"}}>EDIT PROFILE</Text></TouchableOpacity> 
     <Pressable onPress={()=> setIsVisible5(true)}>{image?<Image source={{uri:image}} style={{width:55,height:55,borderRadius:50,margin:5}}/>:<View style={{margin:10}}><SimpleLineIcons name="user" size={30} color="black" /></View>}</Pressable>
      </View> 
    </View>
    <View  style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:Dimensions.get('window').width,backgroundColor:"white"}}>
    <View style={{margin:5,marginLeft:15}}><Feather name="phone" size={24} color="#f13a11" /></View><Text style={{fontSize:17,margin:5,fontWeight:"",marginRight:12,color:"#6e6e6e"}}>{phone}</Text>
    </View>

    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:Dimensions.get('window').width,backgroundColor:"white"}}>
   <View style={{margin:5,marginLeft:15}}><MaterialIcons name="email" size={25} color="#f13a11" /></View><Text style={{fontSize:18,margin:5,fontWeight:"",marginRight:12,color:"#6e6e6e"}}>{email}</Text>
    </View>
    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:Dimensions.get('window').width,backgroundColor:"white"}}>
   <View style={{margin:5,marginLeft:15}}><MaterialCommunityIcons name="city-variant" size={26} color="#f13a11" /></View><Text style={{fontSize:18,margin:5,fontWeight:"",marginRight:12,color:"#6e6e6e"}}>{city}</Text>
    </View>
    </View> 


    <View style={{marginTop:0,borderBottomWidth:1,borderLeftWidth:1,borderRightWidth:1,borderColor:"#dedede",backgroundColor:"#f13a11",paddingBottom:5,width:Dimensions.get('window').width - 8,borderRadius:30, alignSelf:"center",alignItems:"center",marginTop:-5,padding:5}}>
    <Text style={{padding:5,fontSize:16,color:"white",fontWeight:"700"}}>{service2}</Text> 
    </View>

    <View style={{marginTop:30}}><Text style={{padding:12,backgroundColor:"#f13a11",color:"white",fontSize:19,fontWeight:"bold",borderRadius:5,justifyContent:"center",alignItems:"center",alignSelf:"center",}}>Votre coach</Text></View>

    <View style={styles.coach}>
    {coachImage.length > 5?<Image source={{uri:coachImage}} style={{width:"100%",height:250,borderRadius:0,margin:0,alignSelf:"center",marginBottom:5,borderWidth:2,borderColor:"#f13a11",resizeMode:"center"}}/>:<View></View>}
     <Text style={{fontSize:21,marginBottom:10,fontWeight:"bold",color:"white",marginLeft:5,marginTop:5}}>{coach}</Text>
     {resume.length > 4 ?<Text style={{fontSize:16,marginBottom:10,color:"white",marginLeft:10}}>{resume}</Text> : <View></View>} 
     </View>


    <Modal animationType="fade" visible={isVisible} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
    <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <ScrollView style={{width:"100%"}}>
     <View style={styles.modal}>
     <Text style={styles.introModal}>Edit profile</Text> 
     <View style={{backgroundColor:"#d4d4d4",alignItems:"center",marginTop:-5,borderRadius:10,padding:10,width:"95%"}}>
     <TextInput onChangeText={(e)=> setPhone2(e)} style={styles.input} placeholder='Phone'/>
     <TextInput onChangeText={(e)=> setEmail2(e)} style={styles.input} placeholder='Email'/>
     <TextInput onChangeText={(e)=> setCity2(e)} style={styles.input} placeholder='City'/>
     </View>
     <View style={{backgroundColor:"#d4d4d4",alignItems:"center",marginTop:10,borderRadius:10,padding:10,width:"95%"}}>
     <Text style={{fontWeight:"700",fontSize:15}}>Services</Text>
       <TouchableOpacity onPress={()=> setService("Coaching personnel a domicile et a exterieur") || setColor1("#ff5d00") || setColor2("white") || setColor3("white") || setColor4("white") || setColor5("black") || setColor6("black")} style={{backgroundColor:color1,marginTop:10,borderRadius:15,padding:7}}><Text style={{color:color4}}>Coaching personnel a domicile et a exterieur</Text></TouchableOpacity>
       <TouchableOpacity onPress={()=> setService("Cours collectifs de sports au plein air") || setColor2("#ff5d00") || setColor1("white") || setColor3("white") || setColor5("white") || setColor4("black") || setColor6("black")} style={{backgroundColor:color2,marginTop:10,borderRadius:15,padding:7}}><Text style={{color:color5}}>Cours collectifs de sports au plein air</Text></TouchableOpacity>
       <TouchableOpacity onPress={()=> setService("Coaching personnel de natation") || setColor3("#ff5d00") || setColor1("white") || setColor2("white") || setColor6("white") || setColor5("black") || setColor4("black")} style={{backgroundColor:color3,marginTop:10,borderRadius:15,padding:7}}><Text style={{color:color6}}>Coaching personnel de natation</Text></TouchableOpacity>
     </View>
     <TouchableOpacity style={{backgroundColor:"green",padding:10,borderRadius:5,marginTop:10}} onPress={PickImage}>{!imgSelected?<Text style={{color:"white"}}>Profile image</Text>:<View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color:"white"}}>Profile Image</Text><AntDesign style={{marginLeft:5}} name="checkcircleo" size={24} color="white" /></View>}</TouchableOpacity>  
     <TouchableOpacity onPress={done} style={styles.login}><Text style={styles.loginText}>ADD</Text></TouchableOpacity>
     </View>
     </ScrollView>
     </Modal>
     
     <Modal animationType="fade" visible={isVisible5} transparent={true} style={{justifyContent:"center",alignItems:"center",alignSelf:"center",alignContent:"center"}}>
     <Pressable style={{backgroundColor:"#7878788b",height:"100%"}} onPress={()=> setIsVisible5(false)}>
     <View style={{backgroundColor:"transparent",alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop:"50%"}}>
     <Image source={{uri:image}} style={{width:290,height:290,borderRadius:0,margin:5}}/>
     </View>
     </Pressable>
     </Modal>

     <Modal animationType="fade" visible={isVisible10} transparent={true} style={{justifyContent:"center",alignItems:"center",alignSelf:"center",alignContent:"center"}}>
     <Pressable style={{backgroundColor:"#7878788b",height:"100%"}} onPress={()=> setIsVisible10(false)}>
     <View style={{backgroundColor:"transparent",alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop:"50%"}}>
     <Image source={{uri:image2}} style={{width:290,height:290,borderRadius:0,margin:5}}/>
     </View>
     </Pressable>
     </Modal>

     <Modal animationType="fade" visible={isVisible11} transparent={true} style={{justifyContent:"center",alignItems:"center",alignSelf:"center",alignContent:"center"}}>
     <Pressable style={{backgroundColor:"#7878788b",height:"100%"}} onPress={()=> setIsVisible11(false)}>
     <View style={{backgroundColor:"transparent",alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop:"50%"}}>
     <Image source={{uri:image3}} style={{width:290,height:290,borderRadius:0,margin:5}}/>
     </View>
     </Pressable>
     </Modal>

     <Modal animationType="fade" visible={isVisible12} transparent={true} style={{justifyContent:"center",alignItems:"center",alignSelf:"center",alignContent:"center"}}>
     <Pressable style={{backgroundColor:"#7878788b",height:"100%"}} onPress={()=> setIsVisible12(false)}>
     <View style={{backgroundColor:"transparent",alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop:"50%"}}>
     <Image source={{uri:image4}} style={{width:290,height:290,borderRadius:0,margin:5}}/>
     </View>
     </Pressable>
     </Modal>

     <Modal animationType="fade" visible={isVisible13} transparent={true} style={{justifyContent:"center",alignItems:"center",alignSelf:"center",alignContent:"center"}}>
     <Pressable style={{backgroundColor:"#7878788b",height:"100%"}} onPress={()=> setIsVisible13(false)}>
     <View style={{backgroundColor:"transparent",alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop:"50%"}}>
     <Image source={{uri:image5}} style={{width:290,height:290,borderRadius:0,margin:5}}/>
     </View>
     </Pressable>
     </Modal>

     <Modal animationType="slide" visible={isLoading} transparent={false} style={{justifyContent:"center",alignItems:"center",alignSelf:"center",alignContent:"center"}}>
     <View style={{backgroundColor:"White",height:"100%"}}>
     <View style={{backgroundColor:"transparent",alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop:"50%"}}>
     <Text style={{justifyContent:"center",alignItems:"center",fontSize:35,fontWeight:"700"}}>Loading</Text>
     </View>
     </View>
     </Modal>
  
     <Modal animationType="fade" visible={isVisible6} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
     <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible6(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <View style={{backgroundColor:"white",justifyContent:"center",alignItems:"center",flex:1}}>
       <Text style={{fontWeight:"bold",fontSize:20,marginBottom:10}}>Reclamer pour l'administration</Text>
       <TextInput onChangeText={(e)=>setReclame(e)} style={styles.input} multiline={true}/>
       <TouchableOpacity onPress={reclamer} style={{backgroundColor:"#f13a11",padding:8,alignSelf:"center",width:"70%",alignItems:"center",borderRadius:5}}><Text style={{color:"white"}}>Send</Text></TouchableOpacity>
     </View>
     </Modal>
     <View style={{backgroundColor:"#f13a11",marginTop:15,borderWidth:1,borderColor:"white",borderTopRightRadius:12,borderTopLeftRadius:12}}>
     <Text style={{fontSize:21,margin:10,fontWeight:"bold",color:"white",marginTop:15,marginBottom:15,alignSelf:"center"}}>DIAGNOSTIQUE</Text>
     <View>
     <View style={{flexDirection:"row",justifyContent:"space-around",marginBottom:0,width:Dimensions.get('window').width,borderWidth:3,borderColor:"black",borderBottomWidth:2,backgroundColor:"#d4d4d4"}}>
     <Pressable onPress={()=> setIsVisible10(true)}>{image2?<Image source={{uri:image2}} style={{width:Dimensions.get('window').width / 2,height:250,borderRadius:0,margin:0}}/>:<View ></View>}</Pressable>
     <Pressable onPress={()=> setIsVisible11(true)}>{image3?<Image source={{uri:image3}} style={{width:Dimensions.get('window').width / 2,height:250,borderRadius:0,margin:0}}/>:<View ></View>}</Pressable>
     </View> 
     <View style={{flexDirection:"row",justifyContent:"space-around",borderWidth:3,borderColor:"black",borderTopWidth:1,backgroundColor:"#d4d4d4"}}>
     <Pressable onPress={()=> setIsVisible12(true)}>{image4?<Image source={{uri:image4}} style={{width:Dimensions.get('window').width / 2,height:250,borderRadius:0,margin:0}}/>:<View></View>}</Pressable>
     <Pressable onPress={()=> setIsVisible13(true)}>{image5?<Image source={{uri:image5}} style={{width:Dimensions.get('window').width / 2,height:250,borderRadius:0,margin:0}}/>:<View ></View>}</Pressable>
     </View>
     </View>
     <Text style={{fontSize:21,margin:10,fontWeight:"bold",color:"white",marginTop:15,marginBottom:15}}>LES TESTS DIAGNOSTIQUE:</Text>
     <Text style={{fontSize:18,margin:5,fontWeight:"bold",color:"white",marginTop:5,marginBottom:5}}>Votre test de la fatique:</Text>
     <Text style={{marginLeft:15,marginRight:15,fontWeight:"bold",color:"#d6d6d6"}}>{fatique}</Text> 
     <Text style={{fontSize:18,margin:5,fontWeight:"bold",color:"white",marginTop:5,marginBottom:5}}>Votre test de la souplesse:</Text>
     <Text style={{marginLeft:15,marginRight:15,fontWeight:"bold",color:"#d6d6d6"}}>{souplesse}</Text>
     <Text style={{fontSize:18,margin:5,fontWeight:"bold",color:"white",marginTop:5,marginBottom:5}}>Votre test des pompes:</Text>
     <Text style={{marginLeft:15,marginRight:15,fontWeight:"bold",color:"#d6d6d6"}}>{pomps}</Text>
     <Text style={{fontSize:18,margin:5,fontWeight:"bold",color:"white",marginTop:5,marginBottom:5}}>Votre test des abdos:</Text>
     <Text style={{marginLeft:15,marginRight:15,fontWeight:"bold",color:"#d6d6d6"}}>{abdos}</Text>
     <Text style={{fontSize:18,margin:5,fontWeight:"bold",color:"white",marginTop:5,marginBottom:5}}>Votre test ruffier dickson:</Text>
     <Text style={{marginLeft:15,marginRight:15,fontWeight:"bold",color:"#d6d6d6"}}>{ruffier}</Text>
     </View>
      <View>
      <View style={{marginTop:30}}><Text style={{padding:12,backgroundColor:"#f13a11",color:"white",fontSize:19,fontWeight:"bold",borderRadius:5,justifyContent:"center",alignItems:"center",alignSelf:"center",marginBottom:15}}>Votre planning</Text></View> 
    <View style={{width:Dimensions.get('window').width,backgroundColor:"white",borderWidth:2,borderColor:"#f13a11",borderTopLeftRadius:15,borderTopRightRadius:15,paddingBottom:20,marginBottom:10}}>
     
      <View style={{alignItems:"center",width:"100%"}}><Text style={{fontSize:19,fontWeight:"700",padding:5}}>Lundi</Text></View>
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.lundi?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.lundi}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.lundiT?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.lundiT}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
     </View>


     <View style={{alignItems:"center",width:"100%"}}><Text style={{fontSize:19,fontWeight:"700",padding:5,}}>Mardi</Text></View>
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.mardi?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.mardi}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.mardiT?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.mardiT}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
     </View> 

     <View style={{alignItems:"center",width:"100%"}}><Text style={{fontSize:19,fontWeight:"700",padding:5}}>Mercredi</Text></View>
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.mercredi?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.mercredi}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.mercrediT?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.mercrediT}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
     </View>

     <View style={{alignItems:"center",width:"100%"}}><Text style={{fontSize:19,fontWeight:"700",padding:5}}>Jeudi</Text></View>
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.jeudi?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.jeudi}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.jeudiT?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.jeudiT}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
     </View>

     <View style={{alignItems:"center",width:"100%"}}><Text style={{fontSize:19,fontWeight:"700",padding:5}}>Vendredi</Text></View>
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.vendredi?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.vendredi}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.vendrediT?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.vendrediT}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
     </View>

     <View style={{alignItems:"center",width:"100%"}}><Text style={{fontSize:19,fontWeight:"700",padding:5}}>Samedi</Text></View>
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.samedi?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.samedi}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.samediT?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.samediT}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
     </View>

     <View style={{alignItems:"center",width:"100%"}}><Text style={{fontSize:19,fontWeight:"700",padding:5}}>Dimanche</Text></View>
      <View style={{flexDirection:"row",justifyContent:"space-around"}}>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.dimenche?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.dimenche}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
      <View style={{backgroundColor:"#f13a11",width:"46%",alignItems:"center",justifyContent:"center",borderRadius:5,paddingBottom:3,paddingTop:3}}>{planning2.dimencheT?<Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>{planning2.dimencheT}</Text>: <Text style={{padding:5,fontSize:17,fontWeight:"700",color:"white",paddingBottom:12,paddingTop:12}}>-</Text>}</View>
     </View>
    </View> 

    <View style={{marginTop:30}}><Text style={{padding:12,backgroundColor:"#f13a11",color:"white",fontSize:19,fontWeight:"bold",borderRadius:5,justifyContent:"center",alignItems:"center",alignSelf:"center",}}>Votre programme de Nutrition</Text></View>
    {nutrition? <View style={{backgroundColor:"#f13a11",width:"90%",justifyContent:"center",alignSelf:'center',marginTop:10,marginBottom:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
    <Text style={{color:"white",fontSize:19,fontWeight:"700",margin:10,marginBottom:0}}>Repas 1:</Text>
    <Text style={{color:"white",fontSize:16,fontWeight:"700",margin:10}}>{nutrition}</Text>
    </View> : <View></View>}
    {nutrition2? <View style={{backgroundColor:"#f13a11",width:"90%",justifyContent:"center",alignSelf:'center',marginTop:10,marginBottom:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
    <Text style={{color:"white",fontSize:19,fontWeight:"700",margin:10,marginBottom:0}}>Repas 2:</Text>
    <Text style={{color:"white",fontSize:16,fontWeight:"700",margin:10}}>{nutrition2}</Text>
    </View> : <View></View>}
    {nutrition3? <View style={{backgroundColor:"#f13a11",width:"90%",justifyContent:"center",alignSelf:'center',marginTop:10,marginBottom:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
    <Text style={{color:"white",fontSize:19,fontWeight:"700",margin:10,marginBottom:0}}>Repas 3:</Text>
    <Text style={{color:"white",fontSize:16,fontWeight:"700",margin:10}}>{nutrition3}</Text>
    </View> : <View></View>}
    {nutrition4? <View style={{backgroundColor:"#f13a11",width:"90%",justifyContent:"center",alignSelf:'center',marginTop:10,marginBottom:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
    <Text style={{color:"white",fontSize:19,fontWeight:"700",margin:10,marginBottom:0}}>Repas 4:</Text>
    <Text style={{color:"white",fontSize:16,fontWeight:"700",margin:10}}>{nutrition4}</Text>
    </View> : <View></View>}
    {nutrition5? <View style={{backgroundColor:"#f13a11",width:"90%",justifyContent:"center",alignSelf:'center',marginTop:10,marginBottom:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
    <Text style={{color:"white",fontSize:19,fontWeight:"700",margin:10,marginBottom:0}}>Repas 5:</Text>
    <Text style={{color:"white",fontSize:16,fontWeight:"700",margin:10}}>{nutrition5}</Text>
    </View> : <View></View>}
    {nutrition6? <View style={{backgroundColor:"#f13a11",width:"90%",justifyContent:"center",alignSelf:'center',marginTop:10,marginBottom:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
    <Text style={{color:"white",fontSize:19,fontWeight:"700",margin:10,marginBottom:0}}>Repas 6:</Text>
    <Text style={{color:"white",fontSize:16,fontWeight:"700",margin:10}}>{nutrition6}</Text>
    </View> : <View></View>}
    {nutrition7? <View style={{backgroundColor:"#f13a11",width:"90%",justifyContent:"center",alignSelf:'center',marginTop:10,marginBottom:10,borderTopRightRadius:10,borderTopLeftRadius:10}}>
    <Text style={{color:"white",fontSize:19,fontWeight:"700",margin:10,marginBottom:0}}>Repas 7:</Text>
    <Text style={{color:"white",fontSize:16,fontWeight:"700",margin:10}}>{nutrition7}</Text>
    </View> : <View></View>}
    </View>
    <View style={{marginTop:30}}><Text style={{padding:12,backgroundColor:"#f13a11",color:"white",fontSize:19,fontWeight:"bold",borderRadius:5,justifyContent:"center",alignItems:"center",alignSelf:"center",}}>Votre test formative</Text></View>
    <View style={{marginTop:10}}>{formDate?<Text style={{padding:12,backgroundColor:"#f13a11",color:"white",fontSize:19,fontWeight:"bold",borderRadius:5,justifyContent:"center",alignItems:"center",alignSelf:"center",}}>{formDate}</Text>:<Text style={{padding:12,backgroundColor:"#f13a11",color:"white",fontSize:19,fontWeight:"bold",borderRadius:5,justifyContent:"center",alignItems:"center",alignSelf:"center",}}>---</Text>}</View>


    <View style={{backgroundColor:"#f13a11",marginTop:15,borderWidth:1,borderColor:"white",borderTopRightRadius:12,borderTopLeftRadius:12}}>
    <Text style={{fontSize:21,margin:10,fontWeight:"bold",color:"white",marginTop:15,marginBottom:0}}>Informations:</Text>
     <Text style={{fontSize:17,margin:12,fontWeight:"bold",color:"white",marginTop:15,marginBottom:15}}>{form}</Text>
     
     <Text style={{fontSize:21,margin:10,fontWeight:"bold",color:"white",marginTop:15,marginBottom:15}}>IMAGES</Text>
    
     <View>
     <View style={{flexDirection:"row",justifyContent:"space-around",marginBottom:0,width:Dimensions.get('window').width,borderWidth:3,borderColor:"black",borderBottomWidth:2,backgroundColor:"#d4d4d4"}}>
     <Pressable>{imagee2?<Image source={{uri:imagee2}} style={{width:Dimensions.get('window').width / 2,height:250,borderRadius:0,margin:0}}/>:<View ></View>}</Pressable>
     <Pressable>{imagee3?<Image source={{uri:imagee3}} style={{width:Dimensions.get('window').width / 2,height:250,borderRadius:0,margin:0}}/>:<View ></View>}</Pressable>
     </View> 
     <View style={{flexDirection:"row",justifyContent:"space-around",borderWidth:3,borderColor:"black",borderTopWidth:1,backgroundColor:"#d4d4d4"}}>
     <Pressable>{imagee4?<Image source={{uri:imagee4}} style={{width:Dimensions.get('window').width / 2,height:250,borderRadius:0,margin:0}}/>:<View></View>}</Pressable>
     <Pressable>{imagee5?<Image source={{uri:imagee5}} style={{width:Dimensions.get('window').width / 2,height:250,borderRadius:0,margin:0}}/>:<View ></View>}</Pressable>
     </View>
     </View>

     </View>

    
     <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:Dimensions.get('window').width,backgroundColor:"white",padding:10}}>
   <View style={{margin:5,marginLeft:5}}><Text style={{fontWeight:"700",fontSize:15}}>Reclamation</Text></View><Pressable onPress={()=> setIsVisible6(true)} style={{backgroundColor:"#f13a11",padding:5,marginRight:5,borderRadius:5}}><Text style={{color:"white"}}>Réclamer</Text></Pressable>
    </View>
    </ScrollView>
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
    alignItems:'center',
    height:'100%',
    alignSelf:"center",
  },
  introModal:{
    alignItems:"center",
    alignSelf:'center',
    marginTop:-10,
    marginBottom:40,
    fontWeight:'bold',
    fontSize:30,
  
  },
  input:{
    borderWidth:1, 
    borderColor:'#f13a11',
    borderRadius:10,
    width:"80%",
    height:50,
    paddingLeft:10,
    margin:10,
    backgroundColor:"white",
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
    padding:10,

  },
  day:{
    fontSize:18,
  },
  coach:{
    backgroundColor:"white",
    padding:0,
    marginTop:15,
    width:Dimensions.get('window').width - 30,
    borderColor:"white",
    borderTopWidth:1,
    borderBottomWidth:1,
    alignSelf:"center",
    borderRadius:10,
    backgroundColor:"#f13a11",
    marginBottom:10


  }
});
export default Client