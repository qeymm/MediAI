import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Share2, Edit, Save } from "lucide-react";

interface CoverageOption {
  name: string;
  description: string;
  included: boolean;
}

interface QuoteDisplayProps {
  quoteId?: string;
  clientName?: string;
  clientAge?: number;
  residency?: string;
  coverageType?: "Individual" | "Family" | "Company";
  premium?: number;
  currency?: string;
  coveragePeriod?: string;
  coverageOptions?: CoverageOption[];
  effectiveDate?: string;
  expiryDate?: string;
  onSave?: () => void;
  onEdit?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
}

const QuoteDisplay = ({
  quoteId = "QT-2023-0001",
  clientName = "John Doe",
  clientAge = 35,
  residency = "United States",
  coverageType = "Individual",
  premium = 1250.0,
  currency = "USD",
  coveragePeriod = "Annual",
  coverageOptions = [
    {
      name: "Hospitalization",
      description: "Full coverage for hospital stays",
      included: true,
    },
    {
      name: "Outpatient Care",
      description: "Coverage for doctor visits and outpatient procedures",
      included: true,
    },
    {
      name: "Prescription Drugs",
      description: "Coverage for prescribed medications",
      included: true,
    },
    { name: "Dental", description: "Basic dental coverage", included: false },
    {
      name: "Vision",
      description: "Eye exams and glasses allowance",
      included: false,
    },
  ],
  effectiveDate = "2023-06-01",
  expiryDate = "2024-05-31",
  onSave = () => {},
  onEdit = () => {},
  onShare = () => {},
  onDownload = () => {},
}: QuoteDisplayProps) => {
  return (
    <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg">
      <Card>
        <CardHeader className="bg-primary/5">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold">
                Insurance Quote
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Quote ID: {quoteId}
              </p>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {coverageType}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Client Information */}
            <div>
              <h3 className="text-md font-semibold mb-2">Client Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{clientName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Age</p>
                  <p className="font-medium">{clientAge} years</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Residency</p>
                  <p className="font-medium">{residency}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Coverage Type</p>
                  <p className="font-medium">{coverageType}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Premium Information */}
            <div>
              <h3 className="text-md font-semibold mb-2">Premium Details</h3>
              <div className="bg-primary/5 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Premium Amount
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {currency} {premium.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {coveragePeriod} payment
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-sm">
                      Coverage Period
                    </p>
                    <p className="text-sm font-medium">
                      {effectiveDate} to {expiryDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Options */}
            <div>
              <h3 className="text-md font-semibold mb-2">Coverage Details</h3>
              <div className="space-y-2">
                {coverageOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-2 rounded-md hover:bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{option.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                    <Badge
                      variant={option.included ? "default" : "outline"}
                      className={
                        option.included
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "text-muted-foreground"
                      }
                    >
                      {option.included ? "Included" : "Not Included"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="h-4 w-4 mr-1" /> Download
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
            <Button variant="default" size="sm" onClick={onSave}>
              <Save className="h-4 w-4 mr-1" /> Save Quote
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuoteDisplay;
