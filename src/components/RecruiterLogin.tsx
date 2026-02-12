import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Briefcase } from "lucide-react";

export function RecruiterLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would authenticate with backend
    console.log("Recruiter login:", { email, password });
    navigate("/recruiter/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl">Recruiter Login</CardTitle>
          <CardDescription>
            Access your talent management dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@agency.com"
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
              <a href="#" className="text-secondary hover:underline">
                Forgot password?
              </a>
            </div>
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" size="lg">
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              New to PGT Digital?{" "}
              <a href="#" className="text-secondary hover:underline font-medium">
                Request agency access
              </a>
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
