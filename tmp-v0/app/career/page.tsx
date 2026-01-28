"use client";

import React from "react";
import { useState } from "react";
import { useAuth, type CareerItem } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Trash2, Briefcase, Award, FileCheck, Users, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const careerTypeLabels: Record<CareerItem["type"], string> = {
  project: "Project",
  award: "Award",
  certification: "Certificate",
  activity: "Activity",
};

const careerTypeIcons: Record<CareerItem["type"], React.ReactNode> = {
  project: <Briefcase className="h-4 w-4" />,
  award: <Award className="h-4 w-4" />,
  certification: <FileCheck className="h-4 w-4" />,
  activity: <Users className="h-4 w-4" />,
};

export default function CareerPage() {
  const { user, isLoggedIn, addCareerItem, removeCareerItem } = useAuth();
  const router = useRouter();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeFilter, setActiveFilter] = useState<CareerItem["type"] | "all">("all");
  const [newItem, setNewItem] = useState<Omit<CareerItem, "id">>({
    type: "project",
    title: "",
    description: "",
    date: "",
    organization: "",
  });

  if (!isLoggedIn || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-md px-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Login Required</h1>
          <p className="mt-2 text-muted-foreground">Please log in to manage your career.</p>
          <Button onClick={() => router.push("/")} className="mt-6 rounded-lg">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.date) return;
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    addCareerItem(newItem);
    setNewItem({
      type: "project",
      title: "",
      description: "",
      date: "",
      organization: "",
    });
    setIsSaving(false);
    setIsAddingNew(false);
  };

  const handleRemoveItem = async (id: string) => {
    removeCareerItem(id);
  };

  const filteredCareer = activeFilter === "all" 
    ? user.career 
    : user.career.filter((item) => item.type === activeFilter);

  const stats = {
    project: user.career.filter((item) => item.type === "project").length,
    award: user.career.filter((item) => item.type === "award").length,
    certification: user.career.filter((item) => item.type === "certification").length,
    activity: user.career.filter((item) => item.type === "activity").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/profile" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Profile</span>
          </Link>
          <h1 className="text-base font-medium">Career</h1>
          <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-lg">
                <Plus className="mr-1.5 h-4 w-4" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-xl border-border/50 sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold tracking-tight">Add Career Item</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Type</Label>
                  <Select
                    value={newItem.type}
                    onValueChange={(value: CareerItem["type"]) => setNewItem({ ...newItem, type: value })}
                  >
                    <SelectTrigger className="rounded-lg border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="award">Award</SelectItem>
                      <SelectItem value="certification">Certificate</SelectItem>
                      <SelectItem value="activity">Activity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-title" className="text-sm font-medium">Title</Label>
                  <Input
                    id="new-title"
                    placeholder="Enter title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="rounded-lg border-border/50"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-date" className="text-sm font-medium">Date</Label>
                    <Input
                      id="new-date"
                      type="month"
                      value={newItem.date}
                      onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                      className="rounded-lg border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-org" className="text-sm font-medium">Organization</Label>
                    <Input
                      id="new-org"
                      placeholder="Optional"
                      value={newItem.organization}
                      onChange={(e) => setNewItem({ ...newItem, organization: e.target.value })}
                      className="rounded-lg border-border/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-desc" className="text-sm font-medium">Description</Label>
                  <Textarea
                    id="new-desc"
                    placeholder="Describe your achievement"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="min-h-[100px] resize-none rounded-lg border-border/50"
                  />
                </div>
                <Button onClick={handleAddItem} disabled={isSaving || !newItem.title} className="w-full rounded-lg">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Item"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {/* Stats */}
        <div className="mb-10 grid grid-cols-4 gap-3">
          {(Object.keys(stats) as CareerItem["type"][]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(activeFilter === type ? "all" : type)}
              className={`flex flex-col items-center rounded-xl border p-4 transition-all ${
                activeFilter === type
                  ? "border-foreground/20 bg-muted/50"
                  : "border-border/40 hover:border-border hover:bg-muted/30"
              }`}
            >
              <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${
                activeFilter === type ? "bg-foreground text-background" : "bg-muted"
              }`}>
                {careerTypeIcons[type]}
              </div>
              <p className="text-xl font-semibold">{stats[type]}</p>
              <p className="text-xs text-muted-foreground">{careerTypeLabels[type]}</p>
            </button>
          ))}
        </div>

        {/* Career List */}
        <div className="space-y-3">
          {filteredCareer.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 py-16">
              <p className="text-muted-foreground">No career items found.</p>
              <Button variant="outline" className="mt-4 rounded-lg bg-transparent" onClick={() => setIsAddingNew(true)}>
                <Plus className="mr-1.5 h-4 w-4" />
                Add your first item
              </Button>
            </div>
          ) : (
            filteredCareer.map((item) => (
              <div
                key={item.id}
                className="group flex items-start gap-4 rounded-xl border border-border/40 bg-card/50 p-5 transition-all hover:border-border hover:bg-card"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  {careerTypeIcons[item.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded-md bg-muted/80 px-2 py-0.5">
                          {careerTypeLabels[item.type]}
                        </span>
                        <span>{item.date}</span>
                        {item.organization && <span>· {item.organization}</span>}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                      className="h-8 w-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                  {item.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
