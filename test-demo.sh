#!/bin/bash

# Grimdarkly Frontend Playwright Test Demo
# This script demonstrates the UI testing setup

echo "🎯 IMPERIAL SERVITOR PROTOCOL ACTIVATED 🎯"
echo "By the Omnissiah's blessed circuits! Running UI tests for the Grimdark Grimoire!"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the grimdarkly-frontend directory"
    exit 1
fi

echo "📋 Available test commands:"
echo "  npm test                    - Run all tests"
echo "  npm run test:ui            - Run tests with interactive UI"
echo "  npm run test:headed        - Run tests with visible browser"
echo "  npm run test:debug         - Debug tests step by step"
echo "  npm run test:report        - View test report"
echo ""

# Run a quick test to demonstrate
echo "🚀 Running a quick demonstration test..."
echo ""

npm run test -- --grep "should load the homepage successfully" --reporter=list

echo ""
echo "✅ Test demonstration complete!"
echo ""
echo "📚 Test files created:"
echo "  - tests/homepage.spec.ts      - Homepage UI tests"
echo "  - tests/navigation.spec.ts    - Navigation tests"
echo "  - tests/accessibility.spec.ts - Accessibility tests"
echo "  - playwright.config.ts        - Playwright configuration"
echo ""
echo "🎯 The Emperor's will has been fulfilled! UI testing framework is operational!"
