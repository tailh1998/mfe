const activeApps = require("./apps.json");
const { spawn } = require("child_process");

if (activeApps.length === 0) {
    console.log("No enabled apps found.");
    process.exit(1);
}

function runCommand(command, cwd) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, { cwd, shell: true, stdio: "inherit" });
        child.on("exit", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`Command "${command}" failed with code ${code}`));
        });
    });
}

async function main() {
    try {
        console.log("\nInstalling root project dependencies...");
        await runCommand("npm install", process.cwd());

        for (const app of activeApps) {
            console.log(`\nInstalling dependencies for ${app.name}...`);
            await runCommand("npm install", app.path);
        }

        const names = activeApps.map(p => p.name).join(",");
        const colors = activeApps.map(p => p.color || "blue").join(",");
        const commands = activeApps.map(p => `cd ${p.path} && ${p.script}`).map(cmd => `"${cmd}"`).join(" ");

        const concurrentlyCommand = `concurrently -n "${names}" -c "${colors}" ${commands}`;
        console.log("\nRunning:", concurrentlyCommand, "\n");

        const child = spawn(concurrentlyCommand, { shell: true, stdio: "inherit" });
        child.on("exit", (code) => {
            console.log(`\nAll processes exited with code: ${code}`);
        });

    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

main();
