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
            Get Discovered
          </h1>
          <p className="text-2xl mb-4 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            The premier platform connecting talented performers with industry-leading agencies and production companies.
          </p>
          <p className="text-lg mb-10 text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            Streamline your casting process. Showcase your talent. Build your career.
          </p>
          <Link to="/select-role">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-12 py-8 text-xl shadow-2xl hover:scale-105 transition-transform animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              Get Started
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
              <div className="text-5xl font-bold mb-2 text-accent">10K+</div>
              <div className="text-xl text-white/80">Auditions Booked</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-accent">5,000+</div>
              <div className="text-xl text-white/80">Active Talents</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-accent">500+</div>
              <div className="text-xl text-white/80">Agency Partners</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-accent">98%</div>
              <div className="text-xl text-white/80">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Why PGT Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-primary mb-4">
              Why Agencies Choose PGT Digital
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The most comprehensive talent management platform built for the entertainment industry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-accent transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Smart Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced search and filtering tools help you find the perfect talent for any role. Filter by skills, experience, physical attributes, and availability.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Private Rating System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Keep internal notes and ratings on every talent. Build your shortlists and manage callbacks with our intuitive rating and tagging system.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-xl">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Streamlined Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manage entire casting processes from discovery to booking. Track auditions, share feedback with your team, and reduce administrative overhead.
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
                <span className="text-accent font-semibold">For Talents</span>
              </div>
              <h3 className="text-4xl font-bold text-primary">Your Digital Portfolio, Perfected</h3>
              <p className="text-lg text-muted-foreground">
                Create a stunning digital set card that showcases everything casting directors need to see. From headshots to full performance reels, keep everything in one professional space.
              </p>
              <ul className="space-y-4">
                {[
                  "Unlimited photo and video uploads",
                  "Comprehensive digital set cards",
                  "Track your audition history",
                  "Get discovered by top agencies",
                  "Professional presentation tools"
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
                <span className="text-secondary font-semibold">For Recruiters & Agencies</span>
              </div>
              <h3 className="text-4xl font-bold text-primary">Cast Smarter, Not Harder</h3>
              <p className="text-lg text-muted-foreground">
                Access thousands of pre-vetted performers with comprehensive profiles. Save time, reduce costs, and find your next star faster than ever.
              </p>
              <ul className="space-y-4">
                {[
                  "Browse extensive talent database",
                  "Advanced search and filtering",
                  "Private notes and star ratings",
                  "Team collaboration tools",
                  "Streamlined callback management"
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
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our community has to say
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
                  "PGT Digital transformed our casting process. We filled 15 roles in half the time it usually takes. The rating system is a game-changer."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                    SC
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">Casting Director, Broadway Productions</div>
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
                  "As a performer, having everything in one place is incredible. I've booked 3 major auditions since joining. My profile gets me noticed!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                    MR
                  </div>
                  <div>
                    <div className="font-semibold">Marcus Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Professional Dancer</div>
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
                  "Our agency saves 20+ hours per week on talent management. The platform pays for itself. Highly recommend to any serious recruiter."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    JL
                  </div>
                  <div>
                    <div className="font-semibold">Jennifer Lopez</div>
                    <div className="text-sm text-muted-foreground">Talent Agency Director</div>
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
            Ready to Transform Your Career?
          </h2>
          <p className="text-white/90 mb-12 text-xl max-w-2xl mx-auto">
            Join thousands of talents and recruiters already using PGT Digital to discover, connect, and succeed.
          </p>
          <Link to="/select-role">
            <Button size="lg" className="bg-white hover:bg-white/90 text-primary px-12 py-8 text-xl shadow-2xl hover:scale-105 transition-transform">
              Get Started Today
            </Button>
          </Link>
          <p className="text-white/70 mt-6">No credit card required • Free to get started</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">PGT Digital</h3>
              <p className="text-white/80">
                The premier talent management platform for the entertainment industry.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Talents</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-accent transition-colors">Create Profile</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Resources</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Agencies</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-accent transition-colors">Browse Talent</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              &copy; 2026 PGT Digital. All rights reserved.
            </p>
            <Link to="/login/admin" className="text-white/40 hover:text-white/60 text-xs transition-colors">
              System Administration
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
