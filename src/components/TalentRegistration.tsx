import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Loader2, ArrowLeft } from "lucide-react";

// "Clapperboard" / Film Set Image
const CLAPPERBOARD_BG = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop";

export function TalentRegistration() {
  const navigate = useNavigate();
  
  // --- FIX 1: Define the missing state ---
  const [isLoading, setIsLoading] = useState(false);

  // --- FIX 2: Move handleSubmit INSIDE the component ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Grabbing data from the form
    const target = e.target as any;
    const formData = {
      name: `${target.firstName.value} ${target.lastName.value}`,
      email: target.email.value,
      password: target.password.value,
    };

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // --- FIX 3: navigate now works because it's inside the component ---
        navigate("/login/talent"); 
      } else {
        alert("Registration failed!");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      alert("Server error. Is your backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 bg-black">
      
      {/* Background Image - Absolute to the container */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${CLAPPERBOARD_BG})` }}
      >
        {/* Darker Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Registration Card */}
      <Card className="relative z-10 w-full max-w-md border-0 shadow-2xl bg-white/95 text-slate-900 animate-in fade-in zoom-in-95 duration-500">
        
        <CardHeader className="space-y-1 text-center pb-2">
          {/* Back Button */}
          <div className="absolute left-4 top-4">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>

          <div className="text-accent font-bold tracking-widest uppercase text-[10px] mb-2">
            PGT Digital Roster
          </div>
          <CardTitle className="text-2xl font-bold">Action!</CardTitle>
          <CardDescription className="text-slate-500">
            Create your profile to get casted.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" name="firstName" placeholder="Lebron" required className="bg-white" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" name="lastName" placeholder="James" required className="bg-white" />
              </div>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Enter Your Email" required className="bg-white" />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required className="bg-white" />
            </div>

            <Button type="submit" className="w-full mt-8 bg-primary hover:bg-primary/90 font-semibold shadow-md" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rolling...
                </>
              ) : (
                "Create Profile"
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/95 px-2 text-muted-foreground">
              </span>
            </div>
          </div>

        
        </CardContent>
        
        <CardFooter className="justify-center border-t border-slate-100 py-3 bg-slate-50/50 rounded-b-xl">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login/talent" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}