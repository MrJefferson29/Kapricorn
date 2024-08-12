import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const Home = () => {
    const [npkValues, setNpkValues] = useState({
        nitrogen: null,
        phosphorus: null,
        potassium: null,
        crops: [],
    });

    const fetchNpkValues = async () => {
        try {
            const response = await axios.get('http://192.168.1.156:5000/getNPK');
            const { nitrogen, phosphorus, potassium, response: { aiResponse } } = response.data;

            const cropsArray = aiResponse.split('\n').map(crop => crop.trim()).filter(crop => crop);

            setNpkValues({ nitrogen, phosphorus, potassium, crops: cropsArray });
        } catch (error) {
            console.error('Error fetching NPK values and crops:', error);
        }
    };

    useEffect(() => {
        fetchNpkValues();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.profileContainer}>
                <Image
                    source={require("./Assetss/ha.jpg")}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.profileName}>Joseph Penndragon</Text>
                    <Text style={styles.profileEmail}>joeypdragon@gmail.com</Text>
                </View>
            </View>

            <View style={styles.div1}>
                <View style={styles.div2}>
                    <Text style={styles.textLabel}>Nitrogen</Text>
                    <Text style={styles.valueText}>
                        {npkValues.nitrogen !== null ? npkValues.nitrogen : 'Loading...'}
                    </Text>
                </View>
                <View style={styles.div3}>
                    <View style={styles.span1}>
                        <Text style={styles.textLabeld}>Phosphorus</Text>
                        <Text style={styles.valueTextd}>
                            {npkValues.phosphorus !== null ? npkValues.phosphorus : 'Loading...'}
                        </Text>
                    </View>
                    <View style={styles.span2}>
                        <Text style={styles.textLabel}>Potassium</Text>
                        <Text style={styles.valueText}>
                            {npkValues.potassium !== null ? npkValues.potassium : 'Loading...'}
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.wrapperContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.cropsContainer}>
                    <Text style={styles.cropsLabel}>Recommended Crops:</Text>
                    {npkValues.crops.length > 0 ? (
                        npkValues.crops.map((crop, index) => (
                            <View key={index} style={styles.cropCard}>
                                <Text style={styles.cropText}>{crop}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.loadingText}>Loading crops...</Text>
                    )}
                </View>
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        backgroundColor: "#e0f7fa",
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#00796b",
        padding: 20,
        borderRadius: 20,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    profileName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ffffff",
    },
    profileEmail: {
        marginTop: 5,
        fontWeight: "600",
        color: "#b2dfdb",
        fontSize: 16,
    },
    div1: {
        flexDirection: "row",
        width: '100%',
        marginBottom: 20,
    },
    div2: {
        flex: 1,
        height: 240,
        backgroundColor: '#004d40',
        marginRight: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    div3: {
        flex: 1,
        justifyContent: 'space-between',
    },
    span1: {
        height: 115,
        backgroundColor: '#ffa726',
        marginBottom: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    span2: {
        height: 115,
        backgroundColor: '#00695c',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    textLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    valueText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 12,
    },
    textLabeld: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#004d40',
    },
    valueTextd: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#004d40',
        marginTop: 12,
    },
    wrapperContainer: {
        width: '100%',
        marginTop: 10,
    },
    cropsContainer: {
        padding: 20,
        backgroundColor: '#f7f7f7',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
        width: '100%',
    },
    cropsLabel: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    cropCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cropText: {
        fontSize: 18,
        color: '#555',
        fontWeight: '600',
        textAlign: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Home;
