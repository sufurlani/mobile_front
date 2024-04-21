import { Button, Text, View } from "react-native";
import styles from './styles'

type Props = {
    alert: any,
    deletar: (id: number) => void
}

export default function AlertView({ alert, deletar }: Props) {
    return (
        <View style={styles.container} >
            {/* onTouchEnd={() => edit(alert.id)} */}
            <Text style={styles.title}>{alert.name}</Text>
            <Text style={styles.subTitle}>{alert.quantity}</Text>
            <Text style={styles.subTitle}>{alert.datetime}</Text>
            <Button title='X' onPress={() => deletar(alert.id)}></Button>
        </View>
    )
}