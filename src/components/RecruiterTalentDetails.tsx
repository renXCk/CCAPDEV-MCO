import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Same mock data (for now)
const mockApplicants = [
  {
    id: 1,
    name: "Emma Johnson",
    role: "Singer",
    age: 24,
    headshot: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    height: "5'6\"",
    weight: "125 lbs",
    hairColor: "Blonde",
    eyeColor: "Green",
  },
  {
    id: 2,
    name: "Marcus Williams",
    role: "Dancer",
    age: 28,
    headshot: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    height: "5'10\"",
    weight: "165 lbs",
    hairColor: "Black",
    eyeColor: "Brown",
  },

  {
    id: 3,
    name: "Sofia Martinez",
    role: "Singer",
    age: 22,
    headshot: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    height: "5'4\"",
    weight: "118 lbs",
    hairColor: "Dark Brown",
    eyeColor: "Hazel",
  },
  {
    id: 4,
    name: "James Chen",
    role: "Dancer",
    age: 26,
    headshot: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200",
    height: "5'9\"",
    weight: "155 lbs",
    hairColor: "Black",
    eyeColor: "Brown",
  },
  {
    id: 5,
    name: "Olivia Brown",
    role: "Singer",
    age: 25,
    headshot: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    height: "5'7\"",
    weight: "135 lbs",
    hairColor: "Auburn",
    eyeColor: "Blue",
  },
];

export default function RecruiterTalentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const talent = mockApplicants.find(
    (applicant) => applicant.id === Number(id)
  );

  if (!talent) {
    return (
      <div className="p-8">
        <p>Talent not found.</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        ← Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {talent.name}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Headshot */}
            <div className="w-48 h-64 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={talent.headshot}
                alt={talent.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <Badge variant="secondary">{talent.role}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Age:</strong> {talent.age}</div>
                <div><strong>Height:</strong> {talent.height}</div>
                <div><strong>Weight:</strong> {talent.weight}</div>
                <div><strong>Hair:</strong> {talent.hairColor}</div>
                <div><strong>Eyes:</strong> {talent.eyeColor}</div>
              </div>
            </div>
          </div>

          {/* Placeholder Media Section */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Submitted Media</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                Photo 1
              </div>
              <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                Photo 2
              </div>
              <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                Video 1
              </div>
              <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                Resume
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

