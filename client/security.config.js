/**
 * Security Configuration for Babel and Build Process
 * Prevents RegExp vulnerabilities and other security issues
 */

module.exports = {
  // Babel security settings
  babel: {
    // Exclude problematic transforms that can generate vulnerable RegExp
    excludeTransforms: [
      'transform-named-capturing-groups-regex',
      'transform-unicode-sets-regex'
    ],
    
    // Safe regex options
    regexOptions: {
      unicodeFlag: false,
      dotAllFlag: false,
      namedGroups: false
    }
  },
  
  // Build security settings
  build: {
    // Prevent large bundle sizes that could indicate ReDoS patterns
    maxBundleSize: '5MB',
    
    // Security headers for development server
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'"
    }
  },
  
  // Regex validation rules
  regex: {
    // Maximum allowed regex complexity
    maxComplexity: 100,
    
    // Timeout for regex operations (ms)
    timeout: 1000,
    
    // Banned regex patterns that can cause ReDoS
    bannedPatterns: [
      // Nested quantifiers
      /(\+\*|\*\+|\?\*|\*\?|\+\?|\?\+)/,
      // Excessive alternation
      /(.*\|.*){5,}/,
      // Large repetition counts
      /\{[0-9]{4,}\}/,
      // Catastrophic backtracking patterns
      /(a+)+/,
      /(a*)*$/,
      /(a|a)*$/
    ]
  },
  
  // Dependency security
  dependencies: {
    // Known vulnerable packages to avoid
    vulnerablePackages: [
      'babel-plugin-transform-unicode-regex@<7.25.0',
      '@babel/core@<7.26.0'
    ],
    
    // Recommended secure alternatives
    secureAlternatives: {
      'babel-plugin-transform-unicode-regex': '@babel/plugin-transform-unicode-regex@^7.25.0'
    }
  }
};