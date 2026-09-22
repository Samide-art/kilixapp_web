# Kilix Web Conversion

## Scope

This web adaptation keeps the existing application architecture, screens, business flows, Supabase schema, migrations, RPC contracts, Storage buckets, Realtime channels, and Edge Functions intact.

No database migration was added or changed for the web target.

## What changed for web only

- Added Expo Metro web dependencies required by Expo SDK 54:
  - `react-dom` 19.1.0
  - `react-native-web` 0.21.x
  - `@expo/metro-runtime`
- Enabled Metro web output as a single-page application.
- Added browser favicon and document metadata.
- Added a browser RTL bootstrap (`dir="rtl"`, Arabic document language).
- Added browser-safe local persistence for the existing small SecureStore cache/token usage.
  - Native platforms still use Expo SecureStore.
  - Web uses browser localStorage only for the same compatibility/cache purpose.
- Added browser-safe file byte access for Supabase Storage uploads.
  - Native platforms keep Expo FileSystem `File`.
  - Web reads the selected Blob/URI through the browser Fetch API.
- Added a web-specific media picker adapter while preserving the existing native picker implementation.
- Enabled Supabase URL session detection on web for browser OAuth redirects.
- Configured the GitHub Pages repository base path (`/kilixapp_web`) so exported assets and navigation resolve under the project site URL.
- Configured Supabase web auth persistence to use browser `localStorage`; native platforms continue using AsyncStorage.
- Configured Google OAuth on web to return to the GitHub Pages base URL instead of the native `kilix://` scheme.
- Kept the existing native Google OAuth flow unchanged.
- Added browser navigation/deep-link mapping for the existing screens without renaming or removing routes.

## Database guarantee

The `supabase/` directory is retained unchanged. The web adaptation does not require a schema rewrite, new tables, renamed columns, altered RLS policies, or replacement RPCs.

## Development

```bash
npm install
npx expo start --web
```

If the dependency tree needs to be synchronized with Expo SDK 54, use:

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

## Production web export

```bash
npx expo export --platform web
```

The result is generated in `dist/` and can be deployed to a static SPA host.

## Environment

Create `.env.local` from `.env.local.example` and provide the public Supabase URL/key and any optional OAuth settings.

Never place a Supabase service-role key in the browser build.

## Validation performed on the conversion workspace

- JavaScript syntax check: 97 JS/MJS files, 0 syntax errors.
- JSON validation: `package.json` and `app.json` valid.
- Relative-import validation: 0 missing relative imports.
- Existing `supabase/` directory retained; no database migration was changed for web support.
