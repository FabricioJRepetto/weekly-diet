export const hour = () => {
    let aux = Math.round(new Date().getHours()),
        res = ''
    // console.log(aux);
    // return `${aux}%`
    switch (aux) {
        case aux >= 21 && aux < 5:
            res = 'blue-hour'
            break;

        case (aux >= 5 && aux < 8) || (aux >= 18 && aux < 21):
            res = 'orange-hour'
            break;

        case aux >= 8 && aux < 18:
            res = 'white-hour'
            break;

        default:
            res = 'white-hour'
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