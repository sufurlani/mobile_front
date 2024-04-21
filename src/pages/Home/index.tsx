import React from 'react'
import { Button, Text, View, TouchableOpacity } from "react-native"
import { NavigationProp, useNavigation } from '@react-navigation/native'
import styles from './styles'
import dayjs from 'dayjs';
import "dayjs/locale/pt-br";

export default function HomePage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [date, setDate] = React.useState(dayjs())
    dayjs.locale("pt-BR")

    navigation.setOptions({
        headerRight: () => <Button title="Sair" onPress={logOut} />
    })

    React.useEffect(() => {
        setInterval(() => {
            setDate(dayjs());
        }, 1000 * 1);
    }, []);


    function logOut() {
        navigation.goBack()
    }

    function goToUser() {
        navigation.navigate('User', {})
    }

    function goToAlerts() {
        navigation.navigate('Alert', {})
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: '20%', backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 34 }}>{dayjs().format("dddd, DD MMMM")}</Text>
                <Text style={{ fontSize: 34 }}>{dayjs().format("HH:mm")}</Text>
            </View>
            <View style={{ paddingRight: 20, paddingLeft: 20 }}>
                <TouchableOpacity style={styles.to} onPress={goToAlerts}>
                    <Text style={styles.textbox}>Alertas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.to} onPress={goToUser}>
                    <Text style={styles.textbox}>Usuários</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}