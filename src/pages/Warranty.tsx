import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Shield, Phone, Mail } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const Warranty = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="Warranty & Return Policy - Gavi Gadgets Uganda"
        description="Complete warranty and return policy for Gavi Gadgets Uganda. 2-month warranty on all smartphones, comprehensive coverage details, and customer support information."
        keywords="warranty policy Uganda, smartphone warranty, Gavi Gadgets warranty, return policy Uganda, mobile phone warranty Kampala"
      />
      
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-pink-50 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 -ml-2 sm:ml-0"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium text-sm sm:text-base">Back</span>
            </Button>
            <div className="flex items-center gap-2 sm:gap-3 flex-1">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">Warranty & Return Policy</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-0.5">Gavi Gadgets Uganda - Your Mobile Source</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-pink-100 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]">
              <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8 text-gray-700">
                
                {/* Introduction */}
                <div className="text-center bg-gradient-to-r from-pink-50 to-rose-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-pink-100">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600 mb-2 sm:mb-3 leading-tight">
                    Smartphones & Accessories You Can Trust
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed">
                    At Gavi Gadgets (gavigadgets.ug), customer satisfaction and product quality are at the heart of what we do. 
                    To give you peace of mind, we offer a <strong className="text-pink-600">2-month warranty</strong> on all eligible mobile phones sold through our 
                    platform—whether brand new or UK-imported.
                  </p>
                </div>

                {/* Warranty Coverage */}
                <div className="bg-green-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-green-200">
                  <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span className="leading-tight">Warranty Coverage (2 Months)</span>
                  </h3>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                    Our warranty covers any manufacturer-related defects or internal hardware issues that arise within 
                    <strong className="text-green-700"> 60 days (2 months)</strong> from the date of purchase.
                  </p>
                  <div className="bg-white p-3 sm:p-4 rounded-lg border border-green-200">
                    <p className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base text-green-800">Products eligible for warranty include:</p>
                    <ul className="space-y-1.5 sm:space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">Brand new smartphones</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">UK-imported/pre-owned smartphones</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">Selected accessories (only when specified at the time of purchase)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* What is NOT Covered */}
                <div className="bg-red-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-red-200">
                  <h3 className="text-lg sm:text-xl font-bold text-red-800 mb-3 sm:mb-4">What is NOT Covered</h3>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">Our warranty does not apply in the following situations:</p>
                  <div className="bg-white p-3 sm:p-4 rounded-lg border border-red-200">
                    <ul className="space-y-2 sm:space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">Physical damage (e.g., cracked screens, dents, broken parts)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">Water or moisture damage, including in water-resistant phones submerged in saltwater or chlorinated water</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">Damage due to drops, pressure, or mishandling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">Unauthorized repairs or tampering by third-party technicians</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">Battery and accessories like chargers, cables, and earphones (unless clearly stated)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">Power surge or overheating-related damage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">Software issues or viruses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">Use of low-quality or incompatible accessories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">Failure to follow storage or handling instructions from the manufacturer</span>
                      </li>
                    </ul>
                    <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-red-100 rounded-lg">
                      <p className="font-bold text-sm sm:text-base text-red-700">
                        ⚠️ Any form of tampering, disassembly, or modification voids the warranty immediately.
                      </p>
                    </div>
                  </div>
                </div>

                {/* If Warranty is Declined */}
                <div className="bg-orange-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-orange-200">
                  <h3 className="text-lg sm:text-xl font-bold text-orange-800 mb-3 sm:mb-4">If Warranty is Declined</h3>
                  <p className="mb-2 sm:mb-3 text-sm sm:text-base leading-relaxed">In case your device is found ineligible for warranty repair, Gavi Gadgets will offer:</p>
                  <div className="bg-white p-3 sm:p-4 rounded-lg border border-orange-200">
                    <ul className="space-y-1.5 sm:space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">A repair quotation from a trusted technician.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm sm:text-base">If you agree, you'll cover the full cost of repairs.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* How to File a Warranty Claim */}
                <div className="bg-blue-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-blue-200">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3 sm:mb-4">How to File a Warranty Claim</h3>
                  <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200">
                    <ol className="space-y-3 sm:space-y-4">
                      <li className="flex gap-2 sm:gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">1</div>
                        <div className="min-w-0 flex-1">
                          <strong className="text-blue-800 text-sm sm:text-base">Contact us:</strong> <span className="text-sm sm:text-base">Reach out via WhatsApp, phone call, email, or social media and explain the issue.</span>
                        </div>
                      </li>
                      <li className="flex gap-2 sm:gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">2</div>
                        <div className="min-w-0 flex-1">
                          <strong className="text-blue-800 text-sm sm:text-base">Provide proof of purchase:</strong> <span className="text-sm sm:text-base">Receipt or invoice is required for processing your request.</span>
                        </div>
                      </li>
                      <li className="flex gap-2 sm:gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">3</div>
                        <div className="min-w-0 flex-1">
                          <strong className="text-blue-800 text-sm sm:text-base">Send the product:</strong> <span className="text-sm sm:text-base">You may be required to deliver or ship the product to our service location.</span>
                        </div>
                      </li>
                      <li className="flex gap-2 sm:gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">4</div>
                        <div className="min-w-0 flex-1">
                          <strong className="text-blue-800 text-sm sm:text-base">Unlock devices:</strong> <span className="text-sm sm:text-base">Please remove passwords or screen locks before sending the phone, or share access codes for testing.</span>
                        </div>
                      </li>
                      <li className="flex gap-2 sm:gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">5</div>
                        <div className="min-w-0 flex-1">
                          <strong className="text-blue-800 text-sm sm:text-base">Assessment:</strong> <span className="text-sm sm:text-base">Once we receive your item, we'll inspect it and offer one of the following resolutions:</span>
                          <ul className="mt-2 ml-2 sm:ml-4 space-y-1">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                              <span className="text-sm sm:text-base">Repair</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                              <span className="text-sm sm:text-base">Replacement (based on availability)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                              <span className="text-sm sm:text-base">Partial or full refund (excluding delivery or insurance costs)</span>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Data & Backup Disclaimer */}
                <div className="bg-yellow-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-yellow-200">
                  <h3 className="text-lg sm:text-xl font-bold text-yellow-800 mb-3 sm:mb-4">Data & Backup Disclaimer</h3>
                  <div className="bg-white p-3 sm:p-4 rounded-lg border border-yellow-200">
                    <p className="text-sm sm:text-base leading-relaxed">
                      Before returning any device, ensure you back up your data. Gavi Gadgets is not responsible for loss of 
                      photos, contacts, files, or any personal information.
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-pink-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 flex-shrink-0" />
                    <span className="leading-tight">Questions or Support?</span>
                  </h3>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base">We're here to help.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white p-3 sm:p-4 rounded-lg border border-pink-200">
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                        <strong className="text-sm sm:text-base text-gray-900">Call/WhatsApp:</strong>
                      </div>
                      <p className="text-base sm:text-lg font-bold text-green-600 break-all">+256 740799577</p>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg border border-pink-200">
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                        <strong className="text-sm sm:text-base text-gray-900">Social Media:</strong>
                      </div>
                      <p className="text-base sm:text-lg font-bold text-blue-600">@gavigadgets</p>
                    </div>
                  </div>
                </div>

              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Warranty;