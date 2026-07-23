import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Banknote, Copy, Check, Phone, Mail } from "lucide-react";
import { donationBankDetails, hasBankDetails, phoneNumbers, officialEmail } from "@/config/organization";

/**
 * Donation / bank details card.
 *
 * Renders a real bank-details card (with copy-to-clipboard for the account
 * number) only when verified bank details have been entered in
 * `src/config/organization.ts`. Until then, it shows a professional
 * "contact us" call to action with the official phone numbers and email — never
 * placeholder or fabricated bank information.
 */
export function BankDetailsCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!donationBankDetails.accountNumber) return;
    try {
      await navigator.clipboard.writeText(donationBankDetails.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently, number is still visible.
    }
  };

  if (hasBankDetails) {
    const fields: { label: string; value: string }[] = [
      { label: "Bank Name", value: donationBankDetails.bankName },
      { label: "Account Name", value: donationBankDetails.accountName },
      { label: "Branch", value: donationBankDetails.branch },
      { label: "SWIFT Code", value: donationBankDetails.swiftCode },
      { label: "Currency", value: donationBankDetails.currency },
    ].filter((f) => f.value);

    return (
      <Card className="border-none bg-card max-w-xl mx-auto shadow-md">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Banknote className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-secondary">Official Bank Details</h3>
          </div>

          <dl className="space-y-3 text-sm">
            {fields.map((field) => (
              <div key={field.label} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{field.label}</dt>
                <dd className="font-medium text-secondary text-right">{field.value}</dd>
              </div>
            ))}
            <div className="flex justify-between items-center gap-4 pt-3 border-t">
              <dt className="text-muted-foreground">Account Number</dt>
              <dd className="flex items-center gap-2">
                <span className="font-medium text-secondary">{donationBankDetails.accountNumber}</span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  aria-label="Copy account number"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </dd>
            </div>
          </dl>
          {copied && (
            <p role="status" className="text-xs text-primary mt-3 text-right font-medium">
              Account number copied to clipboard
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none bg-card max-w-xl mx-auto shadow-sm">
      <CardContent className="p-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Banknote className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-display text-xl font-semibold text-secondary mb-2">
          For official donation and bank details, please contact the organisation.
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Our team will share secure, verified bank transfer instructions directly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {phoneNumbers.map((phone) => (
            <a
              key={phone.href}
              href={phone.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Phone className="h-4 w-4" />
              {phone.display}
            </a>
          ))}
          {officialEmail && (
            <a
              href={`mailto:${officialEmail}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Mail className="h-4 w-4" />
              {officialEmail}
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
