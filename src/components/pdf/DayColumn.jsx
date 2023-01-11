import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'


const styles = StyleSheet.create({
    dayColumn: {
        flexDirection: 'column',
        width: '12.5%',
        height: '100%',
        fontSize: '10',
        borderRight: '1px solid #000000'
    },
    bigCell: {
        textIndent: '0%',
        padding: '5',
        width: '100%',
        height: '5cm',
        borderBottom: '1px solid #000000'
    },
    smallCell: {
        textIndent: '0%',
        padding: '5',
        width: '100%',
        height: '2.5cm',
        borderBottom: '1px solid #000000'
    },
    vegc: {
        height: '.5cm',
        justifyContent: 'center',
        textAlign: 'right',
        fontFamily: 'Quicksand',
        fontWeight: 700,
        color: '#FEBE8C'
    }
});

export const DayColumn = ({ data }) => {
    const vegetalesC = [
        'Papa',
        'Puré de papa',
        'Batata',
        'Puré de batata',
        'Choclo',
        'Mandioca'
    ]

    const stringer = (n) => {
        const e = data[n],
            food = e.foods.join(', '),
            prot = e.protein.filter(e => !/\(/g.test(e)).join(', '),
            carb = e.carbohydrate.filter(e => !/\(/g.test(e)).join(', '),
            veg = e.vegetal.filter(e => !/\(/g.test(e)).join(', '),
            string = `${food ? food + ',' : ''} ${prot ? prot + ',' : ''} ${carb ? carb + ',' : ''} ${veg ? veg : ''}`.replace(',', ', ');

        let vegC = false

        e.carbohydrate.forEach(e => {
            if (vegetalesC.includes(e)) vegC = true
        });

        return {
            m: string,
            vegC
        }
    }

    const lunch = data[0] ? stringer(0) : false
    const dinner = data[1] ? stringer(1) : false

    return (
        <View style={styles.dayColumn}>
            <View style={styles.smallCell}>
                <Text style={styles.vegc}>{'[DATA.VEGC]'}</Text>
                <Text>{'[DATA.DESAYUNO]'}</Text>
            </View>
            <View style={styles.bigCell}>
                <Text style={styles.vegc}>{lunch && (lunch.vegC ? 'Veg. C' : '')}</Text>
                <Text>{lunch ? lunch.m : ''}</Text>
            </View>
            <View style={styles.smallCell}>
                <Text style={styles.vegc}>{'[DATA.VEGC]'}</Text>
                <Text>{'[DATA.MERIENDA]'}</Text>
            </View>
            <View style={styles.bigCell}>
                <Text style={styles.vegc}>{dinner && (dinner.vegC ? 'Veg. C' : '')}</Text>
                <Text>{dinner ? dinner.m : ''}</Text>
            </View>
        </View>
    )
};