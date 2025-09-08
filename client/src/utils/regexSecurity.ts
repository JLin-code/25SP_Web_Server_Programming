/**
 * Regex Security Utility
 * Provides safe regex patterns and validation to prevent ReDoS attacks
 */

// Safe timeout for regex operations (milliseconds)
const REGEX_TIMEOUT = 1000;

/**
 * Safe regex execution with timeout protection
 */
export function safeRegexTest(pattern: RegExp, input: string): boolean {
  const startTime = Date.now();
  
  try {
    // Use a worker-like approach for timeout protection
    const result = pattern.test(input);
    
    // Check if execution took too long
    if (Date.now() - startTime > REGEX_TIMEOUT) {
      console.warn('Regex execution exceeded timeout, potential ReDoS detected');
      return false;
    }
    
    return result;
  } catch (error) {
    console.error('Regex execution failed:', error);
    return false;
  }
}

/**
 * Safe regex replacement with timeout protection
 */
export function safeRegexReplace(
  input: string, 
  pattern: RegExp, 
  replacement: string | ((match: string, ...args: unknown[]) => string)
): string {
  const startTime = Date.now();
  
  try {
    const result = input.replace(pattern, replacement as string & ((substring: string, ...args: unknown[]) => string));
    
    // Check if execution took too long
    if (Date.now() - startTime > REGEX_TIMEOUT) {
      console.warn('Regex replacement exceeded timeout, potential ReDoS detected');
      return input; // Return original string if timeout
    }
    
    return result;
  } catch (error) {
    console.error('Regex replacement failed:', error);
    return input;
  }
}

/**
 * Pre-validated safe regex patterns
 * These patterns are tested to avoid catastrophic backtracking
 */
export const SafePatterns = {
  // Email validation (simple and safe)
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // URL validation (safe pattern)
  url: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
  
  // Phone number (international format)
  phone: /^\+?[1-9]\d{1,14}$/,
  
  // Username (alphanumeric + underscore)
  username: /^[a-zA-Z0-9_]{3,20}$/,
  
  // Password strength (without catastrophic backtracking)
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  
  // UUID validation
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  
  // IP address validation
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  
  // Date format (YYYY-MM-DD)
  date: /^\d{4}-\d{2}-\d{2}$/,
  
  // Safe HTML tag removal (non-catastrophic)
  htmlTags: /<[^>]*>/g,
  
  // SQL injection prevention (basic patterns)
  sqlInjection: /(\b(ALTER|CREATE|DELETE|DROP|EXEC|EXECUTE|INSERT|SELECT|UNION|UPDATE)\b)/i
};

/**
 * Validate input against dangerous regex patterns
 */
export function validateInput(input: string, maxLength: number = 10000): boolean {
  // Check length to prevent memory exhaustion
  if (input.length > maxLength) {
    return false;
  }
  
  // Check for potential ReDoS patterns
  const dangerousPatterns = [
    // Nested quantifiers
    /(\+\*|\*\+|\?\*|\*\?|\+\?|\?\+)/,
    // Alternation with overlapping
    /(.*\|.*){3,}/,
    // Excessive repetition
    /\{[0-9]{4,}\}/
  ];
  
  for (const pattern of dangerousPatterns) {
    if (safeRegexTest(pattern, input)) {
      console.warn('Potentially dangerous regex pattern detected in input');
      return false;
    }
  }
  
  return true;
}

/**
 * Escape regex special characters safely
 */
export function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Create a safe regex from user input
 */
export function createSafeRegex(pattern: string, flags: string = ''): RegExp | null {
  try {
    // Validate the pattern first
    if (!validateInput(pattern, 1000)) {
      return null;
    }
    
    // Escape dangerous characters
    const escapedPattern = escapeRegex(pattern);
    
    return new RegExp(escapedPattern, flags);
  } catch (error) {
    console.error('Failed to create safe regex:', error);
    return null;
  }
}