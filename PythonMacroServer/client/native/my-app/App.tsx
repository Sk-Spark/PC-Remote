import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Linking, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import Zeroconf from 'react-native-zeroconf';

import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

// require module
export default function App() {

  const [activeIPs, setActiveIPs] = useState(Array<string>());
  const [loading, setLoading] = useState(false);
  const [baseIP, setBaseIP] = useState('192.168.0.');
  // const baseIP = '192.168.137.';
  const scanPorts = ['19006', '80'];
  const timeout = 100;

  const [urlScanning, setUrlScanning] = useState({current: ''} as any);

  const scanLocalNetwork = async () => {
    const activeIPS: string[] = [];
    for (let i = 1; i <= 255; i++) {
      const host = baseIP + i;
      for (let j = 0; j < scanPorts.length; j++) {
        const port = scanPorts[j];
        const url = `http://${host}:${port}`;
        setUrlScanning({current: host});
        // console.log(`Checking ${url}`);
        try {
          const response = await axios.get(url, { timeout });
          // console.log(`Connected to ${host} on port ${port}`);
          // console.log('Response:', response.status);
          if (response.status === 200) {
            console.log(`Found active IP address: ${url}`);
            activeIPS.push(url);
            setActiveIPs([...activeIPS]);
          }
        }
        catch (error: any) {
          // console.error(`Error connecting to ${host}: ${error.message}`);
        }
      };
    };
    console.log('Active IP addresses:', activeIPs);
    setLoading(false);
    // setActiveIPs(activeIPs as never[]);
  };
  // console.log('baseIP:', baseIP);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <View>
        <TextInput style={{lineHeight: 40, margin: 10 }} placeholder="Enter IP address" 
          value={baseIP}
          onChangeText={(v)=>{
            console.log('v:', v);  
            setBaseIP(v)
          }}
          />
        <Button title="Scan Network" onPress={()=>{
          setLoading(true);
          scanLocalNetwork();
        }} />
      </View>
      {activeIPs.map((ip: any) => (
        <View key={ip} style={styles.linkBtn}>
          <Button title={ip}
            onPress={() => { Linking.openURL(ip) }}
          />
        </View>
      ))}
      {loading && <View style={{margin: 10, display:'flex', alignItems:'center'}}>
        <Text>{`Scaning ...`}</Text>
        <Text>url: {urlScanning.current}</Text>
        </View>
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
  linkBtn: {
    margin: 10,
  }
});
