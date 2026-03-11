// ============================================
// Seek God Platform - Excel/CSV Parser Utility
// ============================================

import * as XLSX from 'xlsx';

export interface ParsedData {
  data: Record<string, string>[];
  columns: string[];
  errors: string[];
}

interface ColumnDetection {
  original: string;
  mapped: string;
  confidence: 'high' | 'medium' | 'low';
}

// Common column name patterns → database field mappings
const COLUMN_PATTERNS: { pattern: RegExp; field: string }[] = [
  { pattern: /^(full[_\s]?name|name|contact[_\s]?name|person)$/i, field: 'full_name' },
  { pattern: /^(first[_\s]?name|fname|given[_\s]?name)$/i, field: 'first_name' },
  { pattern: /^(last[_\s]?name|lname|surname|family[_\s]?name)$/i, field: 'last_name' },
  { pattern: /^(e[_\s-]?mail|email[_\s]?address)$/i, field: 'email' },
  { pattern: /^(phone|telephone|tel|mobile|cell|phone[_\s]?number)$/i, field: 'phone' },
  { pattern: /^(whatsapp|wa|whats[_\s]?app[_\s]?number)$/i, field: 'whatsapp' },
  { pattern: /^(source|origin|lead[_\s]?source|channel)$/i, field: 'source' },
  { pattern: /^(tier|financial[_\s]?tier|value|net[_\s]?worth)$/i, field: 'financial_tier' },
  { pattern: /^(notes?|comment|remarks|description)$/i, field: 'notes' },
  { pattern: /^(tags?|labels?|categories?)$/i, field: 'tags' },
  { pattern: /^(status|state|stage)$/i, field: 'status' },
  { pattern: /^(company|organisation|organization|org|employer)$/i, field: 'company' },
  { pattern: /^(title|job[_\s]?title|position|role)$/i, field: 'title' },
  { pattern: /^(city|town|location|address)$/i, field: 'city' },
  { pattern: /^(country|nation|region)$/i, field: 'country' },
];

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (flexible: allows +, spaces, dashes, parens)
const PHONE_REGEX = /^[+]?[\d\s\-().]{7,20}$/;

/**
 * Auto-detect column mappings based on header names.
 */
export function detectColumns(headers: string[]): ColumnDetection[] {
  return headers.map((header) => {
    const trimmed = header.trim();

    for (const { pattern, field } of COLUMN_PATTERNS) {
      if (pattern.test(trimmed)) {
        return { original: header, mapped: field, confidence: 'high' };
      }
    }

    // Fuzzy matching: check if header contains key terms
    const lower = trimmed.toLowerCase();
    if (lower.includes('name')) return { original: header, mapped: 'full_name', confidence: 'medium' };
    if (lower.includes('mail')) return { original: header, mapped: 'email', confidence: 'medium' };
    if (lower.includes('phone') || lower.includes('mobile')) return { original: header, mapped: 'phone', confidence: 'medium' };
    if (lower.includes('whatsapp')) return { original: header, mapped: 'whatsapp', confidence: 'medium' };

    return { original: header, mapped: '', confidence: 'low' };
  });
}

/**
 * Validate a single row of data.
 * Returns an array of error messages (empty if valid).
 */
function validateRow(row: Record<string, string>, rowIndex: number): string[] {
  const errors: string[] = [];

  // Validate email if present
  if (row.email && !EMAIL_REGEX.test(row.email.trim())) {
    errors.push(`Row ${rowIndex + 1}: Invalid email format "${row.email}"`);
  }

  // Validate phone if present
  if (row.phone && !PHONE_REGEX.test(row.phone.trim())) {
    errors.push(`Row ${rowIndex + 1}: Invalid phone format "${row.phone}"`);
  }

  // Validate whatsapp if present
  if (row.whatsapp && !PHONE_REGEX.test(row.whatsapp.trim())) {
    errors.push(`Row ${rowIndex + 1}: Invalid WhatsApp number format "${row.whatsapp}"`);
  }

  // Require at least a name or email
  if (!row.full_name && !row.first_name && !row.email) {
    errors.push(`Row ${rowIndex + 1}: Missing required field — name or email`);
  }

  return errors;
}

/**
 * Parse an Excel (.xlsx, .xls) or CSV file buffer into structured data.
 */
export function parseExcelBuffer(buffer: ArrayBuffer, filename: string): ParsedData {
  const errors: string[] = [];

  try {
    const workbook = XLSX.read(buffer, { type: 'array' });

    if (workbook.SheetNames.length === 0) {
      return { data: [], columns: [], errors: ['File contains no sheets'] };
    }

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
      defval: '',
      raw: false,
    });

    if (raw.length === 0) {
      return { data: [], columns: [], errors: ['Sheet is empty'] };
    }

    // Extract headers from first row
    const columns = Object.keys(raw[0]);

    // Detect column mappings
    const detections = detectColumns(columns);

    // Map rows to standardised field names
    const data: Record<string, string>[] = [];
    for (let i = 0; i < raw.length; i++) {
      const sourceRow = raw[i];
      const mappedRow: Record<string, string> = {};

      for (const detection of detections) {
        const value = sourceRow[detection.original];
        const key = detection.mapped || detection.original;
        mappedRow[key] = String(value ?? '').trim();
      }

      // If first_name + last_name but no full_name, combine them
      if (!mappedRow.full_name && (mappedRow.first_name || mappedRow.last_name)) {
        mappedRow.full_name = [mappedRow.first_name, mappedRow.last_name]
          .filter(Boolean)
          .join(' ')
          .trim();
      }

      // Validate row
      const rowErrors = validateRow(mappedRow, i);
      errors.push(...rowErrors);

      data.push(mappedRow);
    }

    return { data, columns, errors };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown parsing error';
    return {
      data: [],
      columns: [],
      errors: [`Failed to parse file "${filename}": ${message}`],
    };
  }
}

/**
 * Parse CSV text directly.
 */
export function parseCSVText(text: string, filename: string): ParsedData {
  try {
    const workbook = XLSX.read(text, { type: 'string' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const buffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    return parseExcelBuffer(buffer, filename);
  } catch {
    return {
      data: [],
      columns: [],
      errors: [`Failed to parse CSV file "${filename}"`],
    };
  }
}
