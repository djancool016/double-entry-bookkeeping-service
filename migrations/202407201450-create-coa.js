module.exports = {
    tableName: "coa",
    timestamp: false,
    columns: [
        {
            columnName: "id",
            dataType: "INT",
            nullable: false,
            autoIncrement: true
        },
        {
            columnName: "account_id",
            dataType: "INT",
            nullable: false,
            references: {table: 'account', key:'id'}
        },
        {
            columnName: 'code',
            dataType: 'INT',
            nullable: false,
            unique: true
        },
        {
            columnName: "base_value",
            dataType: "INT",
            nullable: false
        },
        {
            columnName: "description",
            dataType: "VARCHAR(255)",
            nullable: false
        }
    ]
}
