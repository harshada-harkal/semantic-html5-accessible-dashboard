# Accessibility Audit Report

## Website Audited

https://www.india.gov.in/

## Audit Tools

- Google Chrome
- Lighthouse
- Keyboard-only navigation
- W3C HTML Validator

## Accessibility Issues Identified

### 1. Keyboard Navigation
Tested website navigation using keyboard-only interaction.
Focus movement and interactive elements were checked.

### 2. Form Accessibility
Form controls were checked for labels and accessible names.

### 3. Semantic Structure
The page structure was reviewed for semantic HTML elements
such as header, nav, main, section, article, aside and footer.

### 4. Footer Accessibility
The website footer was reviewed for navigation links and structure.

### 5. Modal Accessibility
Modal/dialog behaviour and keyboard accessibility were reviewed.

## Evidence

Screenshots are available in the `screenshots/` directory.

## Validation

The project HTML was checked using the W3C Markup Validation Service.

## Recommendations

- Provide clear keyboard focus indicators.
- Ensure all interactive elements are keyboard accessible.
- Use semantic HTML5 elements.
- Provide proper labels for form controls.
- Maintain logical heading hierarchy.
- Ensure sufficient colour contrast.
- Make dialogs accessible to keyboard and screen-reader users.

## Conclusion

The audit identified accessibility considerations related to
keyboard navigation, semantic structure, forms, footer navigation,
and modal interaction.

semantic-html5-accessible-dashboard/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── pages/
│   ├── dashboard.html
│   ├── reports.html
│   └── users.html
│
├── screenshots/
│   ├── keyboard-navigation-1.png
│   ├── keyboard-navigation-2.png
│   ├── model-dialog.png
│   └── w3c-validation.png
│
└── docs/
    └── audit-report.md
