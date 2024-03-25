import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigateToScreen('HomeScreen')}>
          <FontAwesome name="home" size={24} color="black" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigateToScreen('SavedProductsScreen')}>
          <FontAwesome name="bookmark" size={24} color="black" />
          <Text style={styles.navText}>Saved</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={styles.navItem} onPress={() => navigateToScreen('InboxScreen')}>
          <FontAwesome name="inbox" size={24} color="black" />
          <Text style={styles.navText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigateToScreen('ProfileScreen')}>
          <FontAwesome name="user" size={24} color="black" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'lightblue',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      navItem: {
        alignItems: 'center',
      },
      navText: {
        marginTop: 5,
      },
});

export default Navbar;