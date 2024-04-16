import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { fdb, auth} from '../config/firebaseSetup';
import {  collection, getDocs, deleteDoc, query, where} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductCard'  
import Navbar from '../components/Navbar';


const DraftsPage = () => {
  const [drafts, setDrafts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDrafts = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            const q = query(collection(fdb, 'drafts'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const draftsData = [];
            querySnapshot.forEach((doc) => {
              draftsData.push({ id: doc.id, ...doc.data() });
            });
            setDrafts(draftsData);
          }
        } catch (error) {
          console.error('Error fetching drafts:', error);
        }
      };

    fetchDrafts();
  }, []);

  const handleEditDraft = (draft) => {
    navigation.navigate('CreateNewListing', { draft });
  };

  const handleDeleteDraft = async (draftId) => {
    try {
      await deleteDoc(collection(fdb, 'drafts', draftId));
      setDrafts(drafts.filter(draft => draft.id !== draftId));
    } catch (error) {
      console.error('Error deleting draft:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Drafts</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={drafts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <ProductCard
            name={item.name}
            price={item.price}
            imageUri={item.imageUri}
            onPress={() => navigation.navigate('CreateNewListing', { draft: item })}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      /> 
      <Navbar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40, // To accommodate the status bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  backButton: {
    paddingHorizontal: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF', // Apple's default blue color
  },
  flatListContainer: {
    alignItems: 'center', // Align items in the center
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff', // Adjust as needed
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#cccccc', // Adjust as needed
  },
});

export default DraftsPage;
