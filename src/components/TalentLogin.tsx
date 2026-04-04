import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Users } from "lucide-react";

export function TalentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add this state at the top

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // 1. Check if the person logging in is actually a 'Talent'
        if (data.user.role !== 'Talent') {
          setError("This account is not registered as a Talent.");
          return;
        }

        // 2. Persist the session (save to browser memory)
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // 3. Go to dashboard
        navigate("/talent/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Cannot connect to server. Is app.js running?");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl">Talent Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-accent hover:underline">
                Forgot password?
              </a>
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register/talent" className="text-accent hover:underline font-medium">
                Sign up for free
              </Link>
            </p>
            <Link to="/select-role" className="text-sm text-muted-foreground hover:text-foreground block">
              ← Choose a different role
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
