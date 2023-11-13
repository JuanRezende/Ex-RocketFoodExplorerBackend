exports.up = (knex) =>
  knex.schema.createTable("products", (table) => {
    table.increments("id");
    table.text("category");
    table.varchar("image");
    table.text("title");
    table.text("description");
    table.text("price");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("products");
