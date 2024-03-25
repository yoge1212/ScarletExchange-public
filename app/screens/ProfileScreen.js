import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
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

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen'); // Navigate to EditProfileScreen
  };

  const handleCreateNewListing = () => {
    navigation.navigate('CreateNewListing'); // Navigate to CreateNewListingScreen
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.uid);
        fetchProducts(user.uid);
      } else {
        setUser(null);
        // Handle if the user is not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const docRef = doc(fdb, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
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
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        {user && (
          <>
            <Image
              style={styles.userImg}
              source={{
                uri: userData?.userImg || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsvRezh6gJwbRNHueze-bhw3PmbmIX4KoLcw&usqp=CAU',
              }} 
              defaultSource={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsvRezh6gJwbRNHueze-bhw3PmbmIX4KoLcw&usqp=CAU'}
            />
            <Text style={styles.userName}>{userData?.fname || 'Test'} {userData?.lname || 'User'}</Text>
            <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
              <Text style={styles.actionButtonText}>Edit Profile</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.actionButton} onPress={handleCreateNewListing}>
              <Text style={styles.actionButtonText}>Create New Listing</Text>
            </TouchableOpacity>
            <View style={styles.userInfoWrapper}>
              <View style={styles.userInfoItem}>
              </View>
              {/* Add more user info items as needed */}
            </View>
            {products.length === 0 ? (
              <Text>No products listed by the user.</Text>
            ) : 
              products.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productContainer}
                  onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
                >
                  <Image
                    source={{ uri: product.thumbnail }}
                    style={styles.productThumbnail}
                  />
                </TouchableOpacity>
              ))
            }
          </>
        )}
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  actionButton: {
    backgroundColor: '#2e64e5',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});