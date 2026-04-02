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
import { LogOut, UserPlus, Trash2, Pencil, Loader2, CalendarPlus, Clock, X, Plus } from "lucide-react";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [auditions, setAuditions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // --- USER MODAL STATE ---
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "Password123!", 
    role: "Recruiter",
  });

  // --- AUDITION MODAL STATE ---
  const [isAuditionModalOpen, setIsAuditionModalOpen] = useState(false);
  const [editingAuditionId, setEditingAuditionId] = useState<string | null>(null);
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
  const openCreateUserModal = () => {
    setEditingUserId(null);
    setNewUser({ name: "", email: "", password: "Password123!", role: "Recruiter" });
    setIsUserModalOpen(true);
  };

  const openEditUserModal = (user: any) => {
    setEditingUserId(user._id);
    setNewUser({ name: user.name, email: user.email, password: "", role: user.role });
    setIsUserModalOpen(true);
  };

  const handleSaveUser = async () => {
    try {
      const url = editingUserId 
        ? `http://localhost:3000/api/users/${editingUserId}` 
        : 'http://localhost:3000/api/register';
      
      const method = editingUserId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setIsUserModalOpen(false);
        fetchData();
      } else {
        alert("Failed to save user.");
      }
    } catch (err) { console.error("Error saving user", err); }
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
  const openCreateAuditionModal = () => {
    setEditingAuditionId(null);
    setNewAuditionTitle("");
    setNewAuditionLocation("");
    setNewAuditionDate("");
    setNewAuditionSlots(["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM"]);
    setIsAuditionModalOpen(true);
  };

  const openEditAuditionModal = (audition: any) => {
    setEditingAuditionId(audition._id);
    setNewAuditionTitle(audition.title);
    setNewAuditionLocation(audition.location);
    // Format the date so the HTML input element can read it (YYYY-MM-DD)
    const formattedDate = new Date(audition.date).toISOString().split('T')[0];
    setNewAuditionDate(formattedDate);
    // Extract just the time strings for the UI
    setNewAuditionSlots(audition.slots.map((s: any) => s.time));
    setIsAuditionModalOpen(true);
  };

  const handleAddSlot = () => {
    if (customSlot && !newAuditionSlots.includes(customSlot)) {
      setNewAuditionSlots([...newAuditionSlots, customSlot]);
      setCustomSlot(""); 
    }
  };

  const handleRemoveSlot = (slotToRemove: string) => {
    setNewAuditionSlots(newAuditionSlots.filter(slot => slot !== slotToRemove));
  };

  const handleSaveAudition = async () => {
    if (!newAuditionTitle || !newAuditionLocation || !newAuditionDate || newAuditionSlots.length === 0) {
      alert("Please fill in the Title, Location, Date, and add at least one time slot.");
      return;
    }

    try {
      const url = editingAuditionId 
        ? `http://localhost:3000/api/auditions/${editingAuditionId}`
        : 'http://localhost:3000/api/auditions';
      
      const method = editingAuditionId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: newAuditionTitle,
          location: newAuditionLocation,
          date: newAuditionDate, 
          slots: newAuditionSlots 
        }),
      });

      if (response.ok) {
        setIsAuditionModalOpen(false);
        fetchData();
      } else {
        alert("Failed to save audition.");
      }
    } catch (err) { console.error("Error saving audition", err); }
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
                <Button onClick={openCreateUserModal} className="bg-accent hover:bg-accent/90">
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
                          <TableCell className="text-right space-x-2">
                            {/* NEW EDIT BUTTON */}
                            <Button variant="ghost" size="sm" onClick={() => openEditUserModal(user)} className="text-blue-600 hover:bg-blue-100 hover:text-blue-800">
                              <Pencil className="w-4 h-4" />
                            </Button>
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
                <Button onClick={openCreateAuditionModal} className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
                            <div className="flex flex-col gap-2">
                              {/* NEW EDIT BUTTON */}
                              <Button variant="ghost" size="sm" onClick={() => openEditAuditionModal(audition)} className="text-blue-600 hover:bg-blue-100 hover:text-blue-800">
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteAudition(audition._id)} className="text-destructive hover:bg-destructive/10">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
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

      {/* --- MODAL: CREATE / EDIT USER --- */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUserId ? "Edit User" : "Create New Account"}</DialogTitle>
            <DialogDescription>
              {editingUserId ? "Update this user's details." : "Assign a new Recruiter to the system."}
            </DialogDescription>
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
            
            {/* Only require a password if we are creating a NEW user */}
            {!editingUserId && (
              <div className="space-y-2">
                <Label>Temporary Password</Label>
                <Input type="text" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
              </div>
            )}
            
            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={() => setIsUserModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveUser} className="bg-accent hover:bg-accent/90">
                {editingUserId ? "Save Changes" : "Create Account"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- MODAL: CREATE / EDIT AUDITION --- */}
      <Dialog open={isAuditionModalOpen} onOpenChange={setIsAuditionModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingAuditionId ? "Edit Audition Schedule" : "Create Audition Schedule"}</DialogTitle>
            <DialogDescription>
              {editingAuditionId ? "Update the title, location, or date." : "Set the details and define the exact time slots."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-2">
            <div className="space-y-2">
              <Label className="font-bold">Audition Title</Label>
              <Input placeholder="e.g. Winter Play General Auditions" value={newAuditionTitle} onChange={(e) => setNewAuditionTitle(e.target.value)} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label className="font-bold">Location</Label>
              <Input placeholder="e.g. Studio A, Main Building" value={newAuditionLocation} onChange={(e) => setNewAuditionLocation(e.target.value)} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label className="font-bold">Audition Date</Label>
              <Input type="date" value={newAuditionDate} onChange={(e) => setNewAuditionDate(e.target.value)} className="w-full" />
            </div>

            <div className="space-y-3">
              <Label className="font-bold">Available Time Slots</Label>
              
              <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg border border-border min-h-[60px]">
                {newAuditionSlots.length === 0 ? (
                  <span className="text-sm text-muted-foreground italic">No time slots added.</span>
                ) : (
                  newAuditionSlots.map((slot) => (
                    <Badge key={slot} variant="secondary" className="pl-3 pr-1 py-1 flex items-center gap-1 text-sm bg-background text-black border shadow-sm">
                      <Clock className="w-3 h-3 text-black mr-1" />
                      {slot}
                      {/* Disable deleting slots if we are editing, to protect talent bookings! */}
                      {!editingAuditionId && (
                        <button onClick={() => handleRemoveSlot(slot)} className="ml-1 hover:bg-destructive/20 hover:text-destructive text-black rounded-full p-0.5 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))
                )}
              </div>

              {/* Hide the "Add Slot" input if we are in Edit mode */}
              {!editingAuditionId && (
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
              )}
              {editingAuditionId && (
                <p className="text-xs text-muted-foreground italic">Time slots cannot be edited after an audition is created to prevent deleting talent bookings.</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAuditionModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAudition} className="bg-primary hover:bg-primary/90">
              {editingAuditionId ? "Save Changes" : "Publish Schedule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}