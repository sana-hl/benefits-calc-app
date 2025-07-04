# MyBenefits Calculator v3.0

A comprehensive Universal Credit and benefits entitlement calculator for UK residents, featuring the latest 2025-26 benefit rates and enhanced Child Benefit calculations. This professional application helps users estimate their Universal Credit entitlement and discover other benefits they may be eligible for.

## ✨ Latest Features (v3.0)

### 🎨 Professional Red Color Scheme
- **Brand new design** based on #CC3300 color palette
- **Sophisticated gradients** from light tints to darker shades
- **Professional appearance** with improved visual hierarchy
- **Responsive design** that works perfectly on all devices

### 📊 Updated 2025-26 Benefit Rates
- **Latest government rates** sourced from official GOV.UK publications
- **CSV configuration system** for easy rate updates
- **Accurate calculations** following current UK government guidelines
- **Real-time rate lookup** from benefits configuration

### 💰 Enhanced Benefit Calculations
- **Universal Credit**: Complete calculation engine with 2025-26 rates
- **Child Benefit**: Full calculation including High Income Child Benefit Charge
- **Additional Benefits**: Council Tax Support, Free School Meals, NHS benefits
- **Professional currency formatting** with comma separators (£1,500.38)

### 🔐 User Account System
- Create account with secure authentication
- Guest calculation option for privacy
- Future-ready for data storage with user permissions

### 📱 Enhanced User Experience
- **Updated homepage text**: "Find out what financial support you could get"
- **Step-by-step guided process** (7 intuitive steps)
- **Progress tracking** with visual progress bar
- **Detailed calculation breakdown** with clear explanations
- **Professional results display** with next steps guidance

### 🏠 Improved Data Collection
- **Personal details** with enhanced "Other" nationality option
- **Household composition** with dynamic child age inputs
- **Separated income sections** for main client and partner
- **Housing costs** (rent, mortgage, council tax)
- **Simplified childcare** cost collection
- **Health conditions and disabilities**
- **Streamlined savings** and capital assessment (removed vehicles/jewelry)

## 🔄 What's New in v3.0

### Design & Branding
✅ **New #CC3300 color scheme** with professional gradients  
✅ **Updated homepage messaging** - "Find out what financial support you could get"  
✅ **Enhanced visual hierarchy** with darker headers and lighter backgrounds  
✅ **Professional red-themed interface** throughout  

### Benefits Configuration System
✅ **CSV configuration file** with 2025-26 rates from GOV.UK  
✅ **Automatic rate lookup** from configuration  
✅ **Source references** for all benefit amounts  
✅ **Easy maintenance** and rate updates  

### Child Benefit Integration
✅ **Complete Child Benefit calculator** with HICBC  
✅ **Separate green box** displaying Child Benefit entitlement  
✅ **High Income Child Benefit Charge** calculations  
✅ **Monthly rate conversions** from weekly amounts  

### Enhanced Calculations
✅ **2025-26 Universal Credit rates** (updated April 2025)  
✅ **Accurate work allowances** and taper calculations  
✅ **Improved savings thresholds** (£6k-£16k rule)  
✅ **Professional currency display** with proper formatting  

## 📋 Benefits Configuration (2025-26)

The app uses a CSV configuration file with the latest rates:

### Universal Credit Monthly Rates
- **Single under 25**: £316.98
- **Single 25+**: £400.14  
- **Couple both under 25**: £497.55
- **Couple one/both 25+**: £628.10

### Child Elements
- **First child (born before April 2017)**: £339.00
- **First child (born after April 2017)**: £292.81
- **Additional children**: £292.81

### Work Allowances
- **Higher (no housing)**: £684.00
- **Lower (with housing)**: £411.00
- **Taper rate**: 55%

### Child Benefit Monthly Rates
- **First child**: £112.88 (£26.05 weekly)
- **Additional children**: £74.75 (£17.25 weekly)
- **HICBC threshold**: £60,000-£80,000

## Tech Stack

- **Frontend**: React 18, Tailwind CSS with custom red color scheme
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Configuration**: CSV-based benefits rates system
- **Deployment**: Ready for Netlify, Vercel, or GitHub Pages

## Quick Start

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Installation

