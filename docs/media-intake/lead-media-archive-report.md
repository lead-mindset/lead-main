# LEAD Media Archive Report

Generated: 2026-05-27T18:25:56.760Z

## Summary

- Total validated asset rows: 2348
- Instagram assets: 2344
- LinkedIn assets: 4
- Total raw archive size indexed: 2.5 GB
- Duplicate SHA-256 groups: 84
- Validation failures: 0
- Source-level failures/retries: 0
- Manual retry notes: 3

## Counts By Account

| Account | Assets | Images | Videos |
| --- | --- | --- | --- |
| lead_americas | 88 | 72 | 16 |
| lead_pucp | 215 | 193 | 22 |
| lead_ucsur | 56 | 48 | 8 |
| lead_uni | 326 | 251 | 75 |
| lead_unmsm | 202 | 155 | 47 |
| lead_unsa | 49 | 46 | 3 |
| lead_upn | 246 | 191 | 55 |
| lead_utp | 408 | 378 | 30 |
| lead.at.ulima | 32 | 26 | 6 |
| lead.tecsup | 33 | 27 | 6 |
| lead.upc | 219 | 178 | 41 |
| lead.usil | 55 | 55 | 0 |
| lead.utec | 140 | 138 | 2 |
| lead.villarreal | 32 | 29 | 3 |
| leadmindsetorg | 4 | 0 | 4 |
| leadupn_trujillo | 243 | 217 | 26 |

## Source-Level Failures And Retries

No source-level failures recorded.

## Manual Retry Notes

| Account | Status | Evidence | Next Action |
| --- | --- | --- | --- |
| lead_pacifico | failed_not_found | gallery-dl returned NotFoundError for lead_pacifico. Candidate handles lead.up and lead.pacifico also returned NotFoundError. | Verify the current Universidad del Pacifico chapter handle with LEAD before retrying. |
| lead_upn | resolved_after_retry | Initial run missed DKHzDR9xcQO_4.jpg after repeated Instagram CDN 503 responses. A source-only retry downloaded the missing image successfully. | No action needed unless future validation finds another missing file. |
| lead.utec | corrected_archived | Registry previously used lead_utec, but public LEAD UTEC references point to @lead.utec. The corrected account downloaded successfully. | Keep lead.utec in the source registry. |

## Inventory Files

- JSON: C:\Users\abiga\Downloads\leadmain\.agents\media\archive\inventory\lead-media-inventory.json
- CSV: C:\Users\abiga\Downloads\leadmain\.agents\media\archive\inventory\lead-media-inventory.csv
- Summary: C:\Users\abiga\Downloads\leadmain\.agents\media\archive\inventory\lead-media-summary.json

## Notes

- Raw media remains under `.agents/media` and is intentionally ignored by git.
- Instagram was archived with `gallery-dl` and exported cookies.
- LinkedIn known videos were archived with `yt-dlp`.
- Public website asset selection, compression, clipping, and naming are deferred.
- Rotate/logout the Instagram session used for cookie export after the archive batch is complete.
