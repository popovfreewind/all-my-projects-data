// src/index.ts
import * as fs from 'fs';
import * as path from 'path';

// Load all project files from ./projects
const projectsDir = path.join(__dirname, 'projects');
const projectFiles = fs.readdirSync(projectsDir).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

const projects = projectFiles.map(file => {
    const project = require(path.join(projectsDir, file));
    return project.default || project; // Handle default exports
});

// Save to JSON
const outputPath = path.join(__dirname, '../dist/projects.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2), 'utf-8');

console.log('✅ projects.json generated!');