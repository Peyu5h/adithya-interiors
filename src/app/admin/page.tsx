"use client";

import { useState, useEffect, useCallback } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
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
  Building,
  Briefcase,
  FileText,
} from "lucide-react";
import { useToast } from "~/components/ui/use-toast";
import api from "~/lib/api";
import { generateBlogContentWithGemini } from "~/lib/gemini";

const CLOUDINARY_CLOUD_NAME = "dr51ytqvk";
const CLOUDINARY_UPLOAD_PRESET = "adithya";
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

interface Project {
  id: string;
  title: string;
  location: string;
  fullLocation: string;
  description: string;
  slug: string;
  thumbnailImage: string;
  images: string[];
  technologies: string[];
  completedDate: string;
  category: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProjectFormData {
  title: string;
  location: string;
  fullLocation: string;
  description: string;
  thumbnailImage: string;
  images: string[];
  technologies: string[];
  completedDate: string;
  category: string;
}

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  content: string;
  images: string[];
  category: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServiceFormData {
  title: string;
  description: string;
  shortDescription: string;
  content: string;
  images: string[];
  category: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showCreateProjectDialog, setShowCreateProjectDialog] = useState(false);
  const [showCreateServiceDialog, setShowCreateServiceDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showEditServiceDialog, setShowEditServiceDialog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("blogs");
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    blogContent: "",
    thumbnailImgUrl: "",
    isHtml: true,
    tags: [],
  });

  const [projectFormData, setProjectFormData] = useState<ProjectFormData>({
    title: "",
    location: "",
    fullLocation: "",
    description: "",
    thumbnailImage: "",
    images: [],
    technologies: [],
    completedDate: "",
    category: "interior",
  });

  const [serviceFormData, setServiceFormData] = useState<ServiceFormData>({
    title: "",
    description: "",
    shortDescription: "",
    content: "",
    images: [],
    category: "construction",
  });

  // Memoized form handlers to prevent unnecessary re-renders
  const handleFormDataChange = useCallback(
    (field: keyof BlogFormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleProjectFormDataChange = useCallback(
    (field: keyof ProjectFormData, value: any) => {
      setProjectFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleServiceFormDataChange = useCallback(
    (field: keyof ServiceFormData, value: any) => {
      setServiceFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const [tagInput, setTagInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchBlogs();
      fetchProjects();
      fetchServices();
    }
  }, []);

  // Authentication
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      fetchBlogs();
      fetchProjects();
      fetchServices();
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
    setProjects([]);
    setServices([]);
  };

  // Fetch functions
  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<{ blogs: BlogPost[] }>("api/blog");
      if (response.success) {
        setBlogs(response.data.blogs || []);
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

  const fetchProjects = async () => {
    try {
      const response = await api.get<{ projects: Project[] }>("api/projects");
      if (response.success) {
        setProjects(response.data.projects || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get<{ services: Service[] }>("api/services");
      if (response.success) {
        setServices(response.data.services || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      });
    }
  };

  // Image upload to Cloudinary
  const handleImageUpload = async (
    file: File,
    target: "blog" | "project" | "service",
  ) => {
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
      const formDataImg = new FormData();
      formDataImg.append("file", file);
      formDataImg.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formDataImg,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Cloudinary error: ${errorData.error?.message || "Upload failed"}`,
        );
      }

      const data = await response.json();
      if (data.secure_url) {
        if (target === "blog") {
          setFormData((prev) => ({
            ...prev,
            thumbnailImgUrl: data.secure_url,
          }));
        } else if (target === "project") {
          setProjectFormData((prev) => ({
            ...prev,
            thumbnailImage: data.secure_url,
          }));
        }
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      } else {
        throw new Error("No secure URL returned from Cloudinary");
      }
    } catch (error: any) {
      console.error("Cloudinary upload error:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload image to Cloudinary",
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

  // Generate service content with AI
  const generateServiceContent = async () => {
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
      const strictPrompt = `Generate a visually appealing, SEO-optimized service description for "${serviceFormData.title || aiPrompt}".
- Use only HTML content inside <section>, <h2>, <h3>, <ul>, <ol>, <table>, <strong>, <p>, and <a> tags.
- Do NOT include <!DOCTYPE html>, <html>, <head>, or <body> tags.
- Use headings, bullet points, and tables where appropriate.
- Highlight important keywords and features with <strong> or <em>.
- Structure the content for easy reading and SEO.
- Example structure:
  <section>
    <h2>Service Overview</h2>
    <p>...</p>
    <ul>
      <li>...</li>
    </ul>
    <h3>Key Features</h3>
    <table>
      <tr><th>Feature</th><th>Benefit</th></tr>
      <tr><td>...</td><td>...</td></tr>
    </table>
  </section>
`;
      const generatedContent =
        await generateBlogContentWithGemini(strictPrompt);

      setServiceFormData((prev) => ({
        ...prev,
        content: generatedContent.trim(),
        title: serviceFormData.title || `${aiPrompt} Services`,
      }));

      toast({
        title: "Content Generated",
        description: "AI has generated service content based on your prompt",
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

  // Submit handlers
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
      const response = await api.post("api/blog", formData);

      if (response.success) {
        toast({
          title: "Success",
          description: "Blog post created successfully",
        });
        setShowCreateDialog(false);
        resetForm();
        await fetchBlogs();
      } else {
        const errorMessage =
          (response as any)?.message || "Failed to create blog post";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Blog creation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create blog post",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !projectFormData.title ||
      !projectFormData.location ||
      !projectFormData.description
    ) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("api/projects", projectFormData);

      if (response.success) {
        toast({
          title: "Success",
          description: "Project created successfully",
        });
        setShowCreateProjectDialog(false);
        resetProjectForm();
        await fetchProjects();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !serviceFormData.title ||
      !serviceFormData.description ||
      !serviceFormData.content
    ) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("api/services", serviceFormData);

      if (response.success) {
        toast({
          title: "Success",
          description: "Service created successfully",
        });
        setShowCreateServiceDialog(false);
        resetServiceForm();
        await fetchServices();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create service",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete handlers
  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/api/blog/${id}`);
      if (response.success) {
        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        });
        await fetchBlogs();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const response = await api.delete(`/api/projects/${id}`);
      if (response.success) {
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
        await fetchProjects();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const response = await api.delete(`/api/services/${id}`);
      if (response.success) {
        toast({
          title: "Success",
          description: "Service deleted successfully",
        });
        await fetchServices();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  // Edit handlers
  const handleEditBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      blogContent: blog.blogContent,
      thumbnailImgUrl: blog.thumbnailImgUrl,
      isHtml: blog.isHtml,
      tags: blog.tags,
    });
    setEditMode(true);
    setShowEditDialog(true);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setServiceFormData({
      title: service.title,
      description: service.description,
      shortDescription: service.shortDescription,
      content: service.content,
      images: service.images,
      category: service.category,
    });
    setEditMode(true);
    setShowEditServiceDialog(true);
  };

  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedBlog ||
      !formData.title ||
      !formData.blogContent ||
      !formData.thumbnailImgUrl
    ) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.put(`/api/blog/${selectedBlog.id}`, formData);

      if (response.success) {
        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
        setShowEditDialog(false);
        setEditMode(false);
        resetForm();
        await fetchBlogs();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedService ||
      !serviceFormData.title ||
      !serviceFormData.description ||
      !serviceFormData.content
    ) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.put(
        `/api/services/${selectedService.id}`,
        serviceFormData,
      );

      if (response.success) {
        toast({
          title: "Success",
          description: "Service updated successfully",
        });
        setShowEditServiceDialog(false);
        setEditMode(false);
        resetServiceForm();
        await fetchServices();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset forms
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
    setEditMode(false);
    setSelectedBlog(null);
  };

  const resetProjectForm = () => {
    setProjectFormData({
      title: "",
      location: "",
      fullLocation: "",
      description: "",
      thumbnailImage: "",
      images: [],
      technologies: [],
      completedDate: "",
      category: "interior",
    });
    setTechInput("");
    setImageInput("");
  };

  const resetServiceForm = () => {
    setServiceFormData({
      title: "",
      description: "",
      shortDescription: "",
      content: "",
      images: [],
      category: "construction",
    });
    setImageInput("");
    setEditMode(false);
    setSelectedService(null);
  };

  // Utility functions
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addTechnology = () => {
    if (
      techInput.trim() &&
      !projectFormData.technologies.includes(techInput.trim())
    ) {
      setProjectFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setProjectFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((tech) => tech !== techToRemove),
    }));
  };

  const addImageUrl = (target: "project" | "service") => {
    if (imageInput.trim()) {
      if (target === "project") {
        setProjectFormData((prev) => ({
          ...prev,
          images: [...prev.images, imageInput.trim()],
        }));
      } else {
        setServiceFormData((prev) => ({
          ...prev,
          images: [...prev.images, imageInput.trim()],
        }));
      }
      setImageInput("");
    }
  };

  const removeImageUrl = (
    imageToRemove: string,
    target: "project" | "service",
  ) => {
    if (target === "project") {
      setProjectFormData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== imageToRemove),
      }));
    } else {
      setServiceFormData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== imageToRemove),
      }));
    }
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
                Manage your content, projects, and services
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
          {/* Content Management Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="blogs" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Blogs
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Services
              </TabsTrigger>
            </TabsList>

            {/* Blog Management */}
            <TabsContent value="blogs" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Blog Posts</h2>
                  <p className="text-gray-600">
                    Create and manage your blog content
                  </p>
                </div>
                <Dialog
                  open={showCreateDialog}
                  onOpenChange={setShowCreateDialog}
                >
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
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) =>
                            handleFormDataChange("title", e.target.value)
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

                      <div>
                        <Label htmlFor="content">Blog Content *</Label>
                        <Textarea
                          id="content"
                          value={formData.blogContent}
                          onChange={(e) =>
                            handleFormDataChange("blogContent", e.target.value)
                          }
                          placeholder="Enter blog content in HTML format"
                          rows={15}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="thumbnail">Thumbnail Image *</Label>
                        <div className="mt-2">
                          <Input
                            id="thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file, "blog");
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

                      <div>
                        <Label htmlFor="tags">Tags</Label>
                        <div className="mt-2 flex gap-2">
                          <Input
                            id="tags"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="Add a tag"
                            onKeyPress={(e) =>
                              e.key === "Enter" &&
                              (e.preventDefault(), addTag())
                            }
                          />
                          <Button
                            type="button"
                            onClick={addTag}
                            variant="outline"
                          >
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

                {/* Edit Blog Dialog */}
                <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                  <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Blog Post</DialogTitle>
                      <DialogDescription>
                        Update the details below to modify the blog post
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdateBlog} className="space-y-6">
                      <div>
                        <Label htmlFor="edit-title">Title *</Label>
                        <Input
                          id="edit-title"
                          value={formData.title}
                          onChange={(e) =>
                            handleFormDataChange("title", e.target.value)
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

                      <div>
                        <Label htmlFor="edit-content">Blog Content *</Label>
                        <Textarea
                          id="edit-content"
                          value={formData.blogContent}
                          onChange={(e) =>
                            handleFormDataChange("blogContent", e.target.value)
                          }
                          placeholder="Enter blog content in HTML format"
                          rows={15}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="edit-thumbnail">
                          Thumbnail Image *
                        </Label>
                        <div className="mt-2">
                          <Input
                            id="edit-thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file, "blog");
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

                      <div>
                        <Label htmlFor="edit-tags">Tags</Label>
                        <div className="mt-2 flex gap-2">
                          <Input
                            id="edit-tags"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="Add a tag"
                            onKeyPress={(e) =>
                              e.key === "Enter" &&
                              (e.preventDefault(), addTag())
                            }
                          />
                          <Button
                            type="button"
                            onClick={addTag}
                            variant="outline"
                          >
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

                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowEditDialog(false);
                            resetForm();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Updating..." : "Update Blog Post"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Blog List */}
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
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditBlog(blog)}
                            >
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
            </TabsContent>

            {/* Project Management */}
            <TabsContent value="projects" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Projects</h2>
                  <p className="text-gray-600">
                    Create and manage your portfolio projects
                  </p>
                </div>
                <Dialog
                  open={showCreateProjectDialog}
                  onOpenChange={setShowCreateProjectDialog}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Project</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to create a new project
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleProjectSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="project-title">Title *</Label>
                          <Input
                            id="project-title"
                            value={projectFormData.title}
                            onChange={(e) =>
                              handleProjectFormDataChange(
                                "title",
                                e.target.value,
                              )
                            }
                            placeholder="Enter project title"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="project-location">Location *</Label>
                          <Input
                            id="project-location"
                            value={projectFormData.location}
                            onChange={(e) =>
                              handleProjectFormDataChange(
                                "location",
                                e.target.value,
                              )
                            }
                            placeholder="e.g., Andheri, Mumbai"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="project-full-location">
                          Full Location
                        </Label>
                        <Input
                          id="project-full-location"
                          value={projectFormData.fullLocation}
                          onChange={(e) =>
                            handleProjectFormDataChange(
                              "fullLocation",
                              e.target.value,
                            )
                          }
                          placeholder="e.g., Andheri - Project At Mahindra Vicino - Malad West, Mumbai"
                        />
                      </div>

                      <div>
                        <Label htmlFor="project-description">
                          Description *
                        </Label>
                        <Textarea
                          id="project-description"
                          value={projectFormData.description}
                          onChange={(e) =>
                            handleProjectFormDataChange(
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="Enter project description"
                          rows={4}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="project-thumbnail">
                          Thumbnail Image *
                        </Label>
                        <div className="mt-2">
                          <Input
                            id="project-thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file, "project");
                            }}
                            disabled={isUploading}
                          />
                          {isUploading && (
                            <p className="mt-2 text-sm text-blue-600">
                              Uploading image...
                            </p>
                          )}
                          {projectFormData.thumbnailImage && (
                            <div className="mt-3">
                              <img
                                src={projectFormData.thumbnailImage}
                                alt="Thumbnail preview"
                                className="h-20 w-32 rounded border object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="project-images">Project Images</Label>
                        <div className="mt-2 flex gap-2">
                          <Input
                            id="project-images"
                            value={imageInput}
                            onChange={(e) => setImageInput(e.target.value)}
                            placeholder="Add image URL"
                          />
                          <Button
                            type="button"
                            onClick={() => addImageUrl("project")}
                            variant="outline"
                          >
                            Add
                          </Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {projectFormData.images.map((image) => (
                            <Badge
                              key={image}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => removeImageUrl(image, "project")}
                            >
                              {image.substring(0, 30)}... ×
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="project-technologies">
                          Technologies
                        </Label>
                        <div className="mt-2 flex gap-2">
                          <Input
                            id="project-technologies"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            placeholder="Add technology"
                            onKeyPress={(e) =>
                              e.key === "Enter" &&
                              (e.preventDefault(), addTechnology())
                            }
                          />
                          <Button
                            type="button"
                            onClick={addTechnology}
                            variant="outline"
                          >
                            Add
                          </Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {projectFormData.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => removeTechnology(tech)}
                            >
                              {tech} ×
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="project-completed">
                            Completed Date
                          </Label>
                          <Input
                            id="project-completed"
                            value={projectFormData.completedDate}
                            onChange={(e) =>
                              setProjectFormData((prev) => ({
                                ...prev,
                                completedDate: e.target.value,
                              }))
                            }
                            placeholder="e.g., 2024"
                          />
                        </div>
                        <div>
                          <Label htmlFor="project-category">Category</Label>
                          <Input
                            id="project-category"
                            value={projectFormData.category}
                            onChange={(e) =>
                              setProjectFormData((prev) => ({
                                ...prev,
                                category: e.target.value,
                              }))
                            }
                            placeholder="e.g., interior, exterior"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowCreateProjectDialog(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Creating..." : "Create Project"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Project List */}
              <div className="grid gap-6">
                {projects.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-gray-500">
                        No projects found. Create your first project!
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  projects.map((project) => (
                    <Card key={project.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <img
                            src={project.thumbnailImage}
                            alt={project.title}
                            className="h-16 w-24 rounded object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="mb-2 text-lg font-semibold">
                              {project.title}
                            </h3>
                            <p className="mb-2 text-sm text-gray-600">
                              {project.location}
                            </p>
                            <div className="mb-2 flex flex-wrap gap-1">
                              {project.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-sm text-gray-500">
                              Created:{" "}
                              {new Date(project.createdAt).toLocaleDateString()}
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
                              onClick={() => handleDeleteProject(project.id)}
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
            </TabsContent>

            {/* Service Management */}
            <TabsContent value="services" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Services</h2>
                  <p className="text-gray-600">
                    Create and manage your service offerings
                  </p>
                </div>
                <Dialog
                  open={showCreateServiceDialog}
                  onOpenChange={setShowCreateServiceDialog}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Service</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to create a new service
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleServiceSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="service-title">Title *</Label>
                        <Input
                          id="service-title"
                          value={serviceFormData.title}
                          onChange={(e) =>
                            handleServiceFormDataChange("title", e.target.value)
                          }
                          placeholder="Enter service title"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="service-description">
                          Description *
                        </Label>
                        <Textarea
                          id="service-description"
                          value={serviceFormData.description}
                          onChange={(e) =>
                            handleServiceFormDataChange(
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="Enter service description"
                          rows={3}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="service-short-description">
                          Short Description
                        </Label>
                        <Input
                          id="service-short-description"
                          value={serviceFormData.shortDescription}
                          onChange={(e) =>
                            handleServiceFormDataChange(
                              "shortDescription",
                              e.target.value,
                            )
                          }
                          placeholder="Enter short description"
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
                            placeholder="Enter service topic for AI to generate content..."
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            onClick={generateServiceContent}
                            disabled={isGenerating}
                          >
                            {isGenerating ? "Generating..." : "Generate"}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="service-content">
                          Service Content *
                        </Label>
                        <Textarea
                          id="service-content"
                          value={serviceFormData.content}
                          onChange={(e) =>
                            handleServiceFormDataChange(
                              "content",
                              e.target.value,
                            )
                          }
                          placeholder="Enter service content in markdown format"
                          rows={15}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="service-images">Service Images</Label>
                        <div className="mt-2 flex gap-2">
                          <Input
                            id="service-images"
                            value={imageInput}
                            onChange={(e) => setImageInput(e.target.value)}
                            placeholder="Add image URL"
                          />
                          <Button
                            type="button"
                            onClick={() => addImageUrl("service")}
                            variant="outline"
                          >
                            Add
                          </Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {serviceFormData.images.map((image) => (
                            <Badge
                              key={image}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => removeImageUrl(image, "service")}
                            >
                              {image.substring(0, 30)}... ×
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="service-category">Category</Label>
                        <Input
                          id="service-category"
                          value={serviceFormData.category}
                          onChange={(e) =>
                            setServiceFormData((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                          placeholder="e.g., construction, design, renovation"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowCreateServiceDialog(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Creating..." : "Create Service"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Edit Service Dialog */}
                <Dialog
                  open={showEditServiceDialog}
                  onOpenChange={setShowEditServiceDialog}
                >
                  <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Service</DialogTitle>
                      <DialogDescription>
                        Update the details below to modify the service
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdateService} className="space-y-6">
                      <div>
                        <Label htmlFor="edit-service-title">Title *</Label>
                        <Input
                          id="edit-service-title"
                          value={serviceFormData.title}
                          onChange={(e) =>
                            handleServiceFormDataChange("title", e.target.value)
                          }
                          placeholder="Enter service title"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="edit-service-description">
                          Description *
                        </Label>
                        <Textarea
                          id="edit-service-description"
                          value={serviceFormData.description}
                          onChange={(e) =>
                            handleServiceFormDataChange(
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="Enter service description"
                          rows={3}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="edit-service-short-description">
                          Short Description
                        </Label>
                        <Input
                          id="edit-service-short-description"
                          value={serviceFormData.shortDescription}
                          onChange={(e) =>
                            handleServiceFormDataChange(
                              "shortDescription",
                              e.target.value,
                            )
                          }
                          placeholder="Enter short description"
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
                            placeholder="Enter service topic for AI to generate content..."
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            onClick={generateServiceContent}
                            disabled={isGenerating}
                          >
                            {isGenerating ? "Generating..." : "Generate"}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="edit-service-content">
                          Service Content *
                        </Label>
                        <Textarea
                          id="edit-service-content"
                          value={serviceFormData.content}
                          onChange={(e) =>
                            handleServiceFormDataChange(
                              "content",
                              e.target.value,
                            )
                          }
                          placeholder="Enter service content in markdown format"
                          rows={15}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="edit-service-images">
                          Service Images
                        </Label>
                        <div className="mt-2 flex gap-2">
                          <Input
                            id="edit-service-images"
                            value={imageInput}
                            onChange={(e) => setImageInput(e.target.value)}
                            placeholder="Add image URL"
                          />
                          <Button
                            type="button"
                            onClick={() => addImageUrl("service")}
                            variant="outline"
                          >
                            Add
                          </Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {serviceFormData.images.map((image) => (
                            <Badge
                              key={image}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => removeImageUrl(image, "service")}
                            >
                              {image.substring(0, 30)}... ×
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="edit-service-category">Category</Label>
                        <Input
                          id="edit-service-category"
                          value={serviceFormData.category}
                          onChange={(e) =>
                            setServiceFormData((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                          placeholder="e.g., construction, design, renovation"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowEditServiceDialog(false);
                            resetServiceForm();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Updating..." : "Update Service"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Service List */}
              <div className="grid gap-6">
                {services.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-gray-500">
                        No services found. Create your first service!
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  services.map((service) => (
                    <Card key={service.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <h3 className="mb-2 text-lg font-semibold">
                              {service.title}
                            </h3>
                            <p className="mb-2 text-sm text-gray-600">
                              {service.shortDescription}
                            </p>
                            <p className="text-sm text-gray-500">
                              Created:{" "}
                              {new Date(service.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="mr-1 h-4 w-4" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditService(service)}
                            >
                              <Edit className="mr-1 h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteService(service.id)}
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
