import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Users, Briefcase } from "lucide-react";

export function RoleSelection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-5xl font-bold text-white hover:text-accent transition-colors">PGT Digital</h1>
          </Link>
          <p className="text-white/90 text-2xl">Welcome! Please select your role to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Talent Selection */}
          <Card className="hover:shadow-2xl transition-all hover:scale-105 cursor-pointer border-4 border-transparent hover:border-accent">
            <CardHeader className="text-center pb-6">
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl mb-2">I am a Talent</CardTitle>
              <CardDescription className="text-base">
                Performers, singers, dancers, and actors looking to showcase their skills and get discovered
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>✓ Create your digital set card</li>
                <li>✓ Upload unlimited media</li>
                <li>✓ Get discovered by agencies</li>
                <li>✓ Track your auditions</li>
              </ul>
              <Link to="/login/talent" className="block">
                <Button className="w-full bg-accent hover:bg-accent/90 text-white" size="lg">
                  Continue as Talent
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recruiter Selection */}
          <Card className="hover:shadow-2xl transition-all hover:scale-105 cursor-pointer border-4 border-transparent hover:border-secondary">
            <CardHeader className="text-center pb-6">
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Briefcase className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl mb-2">I am a Recruiter</CardTitle>
              <CardDescription className="text-base">
                Casting directors, agencies, and production companies searching for talent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>✓ Browse talent database</li>
                <li>✓ Advanced search filters</li>
                <li>✓ Rate and save favorites</li>
                <li>✓ Manage casting calls</li>
              </ul>
              <Link to="/login/recruiter" className="block">
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white" size="lg">
                  Continue as Recruiter
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link to="/" className="text-white hover:text-accent transition-colors text-lg">
            ← Back to Home
          </Link>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            Don't have an account? Sign up is free and takes less than 2 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
