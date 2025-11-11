import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-pink-50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 -ml-2 sm:ml-0"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium text-sm sm:text-base">Back</span>
            </Button>
            <div className="flex items-center gap-2 sm:gap-3 flex-1">
              <div className="p-2 sm:p-3 bg-pink-600 rounded-lg flex-shrink-0">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-tight">Warranty & Return Policy</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-0.5">Gavi Gadgets Uganda - Your Mobile Source</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8 pb-8">
                
            {/* Introduction */}
            <div className="text-center bg-pink-50 p-4 sm:p-6 md:p-8 rounded-lg border border-gray-200">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4 leading-tight">
                Smartphones & Accessories You Can Trust
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                At Gavi Gadgets (gavigadgets.ug), customer satisfaction and product quality are at the heart of what we do. 
                To give you peace of mind, we offer a <strong className="text-pink-600 font-semibold">2-month warranty</strong> on all eligible mobile phones sold through our 
                platform—whether brand new or UK-imported.
              </p>
            </div>

            {/* Warranty Coverage */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 flex-shrink-0" />
                <span className="leading-tight">Warranty Coverage (2 Months)</span>
              </h3>
              <p className="mb-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                Our warranty covers any manufacturer-related defects or internal hardware issues that arise within 
                <strong className="text-black font-semibold"> 60 days (2 months)</strong> from the date of purchase.
              </p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                <p className="font-semibold mb-3 text-sm sm:text-base text-black">Products eligible for warranty include:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Brand new smartphones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">UK-imported/pre-owned smartphones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Selected accessories (only when specified at the time of purchase)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* What is NOT Covered */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">What is NOT Covered</h3>
              <p className="mb-4 text-sm sm:text-base text-gray-700 leading-relaxed">Our warranty does not apply in the following situations:</p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Physical damage (e.g., cracked screens, dents, broken parts)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Water or moisture damage, including in water-resistant phones submerged in saltwater or chlorinated water</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Damage due to drops, pressure, or mishandling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Unauthorized repairs or tampering by third-party technicians</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Battery and accessories like chargers, cables, and earphones (unless clearly stated)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Power surge or overheating-related damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Software issues or viruses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Use of low-quality or incompatible accessories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">Failure to follow storage or handling instructions from the manufacturer</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-pink-50 rounded-lg border border-pink-200">
                  <p className="font-bold text-sm sm:text-base text-black">
                    ⚠️ Any form of tampering, disassembly, or modification voids the warranty immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* If Warranty is Declined */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">If Warranty is Declined</h3>
              <p className="mb-3 text-sm sm:text-base text-gray-700 leading-relaxed">In case your device is found ineligible for warranty repair, Gavi Gadgets will offer:</p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">A repair quotation from a trusted technician.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-gray-700">If you agree, you'll cover the full cost of repairs.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* How to File a Warranty Claim */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">How to File a Warranty Claim</h3>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                <ol className="space-y-3 sm:space-y-4">
                  <li className="flex gap-2 sm:gap-3">
                    <div className="w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">1</div>
                    <div className="min-w-0 flex-1">
                      <strong className="text-black text-sm sm:text-base">Contact us:</strong> <span className="text-sm sm:text-base text-gray-700">Reach out via WhatsApp, phone call, email, or social media and explain the issue.</span>
                    </div>
                  </li>
                  <li className="flex gap-2 sm:gap-3">
                    <div className="w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">2</div>
                    <div className="min-w-0 flex-1">
                      <strong className="text-black text-sm sm:text-base">Provide proof of purchase:</strong> <span className="text-sm sm:text-base text-gray-700">Receipt or invoice is required for processing your request.</span>
                    </div>
                  </li>
                  <li className="flex gap-2 sm:gap-3">
                    <div className="w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">3</div>
                    <div className="min-w-0 flex-1">
                      <strong className="text-black text-sm sm:text-base">Send the product:</strong> <span className="text-sm sm:text-base text-gray-700">You may be required to deliver or ship the product to our service location.</span>
                    </div>
                  </li>
                  <li className="flex gap-2 sm:gap-3">
                    <div className="w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">4</div>
                    <div className="min-w-0 flex-1">
                      <strong className="text-black text-sm sm:text-base">Unlock devices:</strong> <span className="text-sm sm:text-base text-gray-700">Please remove passwords or screen locks before sending the phone, or share access codes for testing.</span>
                    </div>
                  </li>
                  <li className="flex gap-2 sm:gap-3">
                    <div className="w-6 h-6 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">5</div>
                    <div className="min-w-0 flex-1">
                      <strong className="text-black text-sm sm:text-base">Assessment:</strong> <span className="text-sm sm:text-base text-gray-700">Once we receive your item, we'll inspect it and offer one of the following resolutions:</span>
                      <ul className="mt-2 ml-2 sm:ml-4 space-y-1">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-pink-600 rounded-full flex-shrink-0"></div>
                          <span className="text-sm sm:text-base text-gray-700">Repair</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-pink-600 rounded-full flex-shrink-0"></div>
                          <span className="text-sm sm:text-base text-gray-700">Replacement (based on availability)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-pink-600 rounded-full flex-shrink-0"></div>
                          <span className="text-sm sm:text-base text-gray-700">Partial or full refund (excluding delivery or insurance costs)</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            {/* Data & Backup Disclaimer */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">Data & Backup Disclaimer</h3>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Before returning any device, ensure you back up your data. Gavi Gadgets is not responsible for loss of 
                  photos, contacts, files, or any personal information.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-pink-50 p-4 sm:p-6 md:p-8 rounded-lg border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 flex-shrink-0" />
                <span className="leading-tight">Questions or Support?</span>
              </h3>
              <p className="mb-4 text-sm sm:text-base text-gray-700">We're here to help.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 flex-shrink-0" />
                    <strong className="text-sm sm:text-base text-black">Call/WhatsApp:</strong>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-pink-600 break-all">+256 740799577</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 flex-shrink-0" />
                    <strong className="text-sm sm:text-base text-black">Social Media:</strong>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-pink-600">@gavigadgets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Warranty;