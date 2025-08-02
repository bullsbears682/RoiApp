# ROI Calculator Pro

A professional, sales-ready ROI calculator web application built with Next.js, TypeScript, and modern UI components. Calculate precise business ROI with country-specific tax rates, industry benchmarks, and actionable insights.

## 🚀 Features

### Core Functionality
- **35+ Business Types** with 7 detailed scenarios each (245+ total scenarios)
- **25+ Countries** with accurate 2025 tax rates and financial data
- **Real-time ROI calculations** with dynamic input validation
- **Interactive charts** and visualizations using Recharts
- **Country-specific tax compliance** with VAT, corporate tax, and payroll tax
- **Industry benchmarking** and performance comparisons
- **Risk analysis** and personalized recommendations

### Business Types Included
- **Tech Startups** (SaaS MVP, Mobile Apps, AI Tools, FinTech, EdTech, HealthTech, Marketplace)
- **E-commerce** (Dropshipping, Private Label, Subscription Box, Digital Products, Fashion, Electronics)
- **SaaS Business** (Enterprise, SMB, Productivity Tools, Vertical SaaS, API Services, CRM, Analytics)
- **Agency & Consulting** (Digital Marketing, Web Development, Management, Creative, SEO, PR, Accounting)
- **Freelancers** (Designers, Developers, Copywriters, Consultants, Photographers, Video Editors, Translators)
- **Restaurant & Food** (Quick Service, Fine Dining, Food Trucks, Catering, Coffee Shops, Meal Prep, Bakeries)
- **Healthcare Services** (Private Practice, Dental, Physical Therapy, Telehealth, Wellness, Mental Health, Veterinary)
- **Education & Training** (Online Courses, Tutoring, Language Schools, Coding Bootcamps, Daycare, Music, Driving)
- **Manufacturing** (Custom, Food, Textile, Electronics, Packaging, Automotive Parts, Furniture)
- **Real Estate** (Property Management, Agency, Development, Commercial Leasing, Inspection, Flipping, Vacation Rentals)
- **Fitness & Wellness** (Gyms, Personal Training, Yoga, CrossFit, Pilates, Martial Arts, Dance Studios)

### Countries Supported
United States, United Kingdom, Canada, Germany, France, Australia, Japan, Singapore, Netherlands, Switzerland, Sweden, Denmark, Norway, Finland, Spain, Italy, Belgium, Austria, Ireland, New Zealand, South Korea, Mexico, Brazil, Argentina, India, China

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, ShadCN UI Components
- **Charts**: Recharts
- **Forms**: React Hook Form, Zod validation
- **Database**: Prisma ORM, PostgreSQL
- **Icons**: Lucide React
- **Animations**: CSS animations, Tailwind transitions

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd roi-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database URL and other configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/roi_calculator?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   JWT_SECRET="your-jwt-secret-key-here"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
roi-calculator/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   ├── ui/             # ShadCN UI components
│   │   ├── roi-calculator-form.tsx
│   │   ├── roi-results.tsx
│   │   └── ...
│   ├── data/               # Business and country data
│   │   ├── businessTypes.ts
│   │   └── countries.ts
│   ├── lib/                # Utilities and calculations
│   │   ├── roiCalculator.ts
│   │   └── utils.ts
│   └── ...
├── prisma/                 # Database schema
├── public/                 # Static assets
└── ...
```

## 🎯 Usage

1. **Select Your Business Context**
   - Choose your country for accurate tax calculations
   - Select your business type from 11 categories
   - Pick a specific scenario that matches your business model

2. **Enter Financial Data**
   - Monthly revenue and gross margin
   - Marketing budget and operating expenses
   - Employee costs and growth projections
   - Optional: CAC, AOV, churn rate for detailed analysis

3. **View Results**
   - **Overview**: Key metrics and financial summary
   - **Projections**: Revenue and ROI growth charts
   - **Breakdown**: Cost analysis and pie charts
   - **Insights**: Industry comparisons, risk factors, and recommendations

4. **Export & Share**
   - Export results to PDF
   - Email results to stakeholders
   - Save calculations for future reference

## 📊 Key Metrics Calculated

- **ROI (Return on Investment)**: Percentage return on investment
- **Net Profit**: After-tax profit including all expenses
- **Break-even Point**: Time to profitability
- **Customer Lifetime Value (LTV)**: For subscription businesses
- **Payback Period**: Time to recover customer acquisition costs
- **Effective Tax Rate**: Country-specific tax burden
- **Industry Benchmarks**: Performance vs. industry standards

## 🌍 Tax Compliance

The calculator includes accurate 2025 tax rates for:
- Corporate income tax
- Value Added Tax (VAT) / Goods and Services Tax (GST)
- Payroll and social security taxes
- Capital gains and dividend taxes
- Country-specific deductions and credits

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t roi-calculator .
docker run -p 3000:3000 roi-calculator
```

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@roicalculatorpro.com or create an issue in the repository.

## 🔮 Future Enhancements

- [ ] User authentication and saved calculations
- [ ] Advanced scenario modeling
- [ ] Multi-currency support
- [ ] API access for integrations
- [ ] White-label solutions
- [ ] Mobile app
- [ ] Collaborative features
- [ ] Advanced reporting and analytics

---

**ROI Calculator Pro** - Professional business ROI analysis with global tax compliance and industry-specific insights.

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
