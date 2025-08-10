
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, Phone, CheckCircle } from "lucide-react";

export const WarrantyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-2 px-2 sm:py-4 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4 sm:mb-6">
          <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-pink-600 mx-auto mb-2 sm:mb-4" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Warranty Policy
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Your peace of mind is our priority
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                Warranty Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <div className="grid gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">New Devices</h3>
                  <p className="text-green-700">
                    All brand new smartphones come with a <strong>12-month warranty</strong> covering manufacturing defects and hardware failures.
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">UK Used Devices</h3>
                  <p className="text-blue-700">
                    UK used smartphones include a <strong>6-month warranty</strong> covering major hardware components and functionality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                What's Covered
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base">
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Manufacturing defects and hardware malfunctions</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Battery issues (capacity below 80% of original)</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Display problems and touch screen issues</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Camera and audio component failures</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Charging port and connectivity issues</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl text-red-600">
                What's Not Covered
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base">
              <ul className="space-y-2 sm:space-y-3 text-gray-700">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 bg-red-100 rounded-full flex-shrink-0 mt-0.5"></span>
                  <span>Physical damage from drops, impacts, or accidents</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 bg-red-100 rounded-full flex-shrink-0 mt-0.5"></span>
                  <span>Water damage or liquid exposure</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 bg-red-100 rounded-full flex-shrink-0 mt-0.5"></span>
                  <span>Software issues, viruses, or user-installed modifications</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 bg-red-100 rounded-full flex-shrink-0 mt-0.5"></span>
                  <span>Normal wear and tear or cosmetic damage</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
                How to Claim Warranty
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Contact Us</h4>
                    <p className="text-gray-600">
                      Reach out via WhatsApp or call us with your device details and issue description.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Provide Proof</h4>
                    <p className="text-gray-600">
                      Show your purchase receipt or order confirmation from our store.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Assessment</h4>
                    <p className="text-gray-600">
                      We'll assess the device to determine if the issue is covered under warranty.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Resolution</h4>
                    <p className="text-gray-600">
                      If covered, we'll repair, replace, or provide store credit as appropriate.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-pink-50">
            <CardContent className="p-4 sm:p-6">
              <div className="text-center">
                <h3 className="font-bold text-pink-800 mb-2 text-base sm:text-lg">
                  Need Help?
                </h3>
                <p className="text-pink-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  Our customer service team is here to assist you with any warranty questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                  <a
                    href="https://wa.me/256701234567"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp Support
                  </a>
                  <a
                    href="tel:+256701234567"
                    className="inline-flex items-center justify-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors text-sm sm:text-base"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
