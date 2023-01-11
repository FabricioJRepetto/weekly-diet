import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    mealsRow: {
        flexDirection: 'column',
        width: '12.5%',
        height: '100%',
        fontFamily: 'Quicksand',
        fontWeight: 700,
        borderRight: '1px solid #000000'
    },
    bigCell: {
        width: '100%',
        height: '5cm',
        justifyContent: 'center',
        textAlign: 'center',
        borderBottom: '1px solid #000000'
    },
    smallCell: {
        width: '100%',
        height: '2.5cm',
        justifyContent: 'center',
        textAlign: 'center',
        borderBottom: '1px solid #000000'
    }
});

export const MealsColumn = () => (
    <View style={styles.mealsRow}>
        <View style={styles.smallCell}>
            <Text>Desayuno</Text>
        </View>
        <View style={styles.bigCell}>
            <Text>Almuerzo</Text>
        </View>
        <View style={styles.smallCell}>
            <Text>Merienda</Text>
        </View>
        <View style={styles.bigCell}>
            <Text>Cena</Text>
        </View>
    </View>
);