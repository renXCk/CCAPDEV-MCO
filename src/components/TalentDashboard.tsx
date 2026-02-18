import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { User, Image as ImageIcon, Calendar, LogOut } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function TalentDashboard() {
    const [activeTab, setActiveTab] = useState("vitals");

    const [vitals, setVitals] = useState({

    height: "5'8\"",
    weight: "150 lbs",
    hairColor: "Brown",
    eyeColor: "Blue",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">PGT Digital</h1>
            <span className="text-white/80">|</span>
            <span className="text-lg">Talent Dashboard</span>
          </div>
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-primary text-white min-h-[calc(100vh-64px)] p-6">
        <nav className="space-y-2">
    
        <button
        onClick={() => setActiveTab("vitals")}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        activeTab === "vitals"
          ? "bg-accent"
          : "hover:bg-white/10"
        }`}
      >
      <User className="w-5 h-5" />
      <span>Vitals</span>
      </button>

      <button
      onClick={() => setActiveTab("media")}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        activeTab === "media"
          ? "bg-accent"
          : "hover:bg-white/10"
        }`}
      >
      <ImageIcon className="w-5 h-5" />
      <span>Media</span>
     </button>

    <button
      onClick={() => setActiveTab("auditions")}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        activeTab === "auditions"
          ? "bg-accent"
          : "hover:bg-white/10"
      }`}
    >
      <Calendar className="w-5 h-5" />
      <span>Auditions</span>
    </button>

  </nav>
</aside>


        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Digital Set Card Form */}
            {activeTab === "vitals" && (
              <Card>
                
              <CardHeader>
                <CardTitle className="text-2xl">Digital Set Card</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      value={vitals.height}
                      onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                      placeholder="e.g., 5'8&quot;"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      value={vitals.weight}
                      onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                      placeholder="e.g., 150 lbs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hairColor">Hair Color</Label>
                    <Input
                      id="hairColor"
                      value={vitals.hairColor}
                      onChange={(e) => setVitals({ ...vitals, hairColor: e.target.value })}
                      placeholder="e.g., Brown"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eyeColor">Eye Color</Label>
                    <Input
                      id="eyeColor"
                      value={vitals.eyeColor}
                      onChange={(e) => setVitals({ ...vitals, eyeColor: e.target.value })}
                      placeholder="e.g., Blue"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="bg-accent hover:bg-accent/90">Save Changes</Button>
                </div>
              </CardContent>
              </Card>
              )}


            {/* Gallery Section */}
            {activeTab === "media" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Media Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="photos">
                  <TabsList>
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                  </TabsList>
                  <TabsContent value="photos" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Headshot */}
                      <div className="space-y-2">
                        <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          <ImageWithFallback
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                            alt="Headshot"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm text-center text-muted-foreground">Headshot</p>
                      </div>
                      
                      {/* Full Body */}
                      <div className="space-y-2">
                        <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          <ImageWithFallback
                            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400"
                            alt="Full Body"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm text-center text-muted-foreground">Full Body</p>
                      </div>

                      {/* Upload Placeholders */}
                      <div className="space-y-2">
                        <button className="aspect-[3/4] w-full bg-muted rounded-lg flex flex-col items-center justify-center hover:bg-muted/80 transition-colors border-2 border-dashed border-border">
                          <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Add Photo</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        <button className="aspect-[3/4] w-full bg-muted rounded-lg flex flex-col items-center justify-center hover:bg-muted/80 transition-colors border-2 border-dashed border-border">
                          <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Add Photo</span>
                        </button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="videos" className="mt-6">
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No videos uploaded yet. Click below to add your first video.</p>
                      <Button className="mt-4 bg-accent hover:bg-accent/90">Upload Video</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              </Card>
              )}

            {activeTab === "auditions" && (
            <Card>
            <CardHeader>
             <CardTitle className="text-2xl">Auditions</CardTitle>
             </CardHeader>
            <CardContent>
            <p className="text-muted-foreground">
             No auditions available yet.
            </p>
            </CardContent>
            </Card>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}