import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

export default function Page1() {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setShowButton(true);
    }, 1500);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <LottieView
        source={{ uri: "https://lottie.host/0561c03c-5e26-4b78-8eb0-33006f6f3855/B9btDAyK7I.lottie" }}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />

      <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>Vino App</Text>
      {showButton && (
        <TouchableOpacity
        style={styles.bookmarkPageButton}
        onPress={() => router.push('/bookmarks')}
      >
        <Text style={styles.bookmarkPageButtonText}>Bookmarks</Text>
      </TouchableOpacity>
      )}
       
      {showButton && (
        <TouchableOpacity
          style={styles.gettingStartedButton}
          onPress={() => router.push('/page2')}
        >
          <Text style={styles.gettingStartedButtonText}>Getting Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bookmarkPageButton: {
    marginTop: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  bookmarkPageButtonText: {
    color: 'white',
  },
  gettingStartedButton: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  gettingStartedButtonText: {
    color: 'white',
  },
});