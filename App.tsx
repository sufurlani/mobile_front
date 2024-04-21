import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginPage from './src/pages/Login'
import HomePage from './src/pages/Home'
import UserPage from './src/pages/User'
import AlertPage from './src/pages/Alert'
import AlertNewPage from './src/pages/Alert/new'
import UserNewPage from './src/pages/User/new'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} options={{ title: 'MediAlerta' }} />
                <Stack.Screen name="Home" component={HomePage} options={{ title: 'Home' }} />
                <Stack.Screen name="User" component={UserPage} options={{ title: 'Usuário' }} />
                <Stack.Screen name="UserNew" component={UserNewPage} options={{ title: 'Novo Usuário' }} />
                <Stack.Screen name="Alert" component={AlertPage} options={{ title: 'Alertas' }} />
                <Stack.Screen name="AlertNew" component={AlertNewPage} options={{ title: 'Novo Alerta' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
