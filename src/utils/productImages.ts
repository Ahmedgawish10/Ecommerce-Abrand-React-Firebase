import PhoneRealme from "../assets/phone-realme.webp";
import ShooseNike from "../assets/shoose-nike.webp";
import ShooseAdidas from "../assets/shoose-adidas1.webp";
import { Product } from "../types/Shared";

export const localProductImages = [PhoneRealme, ShooseAdidas, ShooseNike];

export const getProductImage = (product?: Partial<Product> | any, index: number = 0): string => {
  if (!product) return PhoneRealme;

  const name = (product.name || "").toLowerCase();
  const category = (product.category || "").toLowerCase();

  if (name.includes("realme") || category.includes("phone")) {
    return PhoneRealme;
  }
  if (name.includes("nike")) {
    return ShooseNike;
  }
  if (name.includes("shose") || name.includes("shoe") || name.includes("adidas")) {
    return ShooseAdidas;
  }

  return localProductImages[index % localProductImages.length];
};

export { PhoneRealme, ShooseNike, ShooseAdidas };
