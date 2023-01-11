import { PDFDownloadLink } from '@react-pdf/renderer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PDFDocument } from './pdf/PDFDocument';
import { Spinner } from './Spinner';

import '../App.css'

export const PDFtest = ({ data }) => {
    // const [data, setData] = useState(false)
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     (async () => {
    //         const { data } = await axios(`/history/allweeks`)
    //         // console.log(data);
    //         if (!data.error) setData(() => data.response)
    //         setLoading(false)
    //     })()
    // }, [])
    return (
        <PDFDownloadLink
            document={<PDFDocument data={data} />}
            fileName='Dieta Semanal'
        >
            {({ loading }) => (loading ? <Spinner /> : <button className='button'>descargar</button>)}
        </PDFDownloadLink>
    )
};