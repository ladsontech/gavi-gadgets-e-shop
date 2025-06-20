import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, GripVertical, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { UpdateImageUploader } from "./UpdateImageUploader";

interface Update {
  id: string;
  title: string;
  image_url: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export const UpdatesManager = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: updates, isLoading } = useQuery({
    queryKey: ['admin-updates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('updates')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Update[];
    },
  });

  const addUpdateMutation = useMutation({
    mutationFn: async () => {
      const maxOrder = updates?.length ? Math.max(...updates.map(u => u.display_order)) : 0;
      
      const { error } = await supabase
        .from('updates')
        .insert({
          title: title.trim() || 'Update',
          image_url: imageUrl.trim(),
          display_order: maxOrder + 1,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-updates'] });
      queryClient.invalidateQueries({ queryKey: ['updates'] });
      setTitle("");
      setImageUrl("");
      setIsAdding(false);
      toast({
        title: "Success",
        description: "Update added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add update",
        variant: "destructive",
      });
      console.error('Error adding update:', error);
    },
  });

  const deleteUpdateMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('updates')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-updates'] });
      queryClient.invalidateQueries({ queryKey: ['updates'] });
      toast({
        title: "Success",
        description: "Update deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete update",
        variant: "destructive",
      });
      console.error('Error deleting update:', error);
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase
        .from('updates')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-updates'] });
      queryClient.invalidateQueries({ queryKey: ['updates'] });
    },
  });

  const handleImageUploaded = async (url: string) => {
    setUploading(true);
    try {
      const maxOrder = updates?.length ? Math.max(...updates.map(u => u.display_order)) : 0;
      const { error } = await supabase
        .from('updates')
        .insert({
          title: 'Update',
          image_url: url,
          display_order: maxOrder + 1,
          is_active: true,
        });
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['admin-updates'] });
      queryClient.invalidateQueries({ queryKey: ['updates'] });
      toast({
        title: "Success",
        description: "Update added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add update",
        variant: "destructive",
      });
      console.error('Error adding update:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      toast({
        title: "Error",
        description: "Please upload an image",
        variant: "destructive",
      });
      return;
    }
    addUpdateMutation.mutate();
  };

  const resetForm = () => {
    setTitle("");
    setImageUrl("");
    setIsAdding(false);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading updates...</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Updates</h2>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-pink-600 hover:bg-pink-700 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Update
        </Button>
      </div>

      {/* Add Update Form */}
      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Add New Update</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">Title (Optional)</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Update title..."
                  className="mt-1"
                />
              </div>
              
              <div>
                <UpdateImageUploader 
                  onImageUploaded={handleImageUploaded}
                  uploading={uploading}
                  setUploading={setUploading}
                />
              </div>

              {imageUrl && (
                <div>
                  <Label className="text-sm font-medium">Preview</Label>
                  <div className="mt-2 aspect-video w-full max-w-md bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt="Update preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  type="submit" 
                  disabled={addUpdateMutation.isPending || uploading || !imageUrl}
                  className="bg-pink-600 hover:bg-pink-700 w-full sm:w-auto"
                >
                  {addUpdateMutation.isPending ? "Adding..." : "Add Update"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Updates List */}
      <div className="space-y-3 sm:space-y-4">
        {updates?.map((update) => (
          <Card key={update.id} className={!update.is_active ? "opacity-50" : ""}>
            <CardContent className="p-3 sm:p-4">
              {/* Mobile Layout */}
              <div className="block sm:hidden space-y-3">
                {/* Image and drag handle */}
                <div className="flex items-start gap-3">
                  <GripVertical className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="w-20 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={update.image_url}
                      alt={update.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm leading-tight">
                      {update.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Order: {update.display_order}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(update.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {/* URL (truncated on mobile) */}
                <div className="px-8">
                  <p className="text-xs text-gray-500 truncate bg-gray-50 px-2 py-1 rounded">
                    {update.image_url}
                  </p>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-2 px-8">
                  <Button
                    variant={update.is_active ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => toggleActiveMutation.mutate({ id: update.id, isActive: update.is_active })}
                    disabled={toggleActiveMutation.isPending}
                    className="flex-1 text-xs"
                  >
                    {update.is_active ? (
                      <>
                        <Eye className="w-3 h-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3 mr-1" />
                        Inactive
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this update?")) {
                        deleteUpdateMutation.mutate(update.id);
                      }
                    }}
                    disabled={deleteUpdateMutation.isPending}
                    className="px-3"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-start gap-4">
                <div className="flex-shrink-0">
                  <GripVertical className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={update.image_url}
                        alt={update.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {update.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {update.image_url}
                      </p>
                      <p className="text-xs text-gray-400">
                        Order: {update.display_order} • Created: {new Date(update.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant={update.is_active ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => toggleActiveMutation.mutate({ id: update.id, isActive: update.is_active })}
                    disabled={toggleActiveMutation.isPending}
                  >
                    {update.is_active ? "Active" : "Inactive"}
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this update?")) {
                        deleteUpdateMutation.mutate(update.id);
                      }
                    }}
                    disabled={deleteUpdateMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {(!updates || updates.length === 0) && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-sm sm:text-base">
              No updates yet. Add your first update above.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};