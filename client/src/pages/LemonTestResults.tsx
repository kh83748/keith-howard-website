import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, AlertCircle, Ban, ArrowRight } from "lucide-react";

export default function LemonTestResults() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  
  // Try to get score from 'score' or 'lemon_test_quiz_score' params
  const scoreParam = params.get("score") || params.get("lemon_test_quiz_score");
  const score = scoreParam ? parseInt(scoreParam, 10) : null;

  const renderResult = () => {
    // 160-199: Green Light
    if (score !== null && score >= 160) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-green-600 mb-4">
            <CheckCircle2 className="w-8 h-8" />
            <h2 className="text-2xl font-bold">GREEN LIGHT</h2>
          </div>
          <h3 className="text-xl font-semibold">Your Result: {score}/199</h3>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              Congrats, you actually did your homework instead of just vibing your way through the buying process. The tool is legit, the vendor isn't trying to screw you over, and you have a real plan for implementation.
            </p>
            <p>
              Go ahead and buy it, use it, and hopefully it lives up to the hype. Then maybe send me a note letting me know this assessment saved you from wasting money on the three OTHER tools you were considering.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mt-6 border border-border">
            <p className="text-sm italic text-foreground/70">
              P.S. Since your score was {score}/199, forward this to your boss to show them you’ve done the diligence. It’s always good to have receipts that prove you know what you’re doing.
            </p>
          </div>
        </div>
      );
    } 
    
    // 120-159: Yellow Light
    else if (score !== null && score >= 120) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-yellow-600 mb-4">
            <AlertTriangle className="w-8 h-8" />
            <h2 className="text-2xl font-bold">YELLOW LIGHT</h2>
          </div>
          <h3 className="text-xl font-semibold">Your Result: {score}/199</h3>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              The tool MIGHT be good, but there are some gaps here... either in your vetting process or in the tool itself. I'm not saying run away screaming, but I AM saying you should probably pump the brakes before signing a 12-month contract.
            </p>
            <p>
              Do a proper trial if they offer one, get some more references from actual users (not just the cherry-picked case studies on their website), and ask harder questions. Make sure you're not just buying this because the demo made you feel things or because you saw someone you respect using it on LinkedIn.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mt-6 border border-border">
            <p className="text-sm italic text-foreground/70">
              P.S. You're in the yellow zone with a score of {score}/199. Before you sign, forward this to your team. Better to have a tough conversation about "gaps" now than a panic meeting about "shelfware" in six months.
            </p>
          </div>
        </div>
      );
    } 
    
    // 80-119: Orange Light
    else if (score !== null && score >= 80) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-orange-600 mb-4">
            <AlertCircle className="w-8 h-8" />
            <h2 className="text-2xl font-bold">ORANGE LIGHT</h2>
          </div>
          <h3 className="text-xl font-semibold">Your Result: {score}/199</h3>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              Look, I'm not going to tell you what to do with your money, but the odds of this tool turning into expensive shelfware are pretty damn high right now. You're not clear on the ROI, the vendor's support seems questionable, or you're trying to solve a problem that maybe doesn't actually exist in the way you think it does.
            </p>
            <p>
              Sleep on this decision for at least a week, and if you're still feeling the urge to buy it after that, run through this assessment again with fresh eyes. Or just wait six months and see if you still think you need it. (Spoiler: you probably won't.)
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mt-6 border border-border">
            <p className="text-sm italic text-foreground/70">
              P.S. Scored below 120 but your team is still pushing to buy it anyway? Forward them this assessment with your score attached and maybe CC your boss for good measure. Because when this inevitably goes sideways in six months and someone asks "why did we buy this again?", you're going to want receipts showing that you at least TRIED to pump the brakes on this decision.
            </p>
          </div>
        </div>
      );
    } 
    
    // 0-79: Red Light
    else if (score !== null) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-destructive mb-4">
            <Ban className="w-8 h-8" />
            <h2 className="text-2xl font-bold">RED LIGHT</h2>
          </div>
          <h3 className="text-xl font-semibold">Your Result: {score}/199</h3>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              Abort mission immediately. This is exactly how marketing teams end up with 47 different tools that nobody uses while your CFO starts asking uncomfortable questions about budget allocation.
            </p>
            <p>
              Either the tool itself is trash, or you haven't done nearly enough research to justify this purchase, or you're buying it for all the wrong reasons. Do yourself a favor and walk away. Delete the demo recording from your downloads folder, unsubscribe from their drip campaign, and go focus on actually USING the tools you already have. Your future self (and your finance team) will thank you.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg mt-6 border border-border">
            <p className="text-sm italic text-foreground/70">
              P.S. Scored below 120 but your team is still pushing to buy it anyway? Forward them this assessment with your score attached and maybe CC your boss for good measure. Because when this inevitably goes sideways in six months and someone asks "why did we buy this again?", you're going to want receipts showing that you at least TRIED to pump the brakes on this decision.
            </p>
          </div>
        </div>
      );
    }

    // Fallback content (Score missing or invalid)
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-600"/> 160-199 points: GREEN LIGHT</h3>
          <p className="text-sm text-foreground/70">
            Congrats, you actually did your homework instead of just vibing your way through the buying process. The tool is legit, the vendor isn't trying to screw you over, and you have a real plan for implementation. Go ahead and buy it, use it, and hopefully it lives up to the hype. Then maybe send me a note letting me know this assessment saved you from wasting money on the three OTHER tools you were considering.
          </p>
        </div>
        <div className="border-t pt-6">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-yellow-600"/> 120-159 points: YELLOW LIGHT</h3>
          <p className="text-sm text-foreground/70">
            The tool MIGHT be good, but there are some gaps here... either in your vetting process or in the tool itself. I'm not saying run away screaming, but I AM saying you should probably pump the brakes before signing a 12-month contract. Do a proper trial if they offer one, get some more references from actual users (not just the cherry-picked case studies on their website), and ask harder questions. Make sure you're not just buying this because the demo made you feel things or because you saw someone you respect using it on LinkedIn.
          </p>
        </div>
        <div className="border-t pt-6">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-orange-600"/> 80-119 points: ORANGE LIGHT</h3>
          <p className="text-sm text-foreground/70">
            Look, I'm not going to tell you what to do with your money, but the odds of this tool turning into expensive shelfware are pretty damn high right now. You're not clear on the ROI, the vendor's support seems questionable, or you're trying to solve a problem that maybe doesn't actually exist in the way you think it does. Sleep on this decision for at least a week, and if you're still feeling the urge to buy it after that, run through this assessment again with fresh eyes. Or just wait six months and see if you still think you need it. (Spoiler: you probably won't.)
          </p>
        </div>
        <div className="border-t pt-6">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><Ban className="w-5 h-5 text-destructive"/> 0-79 points: RED LIGHT</h3>
          <p className="text-sm text-foreground/70">
            Abort mission immediately. This is exactly how marketing teams end up with 47 different tools that nobody uses while your CFO starts asking uncomfortable questions about budget allocation. Either the tool itself is trash, or you haven't done nearly enough research to justify this purchase, or you're buying it for all the wrong reasons. Do yourself a favor and walk away. Delete the demo recording from your downloads folder, unsubscribe from their drip campaign, and go focus on actually USING the tools you already have. Your future self (and your finance team) will thank you.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-lg">
            Keith Howard
          </Link>
          <div className="flex gap-6">
            <Link href="/about" className="text-sm hover:text-foreground/80">
              About
            </Link>
            <Link href="/services" className="text-sm hover:text-foreground/80">
              Services
            </Link>
            <Link href="/blog" className="text-sm hover:text-foreground/80">
              Blog
            </Link>
            <Link href="/contact" className="text-sm hover:text-foreground/80">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="flex-1 py-16 px-4 bg-muted/30">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Your Lemon Test Results</h1>
            <p className="text-lg text-foreground/70">
              Here is the verdict on your potential MarTech investment.
            </p>
          </div>

          <Card className="shadow-lg border-border/50 bg-background">
            <CardContent className="p-8 sm:p-10">
              {renderResult()}
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <Link href="/martech-lemon-test">
              <Button variant="outline" className="gap-2">
                Retake the Assessment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 mt-auto">
        <div className="container flex justify-center text-sm text-foreground/60">
          © 2025 Keith Howard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
