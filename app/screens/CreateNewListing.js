import React from 'react' 
import { View, Text, StyleSheet,SafeAreaView } from 'react-native'; 
import Navbar from '../components/Navbar';

const CreateNewListing = () => {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text>This is to create a product listing </Text>
    </View>
    <Navbar />
  </SafeAreaView> 
  )
}  

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default CreateNewListing;