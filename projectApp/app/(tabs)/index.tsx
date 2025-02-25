import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Good Day !!!</Text>

      <View style={styles.buttonContainer}>
        <Link href="/page1" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Light background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40, // Add padding
  },
  text: {
    color: 'black', // Dark text
    fontSize: 32, // Larger font size
    fontWeight: 'bold', // Bold font weight
    textAlign: 'center', // Center text
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30, // Increased margin top
  },
  button: {
    backgroundColor: '#00aaff', // Lighter blue button
    paddingVertical: 12, // Increased vertical padding
    paddingHorizontal: 25, // Increased horizontal padding
    marginHorizontal: 10, // Increased horizontal margin
    borderRadius: 8, // More rounded corners
  },
  buttonText: {
    color: 'white', // White button text
    fontSize: 18, // Larger button text font size
  },
});
