import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft } from "lucide-react";

export function RecruiterTalentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [talent, setTalent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch only the specific talent using the ID from the URL
    fetch(`http://localhost:3000/api/talents`)
      .then(res => res.json())
      .then(data => {
        // Find the specific talent in the list
        const found = data.find((t: any) => t._id === id);
        if (found) {
          setTalent({
            id: found._id,
            name: found.name,
            role: found.talentProfile?.talentRole || "Talent",
            age: found.talentProfile?.age || "N/A",
            height: found.talentProfile?.height || "N/A",
            weight: found.talentProfile?.weight || "N/A",
            hairColor: found.talentProfile?.hairColor || "N/A",
            eyeColor: found.talentProfile?.eyeColor || "N/A",
            headshot: found.talentProfile?.headshot || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
            
            photos: found.talentProfile?.media?.photos || [],
            videos: found.talentProfile?.media?.videos || [],
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching talent details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading talent profile...</div>;
  if (!talent) return <div className="p-10 text-center">Talent not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Button>

      <Card className="max-w-4xl mx-auto shadow-lg overflow-hidden">
        <CardHeader className="bg-primary text-white p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-xl">
              <ImageWithFallback src={talent.headshot} alt={talent.name} />
            </div>
            <div className="text-center md:text-left">
              <CardTitle className="text-4xl font-bold">{talent.name}</CardTitle>
              <Badge className="mt-2 bg-accent text-accent-foreground text-lg px-4 py-1">
                {talent.role}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold border-b pb-2">Physical Vitals</h3>
              <div className="grid grid-cols-2 gap-y-4 text-lg">
                <span className="text-muted-foreground font-medium">Age:</span>
                <span className="font-bold">{talent.age}</span>
                <span className="text-muted-foreground font-medium">Height:</span>
                <span className="font-bold">{talent.height}</span>
                <span className="text-muted-foreground font-medium">Weight:</span>
                <span className="font-bold">{talent.weight}</span>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold border-b pb-2">Appearance</h3>
              <div className="grid grid-cols-2 gap-y-4 text-lg">
                <span className="text-muted-foreground font-medium">Hair Color:</span>
                <span className="font-bold">{talent.hairColor}</span>
                <span className="text-muted-foreground font-medium">Eye Color:</span>
                <span className="font-bold">{talent.eyeColor}</span>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">Portfolio Gallery</h3>
            {talent.photos && talent.photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {talent.photos.map((photoUrl: string, index: number) => (
                  <div key={index} className="aspect-[3/4] bg-slate-200 rounded-xl flex items-center justify-center overflow-hidden border-2 border-slate-200 shadow-sm">
                    <img 
                      src={photoUrl} 
                      alt={`${talent.name} portfolio ${index + 1}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-100 rounded-xl border-2 border-dashed border-slate-300">
                <p className="text-slate-500 font-medium">No portfolio photos uploaded yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RecruiterTalentDetails;
