'use client';

import { useState, useCallback, useRef } from 'react';
import { cn, formatDate } from '@/lib/utils';
import { UploadResult } from '@/types';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Trash2,
  Download,
  Loader2,
  ChevronDown,
} from 'lucide-react';

interface ColumnMapping {
  excelColumn: string;
  dbField: string;
}

const DB_FIELDS = [
  { value: '', label: 'Skip this column' },
  { value: 'full_name', label: 'Full Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'source', label: 'Source' },
  { value: 'financial_tier', label: 'Financial Tier' },
  { value: 'notes', label: 'Notes' },
  { value: 'tags', label: 'Tags' },
];

const mockUploadHistory: (UploadResult & { date: string })[] = [
  { filename: 'contacts_batch_march.xlsx', total_rows: 250, successful: 242, failed: 8, errors: ['Row 45: Invalid email', 'Row 102: Duplicate entry'], date: '2026-03-08T10:00:00Z' },
  { filename: 'high_value_donors.csv', total_rows: 85, successful: 85, failed: 0, errors: [], date: '2026-03-05T14:00:00Z' },
  { filename: 'event_contacts_feb.xlsx', total_rows: 180, successful: 175, failed: 5, errors: ['Row 12: Missing name field'], date: '2026-02-28T09:00:00Z' },
];

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [columnMappings, setColumnMappings] = useState<ColumnMapping[]>([]);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<UploadResult | null>(null);
  const [step, setStep] = useState<'upload' | 'preview' | 'mapping' | 'importing' | 'complete'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    try {
      const XLSX = (await import('xlsx'));
      const data = await f.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 }) as string[][];

      if (jsonData.length > 0) {
        const hdrs = jsonData[0].map(h => String(h || ''));
        setHeaders(hdrs);
        setPreviewData(jsonData.slice(1, 6));
        setColumnMappings(hdrs.map(h => ({
          excelColumn: h,
          dbField: autoMapColumn(h),
        })));
        setStep('preview');
      }
    } catch {
      alert('Failed to parse file. Please ensure it is a valid Excel or CSV file.');
    }
  }, []);

  const autoMapColumn = (header: string): string => {
    const h = header.toLowerCase().trim();
    if (h.includes('name') || h.includes('full name')) return 'full_name';
    if (h.includes('email') || h.includes('e-mail')) return 'email';
    if (h.includes('phone') || h.includes('tel')) return 'phone';
    if (h.includes('whatsapp') || h.includes('wa')) return 'whatsapp';
    if (h.includes('source') || h.includes('origin')) return 'source';
    if (h.includes('tier') || h.includes('value') || h.includes('financial')) return 'financial_tier';
    if (h.includes('note') || h.includes('comment')) return 'notes';
    if (h.includes('tag') || h.includes('label')) return 'tags';
    return '';
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const updateMapping = (index: number, dbField: string) => {
    setColumnMappings(prev => prev.map((m, i) => i === index ? { ...m, dbField } : m));
  };

  const startImport = async () => {
    setStep('importing');
    setImporting(true);
    setImportProgress(0);

    // Simulate import progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(r => setTimeout(r, 100));
      setImportProgress(i);
    }

    setImporting(false);
    setImportResult({
      filename: file?.name || 'unknown',
      total_rows: previewData.length > 0 ? Math.floor(Math.random() * 200) + 50 : 0,
      successful: 0,
      failed: 0,
      errors: [],
    });
    // Fill in realistic numbers
    const total = Math.floor(Math.random() * 200) + 50;
    const failed = Math.floor(Math.random() * 5);
    setImportResult({
      filename: file?.name || 'unknown',
      total_rows: total,
      successful: total - failed,
      failed,
      errors: failed > 0 ? ['Row 23: Invalid email format', 'Row 67: Duplicate phone number'] : [],
    });
    setStep('complete');
  };

  const reset = () => {
    setFile(null);
    setPreviewData([]);
    setHeaders([]);
    setColumnMappings([]);
    setImportResult(null);
    setStep('upload');
    setImportProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display">Upload Data</h1>
        <p className="text-muted-foreground text-sm mt-1">Import contacts from Excel or CSV files</p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center gap-2 text-sm">
        {['Upload', 'Preview', 'Map Columns', 'Import'].map((label, i) => {
          const steps = ['upload', 'preview', 'mapping', 'importing'];
          const currentIdx = steps.indexOf(step === 'complete' ? 'importing' : step);
          const active = i <= currentIdx;
          return (
            <div key={label} className="flex items-center gap-2">
              {i > 0 && <div className={cn('w-8 h-px', active ? 'bg-primary' : 'bg-border')} />}
              <div className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium',
                active ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
              )}>
                <span className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center text-xs',
                  active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}>
                  {step === 'complete' && i === 3 ? '✓' : i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Zone */}
      {step === 'upload' && (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all',
            isDragging
              ? 'border-primary bg-primary/5 scale-[1.01]'
              : 'border-border hover:border-primary/50 hover:bg-muted/30'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={onFileSelect}
            className="hidden"
          />
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg font-medium mb-1">Drop your file here, or click to browse</p>
            <p className="text-sm text-muted-foreground">Supports .xlsx, .xls, and .csv files</p>
          </div>
        </div>
      )}

      {/* Preview */}
      {step === 'preview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{file?.name}</p>
                <p className="text-xs text-muted-foreground">{headers.length} columns detected &middot; Preview of first 5 rows</p>
              </div>
            </div>
            <button onClick={reset} className="text-sm text-muted-foreground hover:text-destructive flex items-center gap-1">
              <Trash2 className="w-4 h-4" /> Remove
            </button>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {headers.map((h, i) => (
                    <th key={i} className="text-left py-3 px-4 font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, ri) => (
                  <tr key={ri} className="border-b border-border/50">
                    {headers.map((_, ci) => (
                      <td key={ci} className="py-2.5 px-4 whitespace-nowrap text-muted-foreground">
                        {row[ci] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setStep('mapping')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Continue to Column Mapping <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Column Mapping */}
      {step === 'mapping' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Map each Excel column to a database field. Columns mapped to &quot;Skip&quot; will be ignored.</p>
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {columnMappings.map((mapping, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">{mapping.excelColumn}</p>
                  <p className="text-xs text-muted-foreground">Column {i + 1}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1">
                  <select
                    value={mapping.dbField}
                    onChange={(e) => updateMapping(i, e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {DB_FIELDS.map(f => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setStep('preview')}
              className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
            >
              Back
            </button>
            <button
              onClick={startImport}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Start Import
            </button>
          </div>
        </div>
      )}

      {/* Importing Progress */}
      {step === 'importing' && (
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
          <p className="font-medium mb-2">Importing contacts...</p>
          <div className="w-full max-w-md mx-auto h-3 bg-muted rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${importProgress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{importProgress}% complete</p>
        </div>
      )}

      {/* Import Complete */}
      {step === 'complete' && importResult && (
        <div className="space-y-4">
          <div className={cn(
            'rounded-xl p-6 border',
            importResult.failed === 0
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-yellow-50 border-yellow-200'
          )}>
            <div className="flex items-start gap-3">
              {importResult.failed === 0
                ? <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                : <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              }
              <div>
                <p className="font-semibold text-lg">
                  {importResult.failed === 0 ? 'Import Successful!' : 'Import Completed with Warnings'}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-emerald-700">{importResult.successful} imported</span>
                  {importResult.failed > 0 && (
                    <span className="text-red-600">{importResult.failed} failed</span>
                  )}
                  <span className="text-muted-foreground">{importResult.total_rows} total rows</span>
                </div>
                {importResult.errors.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {importResult.errors.map((err, i) => (
                      <p key={i} className="text-xs text-red-600 flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> {err}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Upload className="w-4 h-4" /> Upload Another File
          </button>
        </div>
      )}

      {/* Upload History */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-base font-semibold mb-4">Upload History</h3>
        <div className="space-y-3">
          {mockUploadHistory.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
              <FileSpreadsheet className="w-9 h-9 text-primary/60 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.filename}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(item.date)} &middot; {item.total_rows} rows
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-emerald-600 font-medium">{item.successful} ok</span>
                {item.failed > 0 && (
                  <span className="text-xs text-red-500 font-medium">{item.failed} failed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
