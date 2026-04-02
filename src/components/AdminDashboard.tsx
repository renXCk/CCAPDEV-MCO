import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LogOut, UserPlus, Trash2, Loader2, CalendarPlus, Clock, X, Plus } from "lucide-react";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [auditions, setAuditions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // --- USER MODAL STATE ---
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "Password123!", 
    role: "Recruiter",
  });

  // --- AUDITION MODAL STATE ---
  const [isAuditionModalOpen, setIsAuditionModalOpen] = useState(false);
  const [newAuditionTitle, setNewAuditionTitle] = useState("");
  const [newAuditionLocation, setNewAuditionLocation] = useState("");
  const [newAuditionDate, setNewAuditionDate] = useState("");
  const [newAuditionSlots, setNewAuditionSlots] = useState<string[]>([
    "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM"
  ]);
  const [customSlot, setCustomSlot] = useState("");

  // --- 1. FETCH DATA FROM DB ---
  const fetchData = async () => {
    try {
      const [usersRes, auditionsRes] = await Promise.all([
        fetch('http://localhost:3000/api/admin/users'),
        fetch('http://localhost:3000/api/auditions')
      ]);
      const usersData = await usersRes.json();
      const auditionsData = await auditionsRes.json();
      
      setUsers(usersData);
      setAuditions(auditionsData);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (loggedInUser.role !== 'Admin') {
      navigate("/login/admin");
      return;
    }
    fetchData();
  }, []);

  // --- 2. USER MANAGEMENT HANDLERS ---
  const handleCreateUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setIsCreateModalOpen(false);
        setNewUser({ name: "", email: "", password: "Password123!", role: "Recruiter" });
        fetchData();
      } else {
        alert("Failed to create user.");
      }
    } catch (err) { console.error("Error creating user", err); }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, { method: 'DELETE' });
        if (response.ok) setUsers(users.filter(u => u._id !== userId));
      } catch (err) { console.error("Delete failed", err); }
    }
  };

  // --- 3. AUDITION MANAGEMENT HANDLERS ---
  const handleAddSlot = () => {
    if (customSlot && !newAuditionSlots.includes(customSlot)) {
      setNewAuditionSlots([...newAuditionSlots, customSlot]);
      setCustomSlot(""); 
    }
  };

  const handleRemoveSlot = (slotToRemove: string) => {
    setNewAuditionSlots(newAuditionSlots.filter(slot => slot !== slotToRemove));
  };

  const handleCreateAudition = async () => {
    // NEW: Validation to ensure ALL fields are filled out
    if (!newAuditionTitle || !newAuditionLocation || !newAuditionDate || newAuditionSlots.length === 0) {
      alert("Please fill in the Title, Location, Date, and add at least one time slot.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auditions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // NEW: Sending title and location to the backend
        body: JSON.stringify({ 
          title: newAuditionTitle,
          location: newAuditionLocation,
          date: newAuditionDate, 
          slots: newAuditionSlots 
        }),
      });

      if (response.ok) {
        setIsAuditionModalOpen(false);
        // Reset everything back to defaults for the next time
        setNewAuditionTitle("");
        setNewAuditionLocation("");
        setNewAuditionDate("");
        setNewAuditionSlots(["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM"]);
        fetchData();
      } else {
        alert("Failed to create audition date.");
      }
    } catch (err) { console.error("Error creating audition", err); }
  };

  const handleDeleteAudition = async (auditionId: string) => {
    if (window.confirm("Are you sure you want to delete this ENTIRE audition date? All booked talents will lose their slots!")) {
      try {
        const response = await fetch(`http://localhost:3000/api/auditions/${auditionId}`, { method: 'DELETE' });
        if (response.ok) setAuditions(auditions.filter(a => a._id !== auditionId));
      } catch (err) { console.error("Delete failed", err); }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">PGT Digital</h1>
            <span className="text-white/80">|</span>
            <span className="text-lg">Admin Dashboard</span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-white/10">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="auditions">Audition Schedules</TabsTrigger>
          </TabsList>

          {/* --- TAB 1: USERS --- */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">User Management</CardTitle>
                  <CardDescription>Manage all Recruiters and Talents</CardDescription>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)} className="bg-accent hover:bg-accent/90">
                  <UserPlus className="w-4 h-4 mr-2" /> Create New Recruiter
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.filter((user) => user.role !== "Admin").map((user) => (
                        <TableRow key={user._id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "Talent" ? "default" : "secondary"}>{user.role}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user._id)} className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- TAB 2: AUDITIONS --- */}
          <TabsContent value="auditions">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Audition Schedules</CardTitle>
                  <CardDescription>Create specific dates and generate available time slots for talents.</CardDescription>
                </div>
                <Button onClick={() => setIsAuditionModalOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <CalendarPlus className="w-4 h-4 mr-2" /> Create New Schedule
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
                ) : auditions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-10">No audition schedules created yet.</p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {auditions.map(audition => {
                      const totalSlots = audition.slots.length;
                      const bookedSlots = audition.slots.filter((s:any) => s.status === "Booked").length;
                      
                      return (
                        <Card key={audition._id} className="border-border/50 shadow-sm relative overflow-hidden group">
                          <CardHeader className="bg-muted/30 pb-3">
                            <CardTitle className="text-lg flex flex-col gap-1">
                              <span className="truncate">{audition.title}</span>
                              <span className="text-sm font-normal text-muted-foreground flex items-center justify-between">
                                {new Date(audition.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4 flex justify-between items-end">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground mb-1 border-b pb-1">📍 {audition.location}</p>
                              <p className="text-sm font-medium text-muted-foreground">Total Slots: {totalSlots}</p>
                              <Badge variant={bookedSlots > 0 ? "default" : "secondary"}>{bookedSlots} Booked</Badge>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteAudition(audition._id)} className="text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* --- MODAL: CREATE USER --- */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Account</DialogTitle>
            <DialogDescription>Assign a new Recruiter to the system.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="Enter full name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" placeholder="email@example.com" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Temporary Password</Label>
              <Input type="text" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            </div>
            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateUser} className="bg-accent hover:bg-accent/90">Create Account</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- MODAL: CREATE AUDITION SCHEDULE --- */}
      <Dialog open={isAuditionModalOpen} onOpenChange={setIsAuditionModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Audition Schedule</DialogTitle>
            <DialogDescription>Set the details and define the exact time slots available for booking.</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-2">
            {/* Title Selection */}
            <div className="space-y-2">
              <Label className="font-bold">Audition Title</Label>
              <Input placeholder="e.g. Winter Play General Auditions" value={newAuditionTitle} onChange={(e) => setNewAuditionTitle(e.target.value)} className="w-full" />
            </div>

            {/* Location Selection */}
            <div className="space-y-2">
              <Label className="font-bold">Location</Label>
              <Input placeholder="e.g. Studio A, Main Building" value={newAuditionLocation} onChange={(e) => setNewAuditionLocation(e.target.value)} className="w-full" />
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label className="font-bold">Audition Date</Label>
              <Input type="date" value={newAuditionDate} onChange={(e) => setNewAuditionDate(e.target.value)} className="w-full" />
            </div>

            {/* Time Slots Builder */}
            <div className="space-y-3">
              <Label className="font-bold">Available Time Slots</Label>
              
              {/* List of current slots */}
              <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg border border-border min-h-[60px]">
                {newAuditionSlots.length === 0 ? (
                  <span className="text-sm text-muted-foreground italic">No time slots added.</span>
                ) : (
                  newAuditionSlots.map((slot) => (
                    <Badge key={slot} variant="secondary" className="pl-3 pr-1 py-1 flex items-center gap-1 text-sm bg-background text-black border shadow-sm">
                      <Clock className="w-3 h-3 text-black mr-1" />
                      {slot}
                      <button onClick={() => handleRemoveSlot(slot)} className="ml-1 hover:bg-destructive/20 hover:text-destructive text-black rounded-full p-0.5 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>

              {/* Add Custom Slot Input */}
              <div className="flex gap-2">
                <Input 
                  placeholder="e.g. 03:30 PM" 
                  value={customSlot} 
                  onChange={(e) => setCustomSlot(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSlot()}
                />
                <Button type="button" onClick={handleAddSlot} variant="secondary">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAuditionModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateAudition} className="bg-primary hover:bg-primary/90">Publish Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}