const modal = document.querySelector("#modal");
document.querySelector("#parametre-ia").onclick = function () {
  modal.showModal();
};
document.querySelector("#close-modal").onclick = function () {
  modal.close();
};
document.querySelector("#demo-mode").onclick = function () {
  location.href = "project.html?demo=1";
};

const board = document.querySelector("#kanban");
async function showDemo() {
  try {
    const response = await fetch("data/sample-plan.json");
    if (!response.ok) throw new Error();
    const plan =
      JSON.parse(localStorage.getItem("planit-demo")) ||
      (await response.json());
    if (!Array.isArray(plan.tasks)) throw new Error();
    localStorage.setItem("planit-demo", JSON.stringify(plan));

    const title = document.querySelector("#board-title");
    title.textContent = plan.projectName;
    const total = plan.tasks.length;
    const done = plan.tasks.filter((t) => t.status === "Done");
    let percent = 0;
    if (total > 0) {
      percent = Math.round((100 * done.length) / total);
    }
    document.querySelector("#project-progress").value = percent;
    const summary = document.querySelector("#project-summary");
    summary.textContent = `${done.length}/${total} � ${percent}% termin�`;
    let hours = 0;
    plan.tasks.forEach(function (task) {
      hours += task.estimatedTime;
      let column = "#todo-list";
      if (task.status === "In Progress") column = "#progress-list";
      if (task.status === "Done") column = "#done-list";
      const card = document.createElement("button");
      card.className =
        "mt-2 rounded bg-white border p-2 text-left whitespace-pre-line";
      card.textContent = task.id + " � " + task.title;
      card.textContent += `\n${task.priority} / ${task.size} / ${task.estimatedTime} h / ${task.deadline}`;
      if (task.dependencies.length > 0) {
        card.textContent += "\nDependances : " + task.dependencies.join(", ");
      }
      board.querySelector(column).append(card);
    });
    summary.textContent += ` | 7 jours | 1 dev | ${hours} h / 42 h`;
  } catch {
    const error = document.querySelector("#board-error");
    error.textContent = "Impossible de charger la d�mo.";
  }
}

if (board && location.search === "?demo=1") showDemo();
