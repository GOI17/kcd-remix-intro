import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

type Post = {
  slug: string;
  title: string;
};

type LoaderData = {
  posts: Post[];
};

export const loader = async () => {
  const posts = [
    { slug: "my-first-post", title: "My First Post" },
    { slug: "90s-mixtape", title: "A Mixtape I Made Just For You" },
  ];

  return json<LoaderData>({ posts });
};

export default function Posts() {
  const { posts } = useLoaderData<LoaderData>();

  const postList = (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link to={post.slug} className="text-blue-600 underline">
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <main>
      <h1>Posts</h1>
      {postList}
    </main>
  );
}
