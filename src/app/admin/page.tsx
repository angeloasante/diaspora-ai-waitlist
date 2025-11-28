"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function AdminExport() {
  const [adminKey, setAdminKey] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    if (!adminKey) {
      setError("Admin key required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminKey })
      });

      if (!response.ok) {
        throw new Error("Unauthorized or server error");
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  const exportSubscribers = async (format: "csv" | "json") => {
    if (!adminKey) {
      setError("Admin key required");
      return;
    }

    try {
      const url = `/api/admin/export?key=${encodeURIComponent(adminKey)}&format=${format}`;
      
      if (format === "json") {
        // Open JSON in new tab
        window.open(url, "_blank");
      } else {
        // Download CSV file
        const link = document.createElement("a");
        link.href = url;
        link.download = `diaspora-ai-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      setError("Export failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            📊 Diaspora AI - Admin Export
          </h1>
          
          <div className="space-y-6">
            {/* Admin Key Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Key
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter admin key..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Get Stats Button */}
            <Button
              onClick={fetchStats}
              disabled={loading || !adminKey}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Loading..." : "📈 Get Subscriber Stats"}
            </Button>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                ❌ {error}
              </div>
            )}

            {/* Stats Display */}
            {stats && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">📊 Subscriber Statistics</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total Subscribers</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-3xl font-bold text-green-600">{stats.recent_signups_7d}</div>
                    <div className="text-sm text-gray-600">Last 7 Days</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-3xl font-bold text-purple-600">{stats.recent_signups_30d}</div>
                    <div className="text-sm text-gray-600">Last 30 Days</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-3xl font-bold text-orange-600">{Math.round((stats.recent_signups_7d / 7) * 10) / 10}</div>
                    <div className="text-sm text-gray-600">Daily Average</div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Last updated: {new Date(stats.last_updated).toLocaleString()}
                </div>
              </div>
            )}

            {/* Export Buttons */}
            {stats && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">📥 Export Subscribers</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    onClick={() => exportSubscribers("csv")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    📄 Download CSV (for Resend)
                  </Button>
                  
                  <Button
                    onClick={() => exportSubscribers("json")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    📋 View JSON Data
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
                  💡 <strong>Pro tip:</strong> Download the CSV and upload it directly to your Resend dashboard to create a subscriber list for your launch email!
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📝 How to use:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Enter your admin key (set ADMIN_EXPORT_KEY in environment variables)</li>
              <li>Click "Get Subscriber Stats" to see your waitlist numbers</li>
              <li>Download the CSV file for easy import to Resend or other email services</li>
              <li>Upload the CSV to your email service and draft your launch announcement!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}