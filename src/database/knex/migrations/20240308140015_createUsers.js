const { Knex } = require("knex");

exports.up = (knex) =>{
    return knex.schema.creatTable("users", (table) =>{

        table.incriments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("cpf").notNullable();
        table.string("fone").notNullable();
        table.string("password").notNullable();
        table.boolean("isAdmin").defaulTo("false")

        table.timestamp("created_at").default(knex.fn.now();)
        table.timestamp("updated_at").default(knex.fn.now();)
    })
  
};



exports.down = (knex) => {
    return Knex.schema.dropTableIfExists("users")
  
};
