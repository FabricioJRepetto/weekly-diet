import React from 'react'
import { Document } from '@react-pdf/renderer';
import { PDFPage } from './PDFPage';


export const PDFDocument = ({ data }) => {
    // console.log(data);
    return (
        <Document>
            {data.map((w, i) => <PDFPage data={w.weekDays} date={w.dates.start} key={i} />)}
        </Document>
    )
}
