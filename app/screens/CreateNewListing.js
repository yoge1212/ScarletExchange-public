import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet, SafeAreaView, Image, Text } from 'react-native';
import { fdb, auth } from '../config/firebaseSetup';
import * as ImagePicker from 'expo-image-picker';
import Navbar from '../components/Navbar';
import { collection, addDoc } from "firebase/firestore";  
import { useNavigation } from '@react-navigation/core';
import DateTimePicker from '@react-native-community/datetimepicker';




const CreateNewListing = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCondition, setProductCondition] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productDate, setProductDate] = useState(new Date());
  const [productTags, setProductTags] = useState('');
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState(null); 
  const navigation = useNavigation();

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true, // Allow multiple image selection
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setImages(prevImages => [...prevImages, ...selectedImages]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };

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

  const handleUpload = async () => { 

    console.log(images)

    try {
      const docRef = await addDoc(collection(fdb, 'products'), {
        name: productName,
        price: productPrice,
        condition: productCondition,
        description: productDescription,
        tags: productTags,
        images: images, // Assign the array of images to the 'images' key
        userId: userId,
        date:productDate,
      });
      console.log('Document written with ID: ', docRef.id);
      // Reset form fields after successful submission
      setProductName('');
      setProductPrice('');
      setProductCondition('');
      setProductTags('');
      setProductDescription('');
      setImages([]);
      setProductDate('');

      alert('Product added successfully!'); 
      navigation.navigate('ProfileScreen');
  } catch (error) {
    console.error('Error adding product: ', error);
    // Show error alert
    alert('Failed to add product. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container2]}>
        <Text style={[styles.name, {fontSize: 20}]}>
            New Item
          </Text>
          <Image resizeMode="contain" source = {require('../assets/editIcon.png')} style={styles.image}/>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Button title="Pick Images" onPress={pickImages} />
        <ScrollView horizontal>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={{ width: 200, height: 200, margin: 5 }} />
          ))}
        </ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={productPrice}
          onChangeText={setProductPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Condition"
          value={productCondition}
          onChangeText={setProductCondition}
        />
        <TextInput
          style={styles.input}
          placeholder="Tags"
          value={productTags}
          onChangeText={setProductTags}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description"
          value={productDescription}
          onChangeText={setProductDescription}
          multiline
        />
        {/* Date picker component */}
        <DateTimePicker
          style={styles.input}
          value={productDate}
          mode="date"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || productDate;
            setProductDate(currentDate);
          }}
        />
        {/* Conditional rendering for date display */}
        <Text>{productDate === new Date() ? 'Select Date' : `Date Selected: ${productDate.toDateString()}`}</Text>

         
        <Button title="Submit" onPress={handleUpload} />
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 60, // Adjust padding to accommodate the navbar
  },
  container2: {
    padding: 10,
    borderBottomWidth: 2,
    height: '7%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',

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
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: '10%',
    height: undefined,
    aspectRatio: 1,
  }
});

export default CreateNewListing;