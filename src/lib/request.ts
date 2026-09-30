export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

export async function readJson(req: Request, maxBytes = 1_000_000): Promise<unknown> {
  const contentType = req.headers.get("content-type") || ""
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new HttpError(415, "Expected application/json body")
  }
  const text = await req.text()
  if (text.length > maxBytes) {
    throw new HttpError(413, "Request body too large")
  }
  try {
    return JSON.parse(text)
  } catch {
    throw new HttpError(400, "Invalid JSON body")
  }
}