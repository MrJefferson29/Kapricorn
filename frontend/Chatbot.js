import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

const Chatbot = () => {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async () => {
    if (!request.trim()) {
      Alert.alert('Error', 'Please enter a request');
      return;
    }

    setLoading(true);

    try {
      const createResponse = await axios.post('http://192.168.1.156:5000/create-request', { request });
      const promptId = createResponse.data._id;

      const generateResponse = await axios.get(`http://192.168.1.156:5000/create-prompt2/${promptId}`);
      setResponse(generateResponse.data.response);

    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setRequest('');
    setResponse(null);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.chatContainer}>
        <Text style={styles.header}>Ask Roger, the Agricultural AI</Text>
        {loading && <ActivityIndicator size="large" color="#235347" style={styles.loading} />}
        {response && (
          <View style={styles.responseContainer}>
            <Text style={styles.responseHeader}>Response:</Text>
            <Text style={styles.responseText}>{response}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your request"
          placeholderTextColor="#888"
          value={request}
          onChangeText={setRequest}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClear} disabled={loading}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#235347',
  },
  responseContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#0b2b26',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  responseHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#daf1de',
    marginBottom: 8,
  },
  responseText: {
    fontSize: 16,
    color: '#daf1de',
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#051f20',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ffcc80',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#235347',
    fontWeight: 'bold',
  },
  clearButton: {
    marginLeft: 10,
    backgroundColor: '#ff9999',
  },
  loading: {
    marginTop: 20,
  },
});

export default Chatbot;
