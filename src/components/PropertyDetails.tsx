"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  Building,
  IndianRupee,
  Send,
  Ruler,
  Calendar,
  CheckCircle2,
  RefreshCw,
  History,
  User,
  X,
  ExternalLink,
  BookOpen,
  Lock,
  FileCheck,
  Clock,
  FileSignature,
  Handshake,
  CreditCard,
  UserCheck,
  AlertCircle,
  Info,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import ChatBot from "~/components/chatbot/chatBot";
import { Separator } from "~/components/ui/separator";
import { Timeline, TimelineItem } from "~/components/ui/timeline";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "~/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MapTemp } from "~/lib/map";

const propertyDetails = {
  id: "PRJ-2024-001",
  title: "Luxury Apartment in Shastri Nagar",
  address: "123, Shastri Nagar, Mumbai, Maharashtra 400001",
  type: "Residential",
  subType: "flat",
  area: "1200",
  unitOfMeasurement: "sqft",
  price: "₹1,25,00,000",
  description:
    "Modern apartment with premium amenities including 24/7 security, swimming pool, gym, and children's play area. The apartment features 3 bedrooms, 2 bathrooms, a spacious living room, modern kitchen, and a balcony with city views.",
  photos: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1720481811085-711f224178ee?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Front View",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1617228133035-2347f159e755?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Living Room",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1669103148197-539672dbdeff?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Kitchen",
    },
  ],
  documents: [
    {
      id: 1,
      name: "Property Tax Receipt",
      date: "2024-03-10",
      status: "VERIFIED",
      size: "2.5 MB",
      type: "pdf",
      url: "https://example.com/documents/tax_receipt.pdf",
      preview:
        "https://images.unsplash.com/photo-1568057373484-69bbc440c02e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdW1lbnRzJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      name: "Sale Agreement",
      date: "2024-03-08",
      status: "VERIFIED",
      size: "1.8 MB",
      type: "pdf",
      url: "https://example.com/documents/sale_agreement.pdf",
      preview:
        "https://images.unsplash.com/photo-1568057373189-8bf0cf6179e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGRvY3VtZW50cyUyMGltYWdlfGVufDB8fDB8fHww",
    },
    {
      id: 3,
      name: "Floor Plan",
      date: "2024-03-03",
      status: "VERIFIED",
      size: "3.1 MB",
      type: "image",
      url: "https://example.com/documents/floor_plan.jpg",
      preview:
        "https://images.unsplash.com/photo-1721244653580-79577d2822a2?q=80&w=1796&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  coordinates: {
    latitude: 19.076,
    longitude: 72.8777,
  },
  messages: [
    {
      id: 1,
      sender: "BUYER",
      text: "Is this property still available?",
      timestamp: "2024-05-15T10:30:00Z",
    },
    {
      id: 2,
      sender: "SELLER",
      text: "Yes, it is available. Would you like to schedule a viewing?",
      timestamp: "2024-05-15T11:15:00Z",
    },
    {
      id: 3,
      sender: "BUYER",
      text: "Yes, I would. Are you available this weekend?",
      timestamp: "2024-05-15T11:30:00Z",
    },
  ],
  sellerInfo: {
    name: "Rajesh Sharma",
    contactNumber: "+91-9876543210",
    email: "rajesh.s@example.com",
    verificationStatus: "VERIFIED",
    previousListings: 3,
    memberSince: "2022-01-15",
    ratings: 4.8,
    reviewCount: 12,
  },
  propertyHistory: {
    previousOwners: 2,
    lastSoldDate: "2021-05-10",
    lastSoldPrice: "₹95,00,000",
    constructionYear: 2015,
    renovationYear: 2019,
    propertyTaxHistory: "Regular payments, no outstanding dues",
    disputeHistory: "No legal disputes on record",
    timeline: [
      {
        date: "2015-06",
        event: "Property constructed",
        details: "Original construction completed",
      },
      {
        date: "2019-03",
        event: "Major renovation",
        details: "Kitchen and bathrooms renovated",
      },
      {
        date: "2021-05",
        event: "Ownership transferred",
        details: "Purchased by current owner",
      },
      {
        date: "2024-03",
        event: "Listed for sale",
        details: "Current listing",
      },
    ],
  },
  legalDetails: {
    naOrder: "NA permission approved on 12-Mar-2014",
    occupancyCertificate:
      "Issued by Mumbai Municipal Corporation on 10-Jun-2015",
    reraRegistration: "MAHARERA123456789",
    encumbranceCertificate: "Clear for period 2010-2024",
    titleDeed: "Registered at Mumbai Sub-Registrar Office",
    propertyTaxStatus: "Paid up to date",
  },
  amenities: [
    "24/7 Security",
    "Swimming Pool",
    "Gym",
    "Children's Play Area",
    "Visitor Parking",
    "Power Backup",
    "Rainwater Harvesting",
  ],
  sellerAccepted: false,
  agreementStatus: "PENDING",
  agreementInfo: {
    deedId: "DEED-2024-05-12345",
    generatedDate: "2024-05-16T10:30:00Z",
    registrationDate: null,
    registrationVenue: null,
    tokenAmount: "₹5,00,000",
    paymentStatus: "PENDING",
  },
};

