import React from 'react' 
import { View, Text, StyleSheet,SafeAreaView } from 'react-native'; 
import Navbar from '../components/Navbar';

const EditProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text>This is to edit an account </Text>
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

export default EditProfileScreen;