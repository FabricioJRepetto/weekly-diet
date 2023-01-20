export const hour = () => {
    let aux = Math.round(new Date().getHours()),
        res = ''
    // console.log(aux);
    // return `${aux}%`
    switch (aux) {
        case aux >= 21 && aux < 5:
            res = 'blue-hour'
            break;

        case aux >= 8 && aux < 18:
            res = 'white-hour'
            break;

        default:
            res = 'orange-hour'
            break;
    }
    return res
}

/*
    21 - 5 = azul
    5 - 8 = naranja
    8 - 18 = blanco
    18 - 21 = naranja
*/