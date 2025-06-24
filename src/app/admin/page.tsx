"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Plus,
  Upload,
  Wand2,
  Eye,
  Trash2,
  Edit,
  Lock,
  Shield,
} from "lucide-react";
import { useToast } from "~/components/ui/use-toast";
import api from "~/lib/api";
import { generateBlogContentWithGemini } from "~/lib/gemini";

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const ADMIN_PIN = "1234";

interface BlogPost {
  id: string;
  title: string;
  blogContent: string;
  thumbnailImgUrl: string;
  slug: string;
  isHtml: boolean;
  tags: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BlogFormData {
  title: string;
  blogContent: string;
  thumbnailImgUrl: string;
  isHtml: boolean;
  tags: string[];
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    blogContent: "",
    thumbnailImgUrl: "",
    isHtml: true,
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchBlogs();
    }
  }, []);

  // Authentication
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      fetchBlogs();
      toast({
        title: "Access Granted",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid PIN. Please try again.",
        variant: "destructive",
      });
      setPinInput("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    setPinInput("");
    setBlogs([]);
  };

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/api/blog");
      if (response.success) {
        //@ts-expect-error bruh
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blogs",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Image upload to Cloudinary
  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          thumbnailImgUrl: data.secure_url,
        }));
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload image to Cloudinary",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Generate blog content with AI
  const generateBlogContent = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Missing Prompt",
        description: "Please enter a topic or prompt for AI generation",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGenerating(true);
      const generatedContent = await generateBlogContentWithGemini(aiPrompt);

      setFormData((prev) => ({
        ...prev,
        blogContent: generatedContent.trim(),
        title: formData.title || `Complete Guide to ${aiPrompt}`,
      }));

      toast({
        title: "Content Generated",
        description: "AI has generated blog content based on your prompt",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate content with AI",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.blogContent || !formData.thumbnailImgUrl) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("/api/blog", formData);

      if (response.success) {
        toast({
          title: "Success",
          description: "Blog post created successfully",
        });
        setShowCreateDialog(false);
        resetForm();
        fetchBlogs();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete blog
  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/api/blog/${id}`);
      if (response.success) {
        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        });
        fetchBlogs();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      blogContent: "",
      thumbnailImgUrl: "",
      isHtml: true,
      tags: [],
    });
    setTagInput("");
    setAiPrompt("");
  };

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Authentication UI
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>
              Enter your security PIN to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <Label htmlFor="pin">Security PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN"
                  maxLength={6}
                />
              </div>
              <Button type="submit" className="w-full">
                <Lock className="mr-2 h-4 w-4" />
                Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Dashboard UI
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your blog posts and content
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Blog Management Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Blog Posts</h2>
              <p className="text-gray-600">
                Create and manage your blog content
              </p>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Blog Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Blog Post</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new blog post
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter blog title"
                      required
                    />
                  </div>

                  <div className="rounded-lg border bg-blue-50 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Wand2 className="h-5 w-5 text-blue-600" />
                      <Label className="text-blue-800">
                        AI Content Generator
                      </Label>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="Enter topic or prompt for AI to generate content..."
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={generateBlogContent}
                        disabled={isGenerating}
                      >
                        {isGenerating ? "Generating..." : "Generate"}
                      </Button>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div>
                    <Label htmlFor="content">Blog Content *</Label>
                    <Textarea
                      id="content"
                      value={formData.blogContent}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          blogContent: e.target.value,
                        }))
                      }
                      placeholder="Enter blog content in HTML format"
                      rows={15}
                      required
                    />
                  </div>

                  {/* Thumbnail Upload */}
                  <div>
                    <Label htmlFor="thumbnail">Thumbnail Image *</Label>
                    <div className="mt-2">
                      <Input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                        disabled={isUploading}
                      />
                      {isUploading && (
                        <p className="mt-2 text-sm text-blue-600">
                          Uploading image...
                        </p>
                      )}
                      {formData.thumbnailImgUrl && (
                        <div className="mt-3">
                          <img
                            src={formData.thumbnailImgUrl}
                            alt="Thumbnail preview"
                            className="h-20 w-32 rounded border object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <div className="mt-2 flex gap-2">
                      <Input
                        id="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addTag())
                        }
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCreateDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Creating..." : "Create Blog Post"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Blogs List */}
          <div className="grid gap-6">
            {isLoading ? (
              <div className="py-8 text-center">Loading blogs...</div>
            ) : blogs.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500">
                    No blog posts found. Create your first blog post!
                  </p>
                </CardContent>
              </Card>
            ) : (
              blogs.map((blog) => (
                <Card key={blog.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={blog.thumbnailImgUrl}
                        alt={blog.title}
                        className="h-16 w-24 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold">
                          {blog.title}
                        </h3>
                        <div className="mb-2 flex flex-wrap gap-1">
                          {blog.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">
                          Created:{" "}
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-1 h-4 w-4" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="mr-1 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
