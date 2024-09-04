import { TodoStatus, type Todo } from "@/types/todo";
import { computed, reactive } from "vue";

interface TodoStore {
    [TodoStatus.Pending]: Todo[];
    [TodoStatus.Completed]: Todo[];
    [TodoStatus.InProgress]: Todo[];
}

const defaultVal = {
    [TodoStatus.Pending]: [
        {
            id: 1,
            title: 'Learn VueJS',
            description: 'Watch Youtube Video',
            status: TodoStatus.Pending
        },
    ],
    [TodoStatus.Completed]: [],
    [TodoStatus.InProgress]: []
}

const todoStore = reactive<TodoStore>(defaultVal);

export default () => {
    const getTodosByStatus = (todoStatus: TodoStatus) => {
        return computed(() => todoStore[todoStatus])
    }

    const addNewTodo = (todo: Todo) => {
        todoStore[todo.status].push(todo)
    }

    const updateTodo = (todo: Todo, newStatus: TodoStatus) => {
        todo.status = newStatus
    }

    const deleteTodo = (todoToDelete: Todo) => {
        todoStore[todoToDelete.status] = todoStore[todoToDelete.status].filter(
            todo => todo.id != todoToDelete.id
        )
    }

    return { getTodosByStatus, addNewTodo, updateTodo, deleteTodo };
}