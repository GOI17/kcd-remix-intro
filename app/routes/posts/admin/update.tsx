import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import invariant from "tiny-invariant";

import PostForm from "app/routes/posts/admin/components/PostForm";
import { getPost } from "~/models/post.server";
import type { Post } from "~/models/post.server";
import { useLoaderData } from "@remix-run/react";

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);
  const post = await getPost(params.slug);
  invariant(post, `post ${params.slug} not found`);

  return json<LoaderData>({ post });
};

export default function Update() {
  const { post } = useLoaderData();

  return <PostForm method="put" value={post} />;
}
