module.exports = {
    tableName: "account",
    timestamp: false,
    columns: [
        {
            columnName: "id",
            dataType: "INT",
            nullable: false,
            autoIncrement: true
        },
        {
            columnName: "type",
            dataType: "INT",
            nullable: false,
        },
        {
            columnName: "description",
            dataType: "VARCHAR(255)",
            nullable: false
        }
    ]
}
