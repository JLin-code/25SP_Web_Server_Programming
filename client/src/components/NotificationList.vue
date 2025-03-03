<script setup lang="ts">
import { ref } from 'vue';


const notifications = ref([
    { text: 'This is a primary notification #1', type: 'primary' },
    { text: 'This is a primary notification #2', type: 'primary' },
    { text: 'This is a primary notification #3', type: 'primary' },
    { text: 'This is a primary notification #4', type: 'primary' },
]);

function removeNotification(index: number) {
    notifications.value.splice(index, 1);
};

</script>

<template>
    <div>
        <div v-for="(message, index) in notifications" :key="index" class="notification is-success is-light">
                            <button class="delete" @click="removeNotification(index)"></button>
                            {{ message }}
                        </div>
    </div>
</template>

<style scoped>

</style>