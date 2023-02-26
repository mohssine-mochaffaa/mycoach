import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity, Modal, Pressable,TextInput,ScrollView, Image, Dimensions,Alert,Linking } from 'react-native';
import {useState,useEffect} from "react"
import { doc, updateDoc,deleteDoc } from "firebase/firestore"; 
import { getDoc } from "firebase/firestore";
import db from '../firebase';
import {getStorage, deleteObject} from "firebase/storage";
import {ref,uploadBytes , getDownloadURL} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';



 const CoachDetail =({navigation,route})=> {
    const [isVisible,setIsVisible] = useState(false);
    const [isVisible2,setIsVisible2] = useState(false);
    const [isVisible3,setIsVisible3] = useState(false);
    const [isVisible8,setIsVisible8] = useState(false);
    const [isVisible9,setIsVisible9] = useState(false);
    const [isVisible5,setIsVisible5] = useState(false);


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
  const [grasse,setGrasse] = useState(null)
  const [fat,setFat] = useState(null)
  const [hydra,setHydra] = useState(null)
  const [muscle,setMuscle] = useState(null)
  const [osseuse,setOsseuse] = useState(null)
  const [tmb,setTmb] = useState(null)
  const [amr,setAmr] = useState(null)
  const [kcal,setKcal] = useState(null)

  const [bon,setBon] = useState('');
  const [mobileFact,setMobileFac] = useState("")
  const [dateFac,setDateFac] = useState('')
  const [desc,setDesc] = useState("")
  const [prix,setPrix] = useState("");
  const [qte,setQte] = useState(null)
  const [desc2,setDesc2] = useState("")
  const [prix2,setPrix2] = useState("");
  const [qte2,setQte2] = useState(null)
  const [tva,setTva] = useState(null)





    const [weight,setWeight] = useState('')
    const [coach,setCoach] = useState('')
    const {name,code,weight2,coach2,img,uid,uid2,cleintNum} = route.params;
    const [cleintNum2,setCleintNum2] = useState(0);
    const [date,setDate] = useState("");
    const [fatique,setFatique] = useState("");
    const [souplesse,setSouplesse] = useState("");
    const [pomps,setPomps] = useState("");
    const [abdos,setAbdos] = useState("");
    const [ruffier,setRuffier] = useState("");
    const [form,setForm] = useState('');
    const [nut,setNut] = useState(null);
    const [nut2,setNut2] = useState(null);
    const [nut3,setNut3] = useState(null);
    const [nut4,setNut4] = useState(null);
    const [nut5,setNut5] = useState(null);
    const [nut6,setNut6] = useState(null);
    const [nut7,setNut7] = useState(null);
    const [formDate,setFormDate] = useState('');
    const [imgSelected1,setImgSelected1] = useState(false)
    const [imgSelected2,setImgSelected2] = useState(false)
    const [imgSelected3,setImgSelected3] = useState(false)
    const [imgSelected4,setImgSelected4] = useState(false)
    const [imgSelected5,setImgSelected5] = useState(false)
    const [imgSelected6,setImgSelected6] = useState(false)
    const [imgSelected7,setImgSelected7] = useState(false)
    const [imgSelected8,setImgSelected8] = useState(false)
    const [remarque,setRemarque] = useState("")
    const [remarqueDate,setRemarqueDate] = useState("")
    const [interdit,setInterdit] = useState("")

    const [grasse2,setGrasse2] = useState(null)
  const [fat2,setFat2] = useState(null)
  const [hydra2,setHydra2] = useState(null)
  const [muscle2,setMuscle2] = useState(null)
  const [osseuse2,setOsseuse2] = useState(null)
  const [tmb2,setTmb2] = useState(null)
  const [amr2,setAmr2] = useState(null)
  const [fatique2,setFatique2] = useState("");
  const [souplesse2,setSouplesse2] = useState("");
  const [pomps2,setPomps2] = useState("");
  const [abdos2,setAbdos2] = useState("");
  const [ruffier2,setRuffier2] = useState("");


 
    const handleDelete=()=>{
    
      Alert.alert("Supprimer le client",`Vous voulez supprimer ${name}?`,[
        {text:"Non", onPress:()=> console.log("no")},
        {text:"Supprimer", onPress: async()=> {
          setIsVisible8(true)
          const storage = getStorage();
          const desertRefNom = ref(storage, `${name}.jpg`);
          const desertRef = ref(storage, `image${code}.jpg`);
          const desertRef2 = ref(storage, `image2${code}.jpg`);
          const desertRef3 = ref(storage, `image3${code}.jpg`);
          const desertRef4 = ref(storage, `image4${code}.jpg`);
          const desertRef5 = ref(storage, `image5${code}.jpg`);
          const desertRef6 = ref(storage, `image6${code}.jpg`);
          const desertRef7 = ref(storage, `image7${code}.jpg`);
          const desertRef8 = ref(storage, `image8${code}.jpg`);
         
           deleteObject(desertRef)
           deleteObject(desertRef2)
           deleteObject(desertRef3)
           deleteObject(desertRef4)
           deleteObject(desertRef5)
           deleteObject(desertRef6)
           deleteObject(desertRef7) 
           deleteObject(desertRef8)
           deleteObject(desertRefNom)

    
          await deleteDoc(doc(db, "clients", code)).then(()=> setIsVisible8(false)).then(()=>navigation.navigate("Coach"))
        }} 
      ])
    }
    const deleteAccount= async()=>{
        handleDelete();
    }

    const PickImage = async ()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:false, 
        aspect:[4,3],
        quality:1
      })
      if(!result.cancelled){
        setImgSelected1(true)
        const storage = getStorage();
        const imageRef = ref(storage, `image${code}.jpg`)
        const imeg = await fetch(result.uri);
        const bytes = await imeg.blob();
        await uploadBytes(imageRef, bytes).then(()=> { getDownloadURL(imageRef).then((url)=> {
          const docRef = doc(db, "clients" , code);
          updateDoc(docRef, {
              img1:url,
            }); 
        } 
        );})
        
       
      }
    }
    const PickImage2 = async ()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:false,
        aspect:[4,3],
        quality:1
      })
      if(!result.cancelled){
        setImgSelected2(true)
        const storage = getStorage();
        const imageRef = ref(storage, `image2${code}.jpg`)
        const imeg = await fetch(result.uri);
        const bytes = await imeg.blob();
        await uploadBytes(imageRef, bytes).then(()=> { getDownloadURL(imageRef).then((url)=> {
          const docRef = doc(db, "clients" , code);
          updateDoc(docRef, {
              img2:url,
            }); 
        } 
        );})
        
       
      }
    }
    const PickImage3 = async ()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:false,
        aspect:[4,3],
        quality:1
      })
      if(!result.cancelled){
        setImgSelected3(true)
        const storage = getStorage();
        const imageRef = ref(storage, `image3${code}.jpg`)
        const imeg = await fetch(result.uri);
        const bytes = await imeg.blob();
        await uploadBytes(imageRef, bytes).then(()=> { getDownloadURL(imageRef).then((url)=> {
          const docRef = doc(db, "clients" , code);
          updateDoc(docRef, {
              img3:url,
            }); 
        } 
        );})
        
       
      }
    }
    const PickImage4 = async ()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:false,
        aspect:[4,3],
        quality:1
      })
      if(!result.cancelled){
        setImgSelected4(true)
        const storage = getStorage();
        const imageRef = ref(storage, `image4${code}.jpg`)
        const imeg = await fetch(result.uri);
        const bytes = await imeg.blob();
        await uploadBytes(imageRef, bytes).then(()=> { getDownloadURL(imageRef).then((url)=> {
          const docRef = doc(db, "clients" , code);
          updateDoc(docRef, {
              img4:url,
            }); 
        } 
        );})
        
       
      }
    }
















    const PickImage5 = async ()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:false, 
        aspect:[4,3],
        quality:1
      })
      if(!result.cancelled){
        setImgSelected5(true)
        const storage = getStorage();
        const imageRef = ref(storage, `image5${code}.jpg`)
        const imeg = await fetch(result.uri);
        const bytes = await imeg.blob();
        await uploadBytes(imageRef, bytes).then(()=> { getDownloadURL(imageRef).then((url)=> {
          const docRef = doc(db, "clients" , code);
          updateDoc(docRef, {
              img5:url,
            }); 
        } 
        );})
        
       
      }
    }
    const PickImage6 = async ()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:false,
        aspect:[4,3],
        quality:1
      })
      if(!result.cancelled){
        setImgSelected6(true)
        const storage = getStorage();
        const imageRef = ref(storage, `image6${code}.jpg`)
        const imeg = await fetch(result.uri);
        const bytes = await imeg.blob();
        await uploadBytes(imageRef, bytes).then(()=> { getDownloadURL(imageRef).then((url)=> {
          const docRef = doc(db, "clients" , code);
          updateDoc(docRef, {
              img6:url,
            }); 
        } 
        );})
        
       
      }
    }
    const PickImage7 = async ()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:false,
        aspect:[4,3],
        quality:1
      })
      if(!result.cancelled){
        setImgSelected7(true)
        const storage = getStorage();
        const imageRef = ref(storage, `image7${code}.jpg`)
        const imeg = await fetch(result.uri);
        const bytes = await imeg.blob();
        await uploadBytes(imageRef, bytes).then(()=> { getDownloadURL(imageRef).then((url)=> {
          const docRef = doc(db, "clients" , code);
          updateDoc(docRef, {
              img7:url,
            }); 
        } 
        );})
        
       
      }
    }
    const PickImage8 = async ()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:false,
        aspect:[4,3],
        quality:1
      })
      if(!result.cancelled){
        setImgSelected8(true)
        const storage = getStorage();
        const imageRef = ref(storage, `image8${code}.jpg`)
        const imeg = await fetch(result.uri);
        const bytes = await imeg.blob();
        await uploadBytes(imageRef, bytes).then(()=> { getDownloadURL(imageRef).then((url)=> {
          const docRef = doc(db, "clients" , code);
          updateDoc(docRef, {
              img8:url,
            }); 
        } 
        );})
        
       
      }
    }













    const done5=()=>{
      const docRef = doc(db, "clients" , code);
      if (date.length > 1) {
        updateDoc(docRef, {
          date:date,
        }); 
      }
      if (fatique.length > 1) {
        updateDoc(docRef, {
          fatique:fatique,
        }); 
      }
      if (souplesse.length > 1) {
        updateDoc(docRef, {
          souplesse:souplesse,
        }); 
      }
      if (pomps.length > 1) {
        updateDoc(docRef, {
          pomps:pomps,
        }); 
      }
      if (abdos.length > 1) {
        updateDoc(docRef, {
          abdos:abdos,
        }); 
      }
      if (ruffier.length > 1) {
        updateDoc(docRef, {
          ruffier:ruffier
        }); 
      }
      if (grasse != null) {
        updateDoc(docRef, {
          masseGrass:grasse
        }); 
      }
      if (fat != null) {
        updateDoc(docRef, {
          visceralFat:fat
        }); 
      }if (hydra != null) {
        updateDoc(docRef, {
          hydration:hydra
        }); 
      }if (muscle != null) {
        updateDoc(docRef, {
          masseMusculaire:muscle
        }); 
      }if (osseuse != null) {
        updateDoc(docRef, {
          masseOsseuse:osseuse
        }); 
      }if (amr != null) {
        updateDoc(docRef, {
          amr:amr
        }); 
      }if (tmb != null) {
        updateDoc(docRef, {
          tmb:tmb
        }); 
      }
      
        setIsVisible(false)
    }

    const done6=()=>{
      const docRef = doc(db, "clients" , code);
      if (bon.length > 2) {
        updateDoc(docRef, {
          bonFac:bon,
        }); 
      }
      if (dateFac.length > 2) {
        updateDoc(docRef, {
          dateFac:dateFac,
        }); 
      }
      if (mobileFact.length > 2) {
        updateDoc(docRef, {
          mobileFac:mobileFact,
        }); 
      }
      if (qte != null) {
        updateDoc(docRef, {
          qte:qte,
        }); 
      }
      if (desc.length > 2) {
        updateDoc(docRef, {
          descFac:desc,
        }); 
      }
      if (prix.length > 1) {
        updateDoc(docRef, {
          prix:prix,
        }); 
      }

      if (qte2 != null) {
        updateDoc(docRef, {
          qte2:qte2,
        }); 
      }
      if (desc2.length > 2) {
        updateDoc(docRef, {
          descFac2:desc2,
        }); 
      }
      if (prix2.length > 1) {
        updateDoc(docRef, {
          prix2:prix2,
        }); 
      }
      if (tva != null) {
        updateDoc(docRef, {
          tva:tva,
        }); 
      }
      
        setIsVisible5(false)
    }

    const addNut=()=>{
      const docRef = doc(db, "clients" , code);
      
       if (nut || nut == false) {
        updateDoc(docRef, {
          nutrition:nut,
        }); 
       }
       if (nut2 || nut2 == false) { 
        updateDoc(docRef, {
          nutrition2:nut2,
        }); 
       }
       if (nut3 || nut3 == false) {
        updateDoc(docRef, {
          nutrition3:nut3,
        }); 
       }
       if (nut4 || nut4 == false) {
        updateDoc(docRef, {
          nutrition4:nut4,
        }); 
       }
       if (nut5 || nut5 == false) {
        updateDoc(docRef, {
          nutrition5:nut5,
        }); 
       }
       if (nut6 || nut6 == false) {
        updateDoc(docRef, {
          nutrition6:nut6,
        }); 
       }
       if (nut7 || nut7 == false) {  
        updateDoc(docRef, {
          nutrition7:nut7,
        }); 
       }

       if (kcal != null) {
        updateDoc(docRef, {
          kcal:kcal
        }); 
      }
      if (remarque != null) {
        updateDoc(docRef, {
          remarque:remarque
        }); 
      }
      if (remarqueDate != null) {
        updateDoc(docRef, {
          remarqueDate:remarqueDate
        }); 
        if (interdit.length > 2) {
          updateDoc(docRef, {
            interdit:interdit
          }); 
        }
      }
        setIsVisible9(false) 
      }
      const done8 =()=>{
        const docRef = doc(db, "clients" , code);
      if (form.length > 1) {
        updateDoc(docRef, {
          form:form
        }); 
      }
      if (formDate.length > 1) {
        updateDoc(docRef, {
          formDate:formDate
        }); 
      }
      if (fatique2.length > 1) {
        updateDoc(docRef, {
          fatique2:fatique2,
        }); 
      }
      if (souplesse2.length > 1) {
        updateDoc(docRef, {
          souplesse2:souplesse2,
        }); 
      }
      if (pomps2.length > 1) {
        updateDoc(docRef, {
          pomps2:pomps2,
        }); 
      }
      if (abdos2.length > 1) {
        updateDoc(docRef, {
          abdos2:abdos2,
        }); 
      }
      if (ruffier2.length > 1) {
        updateDoc(docRef, {
          ruffier2:ruffier2
        }); 
      }
      if (grasse2 != null) {
        updateDoc(docRef, {
          masseGrass2:grasse2
        }); 
      }
      if (fat2 != null) {
        updateDoc(docRef, {
          visceralFat2:fat2
        }); 
      }if (hydra2 != null) {
        updateDoc(docRef, {
          hydration2:hydra2
        }); 
      }if (muscle2 != null) {
        updateDoc(docRef, {
          masseMusculaire2:muscle2
        }); 
      }if (osseuse2 != null) {
        updateDoc(docRef, {
          masseOsseuse2:osseuse2
        }); 
      }if (amr2 != null) {
        updateDoc(docRef, {
          amr2:amr2
        }); 
      }if (tmb2 != null) {
        updateDoc(docRef, {
          tmb2:tmb2
        }); 
      }
      setIsVisible2(false)
      }

      
      const addplanning =()=>{
        const newPlanning = doc(db, "clients", code);
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
        setIsVisible3(false)
          }

