const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class ProductsController {
  async create(request, response) {
    const { title, description, category, price, ingredients } = request.body;

    const checkProductAlreadyCreate = await knex("products")
      .where({ title })
      .first();

    if (checkProductAlreadyCreate) {
      throw new AppError("Este produto já foi criado!");
    }

    const diskStorage = new DiskStorage();

    const productFileName = request.file.filename;

    const filename = await diskStorage.saveFile(productFileName);

    const [product_id] = await knex("products").insert({
      image: filename,
      title,
      description,
      category,
      price,
    });

    const hasOnlyOneIngredient = typeof ingredients === "string";

    let ingredientsInsert;
    if (hasOnlyOneIngredient) {
      ingredientsInsert = {
        product_id,
        name: ingredients,
      };
    } else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map(ingredient => {
        return {
          product_id,
          name: ingredient,
        };
      });
    }

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json();
  }

  async update(request, response) {
    const { title, description, category, price, ingredients, image } = request.body;
    const { id } = request.params;

    const productFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    const product = await knex("products").where({ id }).first();

    if (product.image) {
      await diskStorage.deleteFile(product.image);
    }

    const filename = await diskStorage.saveFile(productFileName);

    product.image = image ?? filename;
    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.category = category ?? product.category;
    product.price = price ?? product.price;

    await knex("products").where({ id }).update(product);
    await knex("products").where({ id }).update('updated_at', knex.fn.now());

    const hasOnlyOneIngredient = typeof ingredients === "string";

    let ingredientsInsert;
    if (hasOnlyOneIngredient) {
      ingredientsInsert = {
        product_id: product.id,
        name: ingredients,
      };
    } else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map((ingredient) => {
        return {
          product_id: product.id,
          name: ingredient,
        };
      });
    }

    await knex("ingredients").where({ product_id: id }).delete();
    await knex("ingredients")
      .where({ product_id: id })
      .insert(ingredientsInsert);

    return response.status(200).json();
  }

  async show(request, response) {
    const { id } = request.params;

    const product = await knex("products").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ product_id: id })
      .orderBy("name");

    return response.status(200).json({
      ...product,
      ingredients,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("products").where({ id }).delete();

    return response.status(200).json();
  }

  async index(request, response) {
    const { title, ingredients } = request.query;

    let products;
    if (ingredients) {
      const filterIngredients = ingredients.split(",").map((ingredient) => ingredient.trim());

      products = await knex("ingredients")
        .select([
          "products.id",
          "products.title",
          "products.description",
          "products.category",
          "products.price",
          "products.image",
        ])
        .whereLike("products.title", `%${title}%`)
        .whereIn("name", filterIngredients)
        .innerJoin("products", "products.id", "ingredients.product_id")
        .groupBy("products.id")
        .orderBy("products.title");
    } else {
      products = await knex("products")
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const productsIngredients = await knex("ingredients");
    const productsWithIngredients = products.map((product) => {
      const productIngredient = productsIngredients.filter(
        (ingredient) => ingredient.product_id === product.id
      );

      return {
        ...product,
        ingredients: productIngredient,
      };
    });

    return response.status(200).json(productsWithIngredients);
  }
}

module.exports = ProductsController;
