import React, { Component } from 'react';
import {Platform, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import Container from './navigation/Navigation';
import BottomNavigation from './navigation/BottomNavigator'
import Home from './view/Home';


export default class App extends Component {
    render() {
        return (
            <SafeAreaView style={styles.droidSafeArea}>
                    <BottomNavigation />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});


