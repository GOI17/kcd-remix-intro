import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { marked } from "marked";
import invariant from "tiny-invariant";

import type { Post } from "~/models/post.server";
import { getPost } from "~/models/post.server";

type LoaderData = { post: Post; html: string };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);
  const post = await getPost(params.slug);
  invariant(post, `post ${params.slug} not found`);
  const html = marked(post.markdown);

  return json<LoaderData>({ post, html });
};

export default function PostSlug() {
  const { post, html } = useLoaderData();

  return (
    <main className="max-w-4-xl mx-auto">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        Some post: {post.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <p className="text-right">
        <Link to="update" className="text-blue-600 underline">
          Edit Post
        </Link>
      </p>
    </main>
  );
}
