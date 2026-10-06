import unittest, tempfile, subprocess, sys, zipfile, json, hashlib
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts' / 'backup.py'

class BackupTest(unittest.TestCase):
    def test_backup_restores_committed_source_static_site_and_history(self):
        with tempfile.TemporaryDirectory(prefix='guide-backup-test-') as temp:
            root=Path(temp);repo=root/'repo';repo.mkdir()
            def git(*args):
                return subprocess.run(['git',*args],cwd=repo,check=True,capture_output=True)
            git('init','-b','main')
            (repo/'.gitignore').write_text('docs/.vitepress/dist/\n',encoding='utf-8')
            (repo/'docs/.vitepress').mkdir(parents=True)
            (repo/'docs/.vitepress/config.ts').write_text('export default {}',encoding='utf-8')
            (repo/'source.md').write_text('original content',encoding='utf-8')
            git('add','.')
            git('-c','user.name=BackupTest','-c','user.email=test@example.invalid','commit','-m','fixture')
            (repo/'docs/.vitepress/dist').mkdir()
            (repo/'docs/.vitepress/dist/index.html').write_text('<h1>offline</h1>',encoding='utf-8')
            dest=root/'backup.zip'
            result=subprocess.run([sys.executable,str(SCRIPT),'--repo',str(repo),'--output',str(dest)],capture_output=True,text=True)
            self.assertEqual(result.returncode,0,result.stderr)
            with zipfile.ZipFile(dest) as z:
                self.assertIsNone(z.testzip())
                self.assertEqual(z.read('science-online-guide/source.md'),b'original content')
                self.assertIn('science-online-guide/docs/.vitepress/config.ts',z.namelist())
                self.assertEqual(z.read('offline-site/index.html'),b'<h1>offline</h1>')
                manifest=json.loads(z.read('backup-manifest.json'))
                for item in manifest['files']:
                    data=z.read(item['path'])
                    self.assertEqual(hashlib.sha256(data).hexdigest(),item['sha256'])
                    self.assertEqual(len(data),item['bytes'])
                bundle=root/'repository.bundle';bundle.write_bytes(z.read('repository.bundle'))
            restored=root/'restored'
            subprocess.run(['git','clone',str(bundle),str(restored)],check=True,capture_output=True)
            self.assertEqual((restored/'source.md').read_text(),'original content')
            self.assertFalse((restored/'.git/config').read_text().find('credential.helper')>=0)

if __name__=='__main__':unittest.main()
