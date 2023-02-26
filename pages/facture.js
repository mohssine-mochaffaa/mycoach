import { StyleSheet, Button, Platform, Text, View, TouchableOpacity } from 'react-native';
import {useState} from "react"
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';


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
  <style>
table, th, td {
  border:1px solid black;
  padding:2px;
}
</style>
  <body style="border:1px solid #43502F;width:98.5%">
  <center>
  <img src="https://firebasestorage.googleapis.com/v0/b/mycoach-9ddff.appspot.com/o/Facture.jpg?alt=media&token=835be0b0-11ab-4d0b-9b03-4a05963dd917" style="width:120px;margin-top:40px"/>
  <h2 style="color:#43502F;letter-spacing:1px;font-size:20px">SPORTS FINEST</h2>
  <h1 style="color:#43502F;letter-spacing:2px;margin-top:60px">VOTRE SERVICE SPORTIF</h1>
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

  <div style="display:flex;align-items:center;justify-content:space-between;margin:15px"> 
  <div style="width:250px;float:right"><h3 style="text-align:left;letter-spacing:1px;margin-right:23px;color:#43502F">TOTAL: ${total}</h3> <h3 style="text-align:left;letter-spacing:1px;margin-right:23px;margin-top:-10px;color:#43502F">TVA: ${tva}%</h3>  <h3 style="text-align:left;letter-spacing:1px;margin-right:23px;margin-top:-10px;color:#43502F">MONTANT DU: ${montant}</h3></div>

<table>
  <tr>
    <th>Banque</th>
    <th>Ville</th>
    <th>N de compte</th>
    <th>Clé RIB</th>

  </tr>
  <tr>
    <td>007</td>
    <td>791</td>
    <td>0002771000000296</td>
    <td>55</td>

  </tr>
</table>
  </div>



<div style="position:absolute;bottom:0;background-color:#ed4700;color:white;font-size:9px;width:100%;padding-top:25px;padding-bottom:25px">
<center>
<h2 style="font-size:22px;letter-spacing:2px">WWW.SPORTSFINESTMAROC.COM<h2>
</center>
</div>

  </body>
</html>
`;
    const [selectedPrinter, setSelectedPrinter] = useState("");
    const [clicked,setClicked] = useState(true);
    
    const print = async () => {
      setClicked(false);
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
          html,
          printerUrl: selectedPrinter?.url, // iOS only
        }).then(()=> setClicked(true));

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
          <View>{clicked? (<TouchableOpacity style={{backgroundColor:"#43502F",padding:10,borderRadius:5}} onPress={print}><Text style={{color:"white"}}>Voir votre facture et imprimer</Text></TouchableOpacity>):(<TouchableOpacity disabled={true} style={{backgroundColor:"#43502F",padding:10,borderRadius:5}} onPress={print}><Text style={{color:"white"}}>Downloading...</Text></TouchableOpacity>)}</View>
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