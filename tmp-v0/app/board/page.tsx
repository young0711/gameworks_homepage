"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { mockPosts, categoryLabels, type Post } from "@/lib/board-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, PenSquare, MessageSquare, Eye, ChevronRight } from "lucide-react";

export default function BoardPage() {
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Post["category"] | "all">("all");
  const [sortBy, setSortBy] = useState<"latest" | "views">("latest");

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === "all" || post.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "views") {
      return b.views - a.views;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const tabs: { value: Post["category"] | "all"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "notice", label: "Notices" },
    { value: "qna", label: "Q&A" },
    { value: "project", label: "Projects" },
    { value: "free", label: "Archive" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <h1 className="text-base font-medium">Board</h1>
          {isLoggedIn ? (
            <Link href="/board/write">
              <Button size="sm" className="rounded-lg">
                <PenSquare className="mr-1.5 h-4 w-4" />
                Write
              </Button>
            </Link>
          ) : (
            <div className="w-20" />
          )}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Board</h2>
          <p className="mt-2 text-muted-foreground">Community discussions and announcements</p>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`relative whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.value
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              {activeTab === tab.value && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
              )}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border-border/50 bg-card pl-10 focus:border-foreground/20 focus:ring-1 focus:ring-foreground/10"
            />
          </div>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as "latest" | "views")}>
            <SelectTrigger className="w-[130px] rounded-lg border-border/50 bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="views">Most viewed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Posts List */}
        {sortedPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 py-16">
            <p className="text-muted-foreground">No posts found.</p>
          </div>
        ) : (
          <div className="divide-y divide-border/40">
            {sortedPosts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function PostRow({ post }: { post: Post }) {
  const isNotice = post.category === "notice";

  return (
    <Link
      href={`/board/${post.id}`}
      className="group flex items-center gap-4 py-4 transition-colors hover:bg-muted/30"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${
              isNotice
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {categoryLabels[post.category]}
          </span>
          {isNotice && (
            <span className="text-xs font-medium text-foreground">Important</span>
          )}
        </div>
        <h3 className="mt-1.5 font-medium text-foreground/90 group-hover:text-foreground truncate">
          {post.title}
        </h3>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{post.author.name}</span>
          <span>{post.createdAt}</span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {post.views}
          </span>
          {post.comments.length > 0 && (
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {post.comments.length}
            </span>
          )}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
