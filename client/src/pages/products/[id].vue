<script setup lang="ts">
import { getOne, type Product } from '@/models/products';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

interface ProductWithImages extends Product {
    images?: string[];
}

const route = useRoute<{ id: string }>()
const product = ref<ProductWithImages | null>(null)

getOne(route.params.id as string)
  .then((response) => {
    product.value = response;
  })
</script>

<template>
  <div>
    <div class="product section" v-if="product">
      <div class="product-images">
        <img v-for="i in product.images || []" :key="i" :src="i" alt="product image" />
      </div>
      <div class="product-info">
        <h1 class="title">
          {{ product.title }}
        </h1>
        <p>{{ product.description }}</p>
        <span class="price">${{ product.price }}</span>
        <button class="button is-success">Add to cart</button>
      </div>
    </div>
    <div v-else class="Section">
      <p>Loading...</p>  
    </div>
  </div>
</template>

<style scoped>
.product {
    display: flex;
}

.product-images {
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
    justify-content: space-between;
}

.price {
    font-size: 1.5rem;
    font-weight: bold;
    color: palevioletred;
    display: block;
    margin: 1em;
}
</style>