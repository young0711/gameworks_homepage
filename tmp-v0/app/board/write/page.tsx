"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import type { Post } from "@/lib/board-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Loader2 } from "lucide-react";

export default function WritePage() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "free" as Post["category"],
    content: "",
  });

  if (!isLoggedIn || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-md px-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Login Required</h1>
          <p className="mt-2 text-muted-foreground">Please log in to write a post.</p>
          <Button onClick={() => router.push("/")} className="mt-6 rounded-lg">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    alert("Post submitted. (Demo mode - not actually saved)");
    setIsSubmitting(false);
    router.push("/board");
  };

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
            <span>Cancel</span>
          </Link>
          <h1 className="text-base font-medium">New Post</h1>
          <div className="w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value: Post["category"]) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="w-full rounded-lg border-border/50 bg-card sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Archive</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="qna">Q&A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Title</Label>
            <Input
              id="title"
              placeholder="Enter post title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="rounded-lg border-border/50 bg-card focus:border-foreground/20 focus:ring-1 focus:ring-foreground/10"
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your post content..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="min-h-[300px] resize-none rounded-lg border-border/50 bg-card focus:border-foreground/20 focus:ring-1 focus:ring-foreground/10"
              required
            />
            <p className="text-xs text-muted-foreground">
              Markdown supported (e.g., **bold**, *italic*, `code`)
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/board")}
              className="rounded-lg bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
              className="rounded-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-1.5 h-4 w-4" />
                  Submit
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
