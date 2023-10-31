export const RandomizeId = () => {
    const minValue = 100000;
    const maxValue = 900000;

    return Math.floor(minValue + Math.random() * maxValue).toString();
}