<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Product } from '../types';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="product-card glass-panel">
    <div class="image-container">
      <img :src="product.thumbnail" :alt="product.title" loading="lazy" />
      <span v-if="product.discountPercentage > 0" class="discount-badge">
        -{{ Math.round(product.discountPercentage) }}%
      </span>
    </div>
    
    <div class="content">
      <div class="category">{{ product.category }}</div>
      <RouterLink :to="`/product/${product.id}`" class="title-link">
        <h3 class="title">{{ product.title }}</h3>
      </RouterLink>
      
      <div class="rating-row">
        <div class="rating">
          <span class="star">★</span> {{ product.rating.toFixed(1) }}
        </div>
        <div class="stock" :class="{ 'low-stock': product.stock < 10, 'out-of-stock': product.stock === 0 }">
          {{ product.stock > 0 ? `${product.stock} left` : 'Out of stock' }}
        </div>
      </div>
      
      <div class="price-row">
        <div class="price">${{ product.price.toFixed(2) }}</div>
        <RouterLink :to="`/product/${product.id}`" class="btn btn-primary btn-sm">
          Details
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect ratio */
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid var(--card-border);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  overflow: hidden;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1.5rem;
  transition: transform 0.5s ease;
}

.glass-panel:hover .image-container img {
  transform: scale(1.1);
}

.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--accent);
  color: white;
  padding: 4px 8px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.category {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.title-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-grow: 1;
}

.title-link:hover .title {
  color: var(--primary);
}

.title {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
  word-break: break-word;
}

.rating-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.star {
  color: #fbbf24; /* Yellow for star */
}

.low-stock {
  color: #ef4444; /* Red for low stock */
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
}
</style>
