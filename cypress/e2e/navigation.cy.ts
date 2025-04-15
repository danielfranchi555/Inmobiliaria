describe("create property", () => {
  beforeEach(() => {
    // Visita la página del formulario de propiedades
    cy.visit("/admin/properties/add-property");
  });

  it("fills and submits the create property form", () => {
    // Título
    cy.get("input#title").type("Modern Apartment");

    // Precio
    cy.get("input#price").type("250000");

    // Estado
    cy.get('[data-testid="status"]').click();
    cy.get('[data-testid="select-item-AVAILABLE"]').click({ force: true });

    // Tipo de operación
    cy.get('[data-testid="listingType"]').click();
    cy.get('[data-testid="select-item-SALE"]').click({ force: true });

    // Dirección
    cy.get("input#address").type("123 Main St");

    // Ciudad
    cy.get("input#city").type("New York");

    // Barrio
    cy.get("input#neighborhood").type("Brooklyn");

    // Tipo de propiedad
    cy.get('[data-testid="propertyType"]').click();
    cy.get('[data-testid="select-item-APARTMENT"]').click({ force: true });

    // Dormitorios
    cy.get('input[name="bedrooms"]').type("2");

    // Baños
    cy.get("input#bathrooms").type("1");

    // Metros cuadrados
    cy.get("input#squareMeters").type("75");

    // Cocheras
    cy.get("input#parkingSpaces").type("1");

    cy.get('[data-testid="select-userSellerId"]').click();
    cy.get('[data-testid="select-item-Daniel-Franchi"]').click({ force: true });

    // Amoblado
    cy.get('input[type="checkbox"]').first().check({ force: true });

    // Descripción
    cy.get("textarea#description").type(
      "Beautiful modern apartment with lots of light."
    );

    // Imágenes - simulación (necesitas configurar subida de archivos con test file en fixtures)
    // Necesitás tener una imagen dummy en cypress/fixtures

    cy.get('[data-testid="image-upload"]').attachFile([
      "test-image-2.jpeg",
      "test-image-3.jpeg",
      "test-image-4.jpeg",
    ]);
    // Enviar
    cy.get('button[type="submit"]').click();

    // Verifica éxito
    // cy.contains("Property created successfully").should("exist");
  });
});
