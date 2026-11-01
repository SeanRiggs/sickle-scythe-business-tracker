"""Check the public repository boundary without printing file contents."""
import csv
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ALLOWED = {
    '.gitignore', '.github/workflows/validate.yml', '.github/workflows/privacy.yml',
    'DEPLOYMENT-MARKER.txt', 'LICENSE', 'README.md', 'index.html',
    'logo-placeholder.svg', 'manifest.webmanifest', 'partner-sales-template.csv',
    'service-worker.js', 'styles.css', 'tracker-v54.js', 'app-config.js',
    'docs/SETUP.md', 'docs/RECOVERY.md', 'docs/V5.4-ACCEPTANCE.md', 'tests/usability.test.cjs',
    'docs/V5.3-ACCEPTANCE.md', 'docs/V5.3.1-ACCEPTANCE.md',
    'scripts/package_release.py', 'scripts/check_public_files.py',
    'tests/acceptance.cjs', 'tests/browser.cjs', 'tests/finance.test.cjs',
    'tests/harness.cjs', 'tests/legacy-worker.fixture.js', 'tests/sync.test.cjs',
}
tracked = set(subprocess.check_output(
    ['git', 'ls-files', '-z'], cwd=ROOT).decode().split('\0')) - {''}
if tracked - ALLOWED:
    raise SystemExit('Public-file check failed: unexpected tracked files. Review locally; do not paste private contents into logs or issues.')
with (ROOT / 'partner-sales-template.csv').open(newline='') as stream:
    if len(list(csv.reader(stream))) != 1:
        raise SystemExit('Public-file check failed: partner template must contain only its header.')
print('Public-file allowlist and blank template checks passed.')
