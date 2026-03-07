const fs = require("fs");

const topics = [
"JavaScript performance tricks",
"Node.js event loop",
"React rendering behavior",
"CSS layout systems",
"Frontend architecture",
"Debugging async code",
"Browser rendering pipeline",
"Web performance optimization"
];

function randomTopic(){
  return topics[Math.floor(Math.random()*topics.length)];
}

function randomCommitMessage(){

const msgs = [
"update dev notes",
"add engineering reflection",
"refine dev journal",
"document learning insight",
"add daily dev thought"
];

return msgs[Math.floor(Math.random()*msgs.length)];

}

function generateNote(){

const topic = randomTopic();

const today = new Date().toISOString().split("T")[0];

const text = `# Dev Note ${today}

Today I explored ${topic}.

One interesting observation is that understanding internal behavior
of these systems significantly improves debugging ability.

Small improvements in understanding fundamentals often lead to
better architectural decisions in real projects.

— Vedansh
`;

if(!fs.existsSync("notes")){
fs.mkdirSync("notes");
}

fs.writeFileSync(`notes/${today}.md`,text);

console.log("note created");

}

generateNote();