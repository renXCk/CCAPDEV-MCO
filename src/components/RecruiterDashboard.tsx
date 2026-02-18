import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
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

type View = "overview" | "talent";

export function RecruiterDashboard() {
  const [currentView, setCurrentView] = useState<View>("overview");
  const [selectedTalent, setSelectedTalent] = useState<(typeof mockApplicants)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");

  const openRateModal = (talent: (typeof mockApplicants)[0]) => {
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

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 space-y-12">

        {/* ── OVERVIEW VIEW ── */}
        {currentView === "overview" && (
          <>
            {/* Welcome hero */}
            <div className="space-y-1">
              <h2 className="text-4xl font-black text-primary tracking-tight">Agency Overview</h2>
              <p className="text-muted-foreground font-semibold text-lg italic">
                Select a module to begin managing talent.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Stat: Total Talent */}
              <Card className="border-2 border-border shadow-md bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                        Total Talent
                      </p>
                      <h3 className="text-4xl font-black text-primary mt-2">1,248</h3>
                      <div className="mt-4 inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold border border-green-200">
                        +12% New Entries
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-2xl border border-border">
                      <Users className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stat: Live Auditions */}
              <Card className="border-2 border-border shadow-md bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                        Live Auditions
                      </p>
                      <h3 className="text-4xl font-black text-primary mt-2">08</h3>
                      <p className="text-sm text-muted-foreground font-bold mt-4 uppercase">
                        3 Studios Active
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-2xl border border-border">
                      <Calendar className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stat: Efficiency Rate */}
              <Card className="border-2 border-border shadow-md bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                        Efficiency Rate
                      </p>
                      <h3 className="text-4xl font-black text-primary mt-2">94%</h3>
                      <div className="w-full h-3 bg-muted rounded-full mt-6 border border-border">
                        <div className="w-[94%] h-full bg-secondary rounded-full" />
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-2xl border border-border">
                      <TrendingUp className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch py-20">
  {/* Module 1: Talent Database */}
  <div id="recruiter_module_1" className="shadow-sm">
    <div className="module-content p-10 flex flex-col h-full">
      <div className="space-y-5 flex-1">
        <div className="module-icon-container w-16 h-16 flex items-center justify-center shadow-md">
          <Search className="w-8 h-8" />
        </div>
        <div>
          <h4 className="text-3xl font-black tracking-tight mb-2">Talent Dashboard</h4>
          <p className="text-lg font-medium leading-relaxed">
            Search talent by physical vitals, specialty, and review internal recruiter notes.
          </p>
        </div>
      </div>
      <Button 
        onClick={() => setCurrentView("talent")} 
        className="module-button w-full py-8 text-base shadow-lg"
      >
        Open Database <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  </div>

  {/* Module 2: Audition Manager */}
  <div id="recruiter_module_2" className="shadow-sm">
    <div className="module-content p-10 flex flex-col h-full">
      <div className="space-y-5 flex-1">
        <div className="module-icon-container w-16 h-16 flex items-center justify-center shadow-md">
          <Building2 className="w-8 h-8" />
        </div>
        <div>
          <h4 className="text-3xl font-black tracking-tight mb-2">Audition Manager</h4>
          <p className="text-lg font-medium leading-relaxed">
            Coordinate schedules, book audition rooms, and prevent studio overcrowding.
          </p>
        </div>
      </div>
      <Button className="module-button w-full py-8 text-base shadow-lg">
        Manage Schedule <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  </div>
</div>

            {/* Status footer */}
            <div className="bg-primary rounded-2xl p-6 text-primary-foreground flex flex-col md:flex-row items-center justify-between border-b-4 border-accent">
              <div className="flex items-center gap-4">
                <div className="bg-primary-foreground/10 p-2 rounded-lg border border-primary-foreground/20">
                  <ClipboardCheck className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-black text-primary-foreground/50 uppercase">
                    System Integrity
                  </p>
                  <p className="text-sm font-bold">
                    Cloud Database:{" "}
                    <span className="text-green-400 font-black">ONLINE</span>
                  </p>
                </div>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <p className="text-primary-foreground/40 text-xs font-black uppercase tracking-tighter">
                  Secure Session ID: 007-PGT-PRO
                </p>
              </div>
            </div>
          </>
        )}

        {/* ── TALENT DATABASE VIEW ── */}
        {currentView === "talent" && (
          <>
            {/* Back + title */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentView("overview")}
                className="border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground font-bold px-5 transition-colors"
              >
                ← Back
              </Button>
              <div>
                <h2 className="text-4xl font-black text-primary tracking-tight">Talent Database</h2>
                <p className="text-muted-foreground font-semibold italic">
                  Review and rate all applicants
                </p>
              </div>
            </div>

            {/* Applicants table */}
            <Card className="border-2 border-border shadow-md bg-card">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-primary">Talent Applicants</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-black text-primary uppercase tracking-wider">
                        Headshot
                      </TableHead>
                      <TableHead className="font-black text-primary uppercase tracking-wider">
                        Name
                      </TableHead>
                      <TableHead className="font-black text-primary uppercase tracking-wider">
                        Role
                      </TableHead>
                      <TableHead className="font-black text-primary uppercase tracking-wider">
                        Age
                      </TableHead>
                      <TableHead className="text-right font-black text-primary uppercase tracking-wider">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockApplicants.map((applicant) => (
                      <TableRow key={applicant.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border">
                            <ImageWithFallback
                              src={applicant.headshot}
                              alt={applicant.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-primary">
                          {applicant.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={applicant.role === "Singer" ? "default" : "secondary"}
                            className="font-bold uppercase tracking-wider"
                          >
                            {applicant.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground font-semibold">
                          {applicant.age}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => openRateModal(applicant)}
                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-5 shadow-sm"
                          >
                            <Star className="w-4 h-4 mr-2" />
                            Rate Talent
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
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
                <div className="flex-1">
                  <h3 className="text-xl font-black text-primary mb-2">{selectedTalent.name}</h3>
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
