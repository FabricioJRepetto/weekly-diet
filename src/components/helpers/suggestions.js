export const suggestions = (today) => {
    const plate = {
        p: !!today[0].protein.length,
        c: !!today[0].carbohydrate.length,
        v: !!today[0].vegetal.length
    }
    let message = '',
        initials = '',
        platePreview = {}

    if (plate.p && !plate.c) {
        message = 'Preparar medio plato de carbohidratos y acompañar con vegetales.'
        initials += 'c'
        platePreview = {
            protein: [],
            carbohydrate: [true],
            vegetal: [true],
            vegetalC: false
        }
    }
    if (plate.c && !plate.p) {
        message = 'Preparar medio plato de proteínas y acompañar con vegetales.'
        initials += 'p'
        platePreview = {
            protein: [true],
            carbohydrate: [],
            vegetal: [true],
            vegetalC: false
        }
    }
    if ((plate.c && plate.p) || (!plate.c && !plate.p)) {
        message = 'Preparar proteínas y carbohidratos (1/4 de plato cada uno) y acompañar con vegetales (medio plato).'
        initials += 'pc'
        platePreview = {
            protein: [true],
            carbohydrate: [true],
            vegetal: [true],
            vegetalC: false
        }
    }

    if (today.vegetalC) message += ' No utilizar Vegetal C.'

    return { message, initials, platePreview }
}