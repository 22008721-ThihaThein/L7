import React, { useState } from 'react';
import { TextInput, Button, View, Text, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Add = ({ navigation, route }) => {
    const { setItems } = route.params;
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = () => {
        if (!description || !type || !amount) {
            Alert.alert("Error", "Please fill all fields.");
            return;
        }

        const newItem = { description, type, amount };
        setItems((prevItems) => {
            const updatedItems = [...prevItems, newItem];

            navigation.navigate('Home', { updatedItems });
            return updatedItems;
        });
    };


    return (
        <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Description:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                onChangeText={setDescription}
            />

            <Text style={{ fontWeight: 'bold' }}>Type:</Text>
            <RNPickerSelect
                value={type}
                onValueChange={setType}
                items={[
                    { label: "Income", value: "Income" },
                    { label: "Expense", value: "Expense" },
                ]}
            />

            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Amount:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                keyboardType="numeric"
                onChangeText={setAmount}
            />

            <Button title="SUBMIT" onPress={handleSubmit} />
        </View>
    );
};

export default Add;
