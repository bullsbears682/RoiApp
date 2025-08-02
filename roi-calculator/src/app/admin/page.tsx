// Temporarily disabled for debugging - will re-enable with database
export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mb-8">
          Admin features will be available once database is configured.
        </p>
        <a 
          href="/"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
        >
          Back to ROI Calculator
        </a>
      </div>
    </div>
  );
}