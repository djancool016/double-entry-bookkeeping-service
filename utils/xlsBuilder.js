const ExcelJs = require('exceljs')

// Define the WorkbookBuilder class
class WorkbookBuilder {
    constructor(workbook, creator) {
        this.workbook = workbook || new ExcelJs.Workbook()
        this.workbook.creator = creator || 'System'
    }
    /**
     * @param {String} worksheetName
     */
    set setWorksheet(worksheetName){
        this.worksheet = this.workbook.getWorksheet(worksheetName)
        if (!this.worksheet) {
            throw new Error(`Worksheet named ${worksheetName} does not exist`)
        }
    }

    addWorksheet(worksheetName = 'sheet', setup = {}) {
        setup.pageSetup = setup.pageSetup ?? { paperSize: 9, orientation: 'landscape' }
        this.workbook.addWorksheet(worksheetName, setup)
        this.worksheet = this.workbook.getWorksheet(worksheetName)
        return this
    }

    addColumns(arr = []) {
        // Ensure data has at least 1 object
        if (arr.length === 0) return this

        // Add header for new table below the previous table
        let startRow = this.worksheet.lastRow ? this.worksheet.lastRow.number + 2 : 1  // +2 to give a gap of 1 empty row
        const headers = Object.keys(arr[0])

        // Add header to the row starting from 'startRow'
        const row = this.worksheet.getRow(startRow)

        // fill row values
        row.values = headers

        // Make the header bold and center-aligned
        row.eachCell((cell) => {
            cell.font = { bold: true } // Make the font bold
            cell.alignment = { horizontal: 'center' } // Center-align the text
        })

        return this
    }

    fillColumns(arr = [], sortBy = '', cellFormat = {}) {
        // no data to fill
        if (arr.length === 0) return this

        // sort data by column name  
        if(sortBy) arr.sort((a, b) => a[sortBy] - b[sortBy])

        // Find the first empty row to add new data
        let startRow = this.worksheet.lastRow ? this.worksheet.lastRow.number + 1 : 2  // +1 to add after the header

        // Add data starting from startRow
        arr.forEach((item, index) => {
            // get row index
            const row = this.worksheet.getRow(startRow + index)

            // fill row with data
            row.values = Object.values(item)

            Object.keys(item).forEach((key, colIndex) => {
                const cell = row.getCell(colIndex + 1) // ExcelJS uses 1-based indexing for columns
                if (cellFormat[key]) {
                    Object.keys(cellFormat[key]).forEach(styleKey => {

                        cell[styleKey] = cellFormat[key][styleKey] // Apply each style property
                    })
                }
                //fill background color
                if (index % 2 !== 0) {
                    cell.fill = {
                        type: 'pattern',
                        pattern:'solid',
                        fgColor:{argb:'FFD3D3D3'}
                    }
                }
            })
        })

        autoFit(this.worksheet)

        return this
    }

    addRow(arr = []){
        this.worksheet.addRow(arr)
        return this
    }

    sum(arr = [], sumKeys = []){

        const startRow = this.worksheet.lastRow.number - arr.length + 1
        const endRow = this.worksheet.lastRow.number

        // Create a row for the sum formulas
        const sumRow = new Array(Object.keys(arr[0]).length).fill(null)

        sumKeys.forEach(key => {
            const columnIdx = Object.keys(arr[0]).indexOf(key) + 1 // Get column index based on key
            if (columnIdx > 0) {
                const index = Object.keys(arr[0]).indexOf(key)
                sumRow[index] = { formula: `SUM(${this.worksheet.getColumn(columnIdx).letter}${startRow}:${this.worksheet.getColumn(columnIdx).letter}${endRow})` }
            }
        })
        // Add the row with formulas
        const row = this.worksheet.addRow(sumRow)

        // Format the cells in the sumRow as currency
        sumKeys.forEach(key => {
            const columnIdx = Object.keys(arr[0]).indexOf(key) + 1 // Get column index based on key
            if (columnIdx > 0) {
                const cell = row.getCell(columnIdx)
                cell.numFmt = '"Rp. "#,##0' // Set currency format (e.g., $1,234.56)
                cell.font = { bold: true }
            }
        })

        return this
    }
}

// Function to calculate column width automatically
function autoFit(worksheet){
    worksheet.columns.forEach((column) => {

        let maxLength = 10 // Default width

        column.eachCell({ includeEmpty: true }, (cell) => {
            let cellValue = cell.value
            let cellLength = cell.value ? cell.value.toString().length : 0

            // Check if the cell has a number format (like currency)
            if (cell.numFmt && typeof cellValue === 'number') {
                cellLength += 7
            }
            
            if (cellLength > maxLength) maxLength = cellLength
        })
        column.width = maxLength + 2 // Add padding
    })
}

module.exports = WorkbookBuilder
