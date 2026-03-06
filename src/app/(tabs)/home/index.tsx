import { View, Text, StyleSheet, Button } from 'react-native'
import { fetchTrending } from '@/services/podcast-index'

export default function HomeScreen() {

  const onPress = async () => {
    const data = await fetchTrending();
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>

      <Button title='Fetch trending' onPress={onPress} />
    </View>
  )
}fetchTrending

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
})
