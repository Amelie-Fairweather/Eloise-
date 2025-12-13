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

    // Debug: Log which variables are missing (without exposing values)
    if (!airtableApiKey || !airtableBaseId) {
      console.error('Airtable credentials not configured:', {
        hasApiKey: !!airtableApiKey,
        hasBaseId: !!airtableBaseId,
        hasTableId: !!airtableTableId,
        envKeys: Object.keys(process.env).filter(key => key.includes('AIRTABLE'))
      });
      return NextResponse.json(
        { 
          error: 'Airtable not configured',
          details: 'Missing environment variables. Please add AIRTABLE_API_KEY, AIRTABLE_BASE_ID, and AIRTABLE_TABLE_ID in Vercel dashboard.'
        },
        { status: 500 }
      );
    }

    // Prepare the payload for Airtable
    // Airtable expects field names to match exactly what's in your table
    // Based on the Airtable table structure: Name, Email, Phone, Brief description
    const payload = {
      records: [
        {
          fields: {
            'Name': name,
            'Email': email,
            'Phone': phone,
            'Brief description': message,
          }
        }
      ]
    };

    // Airtable API endpoint
    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`;

    console.log('Submitting to Airtable:', {
      baseId: airtableBaseId,
      tableId: airtableTableId,
      url: airtableUrl,
      payload: payload
    });

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
      console.error('Airtable API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: responseData,
        url: airtableUrl,
        baseId: airtableBaseId,
        tableId: airtableTableId
      });
      
      // Provide helpful error messages
      let errorMessage = responseData.error?.message || 'Failed to submit form to Airtable';
      
      if (response.status === 403 || responseData.error?.message?.includes('permissions')) {
        errorMessage = 'API token does not have permission to access this base. Please check token scopes in Airtable.';
      } else if (response.status === 404) {
        errorMessage = 'Base or table not found. Please verify the Base ID and Table ID are correct.';
      }
      
      return NextResponse.json(
        { error: errorMessage },
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Failed to process form submission',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

