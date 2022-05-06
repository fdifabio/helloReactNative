import React, {Component} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {environment} from '../environment';
import autorization from '../services/Autorization';
import Location from '../models/location';
import Loading from './Loading';
import ItemSeparator from './ItemSeparator';
import {Error} from './Error';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({error: null, loading: true});
        fetch(environment.baseURL + 'api/locations/' + 19, autorization)
            .then(res => res.json())
            .then(data => {
                this.setState({location: new Location(data)});
                this.setState({loading: false});
            }).catch(e => this.setState({error: e}));
    }

    handleRefresh = () => {
        this.loadData();
    };

    render() {
        const {error, location, loading} = this.state;
        if (error) {
            return <Error onRefresh={() => this.loadData()}></Error>;
        }
        return (
            loading ?
                <Loading></Loading>
                : <SafeAreaView>
                    <ScrollView
                        contentContainerStyle={styles.scrollView}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={this.handleRefresh}
                            />
                        }
                    >
                        <TouchableOpacity style={styles.container}>
                            <Text style={styles.textTitle}>{location.name}</Text>
                            <Text style={styles.text}>{location.contact}</Text>
                        </TouchableOpacity>
                        <ItemSeparator/>
                    </ScrollView>
                </SafeAreaView>
        );
    }
}

export default Detail;
const styles = StyleSheet.create({
    container: {
        height: 300,
        flex: 1,
        margin: 10,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 8,
    },
    textTitle: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
    },
    text: {
        color: '#000',
        flex: 1,
        textAlign: 'justify',
    },
});
