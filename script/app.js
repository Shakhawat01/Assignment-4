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
