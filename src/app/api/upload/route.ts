import { NextRequest, NextResponse } from 'next/server';
import { parseExcelBuffer } from '@/lib/excel-parser';

// POST /api/upload — parse uploaded Excel/CSV file
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: 'No file provided. Upload a .xlsx, .xls, or .csv file.' },
        { status: 400 }
      );
    }

    const filename = (file as File).name || 'upload';
    const ext = filename.split('.').pop()?.toLowerCase();

    if (!ext || !['xlsx', 'xls', 'csv'].includes(ext)) {
      return NextResponse.json(
        { error: 'Invalid file type. Supported formats: .xlsx, .xls, .csv' },
        { status: 400 }
      );
    }

    // Size check: max 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const parsed = parseExcelBuffer(buffer, filename);

    const hasErrors = parsed.errors.length > 0;
    const validRows = parsed.data.length - parsed.errors.filter(e => e.startsWith('Row')).length;

    return NextResponse.json({
      filename,
      total_rows: parsed.data.length,
      valid_rows: validRows,
      columns_detected: parsed.columns,
      errors: parsed.errors,
      preview: parsed.data.slice(0, 10),
      data: parsed.data,
      status: hasErrors ? 'completed_with_warnings' : 'success',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to process file';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
