import React, { useState,  useEffect  } from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { fdb, auth } from '../config/firebaseSetup'; 
import Navbar from '../components/Navbar'; 
import { collection, addDoc } from "firebase/firestore";

const CreateNewListing = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [condition, setCondition] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState(null); 

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            setUserId(user.uid);
          } else {
            // Handle when user is not authenticated
          }
        });
    
        return unsubscribe;
      }, []);

  const handleSubmit = async () => {  

    try {
        const docRef = await addDoc(collection(fdb, 'products'), {
          name,
          price,
          condition,
          tags,
          description,
          userId: userId, // Replace userId field with actual user ID
        });
        console.log('Document written with ID: ', docRef.id);
        // Reset form fields after successful submission
        setName('');
        setPrice('');
        setCondition('');
        setTags('');
        setDescription('');
        alert('Product added successfully!');
      } catch (error) {
        console.error('Error adding product: ', error);
        alert('Failed to add product. Please try again.');
      }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Condition"
          value={condition}
          onChangeText={setCondition}
        />
        <TextInput
          style={styles.input}
          placeholder="Tags"
          value={tags}
          onChangeText={setTags}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flexGrow: 1,
      backgroundColor: '#fff',
      padding: 20,
      paddingBottom: 60, // Adjust padding to accommodate the navbar
    },
    input: {
      height: 40,
      borderColor: 'red',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    descriptionInput: {
      height: 100,
      textAlignVertical: 'top',
    },
  });

export default CreateNewListing;