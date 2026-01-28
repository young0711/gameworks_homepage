"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { mockPosts, categoryLabels } from "@/lib/board-data";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Eye, MessageSquare, Send, Loader2 } from "lucide-react";

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const post = mockPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-md px-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Post Not Found</h1>
          <p className="mt-2 text-muted-foreground">This post may have been deleted or does not exist.</p>
          <Button onClick={() => router.push("/board")} className="mt-6 rounded-lg">
            Back to Board
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmitComment = async () => {
    if (!commentText.trim() || !isLoggedIn) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setCommentText("");
    setIsSubmitting(false);
    alert("Comment submitted. (Demo mode - not actually saved)");
  };

  const authorInitials = post.author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link
            href="/board"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <span
            className={`rounded-md px-2.5 py-1 text-xs font-medium ${
              post.category === "notice"
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {categoryLabels[post.category]}
          </span>
          <div className="w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        {/* Article */}
        <article>
          <h1 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">{post.title}</h1>

          <div className="mt-6 flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border/50">
              <AvatarFallback className="bg-muted text-sm">{authorInitials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.createdAt}</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {post.views}
                </span>
              </div>
            </div>
          </div>

          <div className="my-8 h-px bg-border/50" />

          <div className="prose prose-neutral max-w-none dark:prose-invert">
            {post.content.split("\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4 leading-relaxed text-foreground/80 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Comments */}
        <section className="mt-16">
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <MessageSquare className="h-5 w-5" />
            Comments ({post.comments.length})
          </h2>

          {/* Comment Form */}
          {isLoggedIn ? (
            <div className="mt-6 rounded-xl border border-border/40 bg-card/50 p-4">
              <div className="flex gap-3">
                <Avatar className="h-9 w-9 shrink-0 border border-border/50">
                  <AvatarFallback className="bg-muted text-xs">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[80px] resize-none rounded-lg border-border/50 bg-background focus:border-foreground/20 focus:ring-1 focus:ring-foreground/10"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSubmitComment}
                      disabled={!commentText.trim() || isSubmitting}
                      size="sm"
                      className="rounded-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-1.5 h-4 w-4" />
                          Post
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-border/50 py-8 text-center">
              <p className="text-sm text-muted-foreground">Please log in to comment.</p>
            </div>
          )}

          {/* Comments List */}
          <div className="mt-8 space-y-4">
            {post.comments.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              post.comments.map((comment) => {
                const commentInitials = comment.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <div key={comment.id} className="flex gap-3 rounded-xl border border-border/40 bg-card/30 p-4">
                    <Avatar className="h-8 w-8 shrink-0 border border-border/50">
                      <AvatarFallback className="bg-muted text-xs">{commentInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
