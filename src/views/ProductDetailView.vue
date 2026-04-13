<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchProductById } from '../services/api';
import type { Product } from '../types';

const route = useRoute();
const router = useRouter();
const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const activeImage = ref<string>('');

onMounted(async () => {
  const id = route.params.id as string;
  loading.value = true;
  
  try {
    const data = await fetchProductById(id);
    product.value = data;
    if (data.images && data.images.length > 0) {
      activeImage.value = data.images[0];
    } else {
      activeImage.value = data.thumbnail;
    }
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = 'Error loading product details';
    }
  } finally {
    loading.value = false;
  }
});

const goBack = () => {
  router.back();
};
</script>

<template>
  <main class="product-detail container">
    <button @click="goBack" class="btn btn-outline back-btn glass">
      ← Back to Dashboard
    </button>
    
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading product details...</p>
    </div>

    <div v-else-if="error" class="error-state glass-panel">
      <h2>Oops! Something went wrong</h2>
      <p>{{ error }}</p>
      <button @click="goBack" class="btn btn-primary mt-4">Go Back</button>
    </div>

    <div v-else-if="product" class="detail-grid">
      <!-- Image Gallery -->
      <div class="gallery-section glass-panel">
        <div class="main-image-container">
          <img :src="activeImage" :alt="product.title" class="main-image" />
          <span v-if="product.discountPercentage > 0" class="discount-badge">
            -{{ Math.round(product.discountPercentage) }}%
          </span>
        </div>
        
        <div class="thumbnail-list" v-if="product.images.length > 1">
          <button 
            v-for="(img, idx) in product.images" 
            :key="idx"
            class="thumb-btn"
            :class="{ active: activeImage === img }"
            @click="activeImage = img"
          >
            <img :src="img" :alt="`${product.title} view ${idx + 1}`" />
          </button>
        </div>
      </div>
      
      <!-- Info Section -->
      <div class="info-section glass-panel">
        <div class="brand-category">
          <span class="category">{{ product.category }}</span>
          <span v-if="product.brand" class="brand">{{ product.brand }}</span>
        </div>
        
        <h1 class="title">{{ product.title }}</h1>
        
        <div class="rating-row">
          <div class="rating">
            <span class="star">★</span> {{ product.rating.toFixed(1) }}
          </div>
          <div class="stock" :class="{ 'low-stock': product.stock < 10, 'out-of-stock': product.stock === 0 }">
            {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
          </div>
        </div>
        
        <div class="price-section">
          <div class="price">${{ product.price.toFixed(2) }}</div>
          <div v-if="product.discountPercentage > 0" class="original-price">
            ${{ (product.price / (1 - product.discountPercentage / 100)).toFixed(2) }}
          </div>
        </div>
        
        <div class="description">
          <h3>About this product</h3>
          <p>{{ product.description }}</p>
        </div>
        
        <div class="actions">
          <button class="btn btn-primary w-full add-cart-btn" :disabled="product.stock === 0">
            {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
  width: 100%;
}

.back-btn {
  margin-bottom: 2rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 900px) {
  .detail-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.gallery-section, .info-section {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.main-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
}

.main-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.main-image-container:hover .main-image {
  transform: scale(1.08);
}

.discount-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--accent);
  color: white;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.thumbnail-list {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  flex-wrap: wrap;
}

.thumb-btn {
  flex: 0 0 80px;
  height: 80px;
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.thumb-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.95);
}

.thumb-btn img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.thumb-btn.active {
  border-color: var(--primary);
}

.brand-category {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.category {
  color: var(--primary);
  text-transform: uppercase;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.brand {
  color: var(--text-muted);
  font-size: 0.85rem;
  background: var(--card-bg);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--card-border);
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  word-break: break-word;
}

.rating-row {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--card-border);
  flex-wrap: wrap;
}

.star {
  color: #fbbf24;
}

.low-stock {
  color: #ef4444;
}

.price-section {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.original-price {
  font-size: 1.25rem;
  color: var(--text-muted);
  text-decoration: line-through;
  margin-bottom: 0.25rem;
}

.description {
  margin-bottom: 2rem;
}

.description h3 {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  color: var(--text-main);
}

.description p {
  color: var(--text-muted);
  line-height: 1.6;
}

.actions {
  margin-top: auto;
}

.w-full {
  width: 100%;
}

.add-cart-btn {
  padding: 1rem;
  font-size: 1.1rem;
}

.add-cart-btn:disabled {
  background: var(--card-border);
  color: var(--text-muted);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Loading state */
.loading-state, .error-state {
  text-align: center;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error-state {
  max-width: 600px;
  margin: 0 auto;
}

.error-state h2 {
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
</style>
