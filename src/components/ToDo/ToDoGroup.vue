<script setup lang="ts">
    import { TodoStatus } from '@/types/todo';
    import draggable from 'vuedraggable'

    import useTodos from '@/store/useTodos';

    import CreateTodo from './CreateTodo.vue';

    interface Props {
        status: TodoStatus;
    }

    const props = defineProps<Props>();

    const { getTodosByStatus, updateTodo, deleteTodo } = useTodos()
    const todoList = getTodosByStatus(props.status)

    const groupLabel = {
        [TodoStatus.Pending]: 'Pending',
        [TodoStatus.Completed]: 'Completed',
        [TodoStatus.InProgress]: 'InProgress'
    }

    const onDraggableChange = (payload: any) => {
        if (payload?.added?.element) {
            updateTodo(payload?.added?.element, props.status)
        }
    }
</script>

<template>
    <div class="group-wrapper">
        <h3>{{ groupLabel[props.status] }}</h3>
        <draggable
            class="draggable"
            :list="todoList"
            group="todos"
            itemKey="id"
            @change="onDraggableChange"
        >
            <template #item="{ element: todo }">
                <li>
                    {{ todo.title }}
                    {{ todo.status }}
                    <span class="delete-icon" @click="deleteTodo(todo)">x</span>
                    <div>
                        <span class="todo-desc">{{ todo.description }}</span>
                    </div>
                </li>
            </template>
        </draggable>

        <CreateTodo :status="props.status" />
    </div>
</template>

<style scoped>
    .group-wrapper {
        flex: 1;
        padding: 20px;
        background-color: azure;
        width: 300px;
        color: black;
    }

    .group-wrapper li {
        list-style-type: none;
        background-color: aliceblue;
        color: black;
        padding: 2px 5px;
        cursor: grab;
        margin-bottom: 10px;
    }

    .todo-desc {
        font-size: 12px;
    }

    .draggable {
        height: 200px;
    }

    .delete-icon {
        float: right;
    }
</style>