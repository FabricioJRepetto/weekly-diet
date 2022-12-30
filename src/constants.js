//diet-backend.vercel.app
//http://localhost:4000
const BACK_URL = 'diet-backend.vercel.app',
    protein = [{
        list: 'protein',
        color: '#9b6d6d',
        name: 'Carne roja'
    },
    {
        list: 'protein',
        color: '#f1d490',
        name: 'Pollo'
    },
    {
        list: 'protein',
        color: '#bbc8ca',
        name: 'Pescado'
    },
    {
        list: 'protein',
        color: '#f6c9c9',
        name: 'Cerdo'
    },
    {
        list: 'protein',
        color: 'white',
        name: 'Huevo'
    }],
    carbo = [{
        list: 'carbohydrate',
        color: '#7f6341',
        name: 'Fideos integrales'
    },
    {
        list: 'carbohydrate',
        color: '#ffe7ab',
        name: 'Rabioles'
    },
    {
        list: 'carbohydrate',
        color: '#f6ead3',
        name: 'Arroz integral'
    },
    {
        list: 'carbohydrate',
        color: '#f4d392',
        name: 'Garbanzos'
    },
    {
        list: 'carbohydrate',
        color: '#78b854',
        name: 'Arvejas'
    },
    {
        list: 'carbohydrate',
        color: '#f4e88d',
        name: 'Porotos'
    },
    {
        list: 'carbohydrate',
        color: '#8c5f47',
        name: 'Lentejas'
    },
    {
        list: 'carbohydrate',
        color: '#ffd271',
        name: 'Pizza'
    },
    {
        list: 'carbohydrate',
        color: '#f6dfa2',
        name: 'Empanadas'
    },
    {
        list: 'carbohydrate',
        color: '#ffe59c',
        name: 'Tartas'
    },
    {
        list: 'carbohydrate',
        color: '#FFFFFF',
        name: 'Masas en gral.'
    }],
    vegA = [{
        list: 'vegetal',
        color: '#4d7c37',
        group: 'A',
        name: 'Acelga'
    },
    {
        list: 'vegetal',
        color: '#4d7c37',
        group: 'A',
        name: 'Achicoria'
    },
    {
        list: 'vegetal',
        color: '#dd2e2e',
        group: 'A',
        name: 'Ají'
    },
    {
        list: 'vegetal',
        color: '#94d662',
        group: 'A',
        name: 'Apio'
    },
    {
        list: 'vegetal',
        color: '#67297e',
        group: 'A',
        name: 'Berenjena'
    },
    {
        list: 'vegetal',
        color: '#5fab45',
        group: 'A',
        name: 'Berro'
    },
    {
        list: 'vegetal',
        color: '#4d7c37',
        group: 'A',
        name: 'Brócoli'
    },
    {
        list: 'vegetal',
        color: '#FFFFFF',
        group: 'A',
        name: 'Coliflor'
    },
    {
        list: 'vegetal',
        color: '#4d7c37',
        group: 'A',
        name: 'Espinaca'
    },
    {
        list: 'vegetal',
        color: '#4d7c37',
        group: 'A',
        name: 'Rúcula'
    },
    {
        list: 'vegetal',
        color: '#4d7c37',
        group: 'A',
        name: 'Esparrago'
    },
    {
        list: 'vegetal',
        color: '#FFFFFF',
        group: 'A',
        name: 'Hinojo'
    },
    {
        list: 'vegetal',
        color: '#ccbaa9',
        group: 'A',
        name: 'Hongos'
    },
    {
        list: 'vegetal',
        color: '#5fab45',
        group: 'A',
        name: 'Lechuga'
    },
    {
        list: 'vegetal',
        color: '#1e481e',
        group: 'A',
        name: 'Pepino'
    },
    {
        list: 'vegetal',
        color: '#9e2f65',
        group: 'A',
        name: 'Rabanito'
    },
    {
        list: 'vegetal',
        color: '#4d7c37',
        group: 'A',
        name: 'Radicheta'
    },
    {
        list: 'vegetal',
        color: '#882b4d',
        group: 'A',
        name: 'Repollo'
    },
    {
        list: 'vegetal',
        color: '#4d7c37',
        group: 'A',
        name: 'Repollito de brucelas'
    },
    {
        list: 'vegetal',
        color: '#dd2e2e',
        group: 'A',
        name: 'Tomate'
    },
    {
        list: 'vegetal',
        color: '#317137',
        group: 'A',
        name: 'Zapallito'
    }],
    vegB = [{
        list: 'vegetal',
        color: '#2f883a',
        group: 'B',
        name: 'Alcaucil'
    },
    {
        list: 'vegetal',
        color: '#FFFFFF',
        group: 'B',
        name: 'Cebolla'
    },
    {
        list: 'vegetal',
        color: '#ceffcb',
        group: 'B',
        name: 'Cebolla de verdeo'
    },
    {
        list: 'vegetal',
        color: '#FFFFFF',
        group: 'B',
        name: 'Brotes de soja'
    },
    {
        list: 'vegetal',
        color: '#2f883a',
        group: 'B',
        name: 'Chauchas'
    },
    {
        list: 'vegetal',
        color: '#5fb66a',
        group: 'B',
        name: 'Habas'
    },
    {
        list: 'vegetal',
        color: '#2f883a',
        group: 'B',
        name: 'Puerro'
    },
    {
        list: 'vegetal',
        color: '#5e223e',
        group: 'B',
        name: 'Remolacha'
    },
    {
        list: 'vegetal',
        color: '#df5200',
        group: 'B',
        name: 'Zanahoria'
    },
    {
        list: 'vegetal',
        color: '#df5200',
        group: 'B',
        name: 'Zapallo'
    }],
    vegC = [{
        list: 'carbohydrate',
        color: '#c8982a',
        vegC: true,
        name: 'Papa'
    },
    {
        list: 'carbohydrate',
        color: '#6f5312',
        vegC: true,
        name: 'Batata'
    },
    {
        list: 'carbohydrate',
        color: '#f0cc00',
        vegC: true,
        name: 'Choclo'
    },
    {
        list: 'carbohydrate',
        color: '#5e3c1a',
        vegC: true,
        name: 'Mandioca'
    }],
    vegetal = vegA.concat(vegB),
    carbohydrate = carbo.concat(vegC),
    compounds = [
        {
            name: 'Omelette',
            type: ['protein'],
            img: 'https://media.istockphoto.com/id/485040276/es/foto/herb-omelette-con-chives-y-orégano.jpg?b=1&s=612x612&w=0&k=20&c=GdB6Nn-XEzx8s3yVk9BJVgoAOMJSdohNOzUeCFsUCdQ='
        },
        {
            name: 'Tortilla de papas',
            type: ['protein', 'carbohydrate'],
            img: 'https://media.istockphoto.com/id/1297400965/es/foto/un-primer-plano-de-una-tortilla-española-fresca-y-sabrosa-un-plato-tradicional-de-españa.jpg?b=1&s=612x612&w=0&k=20&c=IBu0TpC29gDchTv2iLe1yKIfgwDdHAbQCcKccbmCYAs='
        },
        {
            name: 'Milanesa de soja',
            type: ['carbohydrate'],
            img: 'https://nyc3.digitaloceanspaces.com/dec-solimeno/__sized__/products/Milanesa_soja_clasica-1-crop-c0-5__0-5-1080x1080-70.jpg'
        },
        {
            name: 'Hamburguesa',
            type: ['carbohydrate', 'protein'],
            img: 'https://media.istockphoto.com/id/1206323282/es/foto/hamburguesa-jugosa-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=r2mLaVFZxtRk4MeKpdQLtwTkcctyOpGEP-OxPeyo4_c='
        },
    ],
    everything = protein.concat(carbo, vegetal)

const group = {
    protein,
    carbohydrate,
    vegetal,
    vegA,
    vegB,
    vegC,
    compounds,
    everything
}

export { BACK_URL, group }