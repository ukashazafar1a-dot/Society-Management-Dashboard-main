import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'https://api-sms.rfdevelopers.com';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path);
}

async function handleProxyRequest(request: NextRequest, pathSegments: string[]) {
  try {
    const pathString = pathSegments.join('/');
    const targetUrl = new URL(`${BACKEND_API_URL}/${pathString}`);

    // Preserve query parameters
    const searchParams = request.nextUrl.searchParams;
    searchParams.forEach((value, key) => {
      targetUrl.searchParams.append(key, value);
    });

    const headers = new Headers();
    
    // Copy relevant headers from the client request
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers.set('authorization', authHeader);
    }

    headers.set('content-type', 'application/json');

    // Prepare the request body
    let body: any = undefined;
    if (request.method !== 'GET' && request.method !== 'DELETE') {
      try {
        body = await request.text();
      } catch {
        body = undefined;
      }
    }

    // Make the request to the backend
    const response = await fetch(targetUrl.toString(), {
      method: request.method,
      headers,
      body,
    });

    // Get response data
    const responseData = await response.text();

    // Return the proxied response
    return new NextResponse(responseData, {
      status: response.status,
      headers: {
        'content-type': response.headers.get('content-type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal proxy error' },
      { status: 500 }
    );
  }
}
