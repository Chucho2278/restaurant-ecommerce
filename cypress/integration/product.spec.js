describe("Product Management", () => {
  it("should load products on the homepage", () => {
    cy.visit("http://localhost:4200");
    cy.contains("Hamburguesa Sencilla");
  });

  it("should add a new product", () => {
    cy.visit("http://localhost:4200/funcionarios");
    cy.get('input[formControlName="name"]').type("Nuevo Producto");
    cy.get('input[formControlName="price"]').type("15000");
    cy.get('input[formControlName="description"]').type(
      "Descripción del nuevo producto"
    );
    cy.get('input[formControlName="imageUrl"]').type(
      "assets/images/nuevo-producto.jpg"
    );
    cy.contains("Agregar Producto").click();
    cy.contains("Nuevo Producto");
  });

  it("should update an existing product", () => {
    cy.visit("http://localhost:4200/funcionarios");
    cy.contains("Editar").click();
    cy.get('input[formControlName="name"]')
      .clear()
      .type("Producto Actualizado");
    cy.contains("Actualizar Producto").click();
    cy.contains("Producto Actualizado");
  });

  it("should delete a product", () => {
    cy.visit("http://localhost:4200/funcionarios");
    cy.contains("Eliminar").click();
    cy.contains("Producto Actualizado").should("not.exist");
  });
});
