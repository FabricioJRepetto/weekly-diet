export const hour = () => {
    let aux = Math.round(new Date().getHours())
    // console.log(aux);
    // return `${aux}%`
    switch (aux) {
        case aux >= 21 && aux < 5:
            return 'blue-hour'

        case aux >= 5 && aux < 8:
            return 'oranje-hour'

        case aux >= 8 && aux < 18:
            return 'white-hour'

        default:
            return 'oranje-hour'
    }
}

/*
    21 - 5 = azul
    5 - 8 = naranja
    8 - 18 = blanco
    18 - 21 = naranja
*/