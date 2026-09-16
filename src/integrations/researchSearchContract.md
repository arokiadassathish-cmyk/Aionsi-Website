# AionSi Live Research Search Contract

The live research adapter expects a provider endpoint that accepts a GET request.

## Request

- Query parameter: `q` by default (configurable with `AIONSI_RESEARCH_SEARCH_QUERY_PARAM`)
- Query contains company identity plus optional domain/contact context.
- `limit` is sent with the configured result cap.
- Authentication: `Authorization: Bearer <AIONSI_RESEARCH_SEARCH_API_KEY>`.

## Response

```json
{
  "results": [
    {
      "title": "Source title",
      "url": "https://example.com/source",
      "snippet": "Short evidence excerpt",
      "content": "Optional fuller excerpt",
      "publishedDate": "2026-09-16T00:00:00Z"
    }
  ]
}
```

Only HTTP(S) URLs are accepted. Invalid sources are discarded. The Research Agent retains source URL provenance and does not invent missing claims.

## Environment

- `AIONSI_RESEARCH_SEARCH_ENDPOINT`
- `AIONSI_RESEARCH_SEARCH_API_KEY`
- `AIONSI_RESEARCH_SEARCH_QUERY_PARAM` (optional; defaults to `q`)

Credentials must be supplied through the deployment environment. Never commit API keys.
