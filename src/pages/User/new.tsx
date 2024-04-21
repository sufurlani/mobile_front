import React from 'react'
import { Button, View, Alert } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import MyInput from '../../components/MyInput'
import styles from './styles'
import { userService } from '../../services/user.service'

export default function UserNewPage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPass, setConfirmPass] = React.useState('')

    function save() {
        if (!name || name.trim().length < 1) {
            Alert.alert('Nome é obrigatório')
            return
        }
        if (!username || username.trim().length < 1) {
            Alert.alert('Login é obrigatório')
            return
        }
        if (!password || password.trim().length < 1) {
            Alert.alert('Senha é obrigatória')
            return
        }
        if (password !== confirmPass) {
            Alert.alert('Senha não confere')
            return
        }

        userService.create(name, username, password).then(result => {
            if (result === true) {
                setName('')
                setUsername('')
                setPassword('')
                setConfirmPass('')
                navigation.goBack()
            } else {
                Alert.alert(result + '')
            }
        }).catch(error => console.error(error))
    }

    return (
        <View style={styles.container}>
            <MyInput title='Nome' value={name} change={setName} />
            <MyInput title='Login' value={username} change={setUsername} />
            <MyInput title='Senha' value={password} change={setPassword} isPassword />
            <MyInput title='Confirmar Senha' value={confirmPass} change={setConfirmPass} isPassword />

            <View style={styles.buttonView}>
                <Button title='Salvar' onPress={save} />
            </View>

        </View>
    )
}