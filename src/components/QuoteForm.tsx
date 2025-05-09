import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface QuoteFormProps {
  onSubmit: (formData: QuoteFormData) => void;
  onCancel: () => void;
}

export interface QuoteFormData {
  clientName: string;
  clientAge: number;
  residency: string;
  coverageType: "individual" | "family" | "company";
  familyMembers?: number;
  employeeCount?: number;
  coverageOptions: string[];
  additionalNotes: string;
}

const QuoteForm: React.FC<QuoteFormProps> = ({
  onSubmit,
  onCancel = () => {},
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    clientName: "",
    clientAge: 30,
    residency: "USA",
    coverageType: "individual",
    familyMembers: 0,
    employeeCount: 0,
    coverageOptions: ["basic"],
    additionalNotes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverageTypeChange = (
    value: "individual" | "family" | "company",
  ) => {
    setFormData((prev) => ({
      ...prev,
      coverageType: value,
      // Reset related fields when changing coverage type
      familyMembers: value === "family" ? prev.familyMembers : 0,
      employeeCount: value === "company" ? prev.employeeCount : 0,
    }));
  };

  const handleCoverageOptionChange = (option: string) => {
    setFormData((prev) => {
      const currentOptions = prev.coverageOptions || [];
      if (currentOptions.includes(option)) {
        return {
          ...prev,
          coverageOptions: currentOptions.filter((item) => item !== option),
        };
      } else {
        return { ...prev, coverageOptions: [...currentOptions, option] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white border-gray-200">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Client Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder="Enter client name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientAge">Client Age</Label>
                <Input
                  id="clientAge"
                  name="clientAge"
                  type="number"
                  min="0"
                  max="120"
                  value={formData.clientAge}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="residency">Country of Residency</Label>
              <Select
                value={formData.residency}
                onValueChange={(value) =>
                  handleSelectChange("residency", value)
                }
              >
                <SelectTrigger id="residency">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USA">United States</SelectItem>
                  <SelectItem value="CAN">Canada</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="AUS">Australia</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Coverage Type</h3>

            <RadioGroup
              value={formData.coverageType}
              onValueChange={(value: "individual" | "family" | "company") =>
                handleCoverageTypeChange(value)
              }
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual">Individual</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="family" id="family" />
                <Label htmlFor="family">Family</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company">Company</Label>
              </div>
            </RadioGroup>

            {formData.coverageType === "family" && (
              <div className="space-y-2 pl-6">
                <Label htmlFor="familyMembers">Number of Family Members</Label>
                <Input
                  id="familyMembers"
                  name="familyMembers"
                  type="number"
                  min="1"
                  value={formData.familyMembers}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            {formData.coverageType === "company" && (
              <div className="space-y-2 pl-6">
                <Label htmlFor="employeeCount">Number of Employees</Label>
                <Input
                  id="employeeCount"
                  name="employeeCount"
                  type="number"
                  min="1"
                  value={formData.employeeCount}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Coverage Options</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="basic"
                  checked={formData.coverageOptions.includes("basic")}
                  onChange={() => handleCoverageOptionChange("basic")}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="basic">Basic Coverage</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="premium"
                  checked={formData.coverageOptions.includes("premium")}
                  onChange={() => handleCoverageOptionChange("premium")}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="premium">Premium Coverage</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="dental"
                  checked={formData.coverageOptions.includes("dental")}
                  onChange={() => handleCoverageOptionChange("dental")}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="dental">Dental Coverage</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="vision"
                  checked={formData.coverageOptions.includes("vision")}
                  onChange={() => handleCoverageOptionChange("vision")}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="vision">Vision Coverage</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  additionalNotes: e.target.value,
                }))
              }
              placeholder="Any specific requirements or conditions..."
              className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Generate Quote</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteForm;
