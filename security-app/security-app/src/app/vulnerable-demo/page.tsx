"use client";

import React, { useState } from 'react';

/**
 * 🚨 VULNERABLE BANK DEMO 🚨
 * 
 * This page is INTENTIONALLY VULNERABLE.
 * It contains fake secrets, bad practices, and security flaws
 * to demonstrate the capabilities of the Security Scanner.
 * 
 * DO NOT USE THIS CODE IN PRODUCTION!
 */

export default function VulnerableDemoPage() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);

    // [API SECURITY] Hardcoded Secrets
    // The scanner should detect these variables
    const SECRETS = {
        AWS_ACCESS_KEY_ID: "PLACEHOLDER_AWS_ACCESS_KEY", // Fake AWS Key
        STRIPE_API_KEY: "sk_test_placeholder_stripe_key_12345", // Fake Stripe Key
        DB_PASSWORD: "weak_password_demo" // Weak Password
    };

    // [CORE AI] SQL Injection Vulnerability Simulation
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Vulnerable Logic: Concatenating string directly into a query
        // The scanner's AI detects this pattern as SQL Injection risk
        const sqlQuery = "SELECT * FROM users WHERE name = '" + query + "'";
        console.log("Executing insecure query:", sqlQuery);

        // Simulate results
        setSearchResults([
            { id: 1, name: "Alice", balance: "$5000" },
            { id: 2, name: "Bob", balance: "$120" }
        ]);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-lg">
                <h1 className="text-3xl font-bold text-red-600 mb-6">🚨 Insecure Bank Demo</h1>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                    <p className="text-yellow-700">
                        This page is a <strong>Security Test Target</strong>. Use the scanner to analyze this URL:
                        <br />
                        <code className="bg-yellow-100 px-2 py-1 rounded">http://localhost:3000/vulnerable-demo</code>
                    </p>
                </div>

                {/* [PRIVACY] Third-Party Tracker Simulation */}
                {/* These scripts are not real but match the REGEX of real trackers */}
                <div className="hidden">
                    <script src="https://www.googletagmanager.com/gtag/js?id=UA-FAKE-TRACKER"></script>
                    <script src="https://connect.facebook.net/en_US/fbevents.js"></script>
                </div>

                {/* [COMPLIANCE] PCI-DSS Violation */}
                <section className="mb-8 border-b pb-6">
                    <h2 className="text-xl font-semibold mb-4">Quick Payment (Insecure)</h2>
                    <form action="/api/pay" method="POST" className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Card Number</label>
                            {/* The name="card_number" matches PII detection patterns */}
                            <input
                                type="text"
                                name="card_number"
                                placeholder="0000 0000 0000 0000"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <p className="text-xs text-red-500 mt-1">⚠️ Direct input of card numbers violates PCI-DSS</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Expiry</label>
                                <input type="text" name="expiry" placeholder="MM/YY" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">CVV</label>
                                <input type="text" name="cvv" placeholder="123" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Process Payment
                        </button>
                    </form>
                </section>

                {/* [CORE AI] SQL Injection Demo */}
                <section className="mb-8 border-b pb-6">
                    <h2 className="text-xl font-semibold mb-4">User Search (Vulnerable)</h2>
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter username (try: ' OR 1=1 --)"
                            className="flex-1 p-2 border border-gray-300 rounded"
                        />
                        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">
                            Search
                        </button>
                    </form>
                    {searchResults.length > 0 && (
                        <div className="mt-4 bg-gray-50 p-4 rounded">
                            <h3 className="font-bold mb-2">Results:</h3>
                            <ul>
                                {searchResults.map(user => (
                                    <li key={user.id} className="border-b py-2 flex justify-between">
                                        <span>{user.name}</span>
                                        <span className="font-mono">{user.balance}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>

                {/* [PRIVACY] PII Collection */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Newsletter (No Privacy Policy)</h2>
                    <div className="flex gap-2">
                        <input type="email" name="email" placeholder="Your specific personal email" className="flex-1 p-2 border border-gray-300 rounded" />
                        <button className="bg-green-600 text-white px-4 py-2 rounded">Subscribe</button>
                    </div>
                </section>

            </div>
        </div>
    );
}
