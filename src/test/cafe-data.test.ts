import { describe, it, expect } from "vitest";
import { categories, products, filterProducts, validateContact } from "@/lib/cafe-data";

describe("Café Central catalog", () => {
  it("has exactly ten products", () => {
    expect(products).toHaveLength(10);
  });
  it.each(categories.filter((category) => category !== "Todos"))(
    "has two products in %s and filters out other categories",
    (category) => {
      const filtered = filterProducts(category);
      expect(filtered).toHaveLength(2);
      expect(filtered.every((product) => product.category === category)).toBe(true);
    },
  );
  it("shows all ten products for Todos", () => {
    expect(filterProducts("Todos")).toHaveLength(10);
  });
});
describe("Contact validation", () => {
  const valid = {
    name: "Maria Silva",
    email: "maria@example.com",
    phone: "(85) 99999-1234",
    message: "Gostaria de conhecer a cafeteria.",
  };
  it("accepts valid contact details", () => {
    expect(validateContact(valid)).toBe(true);
  });
  it.each(["name", "email", "phone", "message"] as const)("rejects empty %s", (field) => {
    expect(validateContact({ ...valid, [field]: "" })).toBe(false);
  });
  it("rejects malformed email", () => {
    expect(validateContact({ ...valid, email: "sem-arroba" })).toBe(false);
  });
  it("rejects incomplete phone", () => {
    expect(validateContact({ ...valid, phone: "123" })).toBe(false);
  });
});
