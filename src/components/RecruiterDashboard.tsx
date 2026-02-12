import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { LogOut, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Mock data
const mockApplicants = [
  {
    id: 1,
    name: "Emma Johnson",
    role: "Singer",
    age: 24,
    headshot: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
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
    headshot: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
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

export function RecruiterDashboard() {
  const [selectedTalent, setSelectedTalent] = useState<typeof mockApplicants[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");

  const openRateModal = (talent: typeof mockApplicants[0]) => {
    setSelectedTalent(talent);
    setRating(0);
    setNotes("");
    setIsModalOpen(true);
  };

  const handleSubmitRating = () => {
    // In real app, this would save to database
    console.log("Rating submitted:", { talent: selectedTalent, rating, notes });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">PGT Digital</h1>
            <span className="text-white/80">|</span>
            <span className="text-lg">Recruiter Dashboard</span>
          </div>
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Talent Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Headshot</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApplicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell>
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={applicant.headshot}
                          alt={applicant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>
                      <Badge variant={applicant.role === "Singer" ? "default" : "secondary"}>
                        {applicant.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{applicant.age}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => openRateModal(applicant)}
                        className="bg-accent hover:bg-accent/90"
                      >
                        Rate Talent
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Rate Talent Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Rate Talent</DialogTitle>
            <DialogDescription>
              Provide your internal rating and notes for this talent
            </DialogDescription>
          </DialogHeader>

          {selectedTalent && (
            <div className="space-y-6">
              {/* Talent Details */}
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={selectedTalent.headshot}
                    alt={selectedTalent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{selectedTalent.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Role:</span>{" "}
                      <Badge variant={selectedTalent.role === "Singer" ? "default" : "secondary"}>
                        {selectedTalent.role}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Age:</span> {selectedTalent.age}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Height:</span> {selectedTalent.height}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Weight:</span> {selectedTalent.weight}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Hair:</span> {selectedTalent.hairColor}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Eyes:</span> {selectedTalent.eyeColor}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating Input */}
              <div className="space-y-2">
                <Label>Internal Star Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= rating
                            ? "fill-accent text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes Input */}
              <div className="space-y-2">
                <Label htmlFor="notes">Recruiter Notes (Private)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add your private notes about this talent..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitRating}
                  className="bg-accent hover:bg-accent/90"
                  disabled={rating === 0}
                >
                  Submit Rating
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