const getPlanning = async()=>{

const docRef = doc(db, "clients", code);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  const data = docSnap.data();
  setLundi(data.lundi)
  setMardi(data.mardi)
  setMercredi(data.mercredi)
  setJeudi(data.jeudi)
  setVendredi(data.vendredi)
  setSamedi(data.samedi)
  setDimanche(data.dimench)

  setLundiT(data.lundiT)
  setMardiT(data.mardiT)
  setMercrediT(data.mercrediT)
  setJeudiT(data.jeudiT)
  setVendrediT(data.vendrediT)
  setSamediT(data.samediT)
  setDimancheT(data.dimenchT)

  setAbdos(data.abdos)
  setPomps(data.pomps)
  setSouplesse(data.souplesse)
  setFatique(data.fatique)
  setRuffier(data.ruffier)
  
  setForm(data.form);
  setFormDate(data.formDate);
  setDate(data.date)
  setGrasse(data.masseGrass)
  setFat(data.visceralFat)
  setHydra(data.hydration)
  setMuscle(data.masseMusculaire)
  setOsseuse(data.masseOsseuse) 
  setAmr(data.amr)
  setTmb(data.tmb)
  setKcal(data.kcal)
  setBon(data.bonFac)
  setMobileFac(data.mobileFac)
  setDateFac(data.dateFac)
  setDesc(data.descFac)
  setPrix(data.prix)
  setQte(data.qte) 
  setDesc2(data.descFac2)
  setPrix2(data.prix2)
  setQte2(data.qte2)
  setTva(data.tva)
  setRemarque(data.remarque)
  setRemarqueDate(data.remarqueDate)
  setInterdit(data.interdit)


} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
    }

    useEffect(()=>{
      getPlanning();
    },[])
  return (
    <View style={styles.container}>
    <ScrollView style={{marginBottom:2,width:"100%"}}>
    <View>
          {img? <Image source={{uri:img}} style={{width:180,height:180,borderRadius:90,margin:0,justifyContent:"center",alignSelf:"center",marginTop:10}}/> : <View style={{width:180,height:180,borderRadius:90,margin:0,backgroundColor:"gray",justifyContent:"center",alignSelf:"center",marginTop:10}}></View>}
        </View>
        <View style={styles.row1}><View><Text style={styles.row1Text}>Nom</Text></View><TouchableOpacity><Text style={styles.row1Weight}>{name}</Text></TouchableOpacity></View>
        <View style={styles.row1}><View><Text style={styles.row1Text}>Mot de pass</Text></View><TouchableOpacity><Text style={styles.row1Weight}>{code}</Text></TouchableOpacity></View>
        <View style={styles.row1}><View><Text style={styles.row1Text}>Coach</Text></View><TouchableOpacity><Text style={styles.row1Weight}>{coach2}</Text></TouchableOpacity></View>
        <View style={styles.row1}><View><Text style={styles.row1Text}>Facture de {name}</Text></View><TouchableOpacity onPress={()=> setIsVisible5(true)} style={styles.row1But}><Text style={styles.row1ButText}>+</Text></TouchableOpacity></View>      
        <View style={styles.row1}><View><Text style={styles.row1Text}>Diagnostique de {name}</Text></View><TouchableOpacity onPress={()=> setIsVisible(true)} style={styles.row1But}><Text style={styles.row1ButText}>+</Text></TouchableOpacity></View>
        <View style={styles.row1}><View><Text style={styles.row1Text}>Planning de {name}</Text></View><TouchableOpacity onPress={()=> setIsVisible3(true)} style={styles.row1But}><Text style={styles.row1ButText}>+</Text></TouchableOpacity></View>
        <View style={styles.row1}><View><Text style={styles.row1Text}>Nutrition de {name}</Text></View><TouchableOpacity onPress={()=> setIsVisible9(true)} style={styles.row1But}><Text style={styles.row1ButText}>+</Text></TouchableOpacity></View>
        <View style={styles.row1}><View><Text style={styles.row1Text}>Test formative {name}</Text></View><TouchableOpacity onPress={()=> setIsVisible2(true)} style={styles.row1But}><Text style={styles.row1ButText}>+</Text></TouchableOpacity></View>




        <Modal animationType="fade" visible={isVisible5} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
        <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible5(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <ScrollView style={{width:"100%"}}>
     <View style={styles.modal}>
     <Text style={styles.introModal}>Facture</Text>

<View style={{width:Dimensions.get("window").width,alignItems:"center"}}>
<Text>Bon de livraison:</Text>
  <TextInput value={bon} onChangeText={(e)=> setBon(e)} style={{backgroundColor:"white",borderWidth:1,borderColor:"green",width:"70%",height:45,paddingLeft:5}} placeholder="Numero de bon"/>
  <Text>Mobile:</Text>
  <TextInput value={mobileFact} onChangeText={(e)=> setMobileFac(e)} style={{backgroundColor:"white",borderWidth:1,borderColor:"green",width:"70%",height:45,paddingLeft:5}} placeholder="numero de telephone"/>
  <Text>Date:</Text>
  <TextInput value={dateFac} onChangeText={(e)=> setDateFac(e)} style={{backgroundColor:"white",borderWidth:1,borderColor:"green",width:"70%",height:45,paddingLeft:5}} placeholder="La date de facturation"/>
</View>

<View style={{width:Dimensions.get("window").width,alignItems:"center"}}>

<View style={{width:"70%",alignItems:"center",justifyContent:"flex-start",marginTop:15}}>

  <Text style={{fontSize:20,fontWeight:"bold"}}>session 1</Text>
  <Text>QTE:</Text>
  <TextInput value={qte} keyboardType="numeric" onChangeText={(e)=> setQte(e)} style={{backgroundColor:"white",borderWidth:1,borderColor:"green",width:"100%",height:45,paddingLeft:5}} placeholder="Quantite"/>
  <Text>Prix:</Text>
  <TextInput value={prix} keyboardType="numeric" onChangeText={(e)=> setPrix(e)} style={{backgroundColor:"white",borderWidth:1,borderColor:"green",width:"100%",height:45,paddingLeft:5}} placeholder="Prix"/>
  <Text>Description:</Text>
  <TextInput value={desc} multiline={true} onChangeText={(e)=> setDesc(e)} style={{backgroundColor:"white",borderWidth:1,borderColor:"green",width:"100%",height:45,paddingLeft:5}} placeholder="Description"/>
</View>

<View style={{width:"70%",alignItems:"center",justifyContent:"flex-start",marginTop:15}}>

  <Text style={{fontSize:20,fontWeight:"bold"}}>session 2</Text>
  <Text>QTE 2:</Text>
  <TextInput value={qte2} keyboardType="numeric" onChangeText={(e)=> setQte2(e)} style={{backgroundColor:"white",borderWidth:1,borderColor:"green",width:"100%",height:45,paddingLeft:5}} placeholder="Quantite 2"/>
  <Text>Prix 2:</Text>
  <TextInput value={prix2} keyboardType="numeric" onChangeText={(e)=> setPrix2(e)} style={{backgroundColor:"white",borderWidth:1,borderColor:"green",width:"100%",height:45,paddingLeft:5}} placeholder="Prix 2"/>
  <Text>Description 2:</Text>
  <TextInput value={desc2} multiline={true} onChangeText={(e)=> setDesc2(e)} style={{backgroundColor:"white",borderWidth:1,borderColor:"green",width:"100%",height:45,paddingLeft:5}} placeholder="Description 2"/>
</View>

<View style={{width:"70%",alignItems:"center",justifyContent:"flex-start",marginTop:15}}>
  <Text>TVA:</Text>
  <TextInput value={tva} keyboardType="numeric" onChangeText={(e)=> setTva(e)} style={{backgroundColor:"white",borderWidth:1,borderColor:"green",width:"100%",height:45,paddingLeft:5}} placeholder="Tva"/>
</View>
</View>

     <TouchableOpacity onPress={done6} style={styles.login}><Text style={styles.loginText}>ADD</Text></TouchableOpacity>
     </View>
     </ScrollView>
     </Modal>






        <Modal animationType="fade" visible={isVisible} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
        <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <ScrollView style={{width:"100%"}}>
     <View style={styles.modal}>
     <Text style={styles.introModal}>Diagnostique</Text>
     <View style={{flexDirection:"row",justifyContent:"space-around",width:"75%"}}> 
     <TouchableOpacity style={{backgroundColor:"green",padding:10,borderRadius:5,marginTop:10}} onPress={PickImage}>{!imgSelected1?<Text style={{color:"white"}}>New Image</Text>:<View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color:"white"}}>New Image</Text><AntDesign style={{marginLeft:5}} name="checkcircleo" size={24} color="white" /></View>}</TouchableOpacity>
     <TouchableOpacity style={{backgroundColor:"green",padding:10,borderRadius:5,marginTop:10}} onPress={PickImage2}>{!imgSelected2?<Text style={{color:"white"}}>New Image</Text>:<View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color:"white"}}>New Image</Text><AntDesign style={{marginLeft:5}} name="checkcircleo" size={24} color="white" /></View>}</TouchableOpacity> 
     </View>
     <View style={{flexDirection:"row",justifyContent:"space-around",width:"75%"}}> 
     <TouchableOpacity style={{backgroundColor:"green",padding:10,borderRadius:5,marginTop:10}} onPress={PickImage3}>{!imgSelected3?<Text style={{color:"white"}}>New Image</Text>:<View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color:"white"}}>New Image</Text><AntDesign style={{marginLeft:5}} name="checkcircleo" size={24} color="white" /></View>}</TouchableOpacity> 
     <TouchableOpacity style={{backgroundColor:"green",padding:10,borderRadius:5,marginTop:10}} onPress={PickImage4}>{!imgSelected4?<Text style={{color:"white"}}>New Image</Text>:<View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color:"white"}}>New Image</Text><AntDesign style={{marginLeft:5}} name="checkcircleo" size={24} color="white" /></View>}</TouchableOpacity> 
     </View>

     <View style={{backgroundColor:"#f13a11",width:Dimensions.get("window").width,marginTop:20,paddingBottom:20,borderTopRightRadius:15,borderTopLeftRadius:15}}>
       
       <Text style={{alignSelf:"center",fontSize:20,fontWeight:"bold",marginTop:10,marginBottom:15,color:"white"}}>Test dyagnostiques</Text>
       <View style={{margin:10}}>
         <Text style={{fontWeight:"bold",fontSize:16,color:"white"}}>La date:</Text>
         <TextInput value={date} onChangeText={(e)=>setDate(e)} multiline={true} style={styles.input} style={{borderColor:'black',borderWidth:1,width:"100%",padding:10,backgroundColor:"white",borderRadius:10,marginTop:8}} placeholder='jj/mm/aa'/>

       </View>
       <View style={{margin:10}}>
         <Text style={{fontWeight:"bold",fontSize:16,color:"white"}}>Test de la fatique:</Text>
         <TextInput value={fatique} onChangeText={(e)=>setFatique(e)} multiline={true} style={styles.input} style={{borderColor:'black',borderWidth:1,width:"100%",padding:10,backgroundColor:"white",borderRadius:10,marginTop:8}} placeholder='Fatique test'/>

       </View>
       <View style={{margin:10}}>
         <Text style={{fontWeight:"bold",fontSize:16,color:"white"}}>Test de la souplesse:</Text>
         <TextInput value={souplesse} onChangeText={(e)=>setSouplesse(e)} multiline={true} style={styles.input} style={{borderColor:'black',borderWidth:1,width:"100%",padding:10,backgroundColor:"white",borderRadius:10,marginTop:8}} placeholder='Souplesse test'/>

       </View>
       <View style={{margin:10}}>
         <Text style={{fontWeight:"bold",fontSize:16,color:"white"}}>Test des pompes:</Text>
         <TextInput value={pomps} onChangeText={(e)=>setPomps(e)} multiline={true} style={styles.input} style={{borderColor:'black',borderWidth:1,width:"100%",padding:10,backgroundColor:"white",borderRadius:10,marginTop:8}} placeholder='Pomps test'/>

       </View>
       <View style={{margin:10}}>
         <Text style={{fontWeight:"bold",fontSize:16,color:"white"}}>Test des abdos:</Text>
         <TextInput value={abdos} onChangeText={(e)=>setAbdos(e)} multiline={true} style={styles.input} style={{borderColor:'black',borderWidth:1,width:"100%",padding:10,backgroundColor:"white",borderRadius:10,marginTop:8}} placeholder='Abdos test'/>

       </View>
       <View style={{margin:10}}>
         <Text style={{fontWeight:"bold",fontSize:16,color:"white"}}>Test ruffier dickson:</Text>
         <TextInput value={ruffier} onChangeText={(e)=>setRuffier(e)} multiline={true} style={styles.input} style={{borderColor:'black',borderWidth:1,width:"100%",padding:10,backgroundColor:"white",borderRadius:10,marginTop:8}} placeholder='Ruffier dickson test'/>

       </View>
     </View>
