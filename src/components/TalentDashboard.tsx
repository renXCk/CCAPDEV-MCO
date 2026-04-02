import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { User, Image as ImageIcon, Calendar, LogOut, Loader2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function TalentDashboard() {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("vitals");
  
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dbAuditions, setDbAuditions] = useState([]);
  const [vitals, setVitals] = useState({
    name: "",
    height: "",
    weight: "",
    hairColor: "",
    eyeColor: "",
  });

  const fetchAuditions = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auditions');
      const data = await res.json();
      setDbAuditions(data);
    } catch (err) { console.error("Fetch error:", err); }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (!loggedInUser.id) {
      navigate("/login");
      return;
    }

    setUserId(loggedInUser.id);
    // Set vitals: Name comes from the login session and won't be editable via Input
    setVitals({
      name: loggedInUser.name || "", 
      height: loggedInUser.talentProfile?.height || "",
      weight: loggedInUser.talentProfile?.weight || "",
      hairColor: loggedInUser.talentProfile?.hairColor || "",
      eyeColor: loggedInUser.talentProfile?.eyeColor || "",
    });
    
    fetchAuditions();
    setIsLoading(false);
  }, [navigate]);

  const handleConfirmBooking = async (auditionId: string, slotTime: string) => {
    try {
      const res = await fetch('http://localhost:3000/api/auditions/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auditionId, slotTime, talentId: userId })
      });
      
      const data = await res.json();
      if (res.ok) {
        alert("Slot Booked! See you there! 🎤");
        setSelectedSlot(null);
        fetchAuditions(); 
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Server error during booking.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, vitals }),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedSession = {
            ...JSON.parse(localStorage.getItem("user") || "{}"),
            talentProfile: data.user.talentProfile
        };
        localStorage.setItem("user", JSON.stringify(updatedSession));
        alert("Vitals Updated Successfully! ✅");
      }
    } catch (err) {
      alert("Error saving profile.");
    }
  };

  if (isLoading) return <div className="flex justify-center items-center min-h-screen"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">PGT Digital | Talent</h1> 
        <Button variant="ghost" onClick={() => { localStorage.removeItem("user"); navigate("/"); }} className="text-white">
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </header>

      <div className="flex">
        <aside className="w-64 bg-primary text-white min-h-[calc(100vh-64px)] p-6 space-y-2">
          <button onClick={() => setActiveTab("vitals")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === "vitals" ? "bg-accent" : "hover:bg-white/10"}`}>
            <User className="w-5 h-5" /> <span>Vitals</span>
          </button>
          <button onClick={() => setActiveTab("media")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === "media" ? "bg-accent" : "hover:bg-white/10"}`}>
            <ImageIcon className="w-5 h-5" /> <span>Media</span>
          </button>
          <button onClick={() => setActiveTab("auditions")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === "auditions" ? "bg-accent" : "hover:bg-white/10"}`}>
            <Calendar className="w-5 h-5" /> <span>Auditions</span>
          </button>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* VITALS TAB */}
            {activeTab === "vitals" && (
              <Card>
                <CardHeader><CardTitle className="text-2xl">Digital Set Card</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label>Full Name</Label>
                      <Input value={vitals.name} readOnly className="bg-muted text-muted-foreground cursor-not-allowed" />
                    </div>
                    <div><Label>Height</Label><Input value={vitals.height} onChange={(e) => setVitals({ ...vitals, height: e.target.value })} /></div>
                    <div><Label>Weight</Label><Input value={vitals.weight} onChange={(e) => setVitals({ ...vitals, weight: e.target.value })} /></div>
                    <div><Label>Hair Color</Label><Input value={vitals.hairColor} onChange={(e) => setVitals({ ...vitals, hairColor: e.target.value })} /></div>
                    <div><Label>Eye Color</Label><Input value={vitals.eyeColor} onChange={(e) => setVitals({ ...vitals, eyeColor: e.target.value })} /></div>
                  </div>
                  <Button onClick={handleSave} className="bg-accent mt-4">Save Changes</Button>
                </CardContent>
              </Card>
            )}

            {/* AUDITIONS TAB */}
{activeTab === "auditions" && (
  <Card>
    <CardHeader><CardTitle className="text-2xl">Available Auditions</CardTitle></CardHeader>
    <CardContent className="space-y-6">
      {dbAuditions.length === 0 ? (
        <p className="text-center py-10 text-muted-foreground">No auditions scheduled yet.</p>
      ) : (
        dbAuditions.map((audition: any) => {
          // Identify if you have a booking in this audition
          const mySlot = audition.slots.find((s: any) => (s.talentId?._id || s.talentId) === userId);

          return (
            <div key={audition._id} className="p-6 border rounded-xl bg-muted/30 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{audition.title}</h3>
                  <p className="text-sm text-muted-foreground">{audition.location} • {audition.date}</p>
                </div>
                {mySlot && (
                  <div className="bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold border border-green-600">
                    ✓ BOOKED
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {audition.slots.map((slot: any) => {
                  const slotUserId = slot.talentId?._id || slot.talentId;
                  const isMine = slotUserId === userId;
                  const isTaken = slot.status === "Booked" && !isMine;

                  // 1. YOUR BOOKED SLOT (The Green Box with Black Text)
                  if (isMine) {
                    return (
                      <div 
                        key={slot.time} 
                        className="px-4 py-2 bg-green-500 text-black rounded-md border border-green-600 font-bold text-sm"
                      >
                        {slot.time} (Confirmed)
                      </div>
                    );
                  }

                  // 2. OTHER SLOTS (Buttons)
                  return (
                    <Button 
                      key={slot.time} 
                      variant="outline"
                      // Disable if someone else took it OR if you already have a different slot here
                      disabled={isTaken || (mySlot && !isMine)}
                      className={selectedSlot === slot.time ? "bg-accent text-white border-accent" : "border-slate-300"}
                      onClick={() => setSelectedSlot(slot.time)}
                    >
                      {slot.time} {isTaken ? "(Full)" : ""}
                    </Button>
                  );
                })}
              </div>

              {/* Show Confirm button only for the slot you are currently clicking on */}
              {selectedSlot && !mySlot && audition.slots.some(s => s.time === selectedSlot && s.status === "Open") && (
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white mt-2" 
                  onClick={() => handleConfirmBooking(audition._id, selectedSlot)}
                >
                  Confirm Booking for {selectedSlot}
                </Button>
              )}
            </div>
          );
        })
      )}
    </CardContent>
  </Card>
)}

          </div>
        </main>
      </div>
    </div>
  );
}