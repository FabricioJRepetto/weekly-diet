import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFDocument } from './pdf/PDFDocument';
import { BiDownload } from "react-icons/bi";

import '../App.css'

export const PDF = ({ data }) => {
    return (
        <PDFDownloadLink
            document={<PDFDocument data={data} />}
            fileName='Dieta Semanal'
        >
            {({ loading }) => <button disabled={loading} className='button'><BiDownload className='icon i-margin-r' /> descargar</button>}
        </PDFDownloadLink>
    )
};