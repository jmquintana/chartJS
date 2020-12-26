window.addEventListener('load', setup);

async function setup() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const globalTemps = await getData();
    const borderWidth = 1;
    console.log(globalTemps);
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: globalTemps.days,
            // labels: globalTemps.days1,
            datasets:
                // [{
                //     label: '# of Votes',
                //     data: globalTemps.datos
                // }] 
                [
                    {
                        label: globalTemps.labels[0],
                        data: globalTemps.values[0],
                        fill: false,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderWidth: borderWidth,
                        spanGaps: true
                    },
                    {
                        label: globalTemps.labels[1],
                        data: globalTemps.values[1],
                        fill: false,
                        borderColor: 'rgba(99, 200, 132, 1)',
                        backgroundColor: 'rgba(99, 200, 132, 0.5)',
                        borderWidth: borderWidth,
                        spanGaps: true
                    },
                    {
                        label: globalTemps.labels[2],
                        data: globalTemps.values[2],
                        fill: false,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderWidth: borderWidth,
                        spanGaps: true
                    },
                    {
                        label: globalTemps.labels[3],
                        data: globalTemps.values[3],
                        fill: false,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.5)',
                        borderWidth: borderWidth,
                        spanGaps: true
                    }
                ]
        },
        options: {
            parsing: {
                xAxisKey: 'cuotapartes',
                yAxisKey: 'resultado'
            },
            tooltips: {
                mode: 'index',
                titleFontSize: 18,
                bodyFontSize: 14,
                callbacks: {
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel.toLocaleString('de-DE', { minimumFractionDigits: 2 });
                    },
                },
                bodyAlign: 'right'
            }
            // scales: {
            //     xAxes: [{
            //         type: 'time',
            //         time: {
            //             unit: 'day'
            //         }
            //     }]
            // }
        }
    });

    // const myChart2 = new Chart(ctx2, {
    //     type: 'bar',
    //     data: {
    //         datasets: [{
    //             data: [{ id: 'Sales', nested: { value: 1500 } }, { id: 'Purchases', nested: { value: 500 } }]
    //         }]
    //     },
    //     options: {

    //         parsing: {
    //             xAxisKey: 'id',
    //             yAxisKey: 'nested.value'
    //         }
    //     }
    // });
}

async function getData() {
    const data = await fetch('datos4.json').then(res => res.text());
    const datos = JSON.parse(data).reverse()//.filter(el => el.fondo == 'Superfondo Acciones');
    // console.log(dataCSV);

    let array = {}
    const etiquetas = [...new Set(datos.map(item => item.fondo))]
    const fechas = datos.reduce((acc, { fecha, fondo, resultado }) => {
        (acc[moment(fecha).format('DD-MM-YY')] || (acc[moment(fecha).format('DD-MM-YY')] = [])).push({ fondo, resultado })
        return acc
    }, {})

    array.days = Object.keys(fechas)
    array.labels = (etiquetas)
    array.values = []
    etiquetas.forEach((label) => {
        let resultados = []
        Object.keys(fechas).forEach(el => {
            let valor = fechas[el].filter(elem => elem.fondo === label)[0]
            if (valor) {
                valor = valor.resultado
            } else {
                valor = null
            }
            resultados.push(valor)
        })
        array.values.push(resultados)
    })
    console.log(array);

    const { days, labels, values } = array
    return { days, labels, values };
    // return { array }
}