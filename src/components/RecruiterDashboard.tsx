import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
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
  Clock,
  UserPlus,
  X,
  CheckCircle2,
} from "lucide-react";

import { ImageWithFallback } from "./figma/ImageWithFallback";

// --- MOCK DATA (Unified) ---
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

// Initial Schedule (Nested by Date -> Time Slot)
const initialSchedule = {
  "2026-03-15": [
    { id: "slot-1", time: "09:00 AM", talentId: 1, status: "Booked" }, // Emma is booked
    { id: "slot-2", time: "09:30 AM", talentId: null, status: "Open" },
    { id: "slot-3", time: "10:00 AM", talentId: null, status: "Open" },
    { id: "slot-4", time: "10:30 AM", talentId: 2, status: "Booked" }, // Marcus is booked
    { id: "slot-5", time: "11:00 AM", talentId: null, status: "Open" },
  ],
  "2026-03-16": [
    { id: "slot-6", time: "09:00 AM", talentId: null, status: "Open" },
    { id: "slot-7", time: "09:30 AM", talentId: null, status: "Open" },
    { id: "slot-8", time: "10:00 AM", talentId: 3, status: "Booked" }, // Sofia is booked
    { id: "slot-9", time: "10:30 AM", talentId: null, status: "Open" },
  ],
};

