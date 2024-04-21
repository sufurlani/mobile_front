import React from 'react'
import { Button, View, Alert } from 'react-native'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import MyInput from '../../components/MyInput'
import styles from './styles'
import { alertService } from '../../services/alert.service'

export default function AlertNewPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    //const route = useRoute<RouteProp<any>>()

    const [name, setName] = React.useState('')
    const [quantity, setQuantity] = React.useState('')
    const [dateTime, setDateTime] = React.useState('')

    function save() {
        if (!name || name.trim().length < 1) {
            Alert.alert('Nome do medicamento é obrigatório')
            return
        }
        if (!quantity || quantity.trim().length < 1) {
            Alert.alert('Quantidade é obrigatória')
            return
        }
        if (!dateTime || dateTime.trim().length < 1) {
            Alert.alert('Data/Hora é obrigatório')
            return
        }

        alertService.create(name, quantity, dateTime).then(result => {
            if (result === true) {
                setName('')
                setQuantity('')
                setDateTime('')
                navigation.goBack()
            } else {
                Alert.alert(result + '')
            }
        }).catch(error => console.error(error))
    }

    return (
        <View style={styles.container}>
            <MyInput title='Nome do Medicamento' value={name} change={setName} />
            <MyInput title='Quantidade' value={quantity} change={setQuantity} />
            <MyInput title='Data/Hora' value={dateTime} change={setDateTime} />
            <View style={styles.buttonView}>
                <Button title='Salvar' onPress={save} />
            </View>

            {/* <View style={styles.buttonView && { opacity: route.params?.id ? 0 : 100 }}>
                <Button title='Salvar' onPress={save} />
            </View> */}
        </View>
    )
}
