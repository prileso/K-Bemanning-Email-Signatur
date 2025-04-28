"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SignatureGenerator() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    imageUrl: "",
  });
  const [signature, setSignature] = useState({ html: "", generated: false });
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  const checkFormEmpty = () => {
    const isEmpty = Object.values(formData).every((x) => x === "");
    setIsFormEmpty(isEmpty);
  };

  const generateSignature = async () => {
    if (isFormEmpty) return;
    setIsLoading(true);

    try {
      const html = `
        <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; color: #333333; max-width: 400px; width: 100%;">
          <tr>
            <td><b>Med vänliga hälsningar,</b></td>
          </tr>
          <tr>
            <td style="height: 10px;">
              <b>${formData.firstName} ${formData.lastName}</b>
            </td>
          </tr>
          <tr>
            <td style="height: 30px;">
          </tr>
          <tr>
            <td style="padding: 0;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align: top; 15px; width: 120px; height: 120px;">
                    ${
                      formData.imageUrl
                        ? `
                      <div style="width: 120px; height: 120px; ">
                        <img src="${formData.imageUrl}" width="120" height="120" style="display: block; width: 120px; height: 120px;">
                      </div>
                    `
                        : ""
                    }
                  </td>
                  <td style="vertical-align: top; padding-left: 15px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="300" style="line-height: 1.2;">
                      <tr>
                        <td style="padding-bottom: 2px;">
                          <span style="font-size: 16px; font-weight: bold; color: #333333;">${
                            formData.firstName
                          } ${formData.lastName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 2px;">
                          <span style="font-size: 14px;">${
                            formData.phone
                          }</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 2px;">
                          <a href="mailto:${
                            formData.email
                          }" style="color: #0066cc; text-decoration: none; font-size: 14px;">${
        formData.email
      }</a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="https://k-bemanning.se" target="_blank" rel="noopener noreferrer" style="color: #0066cc; text-decoration: none; font-size: 14px;">k-bemanning.se</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; padding-top: 5px;">
                          <b>Jönköping / Gislaved / Värnamo</b>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <div style="border-top: 2px solid #0066cc; margin: 15px 0 10px 0;"></div>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="width: auto; vertical-align: middle;">
                    <img src="/logos/k-bemanning.jpg" alt="K-Bemanning" style="height: 35px;">
                  </td>
                  <td style="width: 35px; vertical-align: middle; text-align: center;">
                    <img src="/logos/auktbemannings.png" alt="Auktoriserat bemanningsföretag" style="height: 35px;">
                  </td>
                  <td style="width: 35px; vertical-align: middle; text-align: right;">
                    <img src="/logos/rlicens.png" alt="R-licens" style="height: 35px;">
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      `;
      setSignature({ html, generated: true });
      setActiveTab("preview");
      if (tabsRef.current) {
        const previewTab = tabsRef.current.querySelector(
          '[data-state="active"]'
        ) as HTMLElement;
        if (previewTab) {
          previewTab.click();
        }
      }
    } catch (error) {
      console.error("Error generating signature:", error);
      // Here you might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (signatureRef.current) {
      const range = document.createRange();
      range.selectNodeContents(signatureRef.current);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        try {
          document.execCommand("copy");
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
        selection.removeAllRanges();
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>E-postsignatur</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} ref={tabsRef}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form">Uppgifter</TabsTrigger>
              <TabsTrigger
                value="preview"
                disabled={isFormEmpty || !signature.generated}
              >
                Signatur
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Förnamn</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }));
                      checkFormEmpty();
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Efternamn</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }));
                      checkFormEmpty();
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefonnummer</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, phone: e.target.value }));
                    checkFormEmpty();
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-post</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                    checkFormEmpty();
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Profilbild URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://exempel.com/min-bild.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      imageUrl: e.target.value,
                    }));
                    checkFormEmpty();
                  }}
                />
              </div>

              <Button
                onClick={generateSignature}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Genererar..." : "Generera signatur"}
              </Button>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              {signature.html && (
                <>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Kopiera signaturen</AlertTitle>
                    <AlertDescription>
                      Klicka på &quot;Kopiera signatur&quot; knappen nedan för
                      att kopiera signaturen med korrekt formatering. Klistra
                      sedan in den i din e-postklient.
                    </AlertDescription>
                  </Alert>
                  <div className="border p-4 rounded-lg">
                    <div
                      ref={signatureRef}
                      dangerouslySetInnerHTML={{ __html: signature.html }}
                    />
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    className="w-full"
                    variant={copied ? "secondary" : "default"}
                  >
                    {copied ? "Kopierad!" : "Kopiera signatur"}
                  </Button>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
