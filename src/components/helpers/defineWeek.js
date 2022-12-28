export const defineWeek = () => {
    let hoy = new Date(),
        dia = (hoy.getDay() === 0) ? 7 : hoy.getDay(),
        firstDay = hoy.getDate() - (dia - 1),
        lastDay = new Date(new Date().setDate(firstDay + 6)).toLocaleDateString('en'),
        today = hoy.toLocaleDateString('en'),
        start = new Date(new Date().setDate(firstDay)).toLocaleDateString('en'),
        end = lastDay;

    return {
        today,
        start,
        end
    }
}