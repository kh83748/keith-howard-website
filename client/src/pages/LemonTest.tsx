import * as React from "react";
import { Link } from "wouter";

export default function LemonTest() {
  // We remove the standard navigation and footer for a clean squeeze page experience.
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-6 py-12 sm:py-24 flex-1">
        
        {/* The 2-Column Grid: Stacks on mobile, splits on large screens */}
        <div className="grid gap-12 lg:grid-cols-2 items-start justify-center">
            
            {/* Left Column: Text Content */}
            <div className="text-left space-y-6 lg:max-w-md lg:py-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    The MarTech Lemon Test
                </h1>
                <h2 className="text-xl sm:text-2xl font-semibold text-primary">
                    How To Predict If Your Next MarTech Tool Will Be A Home Run Or A Train Wreck
                </h2>
                <p className="text-lg leading-relaxed text-foreground/70">
                    This diagnostic cuts through the demo hype to predict whether your next investment will unlock growth or turn into expensive "shelfware." Answer a few questions to see if you should sign the contract or walk away.
                </p>
                
                <div className="pt-4 text-sm text-foreground/60">
                    Your privacy is respected. See our <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
                </div>
            </div>

            {/* Right Column: Quiz Embed (The Squeeze Element) */}
            <div className="w-full bg-card text-card-foreground rounded-xl border shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold mb-4">Start the Diagnostic:</h3>
                {/* RightMessage Embed Code (from your prompt) */}
                <div className="rm-area-embedded-martech-lemon-test-embed-11-24-25-flow"></div>
            </div>

        </div>

      </div>

      {/* Minimal Footer */}
      <footer className="border-t border-border py-4 px-4">
        <div className="container flex justify-center text-sm text-foreground/60">
          © 2025 Keith Howard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
