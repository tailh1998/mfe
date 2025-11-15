const apps = require("./apps.json");
const { spawn } = require("child_process");

const activeApps = apps.filter(p => p.enabled !== false);

if (activeApps.length === 0) {
    console.log("No enabled apps found.");
    process.exit(1);
}

const names = activeApps.map(p => p.name).join(",");

const colors = activeApps.map(p => p.color || "blue").join(",");

const commands = activeApps
    .map(p => `cd ${p.path} && ${p.script}`)
    .map(cmd => `"${cmd}"`)
    .join(" ");

const concurrentlyCommand = `concurrently -n "${names}" -c "${colors}" ${commands}`;

console.log("\nRunning:", concurrentlyCommand, "\n");

// Spawn concurrently so logs stream live
const child = spawn(concurrentlyCommand, {
    shell: true,
    stdio: "inherit", // pipe stdout/stderr to this terminal
});

child.on("exit", (code) => {
    console.log(`\nAll processes exited with code: ${code}`);
});
