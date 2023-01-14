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
    },
    emptyCell: {
        width: '100%',
        height: '1cm',
        justifyContent: 'center',
        textAlign: 'center',
        borderBottom: '1px solid #000000'
    }
});

export const DayColumn = ({ data }) => {
    console.log(data);

    const {
        afternoonsnack,
        breakfast,
        lunch,
        dinner,
        workOut,
        cheatFood
    } = data || false

    const stringer = (e) => {
        if (e) {
            const food = e.foods.join(', '),
                prot = e.protein.filter(e => !/\(/g.test(e)).join(', '),
                carb = e.carbohydrate.filter(e => !/\(/g.test(e)).join(', '),
                veg = e.vegetal.filter(e => !/\(/g.test(e)).join(', '),
                string = `${food ? food + ',' : ''} ${prot ? prot + ',' : ''} ${carb ? carb + ',' : ''} ${veg ? veg : ''}`.replace(',', ', ');

            let vegC = e?.vegetalC

            return {
                m: string || '',
                vegC: vegC || false
            }
        }
        return {
            m: '',
            vegC: false
        }
    }

    const simpleStringer = (e) => {
        if (e) {
            const string = e.join(', ');

            return string || ''
        }
        return ''
    }

    const Bstring = stringer(breakfast)
    const Lstring = stringer(lunch)
    const Astring = stringer(afternoonsnack)
    const Dstring = stringer(dinner)
    const Wstring = simpleStringer(workOut)
    const Cstring = simpleStringer(cheatFood)

    return (
        <View style={styles.dayColumn}>
            <View style={styles.smallCell}>
                <Text style={styles.vegc}>{Bstring.vegC ? 'Veg.C' : ''}</Text>
                <Text>{Bstring.m}</Text>
            </View>
            <View style={styles.bigCell}>
                <Text style={styles.vegc}>{Lstring.vegC ? 'Veg. C' : ''}</Text>
                <Text>{Lstring.m}</Text>
            </View>
            <View style={styles.smallCell}>
                <Text style={styles.vegc}>{Astring.vegC ? 'Veg.C' : ''}</Text>
                <Text>{Astring.m}</Text>
            </View>
            <View style={styles.bigCell}>
                <Text style={styles.vegc}>{Dstring.vegC ? 'Veg. C' : ''}</Text>
                <Text>{Dstring.m}</Text>
            </View>

            <View style={styles.emptyCell}>
                <Text>{Wstring}</Text>
            </View>
            <View style={styles.emptyCell}>
                <Text>{Cstring}</Text>
            </View>
        </View>
    )
};