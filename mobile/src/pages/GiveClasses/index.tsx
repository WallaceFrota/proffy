import React from 'react';
import { View, ImageBackground,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';

import giveClassesBackground from '../../assets/images/give-classes-background.png';

import styles from './styles';

function GiveClasses() {
    const {goBack} = useNavigation();

    function handleBackButton() {
        goBack();
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                resizeMode="contain" 
                style={styles.content} 
                source={giveClassesBackground}
            >
                <Text style={styles.title}>Quer ser um Proffy?</Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>
            <RectButton style={styles.button} onPress={handleBackButton}>
                    <Text style={styles.textButton}>Tudo bem</Text>
            </RectButton>
        </View>
    )
};

export default GiveClasses;