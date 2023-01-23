export const hour = () => {
    let aux = Math.round(new Date().getHours())

    if ((aux >= 5 && aux < 8) || (aux >= 18 && aux < 21))
        return 'redorange-hour'
    if ((aux >= 8 && aux < 11) || (aux >= 15 && aux < 18))
        return 'orange-hour'
    if (aux >= 11 && aux < 15)
        return 'white-hour'

    return 'blue-hour'
}