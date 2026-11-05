/**
 * Instala os componentes ORIGINAIS da coleção https://lucide-animated.com/
 * (repositório oficial: https://github.com/pqoqubbw/icons).
 *
 * Fonte individual dos ícones: icons/<nome>.tsx do projeto oficial.
 * Ao contrário do pacote npm homônimo, isto inclui as animações próprias de
 * cada ícone, que é o que a landing CLER precisa.
 *
 * Executado em `npm install` pelo postinstall. Repete-se só quando um arquivo
 * estiver ausente; depois disso roda sem acesso à internet.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(root, 'src/components/icons');
const names = ['arrow-up', 'bell', 'chart-line', 'chevron-down', 'home', 'menu', 'moon', 'play', 'scan-text', 'sun', 'users', 'x'];
const force = process.argv.includes('--force');

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'CLER-landing/1.1 (official lucide-animated component installer)' },
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`${response.status} em ${url}`);
  return response.text();
}
async function getIcon(name) {
  const url = `https://raw.githubusercontent.com/pqoqubbw/icons/main/icons/${name}.tsx`;
  try { return await fetchText(url); } catch (githubError) {
    // A biblioteca oferece também um registry no formato shadcn.
    try {
      const response = await fetchText(`https://lucide-animated.com/r/${name}.json`);
      const registry = JSON.parse(response);
      const source = registry.files?.find(file => file.content?.includes('export') && file.content?.includes('Icon'))?.content;
      if (!source) throw new Error('Registry não contém TSX');
      return source;
    } catch (registryError) {
      throw new Error(`Não foi possível obter ${name} no GitHub ou no registry oficial. ${githubError.message} / ${registryError.message}`);
    }
  }
}
async function run() {
  await mkdir(target, { recursive: true });
  for (const name of names) {
    const file = resolve(target, `${name}.tsx`);
    if (!force) {
      try { await access(file); console.log(`Lucide Animated ✓ ${name} (já instalado)`); continue; } catch {}
    }
    let source = await getIcon(name);
    if (!source.includes('"use client"') && !source.includes("'use client'")) source = '"use client";\n' + source;
    // A importação vem com utilitário `cn`, que disponibilizamos no projeto.
    if (!source.includes('motion/react') || !source.includes('Icon')) throw new Error(`Código inesperado para ${name}.`);
    await writeFile(file, source, 'utf8');
    console.log(`Lucide Animated ✓ ${name} (componente oficial)`);
  }
  console.log('\nComponentes Lucide Animated preparados.');
}
run().catch(error => {
  console.error('\nERRO: não foi possível instalar os ícones oficiais.');
  console.error(error.message);
  console.error('Conecte-se à internet e execute: npm run icons:install');
  process.exitCode = 1;
});
