const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const Supplier = require("../models/supplier.model");

describe("Products API Routes", () => {
  let categoryId;
  let supplierId;
  let productId;

  beforeAll(async () => {
    // Criar categoria e fornecedor para os testes
    const category = await Category.create({
      name: "Eletrônicos",
      description: "Categoria de teste"
    });
    categoryId = category._id;

    const supplier = await Supplier.create({
      name: "Fornecedor Teste",
      cnpj: "12345678901234",
      contact: "teste@teste.com"
    });
    supplierId = supplier._id;
  });

  afterAll(async () => {
    // Limpar dados de teste
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Supplier.deleteMany({});
    await mongoose.connection.close();
  });

  describe("POST /api/products - Inserir produto", () => {
    it("deve criar um novo produto", async () => {
      const newProduct = {
        name: "Notebook Dell",
        sku: "NB-DELL-001",
        category_id: categoryId,
        supplier_id: supplierId,
        cost_price: 2000.00,
        selling_price: 3000.00,
        description: "Notebook para testes"
      };

      const response = await request(app)
        .post("/api/products")
        .send(newProduct)
        .expect(201);

      expect(response.body).toHaveProperty("_id");
      expect(response.body.name).toBe(newProduct.name);
      expect(response.body.sku).toBe(newProduct.sku);

      productId = response.body._id;
    });
  });

  describe("GET /api/products - Listar produtos", () => {
    it("deve retornar a lista de produtos", async () => {
      const response = await request(app)
        .get("/api/products")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/products/:id - Buscar produto por ID", () => {
    it("deve retornar um produto específico", async () => {
      const response = await request(app)
        .get(`/api/products/${productId}`)
        .expect(200);

      expect(response.body).toHaveProperty("_id");
      expect(response.body._id).toBe(productId);
    });

    it("deve retornar 404 para produto inexistente", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .get(`/api/products/${fakeId}`)
        .expect(404);
    });
  });

  describe("PUT /api/products/:id - Atualizar produto", () => {
    it("deve atualizar um produto existente", async () => {
      const updatedData = {
        name: "Notebook Dell Atualizado",
        selling_price: 3500.00
      };

      const response = await request(app)
        .put(`/api/products/${productId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.name).toBe(updatedData.name);
      expect(response.body.selling_price).toBe(updatedData.selling_price);
    });

    it("deve retornar 404 ao atualizar produto inexistente", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .put(`/api/products/${fakeId}`)
        .send({ name: "Teste" })
        .expect(404);
    });
  });

  describe("DELETE /api/products/:id - Excluir produto", () => {
    it("deve excluir um produto existente", async () => {
      const response = await request(app)
        .delete(`/api/products/${productId}`)
        .expect(200);

      expect(response.body).toHaveProperty("ok", true);

      // Verificar se foi realmente excluído
      const deleted = await Product.findById(productId);
      expect(deleted).toBeNull();
    });

    it("deve retornar 404 ao excluir produto inexistente", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .delete(`/api/products/${fakeId}`)
        .expect(404);
    });
  });
});
