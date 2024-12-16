import React, { useState } from 'react';
import Link from 'next/link';
import { Copy, Share2 } from 'lucide-react';

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  
  // Generate a unique referral code (you might want to generate this dynamically)
  const referralCode = 'Svectorbot2024';
  const referralLink = `https://svectorbot|web3nova.com/invite/${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white 
                    flex flex-col items-center justify-center p-4 space-y-6">
      <div className="w-full max-w-md bg-white 
                      shadow-xl rounded-2xl border border-blue-100 p-6 text-center">
        <h1 className="text-2xl font-bold text-blue-800 mb-4">Invite Friends</h1>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Your Referral Code</h2>
          <div className="flex items-center justify-center">
            <input 
              type="text" 
              value={referralCode} 
              readOnly 
              className="text-center text-xl font-bold text-blue-800 
                         bg-white border border-blue-200 rounded-l-lg p-2"
            />
            <button 
              onClick={handleCopyLink}
              className="bg-blue-600 text-white p-2 rounded-r-lg 
                         hover:bg-blue-700 transition-colors"
            >
              {copied ? 'Copied!' : <Copy className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Referral Link</h2>
          <div className="flex items-center justify-center">
            <input 
              type="text" 
              value={referralLink} 
              readOnly 
              className="text-center text-sm text-blue-800 
                         bg-white border border-blue-200 rounded-l-lg p-2 
                         w-full truncate"
            />
            <button 
              onClick={handleCopyLink}
              className="bg-blue-600 text-white p-2 rounded-r-lg 
                         hover:bg-blue-700 transition-colors"
            >
              {copied ? 'Copied!' : <Copy className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <Link href="/">
          <button 
            className="mt-6 w-full bg-blue-600 text-white 
                       py-3 rounded-xl hover:bg-blue-700 
                       transition-colors"
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}