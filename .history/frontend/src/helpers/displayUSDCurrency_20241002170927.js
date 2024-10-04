const displayUSDCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(num);
}

export default displayUSDCurrency;
