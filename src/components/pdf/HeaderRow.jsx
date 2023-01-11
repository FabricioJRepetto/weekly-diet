import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        height: '1cm',
        fontWeight: 'bold',
        borderTop: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderBottom: '1px solid #000000'
    },
    headCell: {
        width: '12.5%',
        height: '100%',
        justifyContent: 'center',
        fontFamily: 'Quicksand',
        fontWeight: 700,
        textAlign: 'center',
        borderRight: '1px solid #000000'
    }
});

export const HeaderRow = ({ date }) => {
    return (
        <View style={styles.header}>
            <View style={styles.headCell}>
                <Text>{date || '[FECHA]'}</Text>
            </View>
            <View style={styles.headCell}>
                <Text>Lunes</Text>
            </View>
            <View style={styles.headCell}>
                <Text>Martes</Text>
            </View>
            <View style={styles.headCell}>
                <Text>Miercoles</Text>
            </View>
            <View style={styles.headCell}>
                <Text>Jueves</Text>
            </View>
            <View style={styles.headCell}>
                <Text>Viernes</Text>
            </View>
            <View style={styles.headCell}>
                <Text>Sábado</Text>
            </View>
            <View style={styles.headCell}>
                <Text>Domingo</Text>
            </View>
        </View>
    )
}
