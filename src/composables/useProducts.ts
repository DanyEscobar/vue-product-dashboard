import { ref } from 'vue';
import { fetchProducts, searchProducts, fetchProductsByCategory } from '../services/api';
import type { Product } from '../types';

export function useProducts() {
  const products = ref<Product[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const total = ref(0);
  const skip = ref(0);
  const limit = ref(10);
  const currentQuery = ref('');
  const currentCategory = ref('');

  const loadProducts = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      let res;
      if (currentCategory.value) {
        if (currentQuery.value) {
          // Both active: fetch all in category, then local filter
          const allRes = await fetchProductsByCategory(currentCategory.value, 150, 0);
          const filtered = allRes.products.filter(p => p.title.toLowerCase().includes(currentQuery.value.toLowerCase()));
          res = {
            products: filtered.slice(skip.value, skip.value + limit.value),
            total: filtered.length,
            skip: skip.value,
            limit: limit.value
          };
        } else {
          res = await fetchProductsByCategory(currentCategory.value, limit.value, skip.value);
        }
      } else if (currentQuery.value) {
        const queryLower = currentQuery.value.toLowerCase();
        // Fetch broad results from API, then strictly filter by title
        const searchRes = await searchProducts(currentQuery.value, 150, 0);
        const filtered = searchRes.products.filter((p: Product) => p.title.toLowerCase().includes(queryLower));
        res = {
          products: filtered.slice(skip.value, skip.value + limit.value),
          total: filtered.length,
          skip: skip.value,
          limit: limit.value
        };
      } else {
        res = await fetchProducts(limit.value, skip.value);
      }
      
      products.value = res.products;
      total.value = res.total;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'Error fetching products';
      }
    } finally {
      loading.value = false;
    }
  };

  const handleSearch = (query: string) => {
    currentQuery.value = query;
    skip.value = 0; // Reset pagination
    loadProducts();
  };

  const handleCategorySelect = (category: string) => {
    currentCategory.value = category;
    currentQuery.value = ''; // Reset search input when changing categories
    skip.value = 0; // Reset pagination
    loadProducts();
  };

  const handlePageChange = (newSkip: number) => {
    skip.value = newSkip;
    loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    products,
    loading,
    error,
    total,
    skip,
    limit,
    currentQuery,
    currentCategory,
    loadProducts,
    handleSearch,
    handleCategorySelect,
    handlePageChange
  };
}
