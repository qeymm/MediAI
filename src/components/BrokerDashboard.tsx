import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Download,
  Edit,
  Trash2,
  User,
  MessageSquare,
  BarChart3,
} from "lucide-react";

interface Quote {
  id: string;
  clientName: string;
  date: string;
  insuranceType: string;
  premium: string;
  status: "pending" | "accepted" | "rejected";
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastContact: string;
  policies: number;
}

interface Conversation {
  id: string;
  clientName: string;
  date: string;
  messages: number;
  hasQuote: boolean;
}

const BrokerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for quotes
  const quotes: Quote[] = [
    {
      id: "1",
      clientName: "John Smith",
      date: "2023-06-15",
      insuranceType: "Health",
      premium: "$450/month",
      status: "accepted",
    },
    {
      id: "2",
      clientName: "Sarah Johnson",
      date: "2023-06-12",
      insuranceType: "Life",
      premium: "$120/month",
      status: "pending",
    },
    {
      id: "3",
      clientName: "Michael Brown",
      date: "2023-06-10",
      insuranceType: "Family Health",
      premium: "$780/month",
      status: "accepted",
    },
    {
      id: "4",
      clientName: "Emily Davis",
      date: "2023-06-08",
      insuranceType: "Corporate",
      premium: "$2,500/month",
      status: "rejected",
    },
    {
      id: "5",
      clientName: "Robert Wilson",
      date: "2023-06-05",
      insuranceType: "Health",
      premium: "$350/month",
      status: "pending",
    },
  ];

  // Mock data for clients
  const clients: Client[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      lastContact: "2023-06-15",
      policies: 2,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 234-5678",
      lastContact: "2023-06-12",
      policies: 1,
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "mbrown@example.com",
      phone: "(555) 345-6789",
      lastContact: "2023-06-10",
      policies: 3,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "(555) 456-7890",
      lastContact: "2023-06-08",
      policies: 0,
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "rwilson@example.com",
      phone: "(555) 567-8901",
      lastContact: "2023-06-05",
      policies: 1,
    },
  ];

  // Mock data for conversations
  const conversations: Conversation[] = [
    {
      id: "1",
      clientName: "John Smith",
      date: "2023-06-15",
      messages: 12,
      hasQuote: true,
    },
    {
      id: "2",
      clientName: "Sarah Johnson",
      date: "2023-06-12",
      messages: 8,
      hasQuote: true,
    },
    {
      id: "3",
      clientName: "Michael Brown",
      date: "2023-06-10",
      messages: 15,
      hasQuote: true,
    },
    {
      id: "4",
      clientName: "Emily Davis",
      date: "2023-06-08",
      messages: 5,
      hasQuote: false,
    },
    {
      id: "5",
      clientName: "Robert Wilson",
      date: "2023-06-05",
      messages: 10,
      hasQuote: true,
    },
  ];

  // Stats for the dashboard
  const stats = [
    {
      title: "Total Quotes",
      value: "42",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      title: "Active Clients",
      value: "28",
      icon: <User className="h-4 w-4" />,
    },
    {
      title: "Conversations",
      value: "156",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      title: "Acceptance Rate",
      value: "68%",
      icon: <BarChart3 className="h-4 w-4" />,
    },
  ];

  const getStatusColor = (status: Quote["status"]) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Broker Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline">Export Data</Button>
          <Button>New Quote</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">{stat.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="quotes" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="quotes">Saved Quotes</TabsTrigger>
          <TabsTrigger value="clients">Client Information</TabsTrigger>
          <TabsTrigger value="history">Conversation History</TabsTrigger>
        </TabsList>

        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TabsContent value="quotes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Quotes</CardTitle>
              <CardDescription>
                Manage your generated insurance quotes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Insurance Type</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">
                        {quote.clientName}
                      </TableCell>
                      <TableCell>{quote.date}</TableCell>
                      <TableCell>{quote.insuranceType}</TableCell>
                      <TableCell>{quote.premium}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(quote.status)}>
                          {quote.status.charAt(0).toUpperCase() +
                            quote.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
              <CardDescription>
                View and manage your client details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Policies</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">
                        {client.name}
                      </TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{client.lastContact}</TableCell>
                      <TableCell>{client.policies}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversation History</CardTitle>
              <CardDescription>
                Review past conversations with clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Quote Generated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conversations.map((conversation) => (
                    <TableRow key={conversation.id}>
                      <TableCell className="font-medium">
                        {conversation.clientName}
                      </TableCell>
                      <TableCell>{conversation.date}</TableCell>
                      <TableCell>{conversation.messages}</TableCell>
                      <TableCell>
                        {conversation.hasQuote ? (
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800"
                          >
                            Yes
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-gray-100 text-gray-800"
                          >
                            No
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          {conversation.hasQuote && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrokerDashboard;
