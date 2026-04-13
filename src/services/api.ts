const BASE_URL = 'https://dummyjson.com/products';

import type { Product, ProductsResponse, Category } from '../types';

export const fetchProducts = async (limit: number = 10, skip: number = 0): Promise<ProductsResponse> => {
  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const searchProducts = async (query: string, limit: number = 10, skip: number = 0): Promise<ProductsResponse> => {
  const res = await fetch(`${BASE_URL}/search?q=${query}&limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('Failed to search products');
  return res.json();
};

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const fetchProductsByCategory = async (category: string, limit: number = 10, skip: number = 0): Promise<ProductsResponse> => {
  const res = await fetch(`${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('Failed to fetch products by category');
  return res.json();
};

export const fetchProductById = async (id: number | string): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product details');
  return res.json();
};
