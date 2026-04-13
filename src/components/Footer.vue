<script setup lang="ts">
// Footer component
</script>

<template>
  <footer class="app-footer">
    <div class="container text-center">
      <p>Built with ❤️ by <span class="text-gradient">Dany Escobar</span></p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: 4rem;
  padding: 2rem 0;
  text-align: center;
  background: rgba(11, 12, 16, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.app-footer p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.app-footer .text-gradient {
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>
