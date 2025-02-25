import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';

interface BookmarkedItem {
  id: string;
  title: string;
}

export default function BookmarksScreen() {
  const [bookmarkedItems, setBookmarkedItems] = useState<BookmarkedItem[]>([]);
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const itemBackgroundColor = useThemeColor({}, 'tint');
  const router = useRouter();

  const fetchBookmarkedItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('bookmarkedItems');
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems) as BookmarkedItem[];

        // Remove duplicates based on id
        const uniqueItems = Array.from(
          new Map(parsedItems.map(item => [item.id, item])).values()
        ) as BookmarkedItem[];

        setBookmarkedItems(uniqueItems);
      } else {
        setBookmarkedItems([]); // Set to empty array when no items are found
      }
    } catch (error) {
      console.error('Error fetching bookmarked items:', error);
      setBookmarkedItems([]); // Set to empty array on error
    }
  };

  useEffect(() => {
    fetchBookmarkedItems();
  }, []);

  const handleItemPress = (id: string) => {
    router.push(`/page2/${id}`);
  };


  const renderItem = ({ item, index }: { item: BookmarkedItem; index: number }) => (
    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
      <ThemedView style={[styles.itemContainer, { backgroundColor: itemBackgroundColor }]} key={`${item.id}-${index}`}>
        <ThemedText style={[styles.itemText, { color: textColor }]}>{`${index + 1}. ${item.title} (ID: ${item.id})`}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );

  // Add a refresh button
  const refreshBookmarks = () => {
    fetchBookmarkedItems();
  };

  const handleBackToPage1 = () => {
    router.push('/page1');
  };

  return (
    <ThemeProvider value={DefaultTheme}>
      <ThemedView style={[styles.container, {backgroundColor: backgroundColor}]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: itemBackgroundColor }]}
          onPress={handleBackToPage1}
          accessibilityLabel="Back to Page 1"
        >
          <ThemedText style={[styles.backButtonText, { color: textColor }]}>Back to Page 1</ThemedText>
        </TouchableOpacity>
        <ThemedText style={[styles.title, { color: textColor }]}>Bookmarks</ThemedText>
        <TouchableOpacity
          style={[styles.refreshButton, { backgroundColor: itemBackgroundColor }]}
          onPress={refreshBookmarks}
          accessibilityLabel="Refresh Bookmarks"
        >
          <ThemedText style={[styles.refreshButtonText, { color: textColor }]}>Refresh</ThemedText>
        </TouchableOpacity>
        {bookmarkedItems.length > 0 ? (
          <FlatList
            data={bookmarkedItems}
            renderItem={renderItem}
            keyExtractor={(item: BookmarkedItem, index: number) => `${item.id}-${index}`}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <ThemedText style={[styles.emptyText, { color: textColor }]}>No bookmarked items</ThemedText>
        )}
      </ThemedView>
    </ThemeProvider>
  );
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  refreshButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  refreshButtonText: {
    textAlign: 'center',
    fontWeight: '600'
  },
  listContent: {
    paddingBottom: 20,
  },
  backButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  backButtonText: {
    textAlign: 'center',
    fontWeight: '600'
  },
});