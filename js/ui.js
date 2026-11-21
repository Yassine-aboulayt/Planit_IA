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
    summary.textContent = `${done.length}/${total} · ${percent}% terminé`;
    let hours = 0;
    plan.tasks.forEach(function (task) {
      hours += task.estimatedTime;
      let column = "#todo-list";
      if (task.status === "In Progress") column = "#progress-list";
      if (task.status === "Done") column = "#done-list";
      const card = document.createElement("button");
      card.className =
        "mt-2 rounded bg-white border p-2 text-left whitespace-pre-line";
      card.textContent = task.id + " · " + task.title;
      card.textContent += `\n${task.priority} / ${task.size} / ${task.estimatedTime} h / ${task.deadline}`;
      if (task.dependencies.length > 0) {
        card.textContent += "\nDependances : " + task.dependencies.join(", ");
      }
      card.addEventListener("click", function () {
        openTask(task, plan);
      });
      board.querySelector(column).append(card);
    });
    summary.textContent += ` | 7 jours | 1 dev | ${hours} h / 42 h`;
  } catch {
    const error = document.querySelector("#board-error");
    error.textContent = "Impossible de charger la démo.";
  }
}

if (board && location.search === "?demo=1") showDemo();

function openTask(task, plan) {
  const dialog = document.querySelector("#task-dialog");
  const details = dialog.querySelector("#task-details");
  details.value = task.description;
  dialog.querySelector("h2").textContent = task.title;
  const edit = dialog.querySelector("#task-form");
  const title = edit.elements.title;
  const status = edit.elements.status;
  title.value = task.title;
  status.value = task.status;
  edit.onsubmit = function (event) {
    event.preventDefault();
    if (!title.value.trim()) return;
    const blocked = task.dependencies.some(function (id) {
      const need = plan.tasks.find((t) => t.id === id);
      return !need || need.status !== "Done";
    });
    if (status.value === "Done" && blocked) {
      alert("Terminez les tâches préalables.");
      return;
    }
    task.description = details.value.trim();
    task.title = title.value.trim();
    task.status = status.value;
    localStorage.setItem("planit-demo", JSON.stringify(plan));
    location.reload();
  };
  dialog.querySelector("#delete-task").onclick = function () {
    if (!confirm("Supprimer cette tache ?")) return;
    plan.tasks = plan.tasks.filter((t) => t.id !== task.id);
    plan.tasks.forEach(function (t) {
      t.dependencies = t.dependencies.filter((id) => id !== task.id);
    });
    localStorage.setItem("planit-demo", JSON.stringify(plan));
    location.reload();
  };
  dialog.showModal();
}
function showDashboard() {
  const card = document.querySelector("#projects-list article");
  if (!card) return;
  const plan = JSON.parse(localStorage.getItem("planit-demo"));
  if (!plan || !Array.isArray(plan.tasks)) {
    card.remove();
    const empty = document.querySelector("#empty-state");
    empty.classList.remove("hidden");
    return;
  }
  card.querySelector("h2").textContent = plan.projectName;
  card.querySelector("a").href = "project.html?demo=1";
  const total = plan.tasks.length;
  const done = plan.tasks.filter((t) => t.status === "Done").length;
  const percent = Math.round((100 * done) / (total || 1));
  const labels = card.querySelectorAll("p");
  labels[0].textContent = "Plan chargé depuis sample-plan.json";
  labels[1].textContent = `${total} tâches · ${done} terminées · ${total - done} restantes`;
  labels[2].textContent = `${percent}% d'avancement`;
  const bar = card.querySelector("div > div");
  bar.style.width = `${percent}%`;
  card.querySelector("button").onclick = function () {
    if (!confirm("Supprimer ce projet ?")) return;
    localStorage.removeItem("planit-demo");
    showDashboard();
  };
}
showDashboard();
