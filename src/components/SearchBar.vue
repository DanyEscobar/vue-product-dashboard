<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  initialQuery?: string;
}>();

const emit = defineEmits<{
  (e: 'search', query: string): void;
}>();

const query = ref(props.initialQuery || '');

watch(() => props.initialQuery, (newVal) => {
  query.value = newVal || '';
});

const handleSearch = () => {
  emit('search', query.value);
};

watch(query, (newVal) => {
  if (newVal === '' && props.initialQuery !== '') {
    handleSearch();
  }
});
</script>

<template>
  <div class="search-bar">
    <form @submit.prevent="handleSearch" class="search-form">
      <input 
        type="text" 
        v-model="query" 
        placeholder="Search for products..." 
        class="input-glass"
      />
      <button type="submit" class="btn btn-primary search-btn">
        Search
      </button>
    </form>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 600px;
}

.search-form {
  display: flex;
  gap: 0.5rem;
  position: relative;
}

@media (max-width: 480px) {
  .search-form {
    flex-direction: column;
  }
}

.search-btn {
  padding: 0.6rem 1.5rem;
}
</style>
