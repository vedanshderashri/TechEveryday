import fs from 'fs';
import path from 'path';

const TOPICS = [
    "JavaScript",
    "React",
    "Node.js",
    "Web performance",
    "Frontend architecture",
    "Backend design",
    "DevOps",
    "System design",
    "Browser internals",
    "Software engineering practices"
];

const CONTENT_TEMPLATES = {
    "JavaScript": [
        "Exploring the intricacies of Closures and Scopes in dynamic execution.",
        "Deep dive into the V8 engine and how it optimizes your code.",
        "Modern Async/Await patterns and error handling strategies."
    ],
    "React": [
        "Advanced Hook patterns for scalable component design.",
        "Performance optimization: When to use useMemo and useCallback.",
        "The evolution of Server Components and the future of React."
    ],
    "Node.js": [
        "Scaling Node.js applications using the Cluster module.",
        "Understanding the Event Loop: Microtasks vs Macrotasks.",
        "Building high-performance streams for data processing."
    ],
    // Add more templates as needed for variety
};

function generateContent(topic, inputDate) {
    const date = inputDate || new Date().toISOString().split('T')[0];
    const templates = CONTENT_TEMPLATES[topic] || ["A comprehensive guide to " + topic + " in modern engineering."];
    const intro = templates[Math.floor(Math.random() * templates.length)];

    return `# ${topic}: ${intro.split('.')[0]}

Date: ${date}

## Introduction
${intro} In this article, we'll explore why ${topic} remains a cornerstone of modern development and how to leverage its latest features for better system design.

## Technical Deep Dive
When building systems at scale, understanding the underlying principles of ${topic} is crucial. We often see developers jump into implementation without considering the architectural implications. For instance, in a high-traffic environment, ${topic} can be the difference between a responsive UI and a sluggish user experience.

Engineering reflections often point towards a balance between simplicity and power. As we refine our development insights, it becomes clear that ${topic} offers a unique set of tools that, when handled correctly, provide immense value.

## Practical Insights
1. **Always monitor performance**: Use profiling tools early in the development cycle.
2. **Modularize your code**: Keep components or modules focused on a single responsibility.
3. **Stay updated**: The ecosystem around ${topic} moves fast; continuous learning is key.

## Conclusion
As we wrap up today's reflection on ${topic}, remember that technical excellence is a journey. Each line of code is an opportunity to learn and improve.

Happy coding!
`;
}

async function run() {
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const date = process.argv[2] || new Date().toISOString().split('T')[0];
    const fileName = `${date}.md`;
    const filePath = path.join('notes', fileName);
    const content = generateContent(topic, date);

    // Save the blog post
    fs.writeFileSync(filePath, content);
    console.log(`Generated: ${filePath}`);

    // Update manifest (posts.json)
    const manifestPath = path.join('notes', 'posts.json');
    let posts = [];
    if (fs.existsSync(manifestPath)) {
        posts = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    }

    // Avoid duplicate entries for the same day
    if (!posts.some(p => p.date === date)) {
        posts.unshift({
            date,
            title: `${topic}: ${topic} Engineering Reflections`,
            file: fileName
        });
        fs.writeFileSync(manifestPath, JSON.stringify(posts, null, 2));
        console.log(`Updated manifest: ${manifestPath}`);
    } else {
        console.log(`Entry for ${date} already exists in manifest.`);
    }
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
