import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import invariant from "tiny-invariant";

import type { Post } from "~/models/post.server";
import { getPost } from "~/models/post.server";

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);
  const post = await getPost(params.slug);
  invariant(post, `post ${params.slug} not found`);

  return json<LoaderData>({ post });
};

export default function PostSlug() {
  const { post } = useLoaderData();

  return (
    <main className="max-w-4-xl mx-auto">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        Some post: {post.title}
      </h1>
    </main>
  );
}
