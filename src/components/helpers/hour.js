export const hour = () => {
    let aux = Math.round(new Date().getHours())

    if (aux >= 21 || aux < 5) return 'blue-hour'
    if (aux >= 5 && aux < 8) return 'redorange-hour'
    if (aux >= 8 && aux < 11) return 'orange-hour'
    if (aux >= 11 && aux < 15) return 'white-hour'
    if (aux >= 15 && aux < 18) return 'orange-hour'
    if (aux >= 18 && aux < 21) return 'redorange-hour'
}