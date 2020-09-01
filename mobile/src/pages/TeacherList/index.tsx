import React, { useState } from 'react';
import {View, ScrollView, Text, TextInput, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {RectButton} from 'react-native-gesture-handler';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import {Picker} from '@react-native-community/picker';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import filterIcon from '../../assets/images/icons/filter.png';

import styles from './styles';

function TeacherList() {
    const [ teachers, setTeachers ] = useState([]);
    const [ favorites, setFavorites ] = useState<number[]>([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    
    const [ subject, setSubject ] = useState('');
    const [ week_day, setWeekDay ] = useState('');
    const [ time, setTime ] = useState('');

    const days = [
        { label: 'Domingo', value: '0' },
        { label: 'Segunda', value: '1' },
        { label: 'Terça', value: '2' },
        { label: 'Quarta', value: '3' },
        { label: 'Quinta', value: '4' },
        { label: 'Sexta', value: '5' },
        { label: 'Sábado', value: '6' },
    ]

    function loadFavorites() {
        // banco local
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                
                // salvando apenas os ids dos favoritos
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            }
        });
    };

    useFocusEffect(() => {
        loadFavorites();
    });

    function handleToggleFilterVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        setIsFiltersVisible(false);
        setTeachers(response.data);
    }

    function setDaySearch(itemValue: string) {
        setWeekDay(itemValue);
    }

    return (
            <View  style={styles.container}>
                <PageHeader 
                    title="Proffys Disponíveis" 
                    headerRight={(
                        <BorderlessButton onPress={handleToggleFilterVisible}>
                            <Image source={filterIcon} />
                        </BorderlessButton>
                    )}
                >

                    { isFiltersVisible && (
                        <View style={styles.searchForm}>
                            <Text style={styles.label}>Matéria</Text>
                            <TextInput
                                placeholderTextColor="#c0c0c0" 
                                style={styles.input}
                                placeholder="Qual a matéria"
                                value={subject}
                                onChangeText={text => setSubject(text)}
                            />

                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Dia da semana</Text>
                                    <Picker
                                        selectedValue={week_day}
                                        style={[styles.input, styles.inputWeekTime]}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setDaySearch(String(itemValue))
                                        }
                                    >
                                        {days.map(weekDay => {
                                            return (
                                                <Picker.Item key={weekDay.value} label={weekDay.label} value={weekDay.value} />
                                            )
                                        })}
                                    </Picker>
                                </View>

                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Horário</Text>
                                    <TextInput
                                        placeholderTextColor="#c0c0c0" 
                                        style={[styles.input, styles.inputWeekTime]}
                                        placeholder="Qual horário"
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                    />
                                </View>
                            </View>

                            <RectButton style={styles.btnSearch} onPress={handleFiltersSubmit}>
                                <Text style={styles.textButton}>Filtrar</Text>
                            </RectButton>
                        </View>
                    )}
                </PageHeader>

                <ScrollView 
                    style={styles.teacherList}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingBottom: 16
                    }}
                >
                    {teachers.map((teacher: Teacher) => {
                        return (
                            <TeacherItem 
                                key={teacher.id} 
                                teacher={teacher}
                                favorited={favorites.includes(teacher.id)}
                            />
                        )
                    })}

                </ScrollView>
            </View>
    ) 
}

export default TeacherList;