import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Menu,
  Settings,
  User,
  LogOut,
  MessageSquare,
  FileText,
  Users,
} from "lucide-react";
import ChatInterface from "./ChatInterface";
import BrokerDashboard from "./BrokerDashboard";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("chat");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-64" : "w-20"} bg-card border-r border-border transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold">MediAI</h1>
          ) : (
            <span className="text-xl font-bold mx-auto">M</span>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-2 px-2">
            <Button
              variant={activeTab === "chat" ? "secondary" : "ghost"}
              className={`w-full justify-start ${!isSidebarOpen && "justify-center"}`}
              onClick={() => setActiveTab("chat")}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              {isSidebarOpen && <span>Chat</span>}
            </Button>
            <Button
              variant={activeTab === "dashboard" ? "secondary" : "ghost"}
              className={`w-full justify-start ${!isSidebarOpen && "justify-center"}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <FileText className="h-5 w-5 mr-2" />
              {isSidebarOpen && <span>Dashboard</span>}
            </Button>
            <Button
              variant={activeTab === "clients" ? "secondary" : "ghost"}
              className={`w-full justify-start ${!isSidebarOpen && "justify-center"}`}
              onClick={() => setActiveTab("clients")}
            >
              <Users className="h-5 w-5 mr-2" />
              {isSidebarOpen && <span>Clients</span>}
            </Button>
          </nav>
        </div>

        <div className="p-4 border-t border-border">
          {isSidebarOpen ? (
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=broker" />
                <AvatarFallback>BR</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">John Broker</p>
                <p className="text-xs text-muted-foreground">Premium</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=broker" />
                <AvatarFallback>BR</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold">
            {activeTab === "chat" && "MediAI Chat Assistant"}
            {activeTab === "dashboard" && "Broker Dashboard"}
            {activeTab === "clients" && "Client Management"}
          </h2>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "chat" && <ChatInterface />}
          {activeTab === "dashboard" && <BrokerDashboard />}
          {activeTab === "clients" && (
            <Card className="w-full h-full bg-background">
              <CardContent className="p-6 flex items-center justify-center h-full">
                <div className="text-center">
                  <User className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-xl font-medium">
                    Client Management
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Manage your client information and history here.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
