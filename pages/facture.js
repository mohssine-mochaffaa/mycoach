import { StyleSheet, Button, Platform, Text, View } from 'react-native';
import {useState} from "react"
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';


const Facture=({route})=> {
  const {bon,mobileFac,dateFac,desc,prix,qte,desc2,prix2,qte2} = route.params;
  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body>
  <center>
  <h1>VOTRE SERVICE SPORTIF</h1>
  </center>
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
          <Button title='Print' onPress={print}  />
          <View style={styles.spacer} />
          <Button title='Print to PDF file' onPress={printToFile}/>
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