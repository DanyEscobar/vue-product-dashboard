<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  total: number;
  limit: number;
  skip: number;
}>();

const emit = defineEmits<{
  (e: 'changePage', skip: number): void;
}>();

const currentPage = computed(() => Math.floor(props.skip / props.limit) + 1);
const totalPages = computed(() => Math.ceil(props.total / props.limit));

const previousPage = () => {
  if (currentPage.value > 1) {
    emit('changePage', props.skip - props.limit);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    emit('changePage', props.skip + props.limit);
  }
};
</script>

<template>
  <div class="pagination" v-if="totalPages > 1">
    <button 
      @click="previousPage" 
      :disabled="currentPage === 1"
      class="btn btn-outline"
    >
      Previous
    </button>
    
    <span class="page-info">
      Page <strong>{{ currentPage }}</strong> of <strong>{{ totalPages }}</strong>
    </span>
    
    <button 
      @click="nextPage" 
      :disabled="currentPage === totalPages"
      class="btn btn-outline"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  padding: 1rem 0;
}

.page-info {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.page-info strong {
  color: var(--text-main);
  margin: 0 0.2rem;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:disabled:hover {
  background: transparent;
  color: var(--primary);
}
</style>
