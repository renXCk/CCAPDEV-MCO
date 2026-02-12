import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LogOut, UserPlus, Trash2, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// Mock data
const mockUsers = [
  { id: 1, name: "Emma Johnson", email: "emma@example.com", role: "Talent", status: "Active", joinedDate: "2026-01-15" },
  { id: 2, name: "Marcus Williams", email: "marcus@example.com", role: "Talent", status: "Active", joinedDate: "2026-01-20" },
  { id: 3, name: "Sofia Martinez", email: "sofia@example.com", role: "Talent", status: "Active", joinedDate: "2026-02-01" },
  { id: 4, name: "Sarah Thompson", email: "sarah@example.com", role: "Recruiter", status: "Active", joinedDate: "2026-01-10" },
  { id: 5, name: "Michael Davis", email: "michael@example.com", role: "Recruiter", status: "Active", joinedDate: "2026-01-18" },
  { id: 6, name: "James Chen", email: "james@example.com", role: "Talent", status: "Inactive", joinedDate: "2025-12-05" },
];

const mockLogs = [
  { id: 1, action: "User Login", user: "emma@example.com", timestamp: "2026-02-11 09:30:15", details: "Successful login from 192.168.1.1" },
  { id: 2, action: "User Created", user: "admin@pgt.com", timestamp: "2026-02-11 08:15:42", details: "New talent account created: sofia@example.com" },
  { id: 3, action: "Profile Update", user: "marcus@example.com", timestamp: "2026-02-10 16:45:23", details: "Updated vitals information" },
  { id: 4, action: "Talent Rated", user: "sarah@example.com", timestamp: "2026-02-10 14:20:10", details: "Rated Emma Johnson: 5 stars" },
  { id: 5, action: "User Login", user: "michael@example.com", timestamp: "2026-02-10 13:05:33", details: "Successful login from 10.0.0.5" },
];

export function AdminDashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Recruiter",
  });

  const handleCreateUser = () => {
    // In real app, this would save to database
    console.log("Creating user:", newUser);
    setIsCreateModalOpen(false);
    setNewUser({ name: "", email: "", role: "Recruiter" });
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      console.log("Deleting user:", userId);
      // In real app, this would delete from database
    }
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
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-8">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">User Management</CardTitle>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-accent hover:bg-accent/90"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create New Recruiter
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Filter Badges */}
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                      All Users ({mockUsers.length})
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                      Talents ({mockUsers.filter(u => u.role === "Talent").length})
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                      Recruiters ({mockUsers.filter(u => u.role === "Recruiter").length})
                    </Badge>
                  </div>

                  {/* Users Table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant={user.role === "Talent" ? "default" : "secondary"}
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={user.status === "Active" ? "default" : "outline"}
                              className={user.status === "Active" ? "bg-accent" : ""}
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.joinedDate}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Logs Tab */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  System Activity Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <Badge variant="outline">{log.action}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {log.timestamp}
                        </TableCell>
                        <TableCell className="text-sm">{log.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Create New Recruiter Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Recruiter Account</DialogTitle>
            <DialogDescription>
              Add a new recruiter to the PGT Digital platform
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Account Type</Label>
              <Select
                value={newUser.role}
                onValueChange={(value) => setNewUser({ ...newUser, role: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recruiter">Recruiter</SelectItem>
                  <SelectItem value="Talent">Talent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateUser}
                className="bg-accent hover:bg-accent/90"
                disabled={!newUser.name || !newUser.email}
              >
                Create Account
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
