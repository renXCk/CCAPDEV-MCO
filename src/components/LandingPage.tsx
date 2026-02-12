import { Navbar } from "./Navbar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router";
import { Users, Briefcase, Search, Star, TrendingUp, Award, CheckCircle, Play } from "lucide-react";

const STUDIO_BG = "https://images.unsplash.com/photo-1668453814676-c8093305fae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzdHVkaW8lMjBwaG90b2dyYXBoeSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcwODI1Nzc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const TALENT_IMG = "https://images.unsplash.com/photo-1752300779727-13d587a42881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0YWxlbnQlMjBwZXJmb3JtZXIlMjBzdGFnZXxlbnwxfHx8fDE3NzA4MzA0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const BUSINESS_IMG = "https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMGhhbmRzaGFrZSUyMG1lZXRpbmd8ZW58MXx8fHwxNzcwODMwNDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${STUDIO_BG})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-accent/70"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <h1 className="text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Join the PGT Roster
          </h1>
          <p className="text-2xl mb-4 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            We are always looking for fresh faces and new talent. Create your profile today and get discovered by our casting team.
          </p>
          <p className="text-lg mb-10 text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            Open for Actors, Models, Hosts, and Extras.
          </p>
          <Link to="/select-role">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-12 py-8 text-xl shadow-2xl hover:scale-105 transition-transform animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              Apply Now / Login
            </Button>
          </Link>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2 text-accent">Open</div>
              <div className="text-xl text-white/80">Roster Status</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-accent">5k+</div>
              <div className="text-xl text-white/80">Talent Profiles</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-accent">Daily</div>
              <div className="text-xl text-white/80">New Castings</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-accent">100%</div>
              <div className="text-xl text-white/80">Free to Join</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Why PGT Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-4">
              How PGT Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've made it simple to get your profile in front of the right people.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-accent transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">1. Create Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sign up in minutes. Upload your headshots, resume, and reel. This serves as your digital set card in our internal database.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">2. We Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our casting directors review new profiles daily. We categorize you based on your look, skills, and experience level.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">3. Get Booked</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  When a client role matches your profile, we contact you directly. No need to endlessly scroll job boards—we bring the work to you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Proposition - Split Design */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* For Talents */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full">
                <span className="text-accent font-semibold">For Talent</span>
              </div>
              <h3 className="text-4xl font-bold text-primary">Your Digital Set Card</h3>
              <p className="text-lg text-muted-foreground">
                Forget printing physical comp cards. Your PGT profile is your professional link to the industry. Keep it updated, and we handle the rest.
              </p>
              <ul className="space-y-4">
                {[
                  "Upload unlimited photos & videos",
                  "List special skills & languages",
                  "Update your availability instantly",
                  "Direct messaging with PGT agents",
                  "View audition invites"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div>
                <img 
                  src={TALENT_IMG} 
                  alt="Talent performing" 
                  className="rounded-lg shadow-2xl w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* For Recruiters */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full">
                <span className="text-secondary font-semibold">For Clients & Brands</span>
              </div>
              <h3 className="text-4xl font-bold text-primary">Need Talent for a Project?</h3>
              <p className="text-lg text-muted-foreground">
                PGT isn't just a database; we are a full-service casting agency. Log in to browse our roster or post a casting call for your next production.
              </p>
              <ul className="space-y-4">
                {[
                  "Browse thousands of vetted profiles",
                  "Filter by height, age, and skill",
                  "Post casting calls to our roster",
                  "Review submissions in one dashboard",
                  "Seamless booking process"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div>
                <img 
                  src={BUSINESS_IMG} 
                  alt="Business meeting" 
                  className="rounded-lg shadow-2xl w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories / Social Proof */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-4">
              Community Feedback
            </h2>
            <p className="text-xl text-muted-foreground">
              What our talent and clients are saying about working with PGT.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">
                  "I signed up on Monday and got a callback for a commercial on Thursday. The process was so much easier than other agencies I've been with."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                    JP
                  </div>
                  <div>
                    <div className="font-semibold">Jessica Park</div>
                    <div className="text-sm text-muted-foreground">PGT Talent (Model)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">
                  "I love that I can update my own photos. My look changes often, and PGT lets me keep my profile current so I don't miss out on roles."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                    MR
                  </div>
                  <div>
                    <div className="font-semibold">Marcus Rodriguez</div>
                    <div className="text-sm text-muted-foreground">PGT Talent (Actor)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">
                  "As a producer, using the PGT portal to browse their roster saves me hours of email chains. It's modern, fast, and professional."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    DK
                  </div>
                  <div>
                    <div className="font-semibold">David King</div>
                    <div className="text-sm text-muted-foreground">Production Manager</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Get Discovered Today
          </h2>
          <p className="text-white/90 mb-12 text-xl max-w-2xl mx-auto">
            Join the PGT casting database. It takes less than 5 minutes to create your profile and start your journey.
          </p>
          <Link to="/select-role">
            <Button size="lg" className="bg-white hover:bg-white/90 text-primary px-12 py-8 text-xl shadow-2xl hover:scale-105 transition-transform">
              Join PGT Roster / Login
            </Button>
          </Link>
          <p className="text-white/70 mt-6">Already a member? Use the button above to login.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">PGT Agency</h3>
              <p className="text-white/80">
                Connecting exceptional talent with world-class opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Talent</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-accent transition-colors">Join Roster</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Member Login</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Clients</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-accent transition-colors">Book Talent</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Post Casting Call</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Client Login</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact Agents</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-accent transition-colors">Manila Office</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">help@pgt.agency</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              &copy; 2026 PGT Agency. All rights reserved.
            </p>
            <Link to="/login/admin" className="text-white/40 hover:text-white/60 text-xs transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}