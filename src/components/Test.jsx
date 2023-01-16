import axios from 'axios'
import { Chart } from 'chart.js/auto'
import React, { useEffect, useState } from 'react'
import { Doughnut, } from 'react-chartjs-2'
import { Line } from 'react-chartjs-2'
import { mergeSort } from './helpers/dateMergeSort'

export const Test = () => {
    // const [loading, setLoading] = useState(true)
    const [dataSet, setDataSet] = useState(false)

    useEffect(() => {
        (async () => {
            const { data, data: { checkpoints } } = await axios(`/history/checkpoint`)
            if (!data.error) {
                // setLoading(false)
                // console.table(checkpoints);
                const aux = mergeSort(checkpoints)
                const data = {
                    labels: aux.map(e => e.date),
                    datasets: [
                        {
                            id: 1,
                            label: 'kg. ',
                            data: aux.map(e => parseFloat(e.weight)),
                        }
                    ],
                }
                setDataSet(() => data)
                draw(aux)
            }
        })()

    }, [])

    const draw = (dataSet) => {
        //: destuir chart con ID 0
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataSet.map(e => e.date),
                datasets: [{
                    label: 'kg. ',
                    data: dataSet.map(e => parseFloat(e.weight)),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    return (
        <div>
            <div>
                <canvas id="myChart"></canvas>
            </div>
            {dataSet && <Doughnut data={dataSet} />}
            {dataSet && <Line data={dataSet} />}
        </div>
    )
}