export function RecruiterDashboard() {
  const navigate = useNavigate();

  // --- STATE: APPLICANT LIST ---
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  
  // --- STATE: RATING MODAL ---
  const [selectedTalent, setSelectedTalent] = useState<typeof mockApplicants[0] | null>(null);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");

  // --- STATE: SCHEDULING ---
  const [activeTab, setActiveTab] = useState("applicants");
  const [scheduleDate, setScheduleDate] = useState("2026-03-15");
  const [scheduleData, setScheduleData] = useState(initialSchedule);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [currentSlot, setCurrentSlot] = useState<any>(null);
  const [selectedTalentIdForSchedule, setSelectedTalentIdForSchedule] = useState<string>("");
  const [scheduleSearchQuery, setScheduleSearchQuery] = useState("");

  // --- HELPER: Filter Applicants ---
  const filteredApplicants = mockApplicants.filter((applicant) => {
    const matchesName = applicant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || applicant.role === roleFilter;
    return matchesName && matchesRole;
  });

  // --- HELPER: Scheduling ---
  const getTalent = (id: number) => mockApplicants.find((t) => t.id === id);

  // Get talents NOT currently booked on the selected date
  const getAvailableTalentsForSchedule = () => {
    const bookedTalentIdsOnDate = scheduleData[scheduleDate as keyof typeof scheduleData]
      .map((slot) => slot.talentId)
      .filter((id) => id !== null);

    return mockApplicants.filter(
      (talent) =>
        !bookedTalentIdsOnDate.includes(talent.id) &&
        talent.name.toLowerCase().includes(scheduleSearchQuery.toLowerCase())
    );
  };

  // --- HANDLERS: Rating ---
  const openRateModal = (talent: typeof mockApplicants[0]) => {
    setSelectedTalent(talent);
    setRating(0);
    setNotes("");
    setIsRateModalOpen(true);
  };

  const handleSubmitRating = () => {
    console.log("Rating submitted:", { talent: selectedTalent, rating, notes });
    setIsRateModalOpen(false);
  };

  // --- HANDLERS: Scheduling ---
  const handleOpenAssignModal = (slot: any) => {
    setCurrentSlot(slot);
    setSelectedTalentIdForSchedule("");
    setScheduleSearchQuery("");
    setIsAssignModalOpen(true);
  };

  const handleAssignTalent = () => {
    if (!currentSlot || !selectedTalentIdForSchedule) return;

    const updatedSchedule = { ...scheduleData };
    const dateSlots = updatedSchedule[scheduleDate as keyof typeof scheduleData];

    const slotIndex = dateSlots.findIndex((s) => s.id === currentSlot.id);
    if (slotIndex !== -1) {
      dateSlots[slotIndex] = {
        ...dateSlots[slotIndex],
        talentId: parseInt(selectedTalentIdForSchedule),
        status: "Booked",
      };
      setScheduleData(updatedSchedule);
    }
    setIsAssignModalOpen(false);
  };

  const openRemoveModal = (slot: any) => {
    setCurrentSlot(slot);
    setIsRemoveModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (!currentSlot) return;

    const updatedSchedule = { ...scheduleData };
    const dateSlots = updatedSchedule[scheduleDate as keyof typeof scheduleData];

    const slotIndex = dateSlots.findIndex((s) => s.id === currentSlot.id);
    if (slotIndex !== -1) {
      dateSlots[slotIndex] = {
        ...dateSlots[slotIndex],
        talentId: null,
        status: "Open",
      };
      setScheduleData(updatedSchedule);
    }
    setIsRemoveModalOpen(false);
    setCurrentSlot(null);
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col font-sans">
      {/* ── HEADER ── */}
      <header className="bg-primary text-primary-foreground py-5 px-8 shadow-2xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Brand */}
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

          {/* Right: User info */}
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

      {/* ── MAIN CONTENT ── */}
      <main className="container mx-auto p-8 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b border-border/40 pb-2">
            <TabsList className="bg-background border border-border">
              <TabsTrigger value="applicants" className="px-6 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <Users className="w-4 h-4 mr-2" />
                Talent Pool
              </TabsTrigger>
              <TabsTrigger value="schedule" className="px-6 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                Audition Schedule
              </TabsTrigger>
            </TabsList>
            
            {/* Contextual Stats based on active tab */}
            {activeTab === "schedule" && (
               <div className="flex gap-3">
                  <Badge variant="outline" className="px-3 py-1 bg-background">
                    <CheckCircle2 className="w-3 h-3 mr-2 text-green-600" />
                    {scheduleData[scheduleDate as keyof typeof scheduleData].filter(s => s.status === "Booked").length} Booked
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 bg-background">
                    <Clock className="w-3 h-3 mr-2 text-blue-600" />
                    {scheduleData[scheduleDate as keyof typeof scheduleData].filter(s => s.status === "Open").length} Open Slots
                  </Badge>
               </div>
            )}
          </div>

          {/* ── TAB 1: TALENT POOL ── */}
          <TabsContent value="applicants" className="mt-0">
            <Card className="border-none shadow-md">
              <CardHeader className="bg-card rounded-t-lg">
                <CardTitle className="text-2xl font-bold text-primary">All Applicants</CardTitle>
                <CardDescription>Review and rate incoming talent applications.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="md:flex-[2] relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="md:flex-[1]">
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Roles</SelectItem>
                        <SelectItem value="Singer">Singer</SelectItem>
                        <SelectItem value="Dancer">Dancer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Headshot</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplicants.length > 0 ? (
                        filteredApplicants.map((applicant) => (
                          <TableRow
                            key={applicant.id}
                            onClick={() => navigate(`/recruiter/talent/${applicant.id}`)}
                            className="cursor-pointer hover:bg-muted/50 transition-colors group"
                          >
                            <TableCell>
                              <div className="w-12 h-12 rounded-full overflow-hidden border border-border">
                                <ImageWithFallback
                                  src={applicant.headshot}
                                  alt={applicant.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium text-foreground">
                              {applicant.name}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={applicant.role === "Singer" ? "default" : "secondary"}
                                className="font-normal"
                              >
                                {applicant.role}
                              </Badge>
                            </TableCell>
                            <TableCell>{applicant.age}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openRateModal(applicant);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-accent hover:bg-accent/90"
                              >
                                Rate Talent
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                            No applicants found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── TAB 2: AUDITION SCHEDULE (FULL WIDTH FIX) ── */}
          <TabsContent value="schedule" className="mt-0">
             {/* Main Schedule View - Full Width */}
             <Card className="border-none shadow-md">
               <CardHeader className="bg-card rounded-t-lg border-b border-border/50 pb-4">
                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    
                    {/* Title */}
                    <div>
                        <CardTitle className="text-xl font-bold text-primary">Live Schedule</CardTitle>
                        <CardDescription>Manage time slots and audition assignments</CardDescription>
                    </div>

                    {/* Date Selector Toolbar (Integrated in Header) */}
                    <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg">
                      <Button 
                          variant="ghost"  // <--- FIXED: Changed from dynamic "white" to static "ghost"
                          size="sm"
                          // We use bg-background (or bg-white) in the className to create the "active" look
                          className={`rounded-md ${scheduleDate === "2026-03-15" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-primary"}`}
                          onClick={() => setScheduleDate("2026-03-15")}
                      >
                          March 15
                      </Button>
                      <Button 
                          variant="ghost" // <--- FIXED: Changed from dynamic "white" to static "ghost"
                          size="sm"
                          className={`rounded-md ${scheduleDate === "2026-03-16" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-primary"}`}
                          onClick={() => setScheduleDate("2026-03-16")}
                      >
                          March 16
                      </Button>
                    </div>
                 </div>
               </CardHeader>
               
               <CardContent className="pt-6 space-y-3">
                 {scheduleData[scheduleDate as keyof typeof scheduleData].map((slot) => {
                   const assignedTalent = slot.talentId ? getTalent(slot.talentId) : null;
                   return (
                     <div
                       key={slot.id}
                       className={`
                          flex flex-col md:flex-row items-center justify-between p-4 rounded-lg border transition-all
                          ${slot.status === "Booked" ? "bg-background border-l-4 border-l-accent shadow-sm" : "bg-muted/20 border-dashed border-border/60"}
                       `}
                     >
                       {/* Time */}
                       <div className="flex items-center gap-4 w-full md:w-32 mb-3 md:mb-0">
                          <div className="flex items-center gap-2 font-mono font-bold text-lg text-primary">
                             <Clock className="w-4 h-4 text-muted-foreground" />
                             {slot.time}
                          </div>
                       </div>

                       {/* Slot Content */}
                       <div className="flex-1 w-full flex items-center gap-4">
                          {slot.status === "Booked" && assignedTalent ? (
                             <div className="flex items-center gap-4 p-1">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent shadow-sm">
                                   <ImageWithFallback src={assignedTalent.headshot} alt={assignedTalent.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                   <h4 className="font-bold text-lg text-foreground leading-tight">{assignedTalent.name}</h4>
                                   <div className="flex items-center gap-2 mt-1">
                                      <Badge variant="secondary" className="text-xs font-normal">{assignedTalent.role}</Badge>
                                      <span className="text-xs text-muted-foreground">ID #{assignedTalent.id}</span>
                                   </div>
                                </div>
                             </div>
                          ) : (
                             <div className="flex items-center gap-3 text-muted-foreground opacity-60">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border">
                                   <UserPlus className="w-4 h-4" />
                                </div>
                                <span className="text-sm italic font-medium">Available Slot</span>
                             </div>
                          )}
                       </div>

                       {/* Actions */}
                       <div className="mt-3 md:mt-0 min-w-[120px] flex justify-end">
                          {slot.status === "Booked" ? (
                             <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => openRemoveModal(slot)}
                             >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                             </Button>
                          ) : (
                             <Button
                                size="sm"
                                onClick={() => handleOpenAssignModal(slot)}
                                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6"
                             >
                                Assign Talent
                             </Button>
                          )}
                       </div>
                     </div>
                   );
                 })}
               </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* ── RATE TALENT MODAL ── */}
      <Dialog open={isRateModalOpen} onOpenChange={setIsRateModalOpen}>
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
                  onClick={() => setIsRateModalOpen(false)}
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

      {/* ── ASSIGN TALENT MODAL (SCHEDULING) ── */}
      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="max-w-md bg-card border-2 border-border">
            <DialogHeader>
                <DialogTitle className="text-xl font-bold text-primary">Assign Talent</DialogTitle>
                <DialogDescription>
                    Booking for <strong>{currentSlot?.time}</strong> on {scheduleDate}.
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search available talent..." 
                        className="pl-8" 
                        value={scheduleSearchQuery}
                        onChange={(e) => setScheduleSearchQuery(e.target.value)}
                    />
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {getAvailableTalentsForSchedule().length === 0 ? (
                        <p className="text-center text-muted-foreground py-8 text-sm">
                           No matching available talents found.<br/>(They might be booked already today)
                        </p>
                    ) : (
                        <div className="grid gap-2">
                            {getAvailableTalentsForSchedule().map((talent) => (
                                <div 
                                    key={talent.id}
                                    onClick={() => setSelectedTalentIdForSchedule(talent.id.toString())}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                                        ${selectedTalentIdForSchedule === talent.id.toString() 
                                            ? "border-accent bg-accent/10 ring-1 ring-accent" 
                                            : "hover:bg-muted border-border"
                                        }
                                    `}
                                >
                                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border">
                                        <ImageWithFallback 
                                            src={talent.headshot} 
                                            alt={talent.name} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm text-foreground">{talent.name}</p>
                                        <p className="text-xs text-muted-foreground">{talent.role}</p>
                                    </div>
                                    {selectedTalentIdForSchedule === talent.id.toString() && (
                                        <CheckCircle2 className="w-5 h-5 text-accent" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <DialogFooter>
                <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>Cancel</Button>
                <Button 
                    onClick={handleAssignTalent} 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                    disabled={!selectedTalentIdForSchedule}
                >
                    Confirm Booking
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── REMOVE TALENT MODAL (SCHEDULING) ── */}
      <Dialog open={isRemoveModalOpen} onOpenChange={setIsRemoveModalOpen}>
        <DialogContent className="max-w-sm border-2 border-destructive/20">
            <DialogHeader>
                <DialogTitle className="text-destructive">Remove Booking?</DialogTitle>
                <DialogDescription>
                    Are you sure you want to remove the talent from the <strong>{currentSlot?.time}</strong> slot?
                    This will open the slot for new assignments.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="ghost" onClick={() => setIsRemoveModalOpen(false)}>Cancel</Button>
                <Button
                    variant="destructive"
                    onClick={handleConfirmRemove}
                >
                    Yes, Remove
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}