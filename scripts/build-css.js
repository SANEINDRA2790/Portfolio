const fs = require('fs');
const path = require('path');
const { compile, optimize } = require('@tailwindcss/node');
const { Scanner } = require('@tailwindcss/oxide');

async function buildCss() {
  const rootDir = path.resolve(__dirname, '..');
  const srcPath = path.join(rootDir, 'app', 'globals.src.css');
  const outPath = path.join(rootDir, 'app', 'globals.css');

  console.log('⚡ Compiling Tailwind CSS v4 from source...');
  const srcCss = fs.readFileSync(srcPath, 'utf-8');

  const compiler = await compile(srcCss, {
    from: srcPath,
    base: path.dirname(srcPath),
    shouldRewriteUrls: true,
    onDependency: () => {}
  });

  const scanner = new Scanner({
    sources: [
      {
        base: rootDir,
        pattern: '{app,components,data}/**/*.{ts,tsx,js,jsx}',
        negated: false
      }
    ]
  });

  const candidates = scanner.scan();
  console.log(`🔍 Scanned ${candidates.length} utility candidate tokens.`);

  const unoptimizedCss = compiler.build(candidates);
  const finalCss = optimize(unoptimizedCss, { minify: false }).code;

  fs.writeFileSync(outPath, finalCss, 'utf-8');
  console.log(`✅ Successfully generated app/globals.css (${(finalCss.length / 1024).toFixed(1)} KB)`);
}

buildCss().catch((err) => {
  console.error('❌ Failed to compile Tailwind CSS:', err);
  process.exit(1);
});

