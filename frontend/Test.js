// src/NpkSensorData.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const Test = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchNpkData();
  }, []);

  const fetchNpkData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/npk');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching NPK data:', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>Nitrogen: {item.nitrogen}</Text>
      <Text style={styles.text}>Phosphorus: {item.phosphorus}</Text>
      <Text style={styles.text}>Potassium: {item.potassium}</Text>
      <Text style={styles.text}>AI Response: {item.aiResponse}</Text>
      <Text style={styles.timestamp}>Timestamp: {new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NPK Sensor Data</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 14,
    color: '#888',
  },
});

export default Test;
