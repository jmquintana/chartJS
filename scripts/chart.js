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
    // const response = await fetch('testdata.csv');
    // const data = await fetch('datos.json').then(res => res.json());
    const data = await fetch('datos4.json').then(res => res.text());
    const data2 = await fetch('datos5.json').then(res => res.text());
    // const dataCSV = Papa.unparse(data);
    const datos = JSON.parse(data).reverse()//.filter(el => el.fondo == 'Superfondo Acciones');
    const output = JSON.parse(data2)//.filter(el => el.fondo == 'Superfondo Acciones');
    // console.log(dataCSV);
    console.log(datos);

    var options = {
        row: "fecha",
        column: "fondo",
        value: "resultado"
    };

    // var output = jsonToPivotjson(datos, options);

    // console.log(output);
    // const data = await response.text();
    // const days = [];
    // const days2 = [];
    // const labels = [];
    // const values = [];
    // const values1 = [];
    // const values2 = [];
    // const values3 = [];
    // const values4 = [];
    // const rows = dataCSV.split('\n').slice(1);
    label1 = 'Super Ahorro $'
    label2 = 'Superfondo Acciones'
    label3 = 'Superfondo Renta $'
    label4 = 'Supergestión MIX VI'

    /*
for (i = 1; i < Object.keys(output[0]).length; i++) {
    labels.push(Object.keys(output[0])[i]);
}
    // output.filter(el => moment(el.fecha).isAfter(moment(new Date('11-01-2020')))).forEach(el => {
    //     days.push(moment(el.fecha).format('D-MMM-YY'));
    //     // labels.forEach(label => values.push(el[label]));
    //     values1.push(el[labels[0]]);
    //     values2.push(el[labels[1]]);
    //     values3.push(el[labels[2]]);
    //     values4.push(el[labels[3]]);
    // });

    /* ESTO ES LA CLAVE PARA ORGANIZAR LOS DATASETS
const work1 = datos.reduce((acc, { fecha, fondo, resultado }) => {
    (acc[fecha] || (acc[fecha] = [])).push({ fondo, resultado })
    return acc
}, {})

    const output = Object.keys(work1)
    .map(k => ({[k]: work1[k], count: work1[k].length}))
    */

    // console.log(work1);
    // days = Object.keys(work1); //
    // labels = [...new Set(datos.map(item => item.fondo))]; //ESTO SIRVE PARA SACAR LOS VALORES UNICOS 'fondo' DE UN ARRAY 'datos'
    // values1 = Object.values(work1)
    // console.log(values1);

    // values1.reduce((acc, { fondo, resultado }) => {
    //     (acc[fondo] || (acc[fondo] = [])).push({ resultado })
    // })

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

var jsonToPivotjson = function (data, options) {

    var ndx = crossfilter(data);

    var pivotCol = options.column
    var pivotVal = options.value;
    var pivotRow = options.row;

    var out = [];

    var pivotRowDimension = ndx.dimension(function (d) {
        return d[pivotRow];
    });

    var pivotColDimension = ndx.dimension(function (d) {
        return d[pivotCol];
    });

    var totalByPivotRow = pivotRowDimension.group().reduceSum(function (d) {
        return d[pivotVal]
    });

    var allRecs = totalByPivotRow.all();

    allRecs.forEach(function (rec) {

        pivotRowDimension.filter();
        pivotRowDimension.filter(rec.key);

        var totalByPivotCol = pivotColDimension.group().reduceSum(function (d) {
            return d[pivotVal]
        });

        var data = totalByPivotCol.all();

        var doc = {};

        doc[pivotRow] = rec.key;

        data.forEach(function (d) {
            doc[d.key] = d.value;
        });

        out.push(doc);
    });

    return out;
}