<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProducts } from '../composables/useProducts';
import ProductCard from '../components/ProductCard.vue';
import ProductSkeleton from '../components/ProductSkeleton.vue';
import SearchBar from '../components/SearchBar.vue';
import CategorySelector from '../components/CategorySelector.vue';
import Pagination from '../components/Pagination.vue';

const {
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
} = useProducts();

const searchKey = ref(0);

const onCategorySelect = (category: string) => {
  handleCategorySelect(category);
  searchKey.value++;
};

const clearFilters = () => {
  currentQuery.value = '';
  currentCategory.value = '';
  skip.value = 0;
  searchKey.value++;
  loadProducts();
};

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <main class="dashboard container">
    <header class="dashboard-header">
      <div class="header-content glass-panel">
        <div class="title-section">
          <h1>Product <span class="text-gradient">Dashboard</span></h1>
          <p class="subtitle">Discover our amazing collection of products</p>
        </div>
        
        <div class="controls-section">
          <SearchBar :key="searchKey" @search="handleSearch" :initial-query="currentQuery" />
          <CategorySelector :selected-category="currentCategory" @select="onCategorySelect" />
        </div>
      </div>
    </header>

    <div v-if="loading" class="products-section mt-4">
      <div class="products-grid">
        <ProductSkeleton v-for="n in 8" :key="n" />
      </div>
    </div>

    <div v-else-if="error" class="error-state glass-panel">
      <h2>Oops! Something went wrong</h2>
      <p>{{ error }}</p>
      <button @click="loadProducts" class="btn btn-primary mt-4">Try Again</button>
    </div>

    <div v-else-if="products.length === 0" class="empty-state glass-panel">
      <h2>No products found</h2>
      <p>Try adjusting your search or category filter.</p>
      <button @click="clearFilters" class="btn btn-outline mt-4">
        Clear Filters
      </button>
    </div>

    <div v-else class="products-section">
      <div class="controls-info">
        <p>Showing <strong>{{ products.length }}</strong> of <strong>{{ total }}</strong> products</p>
      </div>
      
      <div class="products-grid">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
        />
      </div>

      <Pagination 
        :total="total" 
        :skip="skip" 
        :limit="limit" 
        @change-page="handlePageChange" 
      />
    </div>
  </main>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.header-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.title-section h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 480px) {
  .title-section h1 {
    font-size: 2rem;
    word-break: break-word;
  }
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.controls-section {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.controls-info {
  margin-bottom: 1.5rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.controls-info strong {
  color: var(--text-main);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: 1.5rem;
}

/* Loading state */
.loading-state, .error-state, .empty-state {
  text-align: center;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error-state, .empty-state {
  max-width: 600px;
  margin: 0 auto;
}

.error-state h2, .empty-state h2 {
  margin-bottom: 1rem;
}

.error-state p {
  color: #ef4444;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--card-border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (min-width: 768px) {
  .header-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>
