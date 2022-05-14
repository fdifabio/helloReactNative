import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native';
import ItemSeparator from './ItemSeparator';
import {environment} from '../environment';
import Location from '../models/location';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const List = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const textStyle = {
        color: isDarkMode ? Colors.lighter : Colors.darker,
    };

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const handleRefresh = () => {
        loadData();
    };

    const loadData = () => {
        setLoading(true);
        setLocations([
            new Location({
                id: 1, name: "Viedma", contact: "2920553263",
                linkInfo: "link info", latitude: 23.34, longitude: 23.4,
            }),
            new Location({
                id: 2, name: "Carmen de patagones", contact: "292054325232",
                linkInfo: "link info patagones", latitude: 23.34, longitude: 23.4,
            }),
        ]);
        setLoading(false);
    };

    const renderItemComponent = (location) =>
        <TouchableOpacity style={styles.container}>
            <Text style={[textStyle, styles.textTitle]}>{location.name}</Text>
            <Text style={[textStyle, styles.textTitle]}>{location.contact}</Text>
        </TouchableOpacity>;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={locations}
                      renderItem={info => renderItemComponent(info.item)}
                      keyExtractor={location => location.id}
                      ItemSeparatorComponent={() => <ItemSeparator/>}
                      refreshing={loading}
                      onRefresh={handleRefresh}
            ></FlatList>

        </SafeAreaView>
    );
};

export default List;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 8,
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
    },
    text: {
        flex: 1,
        textAlign: 'justify',
    },
});
