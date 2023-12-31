import { getTodos } from "@/lib/getTodos"

// export const revalidate = 86400
export const revalidate = 0

export async function generateMetadata() {

    const todos: TodoItem[] = await getTodos() //deduped!

    if (!todos) {
        return {
            title: 'Todos Not Found'
        }
    }

    return {
        title: "Todos",
    }
}


export default async function TodoPage() {
    const todos: TodoItem[] = await getTodos() //deduped!

    return (
        <ul className="p-4 list-none">
            {todos.map((todo) => (
                <li key={todo.id} className="px-2 border border-blue-600">
                    <h2>{todo.title}</h2>
                    <p>{todo.completed}</p>
                </li>
            ))}
        </ul>
    )
}