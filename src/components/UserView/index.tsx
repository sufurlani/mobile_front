import { Text, View } from "react-native";
import styles from './styles'

type Props = {
    user: any
}

export default function UserView({ user }: Props) {
    return (
        <View style={styles.container} >
            <Text style={styles.title}>{user.name}</Text>
            <Text style={styles.subTitle}>{user.username}</Text>
        </View>
    )
}