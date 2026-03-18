let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");
let jobs = document.getElementById("jobs");

let allFilterBtn = document.getElementById("all-filter-btn");
let interviewFilterBtn = document.getElementById("interview-filter-btn");
let rejectedFilterBtn = document.getElementById("rejected-filter-btn");

let allCardsSection = document.getElementById("allCards");
let mainContainer = document.querySelector("main");
let filteredSection = document.getElementById("filtered-section");

function calculateTotal() {
  totalCount.innerText = allCardsSection.children.length;
  jobs.innerText = allCardsSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateTotal();
function toggleStyle(id) {
  allFilterBtn.classList.remove("btn-primary");
  interviewFilterBtn.classList.remove("btn-primary");
  rejectedFilterBtn.classList.remove("btn-primary");

  allFilterBtn.classList.add("bg-base-200");
  interviewFilterBtn.classList.add("bg-base-200");
  rejectedFilterBtn.classList.add("bg-base-200");

  const selected = document.getElementById(id);
  selected.classList.remove("bg-base-200");
  selected.classList.add("btn-primary");
  currentStatus = id;

  if (id === "interview-filter-btn") {
    allCardsSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderInterviews();
  } else if (id === "all-filter-btn") {
    allCardsSection.classList.remove("hidden");
    filteredSection.classList.add("hidden");
  } else if (id === "rejected-filter-btn") {
    allCardsSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderRejected();
  }
}

mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    console.log(parentNode);
    const companyName = parentNode.querySelector(".companyName").innerText;
    const position = parentNode.querySelector(".position").innerText;
    const location = parentNode.querySelector(".location").innerText;
    const type = parentNode.querySelector(".type").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const status1 = parentNode.querySelector(".status1").innerText;
    const description = parentNode.querySelector(".description").innerText;
    parentNode.querySelector(".status1").innerText = "INTERVIEW";

    let cardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      status1: "INTERVIEW",
      description,
    };
    // console.log(cardInfo)
    const planExits = interviewList.find(
      (item) => item.companyName === cardInfo.companyName,
    );

    if (!planExits) {
      interviewList.push(cardInfo);
    }

    rejectedList = rejectedList.filter(
      (item) => item.companyName != cardInfo.companyName,
    );

    calculateTotal();

    if (currentStatus === "rejected-filter-btn") {
      renderRejected();
    }
  } else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    console.log(parentNode);
    const companyName = parentNode.querySelector(".companyName").innerText;
    const position = parentNode.querySelector(".position").innerText;
    const location = parentNode.querySelector(".location").innerText;
    const type = parentNode.querySelector(".type").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const status1 = parentNode.querySelector(".status1").innerText;
    const description = parentNode.querySelector(".description").innerText;
    parentNode.querySelector(".status1").innerText = "REJECTED";

    let cardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      status1: "REJECTED",
      description,
    };
    // console.log(cardInfo)
    const planExits = rejectedList.find(
      (item) => item.companyName === cardInfo.companyName,
    );

    if (!planExits) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      (item) => item.companyName !== cardInfo.companyName,
    );

    if (currentStatus === "interview-filter-btn") {
      renderInterviews();
    }

    calculateTotal();
  }
});