import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface Item {
  id: string;
  title: string;
  description: string;
  image: string;
  history: string;
}

const data: Item[] = [
  { id: '1', title: 'Fish n Chips', description: 'A serving of fish and chips with a wedge of lemon and garnish of parsley', image: 'https://i.imgur.com/qIGxzze_d.webp?maxwidth=520&shape=thumb&fidelity=high', history: 'Most people think that Fish and Chips originated in England, this is not actually true. The real history of Fish and Chips is traced back to 15th Century Portugal where the dish really was invented. Like so many other famous dishes, fish and chips was created out of necessity, not culinary genius.' },
  { id: '2', title: 'Pura Lempuyang Door in Bali', description: 'Pura Penataran Agung Lempuyang is a Balinese Hindu temple.', image: 'https://i.imgur.com/SXp7RmYb.jpg', history: 'It is the first and lowest temple of the complex of temples called Pura Lempuyang. The highest of these temples, Pura Lempuyang Luhur, is one of the Sad Kahyangan Jagad or "six sanctuaries of the world".' },
  { id: '3', title: 'Goods Item 1', description: 'Short description for goods item 1.', image: 'https://via.placeholder.com/200', history: 'History of Goods Item 1...' },
  { id: '4', title: 'Food Item 2', description: 'Short description for food item 2.', image: 'https://via.placeholder.com/200', history: 'History of Food Item 2...' },
  { id: '5', title: 'Tourist Attraction 2', description: 'Short description for tourist attraction 2.', image: 'https://via.placeholder.com/200', history: 'History of Tourist Attraction 2...' },
  { id: '6', title: 'Goods Item 2', description: 'Short description for goods item 2.', image: 'https://via.placeholder.com/200', history: 'History of Goods Item 2...' },
];

export default function ItemDetailPage() {
  const { id } = useLocalSearchParams();
  const item = data.find(item => item.id === id);
  const router = useRouter(); // Add useRouter here


  if (!item) {
    return <Text>Item not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.history}>{item.history}</Text>
       <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/page2')}
      >
        <Text style={styles.backButtonText}>Back to List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingHorizontal: 30, // Add horizontal padding
    backgroundColor: 'white', // Light background color
  },
  image: {
    width: 250, // Increase image width
    height: 250, // Increase image height
    marginBottom: 20,
    borderRadius: 10, // Add rounded corners to image
  },
  title: {
    fontSize: 28, // Increase title font size
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000', // Black title color
  },
  description: {
    fontSize: 18, // Increase description font size
    lineHeight: 24, // Improve description line spacing
    color: '#222', // Darker description color
    textAlign: 'justify', // Justify text
  },
  history: {
    fontSize: 16, // Increase history font size
    textAlign: 'justify',
    marginTop: 20,
    color: '#333', // Darker history color
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#007bff', // Blue back button
    padding: 12, // Increase back button padding
    borderRadius: 8, // More rounded back button
  },
  backButtonText: {
    color: 'white',
    fontSize: 16, // Increase back button text font size
    textAlign: 'center',
  },
});