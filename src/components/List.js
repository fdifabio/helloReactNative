import React, {Component} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ItemSeparator from './ItemSeparator';
import autorization from '../services/Autorization';
import {environment} from '../environment';
import Location from '../models/location';
import {Error} from './Error';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({error: null,loading: true});
        fetch(environment.baseURL + 'api/locations', autorization)
            .then(res => res.json())
            .then(data => {
                let locations = data?.map(l => new Location(l));
                this.setState({locations: locations});
                this.setState({loading: false});
            }).catch(e => this.setState({error: e}));
    }

    renderItemComponent = (data) =>
        <TouchableOpacity style={styles.container}>
            <Text style={styles.textTitle}>{data.item.name}</Text>
            <Text style={styles.text}>{data.item.contact}</Text>
        </TouchableOpacity>;

    handleRefresh = () => {
        this.loadData();
    };

    render() {
        const {error, locations, loading} = this.state;
        if (error) {
            return <Error onRefresh={() => this.loadData()}></Error>
        }
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={locations}
                    renderItem={location => this.renderItemComponent(location)}
                    keyExtractor={location => location.id.toString()}
                    ItemSeparatorComponent={() => <ItemSeparator/>}
                    refreshing={loading}
                    onRefresh={this.handleRefresh}
                />
            </SafeAreaView>);
    }
}

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
