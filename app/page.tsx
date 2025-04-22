import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Shield, Bell, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl">Uptime Monitor</span>
          </div>
          <Link href="/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10" />
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-8">
              Keep Your Websites Running 24/7
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Get instant alerts when your websites go down. Simple, reliable, and powerful uptime monitoring for modern businesses.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg h-12 px-8">
                  Start Monitoring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-time Monitoring</h3>
              <p className="text-gray-600">
                Monitor your websites every minute with our advanced monitoring system.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bell className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Alerts</h3>
              <p className="text-gray-600">
                Get notified immediately when your websites experience downtime.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Reliable Security</h3>
              <p className="text-gray-600">
                Enterprise-grade security to keep your monitoring data safe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 -z-10" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Monitoring Your Websites Today
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of businesses who trust our platform to keep their websites running smoothly.
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="font-semibold text-lg h-12 px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-indigo-600" />
            <span className="font-semibold text-lg">Uptime Monitor</span>
          </div>
          <div className="text-center text-gray-600">
            <p>© 2025 Uptime Monitor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}