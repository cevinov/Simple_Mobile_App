import React, { useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Item {
  id: string;
  title: string;
  isBookmarked?: boolean;
  description: string;
  image: string;
}

interface BookmarkedItem {
  id: string;
  title: string;
}
export const data = [
  { id: '1', title: 'Fish n Chips', description: 'A serving of fish and chips with a wedge of lemon and garnish of parsley.', image: 'https://i.imgur.com/qIGxzze_d.webp?maxwidth=520&shape=thumb&fidelity=high', isBookmarked: false },
  { id: '2', title: 'Pura Lempuyang Door in Bali', description: 'Pura Penataran Agung Lempuyang is a Balinese Hindu temple.', image: 'https://i.imgur.com/SXp7RmYb.jpg', isBookmarked: false },
  { id: '3', title: 'Goods Item 1', description: 'Short description for goods item 1.', image: 'https://via.placeholder.com/100', isBookmarked: false },
  { id: '4', title: 'Food Item 2', description: 'Short description for food item 2.', image: 'https://via.placeholder.com/100', isBookmarked: false },
  { id: '5', title: 'Tourist Attraction 2', description: 'Short description for tourist attraction 2.', image: 'https://via.placeholder.com/100', isBookmarked: false },
  { id: '6', title: 'Goods Item 2', description: 'Short description for goods item 2.', image: 'https://via.placeholder.com/100', isBookmarked: false },
];

export const ListItem = ({ item }: { item: Item }) => {
const [isBookmarked, setIsBookmarked] = useState(item.isBookmarked || false);
const bookmarkColor = isBookmarked ? 'gold' : 'blue';

const toggleBookmark = async () => {
  const newIsBookmarked = !isBookmarked;
  setIsBookmarked(newIsBookmarked);
  console.log('Bookmark toggled for item:', item.id, 'New state:', newIsBookmarked);

  try {
    let bookmarkedItems: BookmarkedItem[] = [];
    const storedItems = await AsyncStorage.getItem('bookmarkedItems');
    if (storedItems) {
      bookmarkedItems = JSON.parse(storedItems);
    }

    if (newIsBookmarked) {
      bookmarkedItems.push({ id: item.id, title: item.title });
    } else {
      bookmarkedItems = bookmarkedItems.filter((i: BookmarkedItem) => i.id !== item.id);
    }

    await AsyncStorage.setItem('bookmarkedItems', JSON.stringify(bookmarkedItems));
    console.log('Updated bookmarked items:', bookmarkedItems); // Log the updated items
    } catch (error) {
      console.error('Error updating bookmarked items:', error);
    }
  };

  return (
    <View style={styles.listItemContainer}>
      <Image source={{ uri: item.image }} style={styles.listImage} />
      <View style={styles.listItemTextContainer}>
        <Text style={styles.listItemTitle}>{item.title}</Text>
        <Text style={styles.listItemDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.bookmarkButton} onPress={toggleBookmark}>
        <IconSymbol name="star" size={24} color={bookmarkColor} />
      </TouchableOpacity>
    </View>
  );
};

export default function Page2Screen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity onPress={() => { router.push(`/page2/${item.id}`); }}>
      <ListItem item={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Item List</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#f0f0f0', // Light background color
    paddingHorizontal: 20, // Horizontal padding
  },
  listItemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white', // White background for list items
    borderRadius: 8, // Rounded corners for list items
    marginBottom: 10, // Spacing between list items
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 2,
    alignItems: 'center',
  },
  listImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8, // Rounded corners for images
  },
  listItemTextContainer: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 20, // Slightly larger title
    fontWeight: 'bold',
  },
  listItemDescription: {
    fontSize: 14,
    color: '#555', // Darker gray description
  },
  logoutButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: 'red', // Blue logout button
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight:'bold',
  },
  bookmarkButton: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  bookmarkButtonText: {
    color: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});