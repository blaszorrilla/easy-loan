function calcularCuota() {
    const monto = parseFloat(document.getElementById('monto').value);
    const tasa = parseFloat(document.getElementById('tasa').value);
    const plazo = parseInt(document.getElementById('plazo').value);

    const tasaMensual = tasa / 12 / 100;
    const cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));

    document.getElementById('cuota-mensual').textContent = `Cuota Mensual: ${cuota.toFixed(2)}`;

    generarTablaAmortizacion(monto, tasaMensual, plazo, cuota);
}

function generarTablaAmortizacion(monto, tasaMensual, plazo, cuota) {
    const tablaAmortizacion = $('#tabla-amortizacion tbody');
    tablaAmortizacion.empty();

    let saldoPendiente = monto;

    for (let mes = 1; mes <= plazo; mes++) {
        const interes = saldoPendiente * tasaMensual;
        const amortizacion = cuota - interes;
        saldoPendiente -= amortizacion;

        const fila = $('<tr></tr>').html(`
            <td>${mes}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${interes.toFixed(2)}</td>
            <td>${amortizacion.toFixed(2)}</td>
            <td>${saldoPendiente.toFixed(2)}</td>
        `);
        tablaAmortizacion.append(fila);
    }

    // Convierte la tabla en un DataTable
    $('#tabla-amortizacion').DataTable();
}


// Agrega la función para limpiar campos con jQuery
function limpiarCampos() {
    $('#monto').val('');
    $('#tasa').val('');
    $('#plazo').val('');
    $('#cuota-mensual').text('Cuota Mensual: ');

    const tablaAmortizacion = $('#tabla-amortizacion');
    tablaAmortizacion.empty(); // Limpia la tabla
}
