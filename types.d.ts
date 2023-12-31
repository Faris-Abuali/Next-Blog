type Meta = {
    id: string,
    title: string,
    date: string,
    tags: string[],
}

type BlogPost = {
    meta: Meta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

type TodoItem = {
    userId: number,
    id: number,
    title: string,
    completed: boolean,
}
