const protein = [{
    color: '#9b6d6d',
    name: 'Carne roja'
},
{
    color: '#f1d490',
    name: 'Pollo'
},
{
    color: '#bbc8ca',
    name: 'Pescado'
},
{
    color: '#f6c9c9',
    name: 'Cerdo'
},
{
    color: 'white',
    name: 'Huevo'
}],
    carbo = [{
        color: '#7f6341',
        name: 'Fideos integrales'
    },
    {
        color: '#ffe7ab',
        name: 'Rabioles'
    },
    {
        color: '#f6ead3',
        name: 'Arroz integral'
    },
    {
        color: '#f4d392',
        name: 'Garbanzos'
    },
    {
        color: '#78b854',
        name: 'Arvejas'
    },
    {
        color: '#f4e88d',
        name: 'Porotos'
    },
    {
        color: '#8c5f47',
        name: 'Lentejas'
    },
    {
        color: '#ffd271',
        name: 'Pizza'
    },
    {
        color: '#f6dfa2',
        name: 'Empanadas'
    },
    {
        color: '#ffe59c',
        name: 'Tartas'
    },
    {
        color: '#FFFFFF',
        name: 'Masas en gral.'
    }],
    vegA = [{
        color: '#4d7c37',
        group: 'A',
        name: 'Acelga'
    },
    {
        color: '#4d7c37',
        group: 'A',
        name: 'Achicoria'
    },
    {
        color: '#dd2e2e',
        group: 'A',
        name: 'Ají'
    },
    {
        color: '#94d662',
        group: 'A',
        name: 'Apio'
    },
    {
        color: '#67297e',
        group: 'A',
        name: 'Berenjena'
    },
    {
        color: '#5fab45',
        group: 'A',
        name: 'Berro'
    },
    {
        color: '#4d7c37',
        group: 'A',
        name: 'Brócoli'
    },
    {
        color: '#FFFFFF',
        group: 'A',
        name: 'Coliflor'
    },
    {
        color: '#4d7c37',
        group: 'A',
        name: 'Espinaca'
    },
    {
        color: '#4d7c37',
        group: 'A',
        name: 'Rúcula'
    },
    {
        color: '#4d7c37',
        group: 'A',
        name: 'Esparrago'
    },
    {
        color: '#FFFFFF',
        group: 'A',
        name: 'Hinojo'
    },
    {
        color: '#ccbaa9',
        group: 'A',
        name: 'Hongos'
    },
    {
        color: '#5fab45',
        group: 'A',
        name: 'Lechuga'
    },
    {
        color: '#1e481e',
        group: 'A',
        name: 'Pepino'
    },
    {
        color: '#9e2f65',
        group: 'A',
        name: 'Rabanito'
    },
    {
        color: '#4d7c37',
        group: 'A',
        name: 'Radicheta'
    },
    {
        color: '#882b4d',
        group: 'A',
        name: 'Repollo'
    },
    {
        color: '#4d7c37',
        group: 'A',
        name: 'Repollito de brucelas'
    },
    {
        color: '#dd2e2e',
        group: 'A',
        name: 'Tomate'
    },
    {
        color: '#317137',
        group: 'A',
        name: 'Zapallito'
    }],
    vegB = [{
        color: '#2f883a',
        group: 'B',
        name: 'Alcaucil'
    },
    {
        color: '#44a745',
        group: 'B',
        name: 'Arvejas'
    },
    {
        color: '#FFFFFF',
        group: 'B',
        name: 'Cebolla'
    },
    {
        color: '#ceffcb',
        group: 'B',
        name: 'Cebolla de verdeo'
    },
    {
        color: '#FFFFFF',
        group: 'B',
        name: 'Brotes de soja'
    },
    {
        color: '#2f883a',
        group: 'B',
        name: 'Chauchas'
    },
    {
        color: '#5fb66a',
        group: 'B',
        name: 'Habas'
    },
    {
        color: '#2f883a',
        group: 'B',
        name: 'Puerro'
    },
    {
        color: '#5e223e',
        group: 'B',
        name: 'Remolacha'
    },
    {
        color: '#df5200',
        group: 'B',
        name: 'Zanahoria'
    },
    {
        color: '#df5200',
        group: 'B',
        name: 'Zapallo'
    }],
    vegC = [{
        color: '#c8982a',
        vegC: true,
        name: 'Papa'
    },
    {
        color: '#6f5312',
        vegC: true,
        name: 'Batata'
    },
    {
        color: '#f0cc00',
        vegC: true,
        name: 'Choclo'
    },
    {
        color: '#5e3c1a',
        vegC: true,
        name: 'Mandioca'
    }],
    carbohydrate = carbo.concat(vegC)

const group = {
    protein,
    carbohydrate,
    vegA,
    vegB,
    vegC
}

export default group