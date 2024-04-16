import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { doc, getDoc } from "firebase/firestore";
import { fdb } from '../config/firebaseSetup';
import Navbar from '../components/Navbar'; // Import the Navbar component

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(fdb, 'products', productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log('No such product document!');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const goToNextImage = () => {
    if (currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const renderImage = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={styles.productImage}
      resizeMode="cover"
    />
  );

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      
      <View style={styles.carouselContainer}>
        <TouchableOpacity onPress={goToPreviousImage} style={[styles.navigationButton, { left: 0 }]}>
          <Text style={styles.navigationButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <FlatList
          data={product.images}
          renderItem={renderImage}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          getItemLayout={(data, index) => ({
            length: styles.productImage.width,
            offset: styles.productImage.width * index,
            index,
          })}
          initialScrollIndex={currentImageIndex}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.floor(event.nativeEvent.contentOffset.x / styles.productImage.width);
            setCurrentImageIndex(newIndex);
          }}
        />

        <TouchableOpacity onPress={goToNextImage} style={[styles.navigationButton, { right: 0 }]}>
          <Text style={styles.navigationButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>Price: ${product.price}</Text>
        <Text style={styles.productCondition}>Condition: {product.condition}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.productTags}>Tags: {product.tags}</Text>
      </View>
      
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: '#000',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 10,
  },
  productCondition: {
    fontSize: 16,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  productTags: {
    fontSize: 16,
    marginBottom: 10,
  },
  carouselContainer: {
    height: 200,
    marginBottom: 20,
  },
  productImage: {
    width: 300, // Adjust the width of each image as needed
    height: '100%', // Make each image take up the full height of the carousel
  },
  navigationButton: {
    position: 'absolute',
    top: '50%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    zIndex: 2,
  },
  navigationButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default ProductDetailScreen;
