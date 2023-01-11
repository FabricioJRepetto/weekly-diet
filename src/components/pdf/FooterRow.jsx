import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    footerColumn: {
        flexDirection: 'column',
        width: '100%',
        height: '2cm'
    },
    footerRow: {
        flexDirection: 'row',
        width: '100%',
        height: '1cm',
        borderBottom: '1px solid #000000'
    },
    firstCell: {
        width: '12.5%',
        height: '100%',
        justifyContent: 'center',
        fontFamily: 'Quicksand',
        fontWeight: 700,
        textAlign: 'center',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
    },
    emptyCell: {
        width: '12.5%',
        height: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        borderRight: '1px solid #000000'
    }
});

export const FooterRow = ({ date }) => {
    return (
        <View style={styles.footerColumn}>

            <View style={styles.footerRow}>
                <View style={styles.firstCell}>
                    <Text>Actividad</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.GIM]'}</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.GIM]'}</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.GIM]'}</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.GIM]'}</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.GIM]'}</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.GIM]'}</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.GIM]'}</Text>
                </View>
            </View>

            <View style={styles.footerRow}>
                <View style={styles.firstCell}>
                    <Text>Permitidos</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.CHEAT]'}</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.CHEAT]'}</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.CHEAT]'}</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.CHEAT]'}</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.CHEAT]'}</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.CHEAT]'}</Text>
                </View>
                <View style={styles.emptyCell}>
                    <Text>{'[DATA.CHEAT]'}</Text>
                </View>
            </View>

        </View>
    )
}