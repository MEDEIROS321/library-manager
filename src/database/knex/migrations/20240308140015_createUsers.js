
exports.up = (knex) =>{
    return knex.schema.createTable("users", (table) =>{

        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("fone").notNullable();
        table.string("password").notNullable();
        table.boolean("isAdmin").defaultTo("false")

        table.timestamp("created_at").default(knex.fn.now())
        table.timestamp("updated_at").default(knex.fn.now())
    })
  
};



exports.down = (knex) => {
    return knex.schema.dropTableIfExists("users")
  
};
