import { CommentList } from "@/components/comment-list";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { unstable_cache as nextcache, revalidateTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeButton from "@/components/like-button";
import { getComments } from "./actions";

export const metadata = {
  title: "게시글",
};

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
            // likes: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}
const getCachedPost = nextcache(getPost, ["post-detail"]);

async function getLikeStatus(postId: number, userId: number) {
  // const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  return { isLiked: Boolean(isLiked), likeCount };
}
// const getCachedLikeStatus = nextcache(getLikeStatus, ["product-like-status"]);

async function getCachedLikeStatus(postId: number, userId: number) {
  const cachedOperation = nextcache(getLikeStatus, ["product-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId, userId!);
}

function getCachedComments(postId: number) {
  const cachedComments = nextcache(getComments, ["comments"], {
    tags: [`comments-${postId}`],
  });
  return cachedComments(postId);
}

async function getMe() {
  const mySession = await getSession();
  const me = mySession.id
    ? await db.user.findUnique({
        where: {
          id: mySession.id,
        },
        select: {
          id: true,
          avatar: true,
          username: true,
        },
      })
    : null;
  return me;
}
export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }

  const session = await getSession();
  const userId = session.id;
  const { likeCount, isLiked } = await getCachedLikeStatus(id, userId!);
  const allComments = await getCachedComments(post.id);
  console.log(allComments);
  const me = await getMe();

  return (
    <div className=" text-white relative min-h-screen">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Image
            width={28}
            height={28}
            className="size-7 rounded-full"
            src={post.user.avatar ?? "/avatar.svg"}
            alt={post.user.username}
          />
          <div>
            <span className="text-sm font-semibold">{post.user.username}</span>
            <div className="text-xs">
              <span>{formatToTimeAgo(post.created_at.toString())}</span>
            </div>
          </div>
        </div>
        <h2 className="text-lg font-semibold">{post.title}</h2>
        <p className="mb-5">{post.description}</p>
        <div className="flex flex-col gap-5 items-start">
          <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <EyeIcon className="size-5" />
            <span>조회 {post.views}</span>
          </div>
          <LikeButton
            postId={post.id}
            isLiked={isLiked}
            likeCount={likeCount}
          />
        </div>
      </div>
      <CommentList postId={post.id} allComments={allComments} me={me} />
    </div>
  );
}
