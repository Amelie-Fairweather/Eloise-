import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get Airtable credentials from environment variables
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    let airtableTableId = process.env.AIRTABLE_TABLE_ID || 'tblYourTableId';

    // Extract just the table ID if view ID is included (format: tblXXX/viwYYY)
    if (airtableTableId.includes('/')) {
      airtableTableId = airtableTableId.split('/')[0];
    }

    if (!airtableApiKey || !airtableBaseId) {
      console.error('Airtable credentials not configured');
      return NextResponse.json(
        { error: 'Airtable not configured' },
        { status: 500 }
      );
    }

    // Prepare the payload for Airtable
    // Airtable expects field names to match exactly what's in your table
    const payload = {
      records: [
        {
          fields: {
            'Name': name,
            'Email': email,
            'Phone': phone,
            'Brief des': message,
          }
        }
      ]
    };

    // Airtable API endpoint
    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`;

    // Prepare headers for Airtable
    const headers: HeadersInit = {
      'Authorization': `Bearer ${airtableApiKey}`,
      'Content-Type': 'application/json',
    };

    // Send to Airtable
    const response = await fetch(airtableUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('Airtable API Error:', response.status, responseData);
      return NextResponse.json(
        { error: responseData.error?.message || 'Failed to submit form to Airtable' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Form submitted successfully',
        data: responseData
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process form submission' },
      { status: 500 }
    );
  }
}

