<template>
  <div class="product-skeleton glass-panel">
    <div class="skeleton-image pulse"></div>
    <div class="content">
      <div class="skeleton-category pulse"></div>
      <div class="skeleton-title pulse"></div>
      <div class="skeleton-title short pulse"></div>
      
      <div class="rating-row">
        <div class="skeleton-rating pulse"></div>
        <div class="skeleton-stock pulse"></div>
      </div>
      
      <div class="price-row">
        <div class="skeleton-price pulse"></div>
        <div class="skeleton-btn pulse"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-skeleton {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.pulse {
  background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%);
  background-size: 200% 100%;
  animation: pulse-bg 1.5s infinite ease-in-out;
  border-radius: var(--radius-sm);
}

@keyframes pulse-bg {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-image {
  width: 100%;
  padding-top: 100%;
  border-radius: inherit;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.75rem;
}

.skeleton-category {
  width: 40%;
  height: 12px;
}

.skeleton-title {
  width: 90%;
  height: 20px;
}

.skeleton-title.short {
  width: 60%;
}

.rating-row {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.skeleton-rating {
  width: 30%;
  height: 14px;
}

.skeleton-stock {
  width: 25%;
  height: 14px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.5rem;
}

.skeleton-price {
  width: 40%;
  height: 28px;
}

.skeleton-btn {
  width: 80px;
  height: 32px;
  border-radius: var(--radius-full);
}
</style>
