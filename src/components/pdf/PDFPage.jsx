import React from 'react'
import { Page, View, StyleSheet, Font } from '@react-pdf/renderer';
import { HeaderRow } from './HeaderRow';
import { MealsColumn } from './MealsColumn';
import { DayColumn } from './DayColumn';
import { FooterRow } from './FooterRow';

Font.register({
    family: 'Quicksand',
    fonts: [
        {
            src: "https://fonts.gstatic.com/s/quicksand/v30/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o18G0wx40QDw.ttf"
        },
        {
            src: "https://fonts.gstatic.com/s/quicksand/v30/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkKEo18G0wx40QDw.ttf",
            fontWeight: 300
        },
        {
            src: 'https://fonts.gstatic.com/s/quicksand/v30/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkBgv18G0wx40QDw.ttf',
            fontWeight: 700
        }
    ]
})

Font.registerHyphenationCallback(w => [w]);

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: '.5cm',
        fontSize: '12',
        fontFamily: 'Quicksand',
        fontWeight: 300,
        backgroundColor: '#ffffff'
    },
    body: {
        flexDirection: 'row',
        width: '100%',
        height: '15cm',
        borderLeft: '1px solid #000000'
    },
    mealsRow: {
        flexDirection: 'column',
        width: '12.5%',
        height: '100%',
        fontFamily: 'Quicksand',
        fontWeight: 700,
        borderRight: '1px solid #000000'
    },
    cell: {
        width: '12.5%',
        height: '100%',
        fontSize: '10',
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

export const PDFPage = ({ data, date }) => {
    // console.log(data);
    return (
        <Page size="A4" orientation='landscape' wrap={false} style={styles.page}>
            <HeaderRow date={date} />
            <View style={styles.body}>
                <MealsColumn />
                {data.map((d, i) =>
                    <DayColumn data={d} key={Date.now() + i} />)
                }
            </View>
            <FooterRow data={false} />
        </Page>
    )
}
