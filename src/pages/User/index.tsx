import React from 'react'
import { Button, View, Alert, FlatList } from 'react-native'
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native'
import { userService } from '../../services/user.service'
import UserView from '../../components/UserView'

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const isFocused = useIsFocused();

    navigation.setOptions({
        headerRight: () => <Button title="Novo Usuário" onPress={goToUser} />
    })

    const [users, setUsers] = React.useState<any[]>([])

    async function fetchData() {
        const list = await userService.get()
        if (list)
            setUsers(list)
        else
            Alert.alert('Forbidden')
    }

    React.useEffect(() => {
        isFocused && fetchData()
    }, [isFocused])


    function goToUser() {
        navigation.navigate('UserNew', {})
    }

    return (
        <View>
            <FlatList
                data={users}
                renderItem={({ item }) => <UserView user={item} />}
            />
        </View>
    )
}