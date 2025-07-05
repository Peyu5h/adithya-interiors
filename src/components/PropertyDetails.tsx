"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
  FileText,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

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
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);

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
                <div className="text-sm">{propertyDetails.description}</div>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="scrollbar flex flex-col overflow-hidden md:col-span-2 md:h-[calc(100vh-12%)]">
          <div className="h-full flex-1 overflow-auto pt-4">
            <Card className="scrollbar h-full overflow-auto">
              <CardContent className="space-y-6">
                <div>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
