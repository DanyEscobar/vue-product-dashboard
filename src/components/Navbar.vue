<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navbar glass">
    <div class="container">
      <RouterLink to="/" class="logo">
        <span class="text-gradient">Nova</span> Shop
      </RouterLink>
      <div class="links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1.25rem 0;
  margin-bottom: 3rem;
  background: rgba(11, 12, 16, 0.15);
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text-main);
  letter-spacing: -0.5px;
}

.links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
}

.nav-link:hover, .router-link-active:not(.logo) {
  color: white;
  text-shadow: 0 0 10px rgba(79, 70, 229, 0.8);
}
</style>
