import React, { useState } from 'react';
import { TextInput, Button, View, Text, Alert, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        marginVertical: 10,
    },
});

const Edit = ({ navigation, route }) => {
    const { index, item, setItems } = route.params;
    const [description, setDescription] = useState(item.description);
    const [type, setType] = useState(item.type);
    const [amount, setAmount] = useState(item.amount);

    const handleSave = () => {
        if (!description || !type || !amount) {
            Alert.alert("Error", "Please fill all fields.");
            return;
        }

        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index] = { description, type, amount };
            navigation.navigate('Home', { updatedItems });
            return updatedItems;
        });
    };

    const handleDelete = () => {
        Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
            {
                text: "Yes",
                onPress: () => {
                    setItems((prevItems) => {
                        const updatedItems = prevItems.filter((_, i) => i !== index);
                        navigation.navigate('Home', { updatedItems });
                        return updatedItems;
                    });
                },
            },
            { text: "No" },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.label}>Type:</Text>
            <RNPickerSelect
                value={type}
                onValueChange={setType}
                style={{
                    inputAndroid: styles.input,
                    inputIOS: styles.input,
                }}
                items={[
                    { label: "Income", value: "Income" },
                    { label: "Expense", value: "Expense" },
                ]}
            />

            <Text style={styles.label}>Amount:</Text>
            <TextInput
                style={styles.input}
                value={amount}
                keyboardType="numeric"
                onChangeText={setAmount}
            />

            <View style={styles.buttonContainer}>
                <Button title="Save" onPress={handleSave} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Delete" color="red" onPress={handleDelete} />
            </View>
        </View>
    );
};

export default Edit;
