
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export const WarrantyPolicy = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-purple-100 hover:text-white p-0 h-auto text-sm underline">
          Warranty Policy
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="w-6 h-6 text-pink-600" />
            Gavi Gadgets Warranty & Return Policy
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 text-gray-700">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-pink-600 mb-2">
                Smartphones & Accessories You Can Trust
              </h2>
              <p className="text-sm">
                At Gavi Gadgets (gavigadgets.ug), customer satisfaction and product quality are at the heart of what we do. 
                To give you peace of mind, we offer a 2-month warranty on all eligible mobile phones sold through our 
                platform—whether brand new or UK-imported.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Warranty Coverage (2 Months)</h3>
              <p className="mb-3">
                Our warranty covers any manufacturer-related defects or internal hardware issues that arise within 
                60 days (2 months) from the date of purchase.
              </p>
              <p className="font-medium mb-2">Products eligible for warranty include:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Brand new smartphones</li>
                <li>UK-imported/pre-owned smartphones</li>
                <li>Selected accessories (only when specified at the time of purchase)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">What is NOT Covered</h3>
              <p className="mb-3">Our warranty does not apply in the following situations:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Physical damage (e.g., cracked screens, dents, broken parts)</li>
                <li>Water or moisture damage, including in water-resistant phones submerged in saltwater or chlorinated water</li>
                <li>Damage due to drops, pressure, or mishandling</li>
                <li>Unauthorized repairs or tampering by third-party technicians</li>
                <li>Battery and accessories like chargers, cables, and earphones (unless clearly stated)</li>
                <li>Power surge or overheating-related damage</li>
                <li>Software issues or viruses</li>
                <li>Use of low-quality or incompatible accessories</li>
                <li>Failure to follow storage or handling instructions from the manufacturer</li>
              </ul>
              <p className="mt-3 font-medium text-red-600">
                Any form of tampering, disassembly, or modification voids the warranty immediately.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">If Warranty is Declined</h3>
              <p className="mb-2">In case your device is found ineligible for warranty repair, Gavi Gadgets will offer:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>A repair quotation from a trusted technician.</li>
                <li>If you agree, you'll cover the full cost of repairs.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">How to File a Warranty Claim</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Contact us:</strong> Reach out via WhatsApp, phone call, email, or social media and explain the issue.</li>
                <li><strong>Provide proof of purchase:</strong> Receipt or invoice is required for processing your request.</li>
                <li><strong>Send the product:</strong> You may be required to deliver or ship the product to our service location.</li>
                <li><strong>Unlock devices:</strong> Please remove passwords or screen locks before sending the phone, or share access codes for testing.</li>
                <li><strong>Assessment:</strong> Once we receive your item, we'll inspect it and offer one of the following resolutions:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Repair</li>
                    <li>Replacement (based on availability)</li>
                    <li>Partial or full refund (excluding delivery or insurance costs)</li>
                  </ul>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Data & Backup Disclaimer</h3>
              <p>
                Before returning any device, ensure you back up your data. Gavi Gadgets is not responsible for loss of 
                photos, contacts, files, or any personal information.
              </p>
            </div>

            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Questions or Support?</h3>
              <p className="mb-2">We're here to help.</p>
              <p><strong>Call/WhatsApp:</strong> +256 740799577</p>
              <p><strong>Socials:</strong> @gavigadgets</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
