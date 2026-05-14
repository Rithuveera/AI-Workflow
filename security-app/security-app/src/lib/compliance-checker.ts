import type { ChecklistItem } from "@/types/security";

/**
 * Check GDPR compliance indicators
 */
export function checkGDPRCompliance(html: string, url: string): ChecklistItem[] {
    const issues: ChecklistItem[] = [];

    // Check for cookie consent banner
    const hasCookieConsent = /cookie.*consent|accept.*cookie|cookie.*banner|gdpr.*consent/gi.test(html);
    if (!hasCookieConsent) {
        issues.push({
            name: "Cookie Consent Banner",
            status: "fail",
            severity: "High",
            details: "No cookie consent mechanism detected. GDPR requires explicit user consent before setting non-essential cookies.",
            recommendation: "Implement a cookie consent banner that allows users to accept/reject cookies before they are set.",
        });
    } else {
        issues.push({
            name: "Cookie Consent Banner",
            status: "pass",
            details: "Cookie consent mechanism detected.",
        });
    }

    // Check for privacy policy
    const hasPrivacyPolicy = /privacy.*policy|privacy.*notice|data.*protection.*policy/gi.test(html);
    if (!hasPrivacyPolicy) {
        issues.push({
            name: "Privacy Policy",
            status: "fail",
            severity: "High",
            details: "No privacy policy link found. GDPR requires a clear privacy policy explaining data collection and usage.",
            recommendation: "Create and link to a comprehensive privacy policy that explains what data you collect, how it's used, and user rights.",
        });
    } else {
        issues.push({
            name: "Privacy Policy",
            status: "pass",
            details: "Privacy policy link detected.",
        });
    }

    // Check for data subject rights
    const hasDataRights = /right.*to.*access|data.*portability|right.*to.*erasure|right.*to.*be.*forgotten/gi.test(html);
    if (hasDataRights) {
        issues.push({
            name: "Data Subject Rights",
            status: "pass",
            details: "Information about data subject rights (access, portability, erasure) found.",
        });
    } else {
        issues.push({
            name: "Data Subject Rights",
            status: "warning",
            severity: "Medium",
            details: "No clear information about GDPR data subject rights (right to access, portability, erasure).",
            recommendation: "Provide clear information about user rights under GDPR, including how to request data access or deletion.",
        });
    }

    // Check for data processing information
    const hasDataProcessing = /data.*processing|lawful.*basis|legitimate.*interest/gi.test(html);
    if (hasDataProcessing) {
        issues.push({
            name: "Data Processing Information",
            status: "pass",
            details: "Information about data processing and lawful basis found.",
        });
    }

    return issues;
}

/**
 * Check PCI-DSS compliance for payment processing
 */
