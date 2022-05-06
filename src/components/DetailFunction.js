import React, {useEffect, useState} from 'react';
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
} from 'react-native';
import Loading from './Loading';
import Location from '../models/location';
import {environment} from '../environment';
import autorization from '../services/Autorization';
import {Error} from './Error';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const DetailFunction = () => {
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const isDarkMode = useColorScheme() === 'dark';
    const textStyle = {
        color: isDarkMode ? Colors.lighter : Colors.darker,
    };
    useEffect(() => {
            loadData();
        },
        []);

    useEffect(() => {
    }, []);
    const loadData = () => {
        setError(null);
        setLoading(true);
        fetch(environment.baseURL + 'api/locations/' + 18, autorization)
            .then(res => res.json())
            .then(data => {
                setLocation(new Location(data));
                setLoading(false);
            }).catch(e => setError(e));
    };

    const handleRefresh = () => {
        loadData();
    };
    if (error) {
        return <Error onRefresh={() => loadData()}></Error>;
    }
    return (
        loading ?
            <Loading></Loading>
            : <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={handleRefresh}
                    />
                }><SafeAreaView>
                <TouchableOpacity>
                    <Text style={[textStyle, styles.textTitle]}>{location.name}</Text>
                    <Text style={[textStyle, styles.text]}>{location.contact}</Text>
                </TouchableOpacity>
            </SafeAreaView>
            </ScrollView>
    );
};
export default DetailFunction;

const styles = StyleSheet.create({
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
