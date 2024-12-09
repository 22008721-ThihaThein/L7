import React, { useState, useEffect } from 'react';
import { StatusBar, Button, FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    incomeStyle: {
        color: 'green',
    },
    expenseStyle: {
        color: 'red',
    },
    buttonContainer: {
        margin: 10,
    },
});

const Home = ({ navigation, route }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (route.params?.updatedItems) {
            setItems(route.params.updatedItems);
        }
    }, [route.params?.updatedItems]);

    const calculateSummary = () => {
        let totalIncome = 0;
        let totalExpense = 0;

        items.forEach((item) => {
            if (item.type === 'Income') {
                totalIncome += parseFloat(item.amount);
            } else if (item.type === 'Expense') {
                totalExpense += parseFloat(item.amount);
            }
        });

        const balance = totalIncome - totalExpense;
        Alert.alert(
            "Summary",
            `Total Income: $${totalIncome.toFixed(2)}\nTotal Expense: $${totalExpense.toFixed(2)}\n` +
            `${balance >= 0 ? "Surplus" : "Deficit"}: $${Math.abs(balance).toFixed(2)}`,
            [{ text: "OK" }]
        );
    };

    return (
        <View>
            <StatusBar />
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Edit", {
                                index,
                                item,
                                setItems,
                            })
                        }
                    >
                        <Text
                            style={[
                                styles.textStyle,
                                item.type === 'Income' ? styles.incomeStyle : styles.expenseStyle,
                            ]}
                        >
                            {`${item.description} - ${item.type} - $${item.amount}`}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.buttonContainer}>
                <Button title="New Income/Expense" onPress={() => navigation.navigate('Add', { setItems })} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Total Income/Expense" onPress={calculateSummary} />
            </View>
        </View>
    );
};

export default Home;
