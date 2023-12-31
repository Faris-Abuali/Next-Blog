import { compileMDX } from 'next-mdx-remote/rsc' // rsc = react server component
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import Video from '@/app/components/Video'
import CustomImage from '@/app/components/CustomImage'

/** This is the structure of GitHub API Response */
interface TreeItem {
    path: string;
    mode: string;
    type: string;
    sha: string;
    size?: number;
    url: string;
}

interface FileTree {
    sha: string;
    url: string;
    tree: TreeItem[];
    truncated: boolean;
}


export async function getPostByName(fileName: string): Promise<BlogPost | undefined> {
    const res = await fetch(`https://raw.githubusercontent.com/Faris-Abuali/my-blogposts/main/posts/${fileName}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })

    if (!res.ok) return undefined

    const rawMDX = await res.text()

    if (rawMDX === '404: Not Found') return undefined

    const { frontmatter, content } = await compileMDX<{ title: string, date: string, tags: string[] }>({
        source: rawMDX,
        components: {
            Video,
            CustomImage,
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    rehypeHighlight as any,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, {
                        behavior: 'wrap'
                    }],
                ],
            },
        }
    })

    const id = fileName.replace(/\.mdx$/, '')

    const blogPostObj: BlogPost = {
        meta: {
            id,
            title: frontmatter.title,
            date: frontmatter.date,
            tags: frontmatter.tags
        },
        content
    }

    return blogPostObj
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
    const res = await fetch('https://api.github.com/repos/Faris-Abuali/my-blogposts/git/trees/main?recursive=1', {
        headers: {
            Accept: 'application/vnd.github+json',
            // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Authorization: `Bearer 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`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })

    console.log(res)

    if (!res.ok) return undefined

    const repoFileTree: FileTree = await res.json()

    // Filter out to return only the files that end with .mdx
    const filesArray = repoFileTree.tree
        .map(obj => obj.path)
        .filter(path => path.endsWith('.mdx'))
        .map(path => path.replace('posts/', ''))

    const posts: Meta[] = []

    for (const file of filesArray) {
        // `file` is the name of the file, e.g. "my-first-post.mdx"
        const post = await getPostByName(file)
        if (post) {
            const { meta } = post
            posts.push(meta)
        }
    }

    return posts.sort((a, b) => a.date < b.date ? 1 : -1)
}