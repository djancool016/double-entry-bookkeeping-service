module.exports = {
    tableName: "entry",
    timestamp: false,
    columns: [
        {
            columnName: "id",
            dataType: "INT",
            nullable: false,
            autoIncrement: true
        },
        {
            columnName: "register_id",
            dataType: "INT",
            nullable: false,
            references: {table:'register', key:'id'}
        },
        {
            columnName: "coa_code",
            dataType: "INT",
            nullable: false,
            references: {table: 'coa', key: 'code'}
        },
        {
            columnName: "dc",
            dataType: "INT",
            nullable: false
        }
    ]
}