const ScheduleFormSchema = z.object({
  date: z.date({
    required_error: "Please select a date for the appointment.",
  }),
  time: z.string({
    required_error: "Please select a time slot.",
  }),
  location: z.string({
    required_error: "Please select a registration office.",
  }),
});

export default function PropertyDetails({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("details");
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isGeneratingDeed, setIsGeneratingDeed] = React.useState(false);
  const [hasApprovedDeed, setHasApprovedDeed] = React.useState(false);
  const [demoAgreementStatus, setDemoAgreementStatus] = React.useState(
    propertyDetails.agreementStatus,
  );
  const [demoSellerAccepted, setDemoSellerAccepted] = React.useState(false);
  const [demoPaymentStatus, setDemoPaymentStatus] = React.useState(
    propertyDetails.agreementInfo.paymentStatus,
  );
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [showSchedulingModal, setShowSchedulingModal] = React.useState(false);
  const [scheduledDate, setScheduledDate] = React.useState("");
  const [scheduledTime, setScheduledTime] = React.useState("");
  const [isScheduled, setIsScheduled] = React.useState(false);
  const [showDemoControls, setShowDemoControls] = React.useState(true);
  const [messageText, setMessageText] = React.useState("");

  const scheduleForm = useForm<z.infer<typeof ScheduleFormSchema>>({
    resolver: zodResolver(ScheduleFormSchema),
    defaultValues: {
      location: "central",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: "11:00 AM",
    },
  });

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === propertyDetails.photos.length - 1 ? 0 : prev + 1,
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? propertyDetails.photos.length - 1 : prev - 1,
    );
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    console.log(`Sending message: ${messageText}`);
    setMessageText("");
  };

  const generateSalesDeed = () => {
    setIsGeneratingDeed(true);
    setTimeout(() => {
      setIsGeneratingDeed(false);
      setDemoAgreementStatus("GENERATED");
      toast.success("Sales Deed Generated");
    }, 2000);
  };

  const approveDeed = () => {
    setHasApprovedDeed(true);
    setDemoAgreementStatus("BUYER_APPROVED");
    toast("Deed Approved");
  };

  const makePayment = () => {
    setShowPaymentModal(true);
  };

  const completeDemoPayment = () => {
    setShowPaymentModal(false);
    setDemoPaymentStatus("COMPLETED");
    setDemoAgreementStatus("COMPLETED");
    propertyDetails.agreementInfo.registrationDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    ).toISOString() as any;
    propertyDetails.agreementInfo.registrationVenue =
      "Sub-Registrar Office, Mumbai Central" as any;
    toast.success("Payment Successful");
  };

  const handleScheduleAppointment = (
    data: z.infer<typeof ScheduleFormSchema>,
  ) => {
    setIsScheduled(true);
    setShowSchedulingModal(false);
    toast.success("Appointment scheduled successfully!");
  };

  const propertyValue = parseInt(propertyDetails.price.replace(/[₹,]/g, ""));
  const stampDutyPercentage = 5;
  const registrationFee = Math.min(propertyValue * 0.01, 30000);

  const stampDutyAmount = propertyValue * (stampDutyPercentage / 100);
  const formattedStampDuty = `₹${stampDutyAmount.toLocaleString()}`;
  const formattedRegistrationFee = `₹${registrationFee.toLocaleString()}`;
  const totalFees = stampDutyAmount + registrationFee;
  const formattedTotalFees = `₹${totalFees.toLocaleString()}`;

  const renderAgreementContent = () => {
    if (demoAgreementStatus === "PENDING" && !demoSellerAccepted) {
      return (
        <div className="space-y-4 text-center">
          <div className="text-muted-foreground bg-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full p-4">
            <Clock className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold">Waiting for seller response</h3>
          <p className="text-muted-foreground">
            The seller hasn&apos;t accepted your interest yet. You&apos;ll be
            notified when they do.
          </p>

          <Button variant="outline" className="mt-4">
            Contact Seller
          </Button>

          {showDemoControls && (
            <div className="mt-6 border-t pt-4">
              <p className="text-muted-foreground mb-2 text-xs">
                Demo Controls (Only for Testing)
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setDemoSellerAccepted(true);
                  toast.success("Seller Accepted");
                }}
                className="gap-1"
              >
                <UserCheck className="h-4 w-4" />
                Simulate Seller Acceptance
              </Button>
            </div>
          )}
        </div>
      );
    }

    if (demoAgreementStatus === "PENDING" && demoSellerAccepted) {
      return (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 p-4 text-green-500">
            <Handshake className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold">
            Seller has accepted your interest!
          </h3>
          <p className="text-muted-foreground mb-6">
            You can now generate the sales deed to proceed with the purchase.
          </p>
          <Button
            onClick={generateSalesDeed}
            disabled={isGeneratingDeed}
            className="gap-2"
          >
            {isGeneratingDeed ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Generating Sales Deed...
              </>
            ) : (
              <>
                <FileSignature className="h-4 w-4" />
                Generate Sales Deed
              </>
            )}
          </Button>
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col space-y-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              variant={
                demoAgreementStatus === "COMPLETED" ? "default" : "secondary"
              }
              className="px-2 py-1.5"
            >
              {demoAgreementStatus === "GENERATED" && "Waiting for Approval"}
              {demoAgreementStatus === "BUYER_APPROVED" && "You Approved"}
              {demoAgreementStatus === "SELLER_APPROVED" && "Seller Approved"}
              {demoAgreementStatus === "COMPLETED" && "Agreement Completed"}
            </Badge>
            <p className="text-muted-foreground text-sm">
              Deed ID: {propertyDetails.agreementInfo.deedId}
            </p>
          </div>
          <Button size="sm" variant="outline" className="gap-1">
            <FileText className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <Card className="mb-6 flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileSignature className="h-5 w-5" />
              Sales Deed
            </CardTitle>
            <CardDescription>
              Generated on{" "}
              {new Date(
                propertyDetails.agreementInfo.generatedDate,
              ).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-56 rounded-md border p-4 md:h-64">
              <div className="space-y-4 text-sm">
                <h3 className="text-center text-lg font-bold">SALE DEED</h3>

                <p>
                  THIS DEED OF SALE is made and executed on this{" "}
                  {new Date().toLocaleDateString()} between:
                </p>

                <p className="font-medium">
                  {propertyDetails.sellerInfo.name}, residing at [Seller
                  Address], hereinafter called the &quot;SELLER&quot; of the ONE
                  PART,
                </p>

                <p>AND</p>

                <p className="font-medium">
                  [Buyer Name], residing at [Buyer Address], hereinafter called
                  the &quot;BUYER&quot; of the OTHER PART.
                </p>

                <p className="font-medium">WHEREAS:</p>

                <p>
                  The SELLER is the absolute and rightful owner of property
                  located at {propertyDetails.address} measuring{" "}
                  {propertyDetails.area} {propertyDetails.unitOfMeasurement},
                  hereinafter referred to as the &quot;PROPERTY&quot;.
                </p>

                <p>
                  The SELLER has agreed to sell and the BUYER has agreed to buy
                  the PROPERTY for a total consideration of{" "}
                  {propertyDetails.price}, and on the terms and conditions
                  hereinafter mentioned.
                </p>

                <p className="font-medium">
                  NOW THIS DEED WITNESSES AS FOLLOWS:
                </p>

                <ol className="list-decimal space-y-2 pl-5">
                  <li>
                    The SELLER hereby sells, transfers, and conveys unto the
                    BUYER the PROPERTY together with all rights, interests,
                    privileges, and appurtenances thereto.
                  </li>

                  <li>
                    The BUYER shall pay to the SELLER the total sum of{" "}
                    {propertyDetails.price} as consideration for the PROPERTY,
                    of which {propertyDetails.agreementInfo.tokenAmount} has
                    been paid as token amount, and the remaining amount shall be
                    paid at the time of registration.
                  </li>

                  <li>
                    The SELLER warrants that the PROPERTY is free from all
                    encumbrances, charges, liens, attachments, or any other
                    claims by third parties.
                  </li>

                  <li>
                    The SELLER has delivered to the BUYER all original documents
                    of title relating to the PROPERTY, which have been verified
                    and found in order.
                  </li>

                  <li>
                    The parties agree to appear before the Sub-Registrar for the
                    registration of this deed on the date and time mutually
                    agreed upon.
                  </li>

                  <li>
                    The BUYER shall pay the applicable stamp duty amount of{" "}
                    {formattedStampDuty} and registration fees of{" "}
                    {formattedRegistrationFee} as per the Government of
                    Maharashtra regulations.
                  </li>
                </ol>

                <p className="font-medium">
                  IN WITNESS WHEREOF, the parties hereto have set their hands on
                  the day, month, and year first above written.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="font-medium">SELLER</p>
                    <p className="mt-6">{propertyDetails.sellerInfo.name}</p>
                  </div>

                  <div className="text-center">
                    <p className="font-medium">BUYER</p>
                    <p className="mt-6">[Buyer Name]</p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="font-medium">WITNESSES</p>
                  <ol className="mt-2 list-decimal pl-5">
                    <li>Witness 1: _________________</li>
                    <li>Witness 2: _________________</li>
                  </ol>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {!hasApprovedDeed && demoAgreementStatus === "GENERATED" && (
          <div className="flex justify-center py-4">
            <Button onClick={approveDeed} className="gap-1">
              <CheckCircle2 className="h-4 w-4" />
              Approve Deed
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Registration Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {demoAgreementStatus === "COMPLETED" ? (
                  <div className="flex flex-col items-center justify-center py-3">
                    <Button
                      onClick={() => setShowSchedulingModal(true)}
                      className="mb-2 gap-1"
                    >
                      <Calendar className="h-4 w-4" />
                      Schedule Appointment
                    </Button>
                    <p className="text-muted-foreground text-center text-xs">
                      Schedule an appointment with the Sub-Registrar
                    </p>
                  </div>
                ) : (
                  <div className="py-2 text-center">
                    <p className="text-muted-foreground text-sm">
                      Registration details will be available after payment
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">eStamp Duty & Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Stamp Duty (5%)
                    </p>
                    <p className="font-medium">{formattedStampDuty}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Registration Fee
                    </p>
                    <p className="font-medium">{formattedRegistrationFee}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Total Amount
                    </p>
                    <p className="font-medium">{formattedTotalFees}</p>
                  </div>
                  {demoPaymentStatus === "PENDING" ? (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs">Pending Payment</span>
                    </div>
                  ) : (
                    <Badge variant="default">Paid</Badge>
                  )}
                </div>
              </div>
            </CardContent>
            {demoPaymentStatus === "PENDING" && (
              <CardFooter>
                <Button
                  onClick={makePayment}
                  disabled={
                    !hasApprovedDeed ||
                    demoAgreementStatus !== "SELLER_APPROVED"
                  }
                  className="gap-1"
                >
                  <CreditCard className="h-4 w-4" />
                  Pay Stamp Duty & Fees
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>

        <div className="flex items-center justify-between py-6">
          {/* <Button
            onClick={approveDeed}
            disabled={hasApprovedDeed || demoAgreementStatus !== "GENERATED"}
            className="gap-1"
          >
            <CheckCircle2 className="h-4 w-4" />
            Approve Deed
          </Button> */}
        </div>

        {isScheduled && (
          <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-4">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-700">
              Agreement complete, appointment scheduled
            </span>
          </div>
        )}

        {showDemoControls && (
          <div className="mt-6 border-t pt-4">
            <p className="text-muted-foreground mb-2 text-xs">
              Demo Controls (Only for Testing)
            </p>
            <div className="flex flex-wrap gap-2">
              {demoAgreementStatus === "PENDING" && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={generateSalesDeed}
                  disabled={isGeneratingDeed}
                  className="gap-1"
                >
                  <FileSignature className="h-4 w-4" />
                  {isGeneratingDeed ? "Generating..." : "Generate Sales Deed"}
                </Button>
              )}

              {demoAgreementStatus === "GENERATED" && !hasApprovedDeed && (
                <Button
                  onClick={approveDeed}
                  variant="destructive"
                  size="sm"
                  className="gap-1"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Buyer Approve Deed
                </Button>
              )}

              {hasApprovedDeed && demoAgreementStatus === "BUYER_APPROVED" && (
                <Button
                  onClick={() => {
                    setDemoAgreementStatus("SELLER_APPROVED");
                    toast.success("Seller has approved the deed");
                  }}
                  variant="destructive"
                  size="sm"
                  className="gap-1"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Simulate Seller Approval
                </Button>
              )}

              {demoAgreementStatus === "SELLER_APPROVED" && (
                <Button
                  onClick={makePayment}
                  variant="destructive"
                  size="sm"
                  className="gap-1"
                >
                  <CreditCard className="h-4 w-4" />
                  Make Payment
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPaymentModal = () => {
    return (
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pay Stamp Duty & Registration Fees</DialogTitle>
            <DialogDescription>
              As per Indian regulations, the buyer is responsible for paying
              stamp duty and registration fees
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 p-4">
            <div className="rounded-md border p-4">
              <h3 className="mb-2 font-medium">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Stamp Duty (5% of property value)</span>
                  <span className="font-medium">{formattedStampDuty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Registration Fee (1%, capped at ₹30,000)</span>
                  <span className="font-medium">
                    {formattedRegistrationFee}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total Amount</span>
                  <span>{formattedTotalFees}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select defaultValue="upi">
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="netbanking">Net Banking</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
              <div className="flex gap-2">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Important Information
                  </p>
                  <p className="mt-1 text-xs text-amber-700">
                    After payment, you will need to schedule an appointment at
                    the Sub-Registrar office for the property registration. Both
                    buyer and seller must be present during the appointment with
                    all original documents.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={completeDemoPayment}>
                Pay {formattedTotalFees}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderSchedulingModal = () => {
    return (
      <Dialog open={showSchedulingModal} onOpenChange={setShowSchedulingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Registration Appointment</DialogTitle>
            <DialogDescription>
              Select a date and time for registration at the Sub-Registrar
              office
            </DialogDescription>
          </DialogHeader>

          <Form {...scheduleForm}>
            <form
              onSubmit={scheduleForm.handleSubmit(handleScheduleAppointment)}
              className="space-y-4 py-4"
            >
              <FormField
                control={scheduleForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Select Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="z-50 w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) => date < new Date()}
                          initialFocus
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={scheduleForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                        <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                        <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                        <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                        <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={scheduleForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Office</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select office location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="central">
                          Sub-Registrar Office, Mumbai Central
                        </SelectItem>
                        <SelectItem value="andheri">
                          Sub-Registrar Office, Andheri
                        </SelectItem>
                        <SelectItem value="borivali">
                          Sub-Registrar Office, Borivali
                        </SelectItem>
                        <SelectItem value="thane">
                          Sub-Registrar Office, Thane
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                <div className="flex gap-2">
                  <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Required Documents
                    </p>
                    <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-blue-700">
                      <li>Original Sales Deed (will be provided at office)</li>
                      <li>Proof of payment of Stamp Duty</li>
                      <li>ID proofs of both buyer and seller</li>
                      <li>Property title documents</li>
                      <li>NOC from society/builder (if applicable)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSchedulingModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!scheduleForm.formState.isValid}
                >
                  Schedule Appointment
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="flex h-auto flex-col p-4 md:max-h-screen md:overflow-hidden">
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl md:col-span-1 md:h-[calc(100vh-12%)]">
          <div className="flex h-full flex-col gap-6">
            <div className="relative min-h-80 w-full overflow-hidden rounded-xl">
              <img
                src={propertyDetails.photos[currentPhotoIndex].url}
                alt={propertyDetails.photos[currentPhotoIndex].caption}
                className="h-full w-full object-cover"
              />
              <div className="absolute right-3 bottom-3 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background/80 h-8 w-8 rounded-full backdrop-blur-sm"
                  onClick={prevPhoto}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background/80 h-8 w-8 rounded-full backdrop-blur-sm"
                  onClick={nextPhoto}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="bg-background/80 absolute bottom-3 left-3 rounded-md px-2 py-1 backdrop-blur-sm">
                <p className="text-xs">
                  {currentPhotoIndex + 1} of {propertyDetails.photos.length}
                </p>
              </div>
            </div>

            <Card className="scrollbar overflow-auto">
              <CardHeader className="pb-2">
                <CardTitle>Property Details</CardTitle>
                <CardDescription>{propertyDetails.address}</CardDescription>
                <div className="text-sm">{propertyDetails.description}</div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                  <div className="flex items-center">
                    <IndianRupee className="text-muted-foreground mr-2 h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs">Price</p>
                      <p className="font-medium">{propertyDetails.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Ruler className="text-muted-foreground mr-2 h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs">Area</p>
                      <p className="font-medium">
                        {propertyDetails.area}{" "}
                        {propertyDetails.unitOfMeasurement}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Building className="text-muted-foreground mr-2 h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs">Type</p>
                      <p className="font-medium">{propertyDetails.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="text-muted-foreground mr-2 h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs">Location</p>
                      <p className="font-medium">Mumbai</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-2" />

                <div>
                  <p className="text-muted-foreground mb-2 text-xs font-medium">
                    Seller Information
                  </p>
                  <div className="flex items-center">
                    <Avatar className="bg-muted mr-3 h-10 w-10">
                      <AvatarFallback>
                        {propertyDetails.sellerInfo.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {propertyDetails.sellerInfo.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-muted-foreground text-xs">
                          +91 8928937191
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="scrollbar flex flex-col overflow-hidden md:col-span-2 md:h-[calc(100vh-12%)]">
          <Tabs
            defaultValue="details"
            className="flex h-full flex-col overflow-hidden"
          >
            <TabsList className="grid h-10 w-full grid-cols-4">
              <TabsTrigger value="details">Property Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="agreement">Agreement</TabsTrigger>
            </TabsList>

            <TabsContent
              value="details"
              className="h-full flex-1 overflow-auto pt-4"
            >
              <Card className="scrollbar h-full overflow-auto">
                <CardHeader>
                  <CardTitle>Detailed Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-semibold">Location</h3>
                    <MapTemp
                      latitude={propertyDetails.coordinates.latitude}
                      longitude={propertyDetails.coordinates.longitude}
                      title={propertyDetails.title}
                      address={propertyDetails.address}
                      showZoomControls
                      showDirections
                      height="300px"
                    />
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold">Legal Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {Object.entries(propertyDetails.legalDetails).map(
                        ([key, value]) => (
                          <div key={key} className="rounded-md border p-3">
                            <p className="text-muted-foreground text-xs capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                            <p className="text-sm font-medium">{value}</p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="agreement">
                    <h3 className="mb-2 font-semibold">Seller Agreement</h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex items-center">
                        <History className="text-muted-foreground mr-2 h-4 w-4" />
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Previous Owners
                          </p>
                          <p className="font-medium">
                            {propertyDetails.propertyHistory.previousOwners}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Construction Year
                          </p>
                          <p className="font-medium">
                            {propertyDetails.propertyHistory.constructionYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <RefreshCw className="text-muted-foreground mr-2 h-4 w-4" />
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Last Sold
                          </p>
                          <p className="font-medium">
                            {propertyDetails.propertyHistory.lastSoldDate} (
                            {propertyDetails.propertyHistory.lastSoldPrice})
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="text-muted-foreground mr-2 h-4 w-4" />
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Dispute Status
                          </p>
                          <p className="font-medium">
                            {propertyDetails.propertyHistory.disputeHistory}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="my-4 font-semibold">Timeline</h3>
                      <Timeline>
                        {propertyDetails.propertyHistory.timeline.map(
                          (item, i) => (
                            <TimelineItem key={i}>
                              <div className="space-y-1">
                                <div className="text-sm font-medium">
                                  {item.event}
                                </div>
                                <div className="text-muted-foreground text-xs">
                                  {item.date}
                                </div>
                                <div className="text-sm">{item.details}</div>
                              </div>
                            </TimelineItem>
                          ),
                        )}
                      </Timeline>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="documents"
              className="flex-1 overflow-auto pt-4"
            >
              <Card className="h-full overflow-auto">
                <CardHeader>
                  <CardTitle>Property Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {propertyDetails.documents.map((doc) => (
                      <Dialog key={doc.id}>
                        <DialogTrigger asChild>
                          <div className="hover:border-primary/50 group cursor-pointer overflow-hidden rounded-md border transition-all">
                            <div className="bg-muted aspect-[4/3] w-full overflow-hidden">
                              <img
                                src={doc.preview}
                                alt={doc.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {doc.type === "pdf" ? (
                                    <FileText className="h-4 w-4" />
                                  ) : (
                                    <BookOpen className="h-4 w-4" />
                                  )}
                                  <p className="text-sm font-medium">
                                    {doc.name}
                                  </p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {doc.status}
                                </Badge>
                              </div>
                              <div className="text-muted-foreground mt-1 flex items-center justify-between text-xs">
                                <span>{doc.date}</span>
                                <span>{doc.size}</span>
                              </div>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{doc.name}</DialogTitle>
                            <DialogDescription>
                              {doc.date} • {doc.size} • {doc.status}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="aspect-auto max-h-[70vh] overflow-auto rounded-md border">
                            <img
                              src={doc.preview}
                              alt={doc.name}
                              className="w-full object-contain"
                            />
                          </div>
                          <div className="flex justify-between">
                            <Button variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button size="sm">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open in new tab
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="flex-1 overflow-hidden pt-4">
              <Card className="flex h-full flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Chat with Seller</CardTitle>
                  </div>
                  <CardDescription>
                    Chatting with {propertyDetails.sellerInfo.name}
                  </CardDescription>
                </CardHeader>
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-4 py-4">
                    {propertyDetails.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "BUYER" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender !== "BUYER" && (
                          <Avatar className="mr-2 h-8 w-8">
                            <AvatarFallback>
                              {propertyDetails.sellerInfo.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.sender === "BUYER"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="mt-1 text-xs opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                        {message.sender === "BUYER" && (
                          <Avatar className="ml-2 h-8 w-8">
                            <AvatarFallback>Y</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="border-t p-4">
                  <div className="flex w-full gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      className="min-h-12 resize-none"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent
              value="agreement"
              className="scrollbar flex-1 overflow-auto py-4"
            >
              <Card className="scrollbar h-full overflow-auto">
                <CardHeader>
                  <CardTitle>Sales Agreement</CardTitle>
                  <CardDescription>
                    Complete the purchase process
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[calc(100%-8rem)]">
                  {renderAgreementContent()}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
