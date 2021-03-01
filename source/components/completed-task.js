class CompletedTask extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    let shadow = this.attachShadow({ mode: "open" });
    let li = document.createElement("li");
    let div = document.createElement("div");
    let nameLabel = document.createElement("label");
    let timeLabel = document.createElement("label");
    let dateLabel = document.createElement("label");

    // for css styling
    li.setAttribute("class", "listElement");
    div.setAttribute("class", "divTag");
    nameLabel.setAttribute("class", "nameLabel");
    timeLabel.setAttribute("class", "timeLabel");
    dateLabel.setAttribute("class", "DateLabel");

    nameLabel.innerText = "Task name: " + this.getAttribute("name");
    timeLabel.innerText = "Total time of task: " + this.getAttribute("totalTime");
    dateLabel.innerText = "Date: " + this.getAttribute("date");

    li.appendChild(nameLabel);
    li.appendChild(timeLabel);
    li.appendChild(dateLabel);

    let stlye = document.createElement("style"); // for css style

    shadow.appendChild(li);
  }
}

customElements.define("completed-task", CompletedTask);
