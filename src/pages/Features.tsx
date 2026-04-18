import { Navbar } from "@/components/Navbar";

const Features = () => {
  return (
    <>
      {/* ✅ Navbar added properly */}
      <Navbar />

      {/* ✅ Consistent layout */}
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-4">
          Features of <span className="text-primary">AccessRoute</span>
        </h1>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          A smart navigation system designed to provide accessible, safe, and inclusive route guidance for everyone.
        </p>

        {/* How It Works */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            <div className="p-4 rounded-xl bg-card shadow-sm">📍<p>User Input</p></div>
            <div className="p-4 rounded-xl bg-card shadow-sm">🧭<p>Geocoding</p></div>
            <div className="p-4 rounded-xl bg-card shadow-sm">🗺️<p>Route Generation</p></div>
            <div className="p-4 rounded-xl bg-card shadow-sm">♿<p>Accessibility Filtering</p></div>
            <div className="p-4 rounded-xl bg-card shadow-sm">📊<p>Final Output</p></div>
          </div>
        </div>

        {/* Core Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">

          {[
            {
              title: "Accessibility-First Routing",
              desc: "Routes are generated considering accessibility instead of shortest distance.",
            },
            {
              title: "Barrier Avoidance",
              desc: "Avoids stairs and unsafe paths for better navigation.",
            },
            {
              title: "Real-Time Map",
              desc: "Shows routes using real map data.",
            },
            {
              title: "Voice Navigation",
              desc: "Provides spoken directions for users.",
            },
            {
              title: "Issue Reporting",
              desc: "Users can report accessibility problems.",
            },
            {
              title: "Accessibility Score",
              desc: "Each route is rated based on accessibility.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}

        </div>

        {/* Comparison */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Why AccessRoute is Better
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border bg-card shadow-sm">
              <h3 className="font-bold mb-2">Normal Maps</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>❌ Shortest path only</li>
                <li>❌ No accessibility consideration</li>
                <li>❌ Includes stairs and obstacles</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border bg-primary/5 shadow-sm">
              <h3 className="font-bold mb-2 text-primary">AccessRoute</h3>
              <ul className="text-sm space-y-1">
                <li>✅ Accessibility-first routing</li>
                <li>✅ Barrier-free navigation</li>
                <li>✅ Designed for disabled users</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Future Enhancements */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Future Enhancements
          </h2>

          <ul className="text-muted-foreground space-y-2 text-center">
            <li>🚀 Real-time accessibility data integration</li>
            <li>📍 Live GPS-based navigation</li>
            <li>📊 AI-based smart route recommendations</li>
            <li>🗺️ Indoor navigation support</li>
          </ul>
        </div>

      </div>
    </>
  );
};

export default Features;