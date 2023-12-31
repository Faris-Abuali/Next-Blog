export async function getTodos(): Promise<TodoItem[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')

    const todos: TodoItem[] = await res.json()

    return todos
}