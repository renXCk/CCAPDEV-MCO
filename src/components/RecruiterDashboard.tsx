import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

import {
  LogOut,
  Star,
  Users,
  Calendar,
  Search,
  LayoutDashboard,
  TrendingUp,
  ChevronRight,
  ClipboardCheck,
  Building2,
} from "lucide-react";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const navigate = useNavigate();
  const [selectedTalent, setSelectedTalent] = useState<typeof mockApplicants[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");

  const filteredApplicants = mockApplicants.filter((applicant) => {
  const matchesName = applicant.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesRole =
    roleFilter === "All" || applicant.role === roleFilter;

  return matchesName && matchesRole;
});

  

  const openRateModal = (talent: typeof mockApplicants[0]) => {
    setSelectedTalent(talent);
    setRating(0);
    setNotes("");
    setIsModalOpen(true);
  };

  const handleSubmitRating = () => {
    console.log("Rating submitted:", { talent: selectedTalent, rating, notes });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">

      {/* ── HEADER ── bg-primary (navy #1d3557), text white */}
      <header className="bg-primary text-primary-foreground py-5 px-8 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Left: Brand + badge */}
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-black tracking-tighter italic text-primary-foreground">
              PGT <span className="text-accent">PRO</span>
            </h1>
            <div className="h-8 w-px bg-primary-foreground/20 hidden md:block" />
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-black/20 rounded-full">
              <LayoutDashboard className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground">
                Command Center
              </span>
            </div>
          </div>

          {/* Right: User info + logout */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-accent uppercase tracking-widest leading-none">
                Verified Recruiter
              </p>
              <p className="text-sm font-bold text-primary-foreground">Agent Smith</p>
            </div>
            <Link to="/login">
              <Button
                variant="outline"
                className="border-primary-foreground/40 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground font-bold px-5"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Talent Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="md:flex-[2]">
            <Input
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            />
          </div>

      <div className="md:flex-[1]">
    <select
      value={roleFilter}
      onChange={(e) => setRoleFilter(e.target.value)}
      className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
    >
      <option value="All">All Roles</option>
      <option value="Singer">Singer</option>
      <option value="Dancer">Dancer</option>
    </select>
  </div>
</div>

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
                {filteredApplicants.map((applicant) => (
                  <TableRow
                  key={applicant.id}
                  onClick={() => navigate(`/recruiter/talent/${applicant.id}`)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >


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
                      onClick={(e) => {
                      e.stopPropagation();  
                      openRateModal(applicant);
                     }}
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

      {/* ── RATE TALENT MODAL ── */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-card border-2 border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-primary">Rate Talent</DialogTitle>
            <DialogDescription className="text-muted-foreground font-semibold">
              Provide your internal rating and notes for this talent
            </DialogDescription>
          </DialogHeader>

          {selectedTalent && (
            <div className="space-y-6">
              {/* Talent details */}
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg border border-border">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-secondary">
                  <ImageWithFallback
                    src={selectedTalent.headshot}
                    alt={selectedTalent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:flex-[2]">
                  <h3 className="text-xl font-semibold mb-2">{selectedTalent.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground font-semibold">Role:</span>{" "}
                      <Badge variant={selectedTalent.role === "Singer" ? "default" : "secondary"}>
                        {selectedTalent.role}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-semibold">Age:</span>{" "}
                      <span className="font-bold text-primary">{selectedTalent.age}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-semibold">Height:</span>{" "}
                      <span className="font-bold text-primary">{selectedTalent.height}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-semibold">Weight:</span>{" "}
                      <span className="font-bold text-primary">{selectedTalent.weight}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-semibold">Hair:</span>{" "}
                      <span className="font-bold text-primary">{selectedTalent.hairColor}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-semibold">Eyes:</span>{" "}
                      <span className="font-bold text-primary">{selectedTalent.eyeColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Star rating */}
              <div className="space-y-2">
                <Label className="font-black text-primary uppercase tracking-wider text-xs">
                  Internal Star Rating
                </Label>
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

              {/* Notes */}
              <div className="space-y-2">
                <Label
                  htmlFor="notes"
                  className="font-black text-primary uppercase tracking-wider text-xs"
                >
                  Recruiter Notes (Private)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Add your private notes about this talent..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="border-border bg-muted focus:ring-accent"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground font-bold px-6 transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitRating}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 shadow-sm"
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
