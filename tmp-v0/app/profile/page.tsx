"use client";

import React from "react"

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, X, Plus, Loader2, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const suggestedStacks = [
  "React", "Next.js", "TypeScript", "JavaScript", "Python", "Java", "C++", "C#",
  "Unity", "Unreal Engine", "Godot", "Blender", "Maya", "Photoshop", "Figma",
  "Node.js", "Express", "FastAPI", "Django", "Spring", "PostgreSQL", "MongoDB",
  "AWS", "Docker", "Git", "Linux", "TensorFlow", "PyTorch"
];

export default function ProfilePage() {
  const { user, isLoggedIn, updateUser } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newStack, setNewStack] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    studentId: user?.studentId || "",
    year: user?.year || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });
  const [techStacks, setTechStacks] = useState<string[]>(user?.techStacks || []);

  if (!isLoggedIn || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-md px-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Login Required</h1>
          <p className="mt-2 text-muted-foreground">Please log in to view your profile.</p>
          <Button onClick={() => router.push("/")} className="mt-6 rounded-lg">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    updateUser({ ...formData, techStacks });
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleAddStack = (stack: string) => {
    const normalizedStack = stack.trim();
    if (normalizedStack && !techStacks.includes(normalizedStack)) {
      setTechStacks([...techStacks, normalizedStack]);
    }
    setNewStack("");
    setShowSuggestions(false);
  };

  const handleRemoveStack = (stack: string) => {
    setTechStacks(techStacks.filter((s) => s !== stack));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newStack.trim()) {
      e.preventDefault();
      handleAddStack(newStack);
    }
  };

  const filteredSuggestions = suggestedStacks.filter(
    (s) => s.toLowerCase().includes(newStack.toLowerCase()) && !techStacks.includes(s)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <h1 className="text-base font-medium">My Profile</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Two-column layout on desktop */}
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          {/* Left: Avatar & Identity */}
          <div className="flex flex-col items-center lg:items-start">
            <Avatar className="h-32 w-32 border border-border/50">
              <AvatarFallback className="bg-muted text-3xl font-light">{initials}</AvatarFallback>
            </Avatar>
            <div className="mt-6 text-center lg:text-left">
              <h2 className="text-2xl font-bold tracking-tight">{user.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                <span className="rounded-md border border-border/50 bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">
                  {user.department}
                </span>
                <span className="rounded-md border border-border/50 bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">
                  {user.year}
                </span>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="mt-8 w-full space-y-2">
              <Link href="/career" className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/50 p-4 transition-all hover:border-border hover:bg-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <span className="text-lg">&#128188;</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Career</p>
                  <p className="text-xs text-muted-foreground">Manage your experience</p>
                </div>
              </Link>
              <Link href="/board" className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/50 p-4 transition-all hover:border-border hover:bg-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <span className="text-lg">&#128221;</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Board</p>
                  <p className="text-xs text-muted-foreground">Community discussions</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Right: Profile Details */}
          <div className="space-y-8">
            {/* Edit Toggle */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight">Profile Information</h3>
              <Button
                variant={isEditing ? "outline" : "default"}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="rounded-lg"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            {isEditing ? (
              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name" className="text-sm font-medium">이름</Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="rounded-lg border-border/50 bg-card focus:border-foreground/20 focus:ring-1 focus:ring-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-studentId" className="text-sm font-medium">학번</Label>
                    <Input
                      id="edit-studentId"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      className="rounded-lg border-border/50 bg-card focus:border-foreground/20 focus:ring-1 focus:ring-foreground/10"
                    />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-year" className="text-sm font-medium">Year</Label>
                    <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                      <SelectTrigger className="rounded-lg border-border/50 bg-card">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1학년">1학년</SelectItem>
                        <SelectItem value="2학년">2학년</SelectItem>
                        <SelectItem value="3학년">3학년</SelectItem>
                        <SelectItem value="4학년">4학년</SelectItem>
                        <SelectItem value="졸업생">졸업생</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone" className="text-sm font-medium">Contact</Label>
                    <Input
                      id="edit-phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="rounded-lg border-border/50 bg-card focus:border-foreground/20 focus:ring-1 focus:ring-foreground/10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-bio" className="text-sm font-medium">Bio</Label>
                  <Textarea
                    id="edit-bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="min-h-[100px] resize-none rounded-lg border-border/50 bg-card focus:border-foreground/20 focus:ring-1 focus:ring-foreground/10"
                  />
                </div>

                {/* Tech Stack Editor */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Tech Stack</Label>
                  <div className="flex flex-wrap gap-2">
                    {techStacks.map((stack) => (
                      <span
                        key={stack}
                        className="group flex items-center gap-1.5 rounded-md border border-border/50 bg-muted/50 px-2.5 py-1 text-sm transition-colors hover:border-destructive/50 hover:bg-destructive/5"
                      >
                        {stack}
                        <button
                          onClick={() => handleRemoveStack(stack)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Add tech stack..."
                      value={newStack}
                      onChange={(e) => {
                        setNewStack(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      className="rounded-lg border-border/50 bg-card focus:border-foreground/20 focus:ring-1 focus:ring-foreground/10"
                    />
                    {showSuggestions && newStack && filteredSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-auto rounded-lg border border-border/50 bg-card shadow-lg">
                        {filteredSuggestions.slice(0, 8).map((suggestion) => (
                          <button
                            key={suggestion}
                            onMouseDown={() => handleAddStack(suggestion)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                          >
                            <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button onClick={handleSave} disabled={isSaving} className="rounded-lg">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Info Grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">이름</p>
                    <p className="text-base">{user.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">학번</p>
                    <p className="text-base">{user.studentId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Year</p>
                    <p className="text-base">{user.year}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Contact</p>
                    <p className="text-base">{user.phone}</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Bio</p>
                  <p className="text-base leading-relaxed text-foreground/80">
                    {user.bio || "No bio provided."}
                  </p>
                </div>

                {/* Tech Stack Display */}
                <div className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Tech Stack</p>
                  {user.techStacks && user.techStacks.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.techStacks.map((stack) => (
                        <span
                          key={stack}
                          className="rounded-md border border-border/50 bg-muted/30 px-3 py-1.5 text-sm font-medium"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No tech stacks added yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
