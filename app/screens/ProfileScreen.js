import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { fdb } from '../config/firebaseSetup';
import Navbar from '../components/Navbar'; 
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ route }) => { 
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null); 

  const goToDrafts = () => {
    navigation.navigate('DraftsPage');
  };

  const handleEditProfile = () => {

    navigation.navigate('EditProfileScreen', {userId: user.uid}); // Navigate to EditProfileScreen

  };

  const handleCreateNewListing = () => {
    navigation.navigate('CreateNewListing');
  };


  const fetchUserData = async (userId) => {
    try {
      const docRef = doc(fdb, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) { 
        const userData = docSnap.data();
        setUserData(userData);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const fetchProducts = async (userId) => {
    try {
        const q = query(collection(fdb, 'products'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
    
        const productsList = [];
        querySnapshot.forEach((doc) => {
          productsList.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsList);
    
        if (querySnapshot.empty) {
          console.log('No products listed by the user.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
      /*const fetchUpdatedProfileData = async (userId) => {
        try {*/
  };

  useEffect(() => {
    const success = route.params?.setSuccess;
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(success){
            setUserData(null);
            fetchUserData(user.uid);
          }
      if (user) {
        setUser(user);
        fetchUserData(user.uid);
        fetchProducts(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.userImg}
            source={{
              uri: userData?.userImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsvRezh6gJwbRNHueze-bhw3PmbmIX4KoLcw&usqp=CAU',
            }}
          />
          <Text style={styles.userName}>{userData?.fname || 'Test'} {userData?.lname || 'User'}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.draftButton} onPress={goToDrafts}>
            <Text style={styles.draftButtonText}>Drafts</Text>
          </TouchableOpacity>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productContainer}
              onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
            >
              <View style={styles.productImageContainer}>
                <Image
                  source={{ uri: product.images[0] }}
                  style={styles.productThumbnail}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const numColumns = 3;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#2e64e5',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  draftButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    width: (Dimensions.get('window').width - 60) / numColumns,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  draftButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2e64e5',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  productContainer: {
    width: (Dimensions.get('window').width - 60) / numColumns,
    marginBottom: 10,
  },
  productImageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  productThumbnail: {
    width: '100%',
    height: 150,
  },
});
