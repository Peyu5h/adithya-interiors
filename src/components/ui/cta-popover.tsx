"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Calendar, Star } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface CTAPopoverProps {
  onClose: () => void;
  isVisible: boolean;
}

export function CTAPopover({ onClose, isVisible }: CTAPopoverProps) {
  const handleWhatsAppRedirect = () => {
    window.open(
      "https://api.whatsapp.com/send/?phone=917208251641&text=Hello%20Adithya%20Interiors!%20I%20would%20like%20to%20discuss%20my%20interior%20design%20project.%20Can%20you%20help%20me%20get%20started?&type=phone_number&app_absent=0",
      "_blank",
    );
    onClose();
  };

  const handleBookCall = () => {
    // You can integrate with a booking system here
    window.open(
      "https://api.whatsapp.com/send/?phone=917208251641&text=Hello%20Adithya%20Interiors!%20I%20would%20like%20to%20book%20a%20consultation%20call%20to%20discuss%20my%20interior%20design%20project.&type=phone_number&app_absent=0",
      "_blank",
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed right-6 bottom-6 z-50 max-w-sm"
        >
          <Card className="border-0 bg-white/95 shadow-2xl backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Ready to Transform Your Space?
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <Star className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Get expert consultation and a free quote for your interior
                    design project. Our team is ready to bring your vision to
                    life.
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Button
                  onClick={handleBookCall}
                  className="w-full bg-green-600 font-medium text-white hover:bg-green-700"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book a Free Consultation
                </Button>
                <Button
                  onClick={handleWhatsAppRedirect}
                  variant="outline"
                  className="w-full border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>150+ Projects Completed</span>
                </div>
                <span>•</span>
                <span>12+ Years Experience</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