<View style={{width:Dimensions.get("window").width,justifyContent:"center",alignSelf:"center",alignItems:"center",marginTop:10}}>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>Poid</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={grasse} onChangeText={(e)=> setGrasse(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>Kg</Text></View></View>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>Visceral fat</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={fat} onChangeText={(e)=> setFat(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>%</Text></View></View>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>Hydratation</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={hydra} onChangeText={(e)=> setHydra(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>%</Text></View></View>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>Masse musculaire</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={muscle} onChangeText={(e)=> setMuscle(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>%</Text></View></View>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>Masse osseuse</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={osseuse} onChangeText={(e)=> setOsseuse(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>%</Text></View></View>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>TMB</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={tmb} onChangeText={(e)=> setTmb(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>kcal</Text></View></View>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>AMR</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={amr} onChangeText={(e)=> setAmr(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>kcal</Text></View></View>

</View>
     <TouchableOpacity onPress={done5} style={styles.login}><Text style={styles.loginText}>ADD</Text></TouchableOpacity>
     </View>
     </ScrollView>
     </Modal>



     <Modal animationType="fade" visible={isVisible2} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
        <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible2(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <ScrollView style={{width:"100%"}}>
     <View style={styles.modal}>
     <Text style={styles.introModal}>Test formative</Text>
     <View style={{flexDirection:"row",justifyContent:"space-around",width:"75%"}}> 
     <TouchableOpacity style={{backgroundColor:"green",padding:10,borderRadius:5,marginTop:10}} onPress={PickImage5}>{!imgSelected5?<Text style={{color:"white"}}>New Image</Text>:<View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color:"white"}}>New Image</Text><AntDesign style={{marginLeft:5}} name="checkcircleo" size={24} color="white" /></View>}</TouchableOpacity>
     <TouchableOpacity style={{backgroundColor:"green",padding:10,borderRadius:5,marginTop:10}} onPress={PickImage6}>{!imgSelected6?<Text style={{color:"white"}}>New Image</Text>:<View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color:"white"}}>New Image</Text><AntDesign style={{marginLeft:5}} name="checkcircleo" size={24} color="white" /></View>}</TouchableOpacity> 
     </View>
     <View style={{flexDirection:"row",justifyContent:"space-around",width:"75%"}}> 
     <TouchableOpacity style={{backgroundColor:"green",padding:10,borderRadius:5,marginTop:10}} onPress={PickImage7}>{!imgSelected7?<Text style={{color:"white"}}>New Image</Text>:<View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color:"white"}}>New Image</Text><AntDesign style={{marginLeft:5}} name="checkcircleo" size={24} color="white" /></View>}</TouchableOpacity> 
     <TouchableOpacity style={{backgroundColor:"green",padding:10,borderRadius:5,marginTop:10}} onPress={PickImage8}>{!imgSelected8?<Text style={{color:"white"}}>New Image</Text>:<View style={{flexDirection:"row",alignItems:"center"}}><Text style={{color:"white"}}>New Image</Text><AntDesign style={{marginLeft:5}} name="checkcircleo" size={24} color="white" /></View>}</TouchableOpacity> 
     </View>
     <View style={{backgroundColor:"#f13a11",width:Dimensions.get("window").width,marginTop:20,paddingBottom:20,borderTopRightRadius:15,borderTopLeftRadius:15}}>
       <Text style={{alignSelf:"center",fontSize:20,fontWeight:"bold",marginTop:10,marginBottom:15,color:"white"}}>Test formative</Text>
       <View style={{margin:10}}>
       <Text style={{fontWeight:"bold",fontSize:16,color:"white"}}>La date:</Text>
         <TextInput value={formDate} onChangeText={(e)=>setFormDate(e)} multiline={true} style={styles.input} style={{borderColor:'black',borderWidth:1,width:"100%",padding:10,backgroundColor:"white",borderRadius:10,marginTop:8}} placeholder='La date'/>
         <Text style={{fontWeight:"bold",fontSize:16,color:"white"}}>Test formative:</Text>
         <TextInput value={form} onChangeText={(e)=>setForm(e)} multiline={true} style={styles.input} style={{borderColor:'black',borderWidth:1,width:"100%",padding:10,backgroundColor:"white",borderRadius:10,marginTop:8}} placeholder='Test formative'/>
       </View>
       <View style={{margin:10}}>
         <Text style={{fontWeight:"bold",fontSize:16,color:"white"}}>Test de la fatique:</Text>
         <TextInput value={fatique2} onChangeText={(e)=>setFatique2(e)} multiline={true} style={styles.input} style={{borderColor:'black',borderWidth:1,width:"100%",padding:10,backgroundColor:"white",borderRadius:10,marginTop:8}} placeholder='Fatique test'/>

       </View>
       <View style={{margin:10}}>
         <Text style={{fontWeight:"bold",fontSize:16,color:"white"}}>Test de la souplesse:</Text>
         <TextInput value={souplesse2} onChangeText={(e)=>setSouplesse2(e)} multiline={true} style={styles.input} style={{borderColor:'black',borderWidth:1,width:"100%",padding:10,backgroundColor:"white",borderRadius:10,marginTop:8}} placeholder='Souplesse test'/>

       </View>
       <View style={{margin:10}}>
         <Text style={{fontWeight:"bold",fontSize:16,color:"white"}}>Test des pompes:</Text>
         <TextInput value={pomps2} onChangeText={(e)=>setPomps2(e)} multiline={true} style={styles.input} style={{borderColor:'black',borderWidth:1,width:"100%",padding:10,backgroundColor:"white",borderRadius:10,marginTop:8}} placeholder='Pomps test'/>

       </View>
       <View style={{margin:10}}>
         <Text style={{fontWeight:"bold",fontSize:16,color:"white"}}>Test des abdos:</Text>
         <TextInput value={abdos2} onChangeText={(e)=>setAbdos2(e)} multiline={true} style={styles.input} style={{borderColor:'black',borderWidth:1,width:"100%",padding:10,backgroundColor:"white",borderRadius:10,marginTop:8}} placeholder='Abdos test'/>

       </View>
       <View style={{margin:10}}>
         <Text style={{fontWeight:"bold",fontSize:16,color:"white"}}>Test ruffier dickson:</Text>
         <TextInput value={ruffier2} onChangeText={(e)=>setRuffier2(e)} multiline={true} style={styles.input} style={{borderColor:'black',borderWidth:1,width:"100%",padding:10,backgroundColor:"white",borderRadius:10,marginTop:8}} placeholder='Ruffier dickson test'/>

       </View>
     </View>

     <View style={{width:Dimensions.get("window").width,justifyContent:"center",alignSelf:"center",alignItems:"center",marginTop:10}}>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>Poid</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={grasse2} onChangeText={(e)=> setGrasse2(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>Kg</Text></View></View>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>Visceral fat</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={fat2} onChangeText={(e)=> setFat2(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>%</Text></View></View>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>Hydratation</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={hydra2} onChangeText={(e)=> setHydra2(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>%</Text></View></View>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>Masse musculaire</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={muscle2} onChangeText={(e)=> setMuscle2(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>%</Text></View></View>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>Masse osseuse</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={osseuse2} onChangeText={(e)=> setOsseuse2(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>%</Text></View></View>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>TMB</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={tmb2} onChangeText={(e)=> setTmb2(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>kcal</Text></View></View>
     <View style={{width:"90%",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#AAA7A7",padding:10,borderRadius:4,alignItems:"center",marginTop:10}}><Text style={{color:"white",fontWeight:"bold",letterSpacing:1}}>AMR</Text><View style={{flexDirection:"row",alignItems:"center"}}><TextInput value={amr2} onChangeText={(e)=> setAmr2(e)} style={{fontSize:19,color:"white",alignSelf:"center",alignContent:"center",justifyContent:"center"}} keyboardType="numeric" placeholder="0"/><Text style={{fontSize:19,marginLeft:0,color:"white"}}>kcal</Text></View></View>

</View>
 
     <TouchableOpacity onPress={done8} style={styles.login}><Text style={styles.loginText}>ADD</Text></TouchableOpacity>
     </View>
     </ScrollView>
     </Modal>
     <Modal animationType="fade" visible={isVisible3} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
     <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible3(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <ScrollView style={{width:"100%"}}>
     <View style={styles.modal}>
     <Text style={styles.introModal}>Planning</Text> 
     <View style={{alignItems:"flex-start",width:"70%"}}><Text style={{fontSize:18,fontWeight:"700"}}>Lundi:</Text></View>
     <View style={{flexDirection:"row",}}><TextInput multiline={true} value={lundi} onChangeText={(e)=> setLundi(e)} style={styles.input} placeholder='Lundi'/></View>
     <View style={{flexDirection:"row",}}><TextInput value={lundiT} onChangeText={(e)=> setLundiT(e)} style={styles.input}/></View>

     <View style={{alignItems:"flex-start",width:"70%"}}><Text style={{fontSize:18,fontWeight:"700"}}>Mardi:</Text></View>
     <View style={{flexDirection:"row",}}><TextInput multiline={true} value={mardi} onChangeText={(e)=> setMardi(e)} style={styles.input} placeholder='mardi'/></View>
     <View style={{flexDirection:"row",}}><TextInput value={mardiT} onChangeText={(e)=> setMardiT(e)} style={styles.input}/></View>

     <View style={{alignItems:"flex-start",width:"70%"}}><Text style={{fontSize:18,fontWeight:"700"}}>Mercredi:</Text></View>
     <View style={{flexDirection:"row",}}><TextInput multiline={true} value={mercredi} onChangeText={(e)=> setMercredi(e)} style={styles.input} placeholder='mercredi'/></View>
     <View style={{flexDirection:"row",}}><TextInput value={mercrediT} onChangeText={(e)=> setMercrediT(e)} style={styles.input}/></View>

     <View style={{alignItems:"flex-start",width:"70%"}}><Text style={{fontSize:18,fontWeight:"700"}}>Jeudi:</Text></View>
     <View style={{flexDirection:"row",}}><TextInput multiline={true} value={jeudi} onChangeText={(e)=> setJeudi(e)} style={styles.input} placeholder='jeudi'/></View>
     <View style={{flexDirection:"row",}}><TextInput value={jeudiT} onChangeText={(e)=> setJeudiT(e)} style={styles.input}/></View>

     <View style={{alignItems:"flex-start",width:"70%"}}><Text style={{fontSize:18,fontWeight:"700"}}>Vendredi:</Text></View>
     <View style={{flexDirection:"row",}}><TextInput multiline={true} value={vendredi} onChangeText={(e)=> setVendredi(e)} style={styles.input} placeholder='vendredi'/></View>
     <View style={{flexDirection:"row",}}><TextInput value={vendrediT} onChangeText={(e)=> setVendrediT(e)} style={styles.input}/></View>
    
     <View style={{alignItems:"flex-start",width:"70%"}}><Text style={{fontSize:18,fontWeight:"700"}}>Samedi:</Text></View>
     <View style={{flexDirection:"row",}}><TextInput multiline={true} value={samedi} onChangeText={(e)=> setSamedi(e)} style={styles.input} placeholder='samedi'/></View>
     <View style={{flexDirection:"row",}}><TextInput value={samediT} onChangeText={(e)=> setSamediT(e)} style={styles.input}/></View>

     <View style={{alignItems:"flex-start",width:"70%"}}><Text style={{fontSize:18,fontWeight:"700"}}>Dimanche:</Text></View>
     <View style={{flexDirection:"row",}}><TextInput multiline={true} value={dimanche} onChangeText={(e)=> setDimanche(e)} style={styles.input} placeholder='dimanche'/></View>
     <View style={{flexDirection:"row",}}><TextInput value={dimancheT} onChangeText={(e)=> setDimancheT(e)} style={styles.input}/></View>

     <TouchableOpacity onPress={addplanning}   style={styles.login}><Text style={styles.loginText}>Add planning</Text></TouchableOpacity>
     </View>
     </ScrollView>
     </Modal>


     
     <Modal animationType="fade" visible={isVisible9} transparent={false} style={{justifyContent:"center",alignItems:"center"}}>
        <Pressable style={{width:30,padding:0,margin:11,borderRadius:8}} onPress={()=> setIsVisible9(false)}><MaterialIcons name="cancel" size={30} color="#ff5d00" /></Pressable>
     <ScrollView style={{width:"100%"}}>
     <View style={styles.modal}>
     <Text style={styles.introModal}>Nutrition</Text>

     <View style={{flexDirection:"row",alignItems:"center",marginBottom:20,backgroundColor:"#CFCFCE",padding:8,borderRadius:5}}><Text style={{fontWeight:"bold",marginRight:5,fontSize:19}}>Nombre de kcal</Text><TextInput value={kcal} onChangeText={(e)=> setKcal(e)} style={{fontSize:19}} keyboardType="numeric" placeholder="0"/></View>
     <View><TextInput value={remarque} onChangeText={(e)=>setRemarque(e)} multiline={true} style={styles.input} style={{borderColor:'red',borderWidth:1,width:200,padding:10,marginBottom:10}} placeholder='Remarque de nutrition' maxLength={75}/></View> 
     <View><TextInput value={remarqueDate} onChangeText={(e)=>setRemarqueDate(e)} style={styles.input} style={{borderColor:'red',borderWidth:1,width:200,padding:10,marginBottom:10}} placeholder='Date de nutrition'/></View> 
     <View><TextInput value={interdit} onChangeText={(e)=>setInterdit(e)} style={styles.input} style={{borderColor:'red',borderWidth:1,width:200,padding:10,marginBottom:10}} placeholder='Interdit de manger'/></View> 

     <Text style={{fontSize:18,fontWeight:"700",marginBottom:5}}>Repas 1</Text>
     <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
     <TextInput value={nut} onChangeText={(e)=>setNut(e)} multiline={true} style={styles.input} style={{borderColor:'red',borderWidth:1,width:"70%",padding:10,marginBottom:10}} placeholder='Nutrition'/>
     <TouchableOpacity onPress={()=>setNut(false)}><Text style={{color:"white",backgroundColor:"red",padding:5,marginLeft:6,borderRadius:5}}>Delete</Text></TouchableOpacity>
     </View>
     
     <Text style={{fontSize:18,fontWeight:"700",marginBottom:5}}>Repas 2</Text>
     <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
     <TextInput value={nut2} onChangeText={(e)=>setNut2(e)} multiline={true} style={styles.input} style={{borderColor:'red',borderWidth:1,width:"70%",padding:10,marginBottom:10}} placeholder='Nutrition'/>
     <TouchableOpacity onPress={()=>setNut2(false)}><Text style={{color:"white",backgroundColor:"red",padding:5,marginLeft:6,borderRadius:5}}>Delete</Text></TouchableOpacity>
     </View>

     <Text style={{fontSize:18,fontWeight:"700",marginBottom:5}}>Repas 3</Text>
     <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
     <TextInput value={nut3} onChangeText={(e)=>setNut3(e)} multiline={true} style={styles.input} style={{borderColor:'red',borderWidth:1,width:"70%",padding:10,marginBottom:10}} placeholder='Nutrition'/>
     <TouchableOpacity onPress={()=>setNut3(false)}><Text style={{color:"white",backgroundColor:"red",padding:5,marginLeft:6,borderRadius:5}}>Delete</Text></TouchableOpacity>
     </View>

     <Text style={{fontSize:18,fontWeight:"700",marginBottom:5}}>Repas 4</Text> 
     <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
     <TextInput value={nut4} onChangeText={(e)=>setNut4(e)} multiline={true} style={styles.input} style={{borderColor:'red',borderWidth:1,width:"70%",padding:10,marginBottom:10}} placeholder='Nutrition'/>
     <TouchableOpacity onPress={()=>setNut4(false)}><Text style={{color:"white",backgroundColor:"red",padding:5,marginLeft:6,borderRadius:5}}>Delete</Text></TouchableOpacity>
     </View>

     <Text style={{fontSize:18,fontWeight:"700",marginBottom:5}}>Repas 5</Text>
     <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
     <TextInput value={nut5} onChangeText={(e)=>setNut5(e)} multiline={true} style={styles.input} style={{borderColor:'red',borderWidth:1,width:"70%",padding:10,marginBottom:10}} placeholder='Nutrition'/>
     <TouchableOpacity onPress={()=>setNut5(false)}><Text style={{color:"white",backgroundColor:"red",padding:5,marginLeft:6,borderRadius:5}}>Delete</Text></TouchableOpacity>
     </View>

     <Text style={{fontSize:18,fontWeight:"700",marginBottom:5}}>Repas 6</Text>
     <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
     <TextInput value={nut6} onChangeText={(e)=>setNut6(e)} multiline={true} style={styles.input} style={{borderColor:'red',borderWidth:1,width:"70%",padding:10,marginBottom:10}} placeholder='Nutrition'/>
     <TouchableOpacity onPress={()=>setNut6(false)}><Text style={{color:"white",backgroundColor:"red",padding:5,marginLeft:6,borderRadius:5}}>Delete</Text></TouchableOpacity>
     </View>

     <Text style={{fontSize:18,fontWeight:"700",marginBottom:5}}>Repas 7</Text>
     <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
     <TextInput value={nut7} onChangeText={(e)=>setNut7(e)} multiline={true} style={styles.input} style={{borderColor:'red',borderWidth:1,width:"70%",padding:10,marginBottom:10}} placeholder='Nutrition'/>
     <TouchableOpacity onPress={()=>setNut7(false)}><Text style={{color:"white",backgroundColor:"red",padding:5,marginLeft:6,borderRadius:5}}>Delete</Text></TouchableOpacity>
     </View>

     <TouchableOpacity onPress={addNut}  style={styles.login}><Text style={styles.loginText}>ADD</Text></TouchableOpacity>
     </View>
     </ScrollView>
     </Modal>







     <Modal animationType="fade" visible={isVisible8} transparent={true} style={{justifyContent:"center",alignItems:"center",alignSelf:"center",alignContent:"center"}}>
     <Pressable style={{backgroundColor:"#7878788b",height:"100%"}}>
     <View style={{backgroundColor:"transparent",alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop:"50%"}}>
     <Text style={{fontSize:25,fontWeight:"bold",color:"#f13a11",backgroundColor:"white",padding:10,borderRadius:5}}>Deleting...</Text>
     </View>
     </Pressable>
     </Modal>
     </ScrollView>
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
  row1Weight:{
      color:"black",
      fontWeight:"bold",
      fontSize:16,
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
  modal:{
    justifyContent:'center',
    width:Dimensions.get('window').width,
    alignSelf:"center",
    alignItems:'center',
    height:'100%',
    marginTop:30,
    marginBottom:70,
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
    borderColor:'#f13a11',
    borderRadius:10,
    width:"70%",
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
  input2:{
    borderWidth:1, 
    borderColor:'#f13a11',
    borderRadius:10,
    width:"20%",
    height:50,
    paddingLeft:10,
    margin:10,
  },
});
export default CoachDetail;

//<View style={styles.row1}><View><Text style={styles.row1Text}>Supprimer le client</Text></View><TouchableOpacity onPress={deleteAccount}><Text style={styles.row1Weight2}>Supprimer</Text></TouchableOpacity></View>
