const ExcelJS = require('exceljs');

async function generateSalesExcel(ventas, mes = null, año = new Date().getFullYear()) {
    const workbook = new ExcelJS.Workbook();

    let ventasFiltradas = ventas.filter(v => {
        const fecha = new Date(v.fecha);
        const añoVenta = fecha.getFullYear();
        
        if (mes) {
            const mesVenta = fecha.getMonth() + 1;
            return añoVenta === año && mesVenta === mes;
        }
        
        return añoVenta === año;
    });

    if (!ventasFiltradas.length) {
        throw new Error('No hay ventas para el periodo seleccionado');
    }

    const colorPrincipal = 'FF013173';
    const colorAlterno = 'FFF5F5F5';
    const colorBordes = 'FFCCCCCC';
    const colorTextoBlanco = 'FFFFFFFF';
    const colorTextoNegro = 'FF000000';

    const totalVentas = ventasFiltradas.length;
    const comisionVentaTotal = ventasFiltradas.reduce((sum, v) => sum + (v.comisionVenta || 0), 0);
    const comisionSoporteTotal = ventasFiltradas.reduce((sum, v) => sum + (v.comisionSoporte || 0), 0);
    const ingresosTotales = ventasFiltradas.reduce((sum, v) => sum + (v.precioRealSoles || v.precioEstandar || 0), 0);
    
    const ventasNormales = ventasFiltradas.filter(v => v.tipoAjuste === 'ninguno').length;
    const ventasConDescuento = ventasFiltradas.filter(v => v.tipoAjuste === 'descuento').length;
    const ventasConPropina = ventasFiltradas.filter(v => v.tipoAjuste === 'propina').length;
    const totalDescuentos = ventasFiltradas.reduce((sum, v) => sum + (v.descuento || 0), 0);
    const totalPropinas = ventasFiltradas.reduce((sum, v) => sum + (v.propina || 0), 0);

    // ============================================
    // HOJA 1: RESUMEN EJECUTIVO
    // ============================================
    const resumenSheet = workbook.addWorksheet('Dashboard');
    
    resumenSheet.columns = [
        { header: 'Metrica', key: 'metrica', width: 45 },
        { header: 'Valor', key: 'valor', width: 30 }
    ];

    const ventasPorVendedor = {};
    ventasFiltradas.forEach(v => {
        if (!ventasPorVendedor[v.vendedor]) {
            ventasPorVendedor[v.vendedor] = {
                ventas: 0,
                ingresos: 0,
                comisiones: 0
            };
        }
        ventasPorVendedor[v.vendedor].ventas++;
        ventasPorVendedor[v.vendedor].ingresos += (v.precioRealSoles || v.precioEstandar || 0);
        ventasPorVendedor[v.vendedor].comisiones += (v.comisionVenta || 0) + (v.comisionSoporte || 0);
    });
    const vendedorTop = Object.entries(ventasPorVendedor).sort((a, b) => b[1].ventas - a[1].ventas)[0];
    const vendedorBajo = Object.entries(ventasPorVendedor).sort((a, b) => a[1].ventas - b[1].ventas)[0];

    const ventasPorProducto = {};
    ventasFiltradas.forEach(v => {
        ventasPorProducto[v.producto] = (ventasPorProducto[v.producto] || 0) + 1;
    });
    const productoTop = Object.entries(ventasPorProducto).sort((a, b) => b[1] - a[1])[0];
    const productoBajo = Object.entries(ventasPorProducto).sort((a, b) => a[1] - b[1])[0];

    const ventasPorPeriodo = {};
    ventasFiltradas.forEach(v => {
        ventasPorPeriodo[v.periodo] = (ventasPorPeriodo[v.periodo] || 0) + 1;
    });
    const periodoTop = Object.entries(ventasPorPeriodo).sort((a, b) => b[1] - a[1])[0];

    const ventasPorMoneda = {};
    ventasFiltradas.forEach(v => {
        const moneda = v.monedaOriginal || 'PEN';
        ventasPorMoneda[moneda] = (ventasPorMoneda[moneda] || 0) + 1;
    });

    resumenSheet.addRows([
        { metrica: 'VENTAS TOTALES', valor: totalVentas },
        { metrica: 'INGRESOS TOTALES', valor: `S/ ${ingresosTotales.toFixed(2)}` },
        { metrica: 'Comision por Ventas', valor: `S/ ${comisionVentaTotal.toFixed(2)}` },
        { metrica: 'Comision por Soporte', valor: `S/ ${comisionSoporteTotal.toFixed(2)}` },
        { metrica: '', valor: '' },
        { metrica: 'VENTAS NORMALES', valor: `${ventasNormales} (${((ventasNormales/totalVentas)*100).toFixed(1)}%)` },
        { metrica: 'Ventas con Descuento', valor: `${ventasConDescuento} (${((ventasConDescuento/totalVentas)*100).toFixed(1)}%)` },
        { metrica: 'Ventas con Propina', valor: `${ventasConPropina} (${((ventasConPropina/totalVentas)*100).toFixed(1)}%)` },
        { metrica: 'Total Descuentos Otorgados', valor: `S/ ${totalDescuentos.toFixed(2)}` },
        { metrica: 'Total Propinas Recibidas', valor: `S/ ${totalPropinas.toFixed(2)}` },
        { metrica: '', valor: '' },
        { metrica: 'VENDEDOR TOP', valor: `${vendedorTop[0]} (${vendedorTop[1].ventas} ventas)` },
        { metrica: 'Vendedor con menos ventas', valor: `${vendedorBajo[0]} (${vendedorBajo[1].ventas} ventas)` },
        { metrica: '', valor: '' },
        { metrica: 'PRODUCTO MAS VENDIDO', valor: `${productoTop[0]} (${productoTop[1]} ventas)` },
        { metrica: 'Producto menos vendido', valor: `${productoBajo[0]} (${productoBajo[1]} ventas)` },
        { metrica: '', valor: '' },
        { metrica: 'PERIODO MAS POPULAR', valor: `${periodoTop[0]} (${periodoTop[1]} ventas)` },
        { metrica: '', valor: '' },
        { metrica: 'MONEDAS UTILIZADAS', valor: Object.keys(ventasPorMoneda).join(', ') }
    ]);

    const headerRowResumen = resumenSheet.getRow(1);
    headerRowResumen.font = { bold: true, size: 13, color: { argb: colorTextoBlanco } };
    headerRowResumen.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: colorPrincipal }
    };
    headerRowResumen.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    headerRowResumen.height = 28;

    resumenSheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            row.font = { size: 11, color: { argb: colorTextoNegro }, bold: false };
            row.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
            row.height = 24;

            if (row.values[1] === '') {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFDDDDDD' }
                };
            } else if (rowNumber % 2 === 0) {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: colorAlterno }
                };
            }

            row.border = {
                bottom: { style: 'thin', color: { argb: colorBordes } }
            };
        }
    });

    // ============================================
    // HOJA 2: ESTADISTICAS (TABLAS)
    // ============================================
    const estadisticasSheet = workbook.addWorksheet('Estadisticas');

    // VENTAS POR DÍA
    const ventasPorDia = {};
    ventasFiltradas.forEach(v => {
        const fecha = new Date(v.fecha);
        const dia = fecha.getDate();
        ventasPorDia[dia] = (ventasPorDia[dia] || 0) + 1;
    });

    let currentRow = 1;
    
    estadisticasSheet.getCell(`A${currentRow}`).value = 'VENTAS POR DIA';
    estadisticasSheet.getCell(`A${currentRow}`).font = { bold: true, size: 12, color: { argb: colorTextoBlanco } };
    estadisticasSheet.getCell(`A${currentRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorPrincipal } };
    estadisticasSheet.mergeCells(`A${currentRow}:B${currentRow}`);
    currentRow++;
    
    estadisticasSheet.getCell(`A${currentRow}`).value = 'Dia';
    estadisticasSheet.getCell(`B${currentRow}`).value = 'Ventas';
    estadisticasSheet.getRow(currentRow).font = { bold: true };
    currentRow++;
    
    const diasOrdenados = Object.keys(ventasPorDia).sort((a, b) => a - b);
    diasOrdenados.forEach((dia) => {
        estadisticasSheet.getCell(`A${currentRow}`).value = `Dia ${dia}`;
        estadisticasSheet.getCell(`B${currentRow}`).value = ventasPorDia[dia];
        currentRow++;
    });
    
    currentRow += 2;

    estadisticasSheet.getCell(`A${currentRow}`).value = 'PRODUCTOS MAS VENDIDOS';
    estadisticasSheet.getCell(`A${currentRow}`).font = { bold: true, size: 12, color: { argb: colorTextoBlanco } };
    estadisticasSheet.getCell(`A${currentRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorPrincipal } };
    estadisticasSheet.mergeCells(`A${currentRow}:B${currentRow}`);
    currentRow++;
    
    estadisticasSheet.getCell(`A${currentRow}`).value = 'Producto';
    estadisticasSheet.getCell(`B${currentRow}`).value = 'Cantidad';
    estadisticasSheet.getRow(currentRow).font = { bold: true };
    currentRow++;
    
    const productosOrdenados = Object.entries(ventasPorProducto).sort((a, b) => b[1] - a[1]);
    productosOrdenados.forEach(([producto, cantidad]) => {
        estadisticasSheet.getCell(`A${currentRow}`).value = producto;
        estadisticasSheet.getCell(`B${currentRow}`).value = cantidad;
        currentRow++;
    });
    
    currentRow += 2;

    estadisticasSheet.getCell(`A${currentRow}`).value = 'TOP VENDEDORES';
    estadisticasSheet.getCell(`A${currentRow}`).font = { bold: true, size: 12, color: { argb: colorTextoBlanco } };
    estadisticasSheet.getCell(`A${currentRow}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorPrincipal } };
    estadisticasSheet.mergeCells(`A${currentRow}:D${currentRow}`);
    currentRow++;
    
    estadisticasSheet.getCell(`A${currentRow}`).value = 'Vendedor';
    estadisticasSheet.getCell(`B${currentRow}`).value = 'Ventas';
    estadisticasSheet.getCell(`C${currentRow}`).value = 'Ingresos';
    estadisticasSheet.getCell(`D${currentRow}`).value = 'Comisiones';
    estadisticasSheet.getRow(currentRow).font = { bold: true };
    currentRow++;
    
    const vendedoresOrdenados = Object.entries(ventasPorVendedor).sort((a, b) => b[1].ventas - a[1].ventas);
    vendedoresOrdenados.forEach(([vendedor, stats]) => {
        estadisticasSheet.getCell(`A${currentRow}`).value = vendedor;
        estadisticasSheet.getCell(`B${currentRow}`).value = stats.ventas;
        estadisticasSheet.getCell(`C${currentRow}`).value = `S/ ${stats.ingresos.toFixed(2)}`;
        estadisticasSheet.getCell(`D${currentRow}`).value = `S/ ${stats.comisiones.toFixed(2)}`;
        currentRow++;
    });

    estadisticasSheet.columns = [
        { key: 'col1', width: 25 },
        { key: 'col2', width: 15 },
        { key: 'col3', width: 15 },
        { key: 'col4', width: 15 }
    ];

    // ============================================
    // HOJA 3: DETALLE DE VENTAS
    // ============================================
    const detalleSheet = workbook.addWorksheet('Detalle de Ventas');
    
    detalleSheet.columns = [
        { header: '#', key: 'numero', width: 6 },
        { header: 'Fecha', key: 'fecha', width: 16 },
        { header: 'Vendedor', key: 'vendedor', width: 18 },
        { header: 'Cliente', key: 'usuario', width: 16 },
        { header: 'WhatsApp', key: 'whatsapp', width: 16 },
        { header: 'Metodo Pago', key: 'metodoPago', width: 16 },
        { header: 'Producto', key: 'producto', width: 18 },
        { header: 'Periodo', key: 'periodo', width: 12 },
        { header: 'Precio Estandar', key: 'precioEstandar', width: 14 },
        { header: 'Cliente Envio', key: 'clienteEnvio', width: 14 },
        { header: 'Moneda', key: 'moneda', width: 8 },
        { header: 'Comision Pago', key: 'comisionPago', width: 12 },
        { header: 'Neto Recibido', key: 'netoRecibido', width: 14 },
        { header: 'Equiv. Soles', key: 'precioSoles', width: 12 },
        { header: 'Tipo Ajuste', key: 'tipoAjuste', width: 12 },
        { header: 'Descuento', key: 'descuento', width: 11 },
        { header: 'Propina', key: 'propina', width: 11 },
        { header: 'Com. Venta', key: 'comisionVenta', width: 12 },
        { header: 'Com. Soporte', key: 'comisionSoporte', width: 12 },
        { header: 'Soporte', key: 'vendedorSoporte', width: 16 },
        { header: 'Nota', key: 'nota', width: 25 },
        { header: 'Licencia', key: 'licencia', width: 22 }
    ];

    ventasFiltradas.forEach((venta, index) => {
        const tipoAjusteTexto = venta.tipoAjuste === 'descuento' ? 'Descuento' :
                                venta.tipoAjuste === 'propina' ? 'Propina' : 
                                'Normal';
        
        detalleSheet.addRow({
            numero: index + 1,
            fecha: new Date(venta.fecha).toLocaleString('es-PE', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }),
            vendedor: venta.vendedor,
            usuario: venta.usuario,
            whatsapp: venta.whatsapp || 'No proporcionado',
            metodoPago: venta.metodoPago,
            producto: venta.producto,
            periodo: venta.periodo,
            precioEstandar: `S/ ${(venta.precioEstandar || 0).toFixed(2)}`,
            clienteEnvio: venta.montoBrutoCliente ? `${venta.montoBrutoCliente.toFixed(2)}` : '-',
            moneda: venta.monedaOriginal || 'PEN',
            comisionPago: venta.comisionMetodoPago ? `${venta.comisionMetodoPago.toFixed(2)}` : '0',
            netoRecibido: venta.montoNetoRecibido ? `${venta.montoNetoRecibido.toFixed(2)}` : '-',
            precioSoles: `S/ ${(venta.precioRealSoles || venta.precioEstandar || 0).toFixed(2)}`,
            tipoAjuste: tipoAjusteTexto,
            descuento: venta.descuento ? `S/ ${venta.descuento.toFixed(2)}` : '-',
            propina: venta.propina ? `S/ ${venta.propina.toFixed(2)}` : '-',
            comisionVenta: `S/ ${(venta.comisionVenta || 0).toFixed(2)}`,
            comisionSoporte: `S/ ${(venta.comisionSoporte || 0).toFixed(2)}`,
            vendedorSoporte: venta.vendedorSoporte || 'N/A',
            nota: venta.nota || '',
            licencia: venta.licencia || 'N/A'
        });
    });

    const headerRowDetalle = detalleSheet.getRow(1);
    headerRowDetalle.font = { bold: true, size: 11, color: { argb: colorTextoBlanco } };
    headerRowDetalle.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: colorPrincipal }
    };
    headerRowDetalle.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    headerRowDetalle.height = 24;

    detalleSheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            row.font = { size: 10, color: { argb: colorTextoNegro } };
            row.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
            row.height = 20;

            if (rowNumber % 2 === 0) {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: colorAlterno }
                };
            }

            row.border = {
                bottom: { style: 'thin', color: { argb: colorBordes } }
            };
        }
    });

    // ============================================
    // HOJA 4: COMISIONES POR VENDEDOR
    // ============================================
    const comisionesSheet = workbook.addWorksheet('Comisiones');
    
    comisionesSheet.columns = [
        { header: 'Vendedor', key: 'vendedor', width: 28 },
        { header: 'Total Ventas', key: 'totalVentas', width: 14 },
        { header: 'Com. Ventas', key: 'comisionVenta', width: 14 },
        { header: 'Com. Soporte', key: 'comisionSoporte', width: 14 },
        { header: 'TOTAL A PAGAR', key: 'total', width: 16 }
    ];

    const comisionesPorVendedor = {};

    ventasFiltradas.forEach(v => {
        if (!comisionesPorVendedor[v.vendedor]) {
            comisionesPorVendedor[v.vendedor] = {
                totalVentas: 0,
                comisionVenta: 0,
                comisionSoporte: 0
            };
        }

        comisionesPorVendedor[v.vendedor].totalVentas++;
        comisionesPorVendedor[v.vendedor].comisionVenta += v.comisionVenta || 0;

        if (v.vendedorSoporte && v.vendedorSoporte !== v.vendedor) {
            if (!comisionesPorVendedor[v.vendedorSoporte]) {
                comisionesPorVendedor[v.vendedorSoporte] = {
                    totalVentas: 0,
                    comisionVenta: 0,
                    comisionSoporte: 0
                };
            }
            comisionesPorVendedor[v.vendedorSoporte].comisionSoporte += v.comisionSoporte || 0;
        } else {
            comisionesPorVendedor[v.vendedor].comisionSoporte += v.comisionSoporte || 0;
        }
    });

    const vendedoresOrdenadosComisiones = Object.entries(comisionesPorVendedor)
        .sort((a, b) => {
            const totalA = a[1].comisionVenta + a[1].comisionSoporte;
            const totalB = b[1].comisionVenta + b[1].comisionSoporte;
            return totalB - totalA;
        });

    let totalGeneralPago = 0;
    vendedoresOrdenadosComisiones.forEach(([vendedor, stats]) => {
        const total = stats.comisionVenta + stats.comisionSoporte;
        totalGeneralPago += total;

        comisionesSheet.addRow({
            vendedor: vendedor,
            totalVentas: stats.totalVentas,
            comisionVenta: `S/ ${stats.comisionVenta.toFixed(2)}`,
            comisionSoporte: `S/ ${stats.comisionSoporte.toFixed(2)}`,
            total: `S/ ${total.toFixed(2)}`
        });
    });

    const rowSeparador = comisionesSheet.addRow({
        vendedor: '',
        totalVentas: '',
        comisionVenta: '',
        comisionSoporte: '',
        total: ''
    });
    rowSeparador.border = {
        top: { style: 'medium', color: { argb: colorPrincipal } }
    };

    const rowTotal = comisionesSheet.addRow({
        vendedor: 'TOTAL GENERAL',
        totalVentas: ventasFiltradas.length,
        comisionVenta: `S/ ${comisionVentaTotal.toFixed(2)}`,
        comisionSoporte: `S/ ${comisionSoporteTotal.toFixed(2)}`,
        total: `S/ ${totalGeneralPago.toFixed(2)}`
    });

    rowTotal.font = { bold: true, size: 12, color: { argb: colorTextoBlanco } };
    rowTotal.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: colorPrincipal }
    };
    rowTotal.alignment = { horizontal: 'center', vertical: 'middle' };
    rowTotal.height = 26;

    const headerRowComisiones = comisionesSheet.getRow(1);
    headerRowComisiones.font = { bold: true, size: 11, color: { argb: colorTextoBlanco } };
    headerRowComisiones.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: colorPrincipal }
    };
    headerRowComisiones.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    headerRowComisiones.height = 24;

    comisionesSheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1 && rowNumber < comisionesSheet.rowCount) {
            row.font = { size: 10, color: { argb: colorTextoNegro } };
            row.alignment = { horizontal: 'left', vertical: 'middle' };
            row.height = 22;

            if (rowNumber % 2 === 0) {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: colorAlterno }
                };
            }

            row.border = {
                bottom: { style: 'thin', color: { argb: colorBordes } }
            };
        }
    });

    console.log('✅ Excel generado correctamente (sin gráficos)');
    
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

module.exports = { generateSalesExcel };