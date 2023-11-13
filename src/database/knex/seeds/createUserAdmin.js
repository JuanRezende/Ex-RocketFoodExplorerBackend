const { hash } = require("bcryptjs");

exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      name: "admin",
      email: "admin@explorer.com",
      password: await hash("adminrocket", 8),
      isAdmin: true,
    },
  ]);
};
