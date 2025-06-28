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
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-pink-50 rounded-xl px-3 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back</span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Warranty & Return Policy</h1>
                <p className="text-gray-600">Gavi Gadgets Uganda - Your Mobile Source</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="p-6 sm:p-8 space-y-8 text-gray-700">
                
                {/* Introduction */}
                <div className="text-center bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-100">
                  <h2 className="text-xl sm:text-2xl font-bold text-pink-600 mb-3">
                    Smartphones & Accessories You Can Trust
                  </h2>
                  <p className="text-base leading-relaxed">
                    At Gavi Gadgets (gavigadgets.ug), customer satisfaction and product quality are at the heart of what we do. 
                    To give you peace of mind, we offer a <strong className="text-pink-600">2-month warranty</strong> on all eligible mobile phones sold through our 
                    platform—whether brand new or UK-imported.
                  </p>
                </div>

                {/* Warranty Coverage */}
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Warranty Coverage (2 Months)
                  </h3>
                  <p className="mb-4 text-base leading-relaxed">
                    Our warranty covers any manufacturer-related defects or internal hardware issues that arise within 
                    <strong className="text-green-700"> 60 days (2 months)</strong> from the date of purchase.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <p className="font-semibold mb-3 text-green-800">Products eligible for warranty include:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Brand new smartphones</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>UK-imported/pre-owned smartphones</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Selected accessories (only when specified at the time of purchase)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* What is NOT Covered */}
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h3 className="text-xl font-bold text-red-800 mb-4">What is NOT Covered</h3>
                  <p className="mb-4 text-base leading-relaxed">Our warranty does not apply in the following situations:</p>
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Physical damage (e.g., cracked screens, dents, broken parts)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Water or moisture damage, including in water-resistant phones submerged in saltwater or chlorinated water</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Damage due to drops, pressure, or mishandling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Unauthorized repairs or tampering by third-party technicians</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Battery and accessories like chargers, cables, and earphones (unless clearly stated)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Power surge or overheating-related damage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Software issues or viruses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Use of low-quality or incompatible accessories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Failure to follow storage or handling instructions from the manufacturer</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-red-100 rounded-lg">
                      <p className="font-bold text-red-700">
                        ⚠️ Any form of tampering, disassembly, or modification voids the warranty immediately.
                      </p>
                    </div>
                  </div>
                </div>

                {/* If Warranty is Declined */}
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                  <h3 className="text-xl font-bold text-orange-800 mb-4">If Warranty is Declined</h3>
                  <p className="mb-3 text-base leading-relaxed">In case your device is found ineligible for warranty repair, Gavi Gadgets will offer:</p>
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>A repair quotation from a trusted technician.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>If you agree, you'll cover the full cost of repairs.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* How to File a Warranty Claim */}
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">How to File a Warranty Claim</h3>
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <ol className="space-y-4">
                      <li className="flex gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                        <div>
                          <strong className="text-blue-800">Contact us:</strong> Reach out via WhatsApp, phone call, email, or social media and explain the issue.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                        <div>
                          <strong className="text-blue-800">Provide proof of purchase:</strong> Receipt or invoice is required for processing your request.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                        <div>
                          <strong className="text-blue-800">Send the product:</strong> You may be required to deliver or ship the product to our service location.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                        <div>
                          <strong className="text-blue-800">Unlock devices:</strong> Please remove passwords or screen locks before sending the phone, or share access codes for testing.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                        <div>
                          <strong className="text-blue-800">Assessment:</strong> Once we receive your item, we'll inspect it and offer one of the following resolutions:
                          <ul className="mt-2 ml-4 space-y-1">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                              <span>Repair</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                              <span>Replacement (based on availability)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                              <span>Partial or full refund (excluding delivery or insurance costs)</span>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Data & Backup Disclaimer */}
                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                  <h3 className="text-xl font-bold text-yellow-800 mb-4">Data & Backup Disclaimer</h3>
                  <div className="bg-white p-4 rounded-lg border border-yellow-200">
                    <p className="text-base leading-relaxed">
                      Before returning any device, ensure you back up your data. Gavi Gadgets is not responsible for loss of 
                      photos, contacts, files, or any personal information.
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone className="w-6 h-6 text-pink-600" />
                    Questions or Support?
                  </h3>
                  <p className="mb-4 text-base">We're here to help.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-pink-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-5 h-5 text-green-600" />
                        <strong className="text-gray-900">Call/WhatsApp:</strong>
                      </div>
                      <p className="text-lg font-bold text-green-600">+256 740799577</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-pink-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <strong className="text-gray-900">Social Media:</strong>
                      </div>
                      <p className="text-lg font-bold text-blue-600">@gavigadgets</p>
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