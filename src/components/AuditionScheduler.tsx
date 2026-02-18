import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar, Clock, LogOut, UserPlus, X, Search, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Input } from "./ui/input";

// --- Mock Data ---

// pool of talents (combining your previous mock data + new ones)
const mockTalentPool = [
  { id: 1, name: "Emma Johnson", role: "Singer", headshot: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
  { id: 2, name: "Marcus Williams", role: "Dancer", headshot: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
  { id: 3, name: "Sofia Martinez", role: "Singer", headshot: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" },
  { id: 4, name: "James Chen", role: "Dancer", headshot: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200" },
  { id: 5, name: "Olivia Brown", role: "Singer", headshot: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200" },
  { id: 6, name: "Lucas Gray", role: "Magician", headshot: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" },
  { id: 7, name: "Aisha Patel", role: "Dancer", headshot: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" },
];

// Initial Schedule (Nested by Date -> Time Slot)
const initialSchedule = {
  "2026-03-15": [
    { id: "slot-1", time: "09:00 AM", talentId: 1, status: "Booked" }, // Emma is booked
    { id: "slot-2", time: "09:30 AM", talentId: null, status: "Open" },
    { id: "slot-3", time: "10:00 AM", talentId: null, status: "Open" },
    { id: "slot-4", time: "10:30 AM", talentId: 2, status: "Booked" }, // Marcus is booked
    { id: "slot-5", time: "11:00 AM", talentId: null, status: "Open" },
    { id: "slot-6", time: "11:30 AM", talentId: null, status: "Open" },
  ],
  "2026-03-16": [
    { id: "slot-7", time: "09:00 AM", talentId: null, status: "Open" },
    { id: "slot-8", time: "09:30 AM", talentId: null, status: "Open" },
    { id: "slot-9", time: "10:00 AM", talentId: 3, status: "Booked" }, // Sofia is booked
    { id: "slot-10", time: "10:30 AM", talentId: null, status: "Open" },
  ]
};

export function AuditionScheduler() {
  const [selectedDate, setSelectedDate] = useState("2026-03-15");
  const [scheduleData, setScheduleData] = useState(initialSchedule);
  
  // Modal State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [currentSlot, setCurrentSlot] = useState<any>(null); // The slot we are currently editing
  const [selectedTalentId, setSelectedTalentId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // Get Talent details by ID
  const getTalent = (id: number) => mockTalentPool.find(t => t.id === id);

  // Get list of talents NOT currently booked on the selected date
  // (Prevents double booking the same person on the same day)
  const getAvailableTalents = () => {
    const bookedTalentIdsOnDate = scheduleData[selectedDate as keyof typeof scheduleData]
      .map(slot => slot.talentId)
      .filter(id => id !== null);

    return mockTalentPool.filter(talent => 
      !bookedTalentIdsOnDate.includes(talent.id) &&
      talent.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Action: Open Modal
  const handleOpenAssignModal = (slot: any) => {
    setCurrentSlot(slot);
    setSelectedTalentId(""); // Reset selection
    setSearchQuery("");
    setIsAssignModalOpen(true);
  };

  // Confirm Assignment
  const handleAssignTalent = () => {
    if (!currentSlot || !selectedTalentId) return;

    const updatedSchedule = { ...scheduleData };
    const dateSlots = updatedSchedule[selectedDate as keyof typeof scheduleData];
    
    const slotIndex = dateSlots.findIndex(s => s.id === currentSlot.id);
    if (slotIndex !== -1) {
      dateSlots[slotIndex] = {
        ...dateSlots[slotIndex],
        talentId: parseInt(selectedTalentId),
        status: "Booked"
      };
      setScheduleData(updatedSchedule);
    }

    setIsAssignModalOpen(false);
  };

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  // Remove Assignment
  const openRemoveModal = (slot: any) => {
    setCurrentSlot(slot);
    setIsRemoveModalOpen(true);
  };

  // Actually remove the talent (runs when user clicks "Remove" in the modal)
  const handleConfirmRemove = () => {
    if (!currentSlot) return;

    const updatedSchedule = { ...scheduleData };
    const dateSlots = updatedSchedule[selectedDate as keyof typeof scheduleData];
    
    const slotIndex = dateSlots.findIndex(s => s.id === currentSlot.id);
    if (slotIndex !== -1) {
      dateSlots[slotIndex] = {
        ...dateSlots[slotIndex],
        talentId: null,
        status: "Open"
      };
      setScheduleData(updatedSchedule);
    }
    
    setIsRemoveModalOpen(false);
    setCurrentSlot(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Reusing Recruiter Header */}
      <header className="bg-secondary text-white py-4 px-6 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">PGT Digital</h1>
            <span className="text-white/80">|</span>
            <span className="text-lg">Audition Scheduler</span>
          </div>
          <div className="flex gap-4">
             <Link to="/recruiter/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Dashboard
                </Button>
             </Link>
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-8 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Manage Audition Slots</h2>
                <p className="text-muted-foreground mt-1">Assign talents to specific time slots for the upcoming show phases.</p>
            </div>
            
            {/* Stats Summary */}
            <div className="flex gap-3">
                <Card className="p-4 flex items-center gap-3 bg-muted/50 border-none">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Booked</p>
                        <p className="font-bold text-lg">
                            {scheduleData[selectedDate as keyof typeof scheduleData].filter(s => s.status === "Booked").length}
                        </p>
                    </div>
                </Card>
                <Card className="p-4 flex items-center gap-3 bg-muted/50 border-none">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Open</p>
                        <p className="font-bold text-lg">
                             {scheduleData[selectedDate as keyof typeof scheduleData].filter(s => s.status === "Open").length}
                        </p>
                    </div>
                </Card>
            </div>
        </div>

        {/* Date Tabs */}
        <Tabs value={selectedDate} onValueChange={setSelectedDate} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="2026-03-15">Day 1: March 15</TabsTrigger>
                <TabsTrigger value="2026-03-16">Day 2: March 16</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/10 px-3 py-1 rounded-md">
                <Calendar className="w-4 h-4" />
                <span>Current View: {selectedDate}</span>
            </div>
          </div>

          {/* Schedule List */}
          <TabsContent value={selectedDate} className="mt-0">
            <Card>
                <CardHeader>
                    <CardTitle>Time Slots</CardTitle>
                    <CardDescription>Click 'Assign Talent' to book a performer for a specific time.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {scheduleData[selectedDate as keyof typeof scheduleData].map((slot) => {
                        const assignedTalent = slot.talentId ? getTalent(slot.talentId) : null;
                        
                        return (
                            <div 
                                key={slot.id} 
                                className={`flex flex-col md:flex-row items-center justify-between p-4 rounded-lg border transition-all ${
                                    slot.status === "Booked" 
                                    ? "bg-card border-l-4 border-l-accent" 
                                    : "bg-muted/30 border-dashed"
                                }`}
                            >
                                {/* Time Column */}
                                <div className="flex items-center gap-4 w-full md:w-1/4 mb-3 md:mb-0">
                                    <Badge variant="outline" className="px-3 py-1 text-base font-medium flex gap-2">
                                        <Clock className="w-4 h-4" />
                                        {slot.time}
                                    </Badge>
                                </div>

                                {/* Talent Info Column */}
                                <div className="flex-1 w-full flex items-center gap-4">
                                    {slot.status === "Booked" && assignedTalent ? (
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                                <ImageWithFallback 
                                                    src={assignedTalent.headshot} 
                                                    alt={assignedTalent.name} 
                                                    className="w-full h-full object-cover" 
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-lg leading-none">{assignedTalent.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="secondary" className="text-xs">{assignedTalent.role}</Badge>
                                                    <span className="text-xs text-muted-foreground">ID: #{assignedTalent.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-muted-foreground italic flex items-center gap-2">
                                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                                <UserPlus className="w-5 h-5 opacity-50" />
                                            </div>
                                            Empty Slot
                                        </span>
                                    )}
                                </div>

                                {/* Actions Column */}
                                <div className="mt-3 md:mt-0">
                                    {slot.status === "Booked" ? (
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                            onClick={() => openRemoveModal(slot)}
                                        >
                                            <X className="w-4 h-4 mr-2" />
                                            Remove
                                        </Button>
                                    ) : (
                                        <Button 
                                            onClick={() => handleOpenAssignModal(slot)}
                                            className="bg-accent hover:bg-accent/90 w-full md:w-auto"
                                        >
                                            <UserPlus className="w-4 h-4 mr-2" />
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

      {/* Assignment Modal */}
      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>Assign Talent</DialogTitle>
                <DialogDescription>
                    Select a talent for the <strong>{currentSlot?.time}</strong> slot on {selectedDate}.
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Filter by name..." 
                            className="pl-8" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {getAvailableTalents().length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">No matching talents found available for this date.</p>
                    ) : (
                        <div className="grid gap-2">
                            {getAvailableTalents().map((talent) => (
                                <div 
                                    key={talent.id}
                                    onClick={() => setSelectedTalentId(talent.id.toString())}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                                        ${selectedTalentId === talent.id.toString() 
                                            ? "border-accent bg-accent/10 ring-1 ring-accent" 
                                            : "hover:bg-muted"
                                        }
                                    `}
                                >
                                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                        <ImageWithFallback 
                                            src={talent.headshot} 
                                            alt={talent.name} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{talent.name}</p>
                                        <p className="text-xs text-muted-foreground">{talent.role}</p>
                                    </div>
                                    {selectedTalentId === talent.id.toString() && (
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
                    className="bg-accent hover:bg-accent/90"
                    disabled={!selectedTalentId}
                >
                    Confirm Booking
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Confirmation Modal */}
      <Dialog open={isRemoveModalOpen} onOpenChange={setIsRemoveModalOpen}>
        <DialogContent className="max-w-sm">
            <DialogHeader>
                <DialogTitle>Remove Talent?</DialogTitle>
                <DialogDescription>
                    Are you sure you want to remove the talent from the <strong>{currentSlot?.time}</strong> slot?
                    <br /><br />
                    This action will make the slot "Open" again.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="ghost" onClick={() => setIsRemoveModalOpen(false)}>Cancel</Button>
                <Button 
                    variant="destructive" 
                    onClick={handleConfirmRemove}
                >
                    Yes, Remove Talent
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}