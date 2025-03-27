import * as fs from 'fs-extra';
import * as path from 'path';

// 🧹 Clear dist folder
const distPath = path.join(__dirname, '../dist');
fs.emptyDirSync(distPath);
console.log('🧹 dist/ folder cleared');

// 📁 Project loading
const projectsDir = path.join(__dirname, 'projects');
const projectFiles = fs.readdirSync(projectsDir).filter((file: string) => file.endsWith('.ts'));
const postersBasePath = "https://popovfreewind.github.io/all-my-projects-data/assets/posters/";

const projects = projectFiles.map((file: string) => {
    const project = require(path.join(projectsDir, file));
    const data = project.default || project;

    // If poster exists, prepend base path
    if (data.poster) {
        data.poster = postersBasePath + data.poster;
    }

    return data;
});

// 💾 Write projects.json
const outputPath = path.join(distPath, 'projects.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2), 'utf-8');
console.log('✅ projects.json generated!');

// 📦 Copy assets
const sourceAssets = path.join(__dirname, '../src/assets');
const destAssets = path.join(distPath, 'assets');

fs.copySync(sourceAssets, destAssets);
console.log('📁 assets copied to dist/');