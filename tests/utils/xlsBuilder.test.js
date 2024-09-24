const WorkbookBuilder = require('../../utils/xlsBuilder')
const os = require('os')
const path = require('path')

const neraca = [
    {"total_transaction_amount":"40434600","coa_code":2010,"dc":1,"coa":"Inventaris","account_id":2,"account":"Aset Tetap","account_type":1},
    {"total_transaction_amount":"141713100","coa_code":1010,"dc":0,"coa":"Kas UPK","account_id":1,"account":"Aset Lancar","account_type":1},
    {"total_transaction_amount":"0","coa_code":2021,"dc":0,"coa":"Akumulasi Penyusutan Bangunan","account_id":2,"account":"Aset Tetap","account_type":1},
    {"total_transaction_amount":"9020125","coa_code":1020,"dc":0,"coa":"Rekening Bank UPK","account_id":1,"account":"Aset Lancar","account_type":1},
    {"total_transaction_amount":"0","coa_code":2020,"dc":1,"coa":"Bangunan","account_id":2,"account":"Aset Tetap","account_type":1},
    {"total_transaction_amount":"806653","coa_code":6010,"dc":0,"coa":"Biaya Operasional BKM","account_id":6,"account":"Biaya","account_type":2},
    {"total_transaction_amount":"142759950","coa_code":1010,"dc":1,"coa":"Kas UPK","account_id":1,"account":"Aset Lancar","account_type":1},
    {"total_transaction_amount":"111830600","coa_code":1030,"dc":0,"coa":"Piutang KSM","account_id":1,"account":"Aset Lancar","account_type":1},
    {"total_transaction_amount":"8324934","coa_code":1100,"dc":0,"coa":"Cadangan Resiko Kredit","account_id":1,"account":"Aset Lancar","account_type":1},
    {"total_transaction_amount":"39818024","coa_code":3040,"dc":0,"coa":"Anggaran UPS","account_id":3,"account":"Kewajiban Lancar","account_type":2},
    {"total_transaction_amount":"257842500","coa_code":5010,"dc":0,"coa":"Bunga Piutang KSM","account_id":5,"account":"Pendapatan","account_type":2},
    {"total_transaction_amount":"11711341","coa_code":3030,"dc":0,"coa":"Anggaran UPL","account_id":3,"account":"Kewajiban Lancar","account_type":2},
    {"total_transaction_amount":"27905183","coa_code":2011,"dc":0,"coa":"Akumulasi Penyusutan Inventaris","account_id":2,"account":"Aset Tetap","account_type":1},
    {"total_transaction_amount":"209504381","coa_code":4020,"dc":0,"coa":"Modal dari Laba Tahunan","account_id":4,"account":"Ekuitas","account_type":2},
    {"total_transaction_amount":"3682000","coa_code":3010,"dc":0,"coa":"Titipan BOP KSM","account_id":3,"account":"Kewajiban Lancar","account_type":2},
    {"total_transaction_amount":"806653","coa_code":1100,"dc":1,"coa":"Cadangan Resiko Kredit","account_id":1,"account":"Aset Lancar","account_type":1},
    {"total_transaction_amount":"952039400","coa_code":1030,"dc":1,"coa":"Piutang KSM","account_id":1,"account":"Aset Lancar","account_type":1},
    {"total_transaction_amount":"1087496","coa_code":5020,"dc":0,"coa":"Bunga Bank UPK","account_id":5,"account":"Pendapatan","account_type":2},
    {"total_transaction_amount":"859548616","coa_code":4010,"dc":0,"coa":"Hibah P2KP, PNPM dan P.DAPM","account_id":4,"account":"Ekuitas","account_type":2},
    {"total_transaction_amount":"0","coa_code":5030,"dc":0,"coa":"Pemasukan Lain","account_id":5,"account":"Pendapatan","account_type":2},
    {"total_transaction_amount":"246889498","coa_code":6010,"dc":1,"coa":"Biaya Operasional BKM","account_id":6,"account":"Biaya","account_type":2},
    {"total_transaction_amount":"299864852","coa_code":1020,"dc":1,"coa":"Rekening Bank UPK","account_id":1,"account":"Aset Lancar","account_type":1}
]


function formatTransactionNeraca(data) {
    const result = []
    const map = new Map()

    data.forEach(item => {
        const { coa_code, coa, account, total_transaction_amount, dc, account_type } = item
        const key = `${coa_code}_${coa}_${account}`
        
        if (!map.has(key)) {
            map.set(key, { coa_code, coa, account, account_type, debit: 0, credit: 0, saldo: 0 })
        }

        const entry = map.get(key)
        if (dc === 0) {
            entry.debit = parseFloat(total_transaction_amount)
        } else if (dc === 1) {
            entry.credit = parseFloat(total_transaction_amount)
        }

        if(account_type == 1){
            entry.saldo = entry.credit - entry.debit
        }else if(account_type == 2){
            entry.saldo = entry.debit - entry.credit
        }
    })

    map.forEach(value => result.push(value))
    return result
}   

const data = formatTransactionNeraca(neraca)
const asset = data.filter(item => item.account_type == 1).map(({account_type, ...rest}) => rest)
const liabilities = data.filter(item => item.account_type == 2).map(({account_type, ...rest}) => rest)

const style = {
    coa_code: { 
        alignment: { horizontal: 'center' } // Center align
    },
    debit: {
        numFmt: '"Rp. "#,##0', // Currency format for debit column
        alignment: { horizontal: 'right' } // Right align
    },
    credit: {
        numFmt: '"Rp. "#,##0', // Currency format for credit column
        alignment: { horizontal: 'right' } // Right align
    },
    saldo: {
        numFmt: '"Rp. "#,##0', // Currency format for credit column
        alignment: { horizontal: 'right' } // Right align
    }
};

const workbookBuilder = new WorkbookBuilder()

workbookBuilder.addWorksheet('neraca')
    .addColumns(asset)
    .fillColumns(asset, 'coa_code', style)
    .sum(asset, ['debit', 'credit', 'saldo'])
    .addColumns(liabilities)
    .fillColumns(liabilities, 'coa_code', style)
    .sum(liabilities, ['debit', 'credit', 'saldo'])

// Save the workbook
async function getWorkbook() {
    const workbook = workbookBuilder.workbook
    const desktopPath = path.join(os.homedir(), 'Desktop', 'FinancialData.xlsx')
    await workbook.xlsx.writeFile(desktopPath)
}

test('Test result xls', async() => {
    await getWorkbook()
})