import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


function Button(props: { title: string }) {
  return (
    <TouchableOpacity>
      <Text>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color: "white", fontSize: 40}}>
        Hello World
      </Text>
      <Button title='Send'></Button>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ACACAC',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
