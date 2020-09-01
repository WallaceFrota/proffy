import React from 'react';
import { StatusBar } from 'react-native';

import AppStack from './routes/AppStack';

export default function App() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#000"/>
            <AppStack />
        </>
    )
}