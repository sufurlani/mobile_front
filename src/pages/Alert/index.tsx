import React from 'react'
import { Button, View, Alert, FlatList } from 'react-native'
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native'
import { alertService } from '../../services/alert.service'
import AlertView from '../../components/AlertView'

export default function AlertPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const isFocused = useIsFocused();

    navigation.setOptions({
        headerRight: () => <Button title="Adicionar" onPress={goToAlert} />
    })

    const [alerts, setAlerts] = React.useState<any[]>([])

    async function fetchData() {
        const list = await alertService.get()
        if (list)
            setAlerts(list)
        else
            Alert.alert('Forbidden')
    }

    async function deletar(id: number) {
        await alertService.remove(id)
    }

    React.useEffect(() => {
        isFocused && fetchData()
    }, [isFocused])

    function deleteAlert(id: number) {
        Alert.alert('Deletar', 'Deseja deletar esse registro?', [
            {
                text: 'Cancelar',
            },
            { text: 'Sim', onPress: () => { deletar(id), navigation.goBack() } }
        ])
    }

    function goToAlert() {
        navigation.navigate('AlertNew', {})
    }

    return (
        <View>
            <FlatList
                data={alerts}
                renderItem={({ item }) => <AlertView alert={item} deletar={deleteAlert} />}
            />
        </View>
    )
}