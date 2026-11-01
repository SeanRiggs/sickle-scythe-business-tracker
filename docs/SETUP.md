# Use your own tracker

This static application runs HTML, CSS and JavaScript in your browser. There is no application server or required build framework. Business records belong in your own browser or private OneDrive, never in a repository.

| Mode | Storage | Cross-device use | Requirements |
| --- | --- | --- | --- |
| Local-only | This browser | Transfer backups manually | Local HTTP server and regular backups |
| OneDrive | Private application folder plus browser cache | Wait for cloud confirmation before switching devices | Your own Microsoft app registration, eligible OneDrive account and HTTPS hosting |

## Local-only setup

1. Download the current source.
2. Edit app-config.js using the independent-installation example below.
3. From the source folder, run the local server command below.
4. Open http://localhost:8080/ and keep that exact host and port for future visits.
5. Choose **Use on this device only**. This explicitly creates an empty business and product catalog.
6. Add products in **More → Products** and set the business name/logo in **Settings**.
7. Download regular JSON backups and keep them outside the source folder.

~~~sh
python3 -m http.server 8080 --bind 127.0.0.1
~~~

~~~js
window.TRACKER_CONFIG = {
  clientId: '',
  redirectUri: 'http://localhost:8080/',
  storageKey: 'my-business-local-data',
  tokenKey: 'my-business-local-tokens',
  syncKey: 'my-business-local-sync',
  allowNewCloudBusiness: false
};
~~~

Do not open index.html directly with a file:// address. Service workers, OAuth and browser storage need a consistent HTTP(S) origin. Local-only is not a cloud backup: clearing browser data, changing the address or private browsing can make the copy unavailable. Choose unique storage keys per installation; never change existing keys without preserving the cache and backups first.

## OneDrive setup for an independent installation

Configure your own copy, not the owner’s deployment. The committed client ID is public configuration, not a shared onboarding service.

1. Obtain access to a Microsoft Entra directory where you can register applications. A personal Microsoft login alone does **not** guarantee eligibility to create a directory or app. An administrator may need to enable access.
2. In the [Entra admin center](https://entra.microsoft.com/), open **Identity → Applications → App registrations → New registration**. Labels may change.
3. Give the app a distinct name. Choose supported accounts appropriate to your business; include personal Microsoft accounts for personal OneDrive.
4. Under **Authentication**, add a **Single-page application (SPA)** platform with the exact HTTPS installation address, including its path and trailing slash. Register http://localhost:8080/ separately only for local cloud-login testing.
5. Under **API permissions**, configure delegated User.Read and Files.ReadWrite.AppFolder. Login also requests openid, profile and offline_access.
6. Do **not** create a client secret or enable implicit flow. This browser app uses Authorization Code + PKCE.
7. Put your Application (client) ID and exact redirect URI in app-config.js. Use unique storage, token and sync keys.
8. For a fresh installation only, enable allowNewCloudBusiness. Sign in, then choose **Settings → Create a new OneDrive business** and type the confirmation. The initial missing-database message never triggers automatic replacement.
9. Creation checks for an existing file and uses an upload session with conflict behavior "fail". Permission, quota, service and verification errors stop setup. Do not broaden permissions or overwrite files to bypass an error.
10. Verify **Saved with OneDrive** and test fictional records on a second device before entering real data. Disable allowNewCloudBusiness after initial setup.

Existing businesses reconnect and load their existing database. They do not run new-business setup. The owner’s committed configuration disables creation.

## Costs, accounts and hosting

The application has no paid backend dependency. That does not mean every Microsoft account can create an Entra directory, or every host permits every business use. Eligibility, administrator policy, storage quota and hosting terms apply.

GitHub Pages can serve public repositories on GitHub Free, but explicitly restricts using Pages to run an online business, e-commerce site or commercial SaaS. A public demo and an operational business installation are different uses. Evaluate the terms before choosing Pages. This release does not move the existing installation; Cloudflare or another suitable host can be evaluated separately.

Personal OneDrive is the existing deployment’s model. Work/school accounts and new-account upload sessions need verification with your own registration. Automated tests simulate Microsoft responses and do not certify all account types.

## Privacy

Public: code, blank templates, generic documentation and fictional tests.

Private: business-data.json, backups, completed CSVs, invoices, receipts, customer information, attachments and exports. Keep them outside repository files, history, branches, screenshots and CI artifacts.

A public shell does not grant access to OneDrive. Microsoft authorization controls access. A login screen does not encrypt the browser cache: someone with access to that browser profile may read it. Use trusted, locked devices. Sign-out hides the workspace and retains the local copy; **Back up & clear this device** removes this installation’s cache and tokens.

## Official references

- [App registration](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
- [Authorization Code + PKCE](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow)
- [Redirect URI rules](https://learn.microsoft.com/en-us/entra/identity-platform/reply-url)
- [OneDrive application folder](https://learn.microsoft.com/en-us/graph/onedrive-sharepoint-appfolder)
- [Upload sessions](https://learn.microsoft.com/en-us/graph/api/driveitem-createuploadsession)
- [Tenant prerequisites](https://learn.microsoft.com/en-us/entra/fundamentals/create-new-tenant)
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

Reviewed November 2026. Provider requirements can change.
