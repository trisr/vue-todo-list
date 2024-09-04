<script setup lang="ts">
    import ToDoGroup from './ToDoGroup.vue';
    import { TodoStatus } from '@/types/todo';
</script>

<template>
    <div class="groups-wrapper">
        <ToDoGroup :status="TodoStatus.Pending" />
        <ToDoGroup :status="TodoStatus.InProgress" />
        <ToDoGroup :status="TodoStatus.Completed" />
    </div>
</template>

<style scoped>
    .groups-wrapper {
        display: flex;
        justify-content: space-around;
        gap: 20px;
    }
</style>