import { StyleSheet, Button, Platform, Text, View, Pressable } from 'react-native';
import {useState} from "react"
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { TouchableOpacity } from 'react-native-gesture-handler';
import img1 from "../assets/coachApp2.jpeg"


const Facture=({route})=> {
  const {bon,mobileFac,dateFac,desc,prix,qte,desc2,prix2,qte2,tva} = route.params;
  const total1 = prix * qte;
  const total2 = prix2 * qte2;
  const total = total1 + total2;
  const tvaMontant = total * (tva / 100);
  const montant = total + tvaMontant;
  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="border:1px solid #43502F;width:98.5%">
  <center>
  <img style="width:70px;height:70px" src="./coachApp.jpeg"/>
  <h1 style="color:#43502F;letter-spacing:2px;margin-top:80px">VOTRE SERVICE SPORTIF</h1>
  </center>
  <div>
  <h2 style="text-align:right;color:#43502F;letter-spacing:2px;margin-top:40px;margin-right:15px">BON DE LIVRAISON N° ${bon}</h2>
  <h2 style="text-align:left;color:#43502F;letter-spacing:2px;margin-top:40px;margin-left:15px">MOBILE: ${mobileFac}</h2>
  <h3 style="text-align:left;color:#43502F;letter-spacing:2px;margin-top:-12px;margin-left:15px">CASABLANCA LE: ${dateFac}</h3>
  </div>
  
  <div style="display:flex;justify-content:center">
  <table style="width:100%;margin:15px">
  <tr>
    <th style="border-top: 1px solid #43502F;padding-top:10px;padding-bottom:10px;border-bottom: 1px solid #43502F;text-align: left;font-size:20px;color:#43502F;margin-bottom:15px">QTE</th>
    <th style="border-top: 1px solid #43502F;padding-top:10px;padding-bottom:10px;border-bottom: 1px solid #43502F;text-align: left;font-size:20px;color:#43502F;margin-bottom:15px">PRIX</th>
    <th style="border-top: 1px solid #43502F;padding-top:10px;padding-bottom:10px;border-bottom: 1px solid #43502F;text-align: left;font-size:20px;color:#43502F;margin-bottom:15px">DESCRIPTION</th>
    <th style="border-top: 1px solid #43502F;padding-top:10px;padding-bottom:10px;border-bottom: 1px solid #43502F;text-align: left;font-size:20px;color:#43502F;margin-bottom:15px">TOTAL</th>
  </tr><br></br>
  <tr>
    <td style="font-size:19px">${qte}</td>
    <td style="font-size:19px">${prix}</td>
    <td style="font-size:19px">${desc}</td>
    <td style="font-size:19px">${total1}</td> 
  </tr>
  <tr style="margin-top:15px">
    <td style="font-size:19px;padding-bottom:10px;border-bottom: 1px solid #43502F;">${qte2}</td>
    <td style="font-size:19px;padding-bottom:10px;border-bottom: 1px solid #43502F;">${prix2}</td>
    <td style="font-size:19px;padding-bottom:10px;border-bottom: 1px solid #43502F;">${desc2}</td>
    <td style="font-size:19px;padding-bottom:10px;border-bottom: 1px solid #43502F;">${total2}</td> 
  </tr>
</table>
  </div>

<div style="width:250px;float:right"><h3 style="text-align:left;letter-spacing:1px;margin-right:23px;color:#43502F">TOTAL: ${total}</h3> <h3 style="text-align:left;letter-spacing:1px;margin-right:23px;margin-top:-10px;color:#43502F">TVA: ${tva}%</h3>  <h3 style="text-align:left;letter-spacing:1px;margin-right:23px;margin-top:-10px;color:#43502F">MONTANT DU: ${montant}</h3></div>

<div style="position:absolute;bottom:0;background-color:#43502F;color:white;font-size:9px;width:100%;padding-top:25px;padding-bottom:25px">
<center>
<h2 style="font-size:22px;letter-spacing:2px">WWW.SPORTSFINESTMAROC.COM<h2>
<p>SPORTS FINEST SARL CAPITAL SOCIAL: 100000 DHS MOBILE: 0667564630 / 0674252723 ICE: D0275234800005D</p>
<p>ADRESSE: RUE EL AARAR ET BD LALLA YACOUT 3EME ETAGE APPARTEMENT B IF: 50564474 RC: 517389</p>
</center>
</div>

  </body>
</html>
`;
    const [selectedPrinter, setSelectedPrinter] = useState("");
    
    const print = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
          html,
          printerUrl: selectedPrinter?.url, // iOS only
        });
      }
    
      const printToFile = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        const { uri } = await Print.printToFileAsync({
          html
        });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      }
    
      const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync(); // iOS only
        setSelectedPrinter(printer);
      }
    
      return (
        <View style={styles.container}>
          <Pressable style={{backgroundColor:"#43502F",padding:10,borderRadius:5}} onPress={print}><Text style={{color:"white"}}>Voir votre facture et imprimer</Text></Pressable>
          <View style={styles.spacer} />
          {Platform.OS === 'ios' &&
            <>
              <View style={styles.spacer} />
              <Button title='Select printer' onPress={selectPrinter}/>
              <View style={styles.spacer} />
              {selectedPrinter ? <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text> : undefined}
            </>
          }
        </View>
      );
    }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});

export default Facture