1. **Clone or download the project files**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
mybenefits-calculator-v3/
├── public/
│   ├── index.html          # Main HTML template
│   └── manifest.json            # PWA manifest
├── src/
│   ├── App.js             # Main React component with v3.0 features
│   ├── index.js           # Entry point
│   └── index.css          # Tailwind CSS imports
├── benefits-config.csv    # 2025-26 benefit rates configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Custom red color scheme
└── README.md             # This file
```

## Benefits Calculation Logic

The calculator follows UK government guidelines with 2025-26 rates:

### Universal Credit Calculation
1. **Standard Allowance**: Based on age and relationship status
2. **Housing Element**: Covers rent up to Local Housing Allowance
3. **Child Element**: £339.00 first child (pre-2017), £292.81 subsequent
4. **Childcare Element**: 85% of costs up to limits (£1,031.88 one child, £1,768.94 two+)
5. **Disability Elements**: LCW £158.76, LCWRA £423.27
6. **Work Allowance**: £684.00 (no housing) or £411.00 (with housing)
7. **Taper Rate**: 55% on earnings above work allowance
8. **Savings Rule**: Benefits reduce if savings exceed £6,000

### Child Benefit Calculation
1. **First Child**: £112.88 monthly (£26.05 weekly)
2. **Additional Children**: £74.75 monthly (£17.25 weekly)
3. **High Income Charge**: Starts at £60,000 annual income
4. **Full Clawback**: At £80,000 annual income

### Additional Benefits Detection
- Council Tax Support eligibility
- Free School Meals qualification
- NHS benefits availability
- Disability-specific benefit recommendations

## 🎯 Key Features

### Professional Red Design
- Clean, modern interface based on #CC3300
- Professional gradients and color hierarchy
- Responsive design for all devices
- Trust-building visual elements

### Accurate Rate System
- CSV-based configuration for easy updates
- Official GOV.UK sourced rates
- Automatic lookups from benefits config
- Source documentation for transparency

### Smart Calculations
- UK government compliant calculation engine
- Real-time results with detailed breakdown
- Professional currency formatting
- Clear display of total earned income
- Separate Child Benefit calculations

### Enhanced User Journey
- Improved homepage messaging
- Separated income collection for couples
- Dynamic child age collection
- Enhanced nationality field options
- Streamlined savings assessment

## 🔧 Configuration System

The `benefits-config.csv` file contains all benefit rates with:
- **Benefit Type**: Universal Credit, Child Benefit, etc.
- **Element Name**: Specific component (e.g., standard_allowance_single_25_over)
- **Amount**: Current rate value
- **Frequency**: Monthly, weekly, annual, percentage
- **Source**: GOV.UK or other official source
- **Reference URL**: Direct link to official documentation
- **Notes**: Additional context and effective dates

This system allows for:
- Easy rate updates when government changes rates
- Full transparency on data sources
- Maintainable codebase
- Audit trail for all calculations

## Important Disclaimers

- This calculator provides estimates only based on 2025-26 rates
- Actual entitlement may differ based on individual circumstances
- Always check official government sources (gov.uk) for current rates
- Professional advice should be sought for complex situations
- Local Housing Allowance rates vary by area and are not included in estimates

## Contributing

This is an open-source project. Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Update rates in CSV file if needed
4. Test thoroughly with various scenarios
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
- Check the GitHub issues page
- Refer to official government guidance at gov.uk
- Contact local Citizens Advice for personal benefit advice

## Deployment

### Deploy to Netlify (Recommended)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Option A: Drag and drop the `build` folder to [netlify.com/drop](https://netlify.com/drop)
   - Option B: Install Netlify CLI and run:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod --dir=build
     ```

### Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   npm run build
   vercel --prod
   ```

## Changelog

### Version 3.0.0 (Latest)
- **NEW**: #CC3300 red color scheme throughout application
- **NEW**: CSV-based benefits configuration system with 2025-26 rates
- **NEW**: Complete Child Benefit calculator with HICBC
- **NEW**: Separate green box for Child Benefit display
- **UPDATED**: Homepage text to "Find out what financial support you could get"
- **UPDATED**: All benefit rates to official 2025-26 values
- **UPDATED**: Enhanced nationality field with "Other" text input
- **UPDATED**: Removed vehicles and jewelry from savings section
- **UPDATED**: Professional currency formatting with comma separators
- **IMPROVED**: Visual hierarchy with darker headers
- **IMPROVED**: Color consistency throughout interface
- **IMPROVED**: Source documentation for all rates

### Version 2.0.0
- Complete UI overhaul with EntitledTo-inspired design
- Light blue professional color scheme
- Separated income collection for main client and partner
- Dynamic child age inputs
- Enhanced nationality field with "Other" option
- Simplified savings section
- Professional currency formatting with comma separators
- Total earned income display in results
- Improved landing page with hero section
- Better form styling and user experience

### Version 1.0.0
- Initial release
- Complete Universal Credit calculator
- User account system
- Mobile-responsive design
- Additional benefits detection

---

**⚖️ Legal Notice**: This calculator is for estimation purposes only using 2025-26 benefit rates. Official benefit assessments must be made by the Department for Work and Pensions (DWP). Always consult official government sources for the most current information.

**🔗 Rate Sources**: All benefit rates sourced from official GOV.UK publications and legislation, with direct links provided in the configuration file for transparency and verification.