export function checkPCIDSSCompliance(html: string): ChecklistItem[] {
    const issues: ChecklistItem[] = [];

    // Check if payment processing is present
    const hasPaymentForms = /payment|credit.*card|card.*number|cvv|expir.*date|billing/gi.test(html);

    if (!hasPaymentForms) {
        return [{
            name: "PCI-DSS Compliance",
            status: "not_applicable",
            details: "No payment processing forms detected. PCI-DSS compliance not applicable.",
        }];
    }

    // Check for direct card number inputs (bad practice)
    const hasCardInput = /<input[^>]*name=['"]?(card|cc|credit).*number/gi.test(html);
    if (hasCardInput) {
        issues.push({
            name: "Direct Card Number Input",
            status: "fail",
            severity: "Critical",
            details: "Direct credit card input fields detected. This violates PCI-DSS SAQ A compliance.",
            recommendation: "Use a PCI-compliant payment processor (Stripe, PayPal) with iframe/hosted payment forms. Never handle raw card data directly.",
        });
    }

    // Check for payment processor integration
    const hasPaymentProcessor = /stripe|paypal|square|braintree|adyen/gi.test(html);
    if (hasPaymentProcessor) {
        issues.push({
            name: "Payment Processor Integration",
            status: "pass",
            details: "Third-party payment processor integration detected (reduces PCI-DSS scope).",
        });
    }

    // Check for SSL/TLS
    const isHTTPS = /https:/gi.test(html);
    if (!isHTTPS) {
        issues.push({
            name: "SSL/TLS for Payment Pages",
            status: "fail",
            severity: "Critical",
            details: "Payment forms must be served over HTTPS. PCI-DSS requires encryption of cardholder data in transit.",
            recommendation: "Implement SSL/TLS certificate and serve all payment pages over HTTPS.",
        });
    }

    return issues;
}

/**
 * Check HIPAA compliance for healthcare data
 */
export function checkHIPAACompliance(html: string): ChecklistItem[] {
    const issues: ChecklistItem[] = [];

    // Check if healthcare-related
    const isHealthcare = /patient|medical|health.*record|hipaa|phi|protected.*health.*information/gi.test(html);

    if (!isHealthcare) {
        return [{
            name: "HIPAA Compliance",
            status: "not_applicable",
            details: "No healthcare-related content detected. HIPAA compliance not applicable.",
        }];
    }

    // Check for encryption notice
    const hasEncryption = /encrypt|secure.*transmission|ssl|tls/gi.test(html);
    if (!hasEncryption) {
        issues.push({
            name: "Data Encryption Notice",
            status: "warning",
            severity: "High",
            details: "No clear indication of data encryption for healthcare information.",
            recommendation: "Clearly state that patient data is encrypted both in transit (SSL/TLS) and at rest.",
        });
    }

    // Check for privacy notice
    const hasHIPAANotice = /hipaa.*privacy|notice.*of.*privacy.*practices|npp/gi.test(html);
    if (!hasHIPAANotice) {
        issues.push({
            name: "HIPAA Privacy Notice",
            status: "fail",
            severity: "High",
            details: "No HIPAA Privacy Notice or Notice of Privacy Practices found.",
            recommendation: "Provide a clear HIPAA Privacy Notice explaining how protected health information (PHI) is used and protected.",
        });
    } else {
        issues.push({
            name: "HIPAA Privacy Notice",
            status: "pass",
            details: "HIPAA Privacy Notice detected.",
        });
    }

    // Check for patient rights information
    const hasPatientRights = /patient.*rights|access.*medical.*records|request.*amendment/gi.test(html);
    if (hasPatientRights) {
        issues.push({
            name: "Patient Rights Information",
            status: "pass",
            details: "Information about patient rights under HIPAA found.",
        });
    }

    return issues;
}

/**
 * Check for Terms of Service
 */
export function checkTermsOfService(html: string): ChecklistItem {
    const hasTerms = /terms.*of.*service|terms.*of.*use|terms.*and.*conditions|user.*agreement/gi.test(html);

    if (hasTerms) {
        return {
            name: "Terms of Service",
            status: "pass",
            details: "Terms of Service link detected.",
        };
    }

    return {
        name: "Terms of Service",
        status: "warning",
        severity: "Low",
        details: "No Terms of Service link found. While not always legally required, ToS helps protect your business.",
        recommendation: "Create and link to Terms of Service that define user responsibilities and limitations of liability.",
    };
}

/**
 * Check accessibility compliance (WCAG)
 */
export function checkAccessibilityCompliance(html: string): ChecklistItem[] {
    const issues: ChecklistItem[] = [];

    // Check for alt text on images
    const imagesWithoutAlt = /<img(?![^>]*alt=)/gi.test(html);
    if (imagesWithoutAlt) {
        issues.push({
            name: "Image Alt Text",
            status: "warning",
            severity: "Low",
            details: "Some images may be missing alt text. This affects accessibility for screen readers.",
            recommendation: "Add descriptive alt text to all images: <img src='...' alt='Description'>",
        });
    }

    // Check for ARIA labels
    const hasARIA = /aria-label|aria-describedby|role=/gi.test(html);
    if (hasARIA) {
        issues.push({
            name: "ARIA Attributes",
            status: "pass",
            details: "ARIA attributes detected, indicating accessibility considerations.",
        });
    }

    return issues;
}
