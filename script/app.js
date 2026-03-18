let interviewList = [];
let rejectedList = [];
let currentStatus = "all-filter-btn";

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");
let jobs = document.getElementById("jobs");

let allFilterBtn = document.getElementById("all-filter-btn");
let interviewFilterBtn = document.getElementById("interview-filter-btn");
let rejectedFilterBtn = document.getElementById("rejected-filter-btn");

let allCardsSection = document.getElementById("allCards");
let mainContainer = document.querySelector("main");
let beforeFilter = document.getElementById("before-filter");
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
    jobs.innerText = interviewList.length;
    allCardsSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    if (interviewList.length === 0) {
      beforeFilter.classList.remove("hidden");
    } else {
      beforeFilter.classList.add("hidden");
    }
    renderInterviews();
  } else if (id === "all-filter-btn") {
    jobs.innerText = allCardsSection.children.length;
    allCardsSection.classList.remove("hidden");
    filteredSection.classList.add("hidden");
    if (allCardsSection.children.length === 0) {
      beforeFilter.classList.remove("hidden");
    } else {
      beforeFilter.classList.add("hidden");
    }
  } else if (id === "rejected-filter-btn") {
    jobs.innerText = rejectedList.length;
    allCardsSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    if (rejectedList.length === 0) {
      beforeFilter.classList.remove("hidden");
    } else {
      beforeFilter.classList.add("hidden");
    }
    renderRejected();
  }
}

mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector(".companyName").innerText;
    const position = parentNode.querySelector(".position").innerText;
    const location = parentNode.querySelector(".location").innerText;
    const type = parentNode.querySelector(".type").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const status1 = parentNode.querySelector(".status1").innerText;
    const description = parentNode.querySelector(".description").innerText;
    parentNode.querySelector(".status1").innerText = "INTERVIEW";
    // document.getElementById('before-filter').classList.remove('hidden');

    let cardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      status1: "INTERVIEW",
      description,
    };

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
      jobs.innerText = rejectedList.length;
    }
  } else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector(".companyName").innerText;
    const position = parentNode.querySelector(".position").innerText;
    const location = parentNode.querySelector(".location").innerText;
    const type = parentNode.querySelector(".type").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const status1 = parentNode.querySelector(".status1").innerText;
    const description = parentNode.querySelector(".description").innerText;
    parentNode.querySelector(".status1").innerText = "REJECTED";
    // document.getElementById('before-filter').classList.remove('hidden');

    let cardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      status1: "REJECTED",
      description,
    };
    const planExits = rejectedList.find(
      (item) => item.companyName === cardInfo.companyName,
    );

    if (!planExits) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      (item) => item.companyName !== cardInfo.companyName,
    );

    calculateTotal();
    if (currentStatus === "interview-filter-btn") {
      renderInterviews();
      jobs.innerText = interviewList.length;
    }
  } else if (event.target.closest(".btn-delete")) {
    const card = event.target.closest(".card");
    const companyName = card.querySelector(".companyName").innerText;

    const allCards = document.querySelectorAll(".card");

    allCards.forEach((card) => {
      const name = card.querySelector(".companyName").innerText;
      if (name === companyName) {
        card.remove();
      }
    });

    if (currentStatus === "all-filter-btn") {
      interviewList = interviewList.filter(
        (item) => item.companyName !== companyName,
      );
      rejectedList = rejectedList.filter(
        (item) => item.companyName !== companyName,
      );
      if (allCardsSection.children.length === 0) {
        beforeFilter.classList.remove("hidden");
      }
    } else if (currentStatus === "interview-filter-btn") {
      interviewList = interviewList.filter(
        (item) => item.companyName !== companyName,
      );
      renderInterviews();
    } else if (currentStatus === "rejected-filter-btn") {
      rejectedList = rejectedList.filter(
        (item) => item.companyName !== companyName,
      );
      renderRejected();
    }
    calculateTotal();
    jobs.innerText = interviewList.length;
    jobs.innerText = rejectedList.length;
  }
});

function renderInterviews() {
  filteredSection.innerHTML = "";
  if (interviewList.length === 0) {
    beforeFilter.classList.remove("hidden");
    return;
  } else {
    beforeFilter.classList.add("hidden");
  }
  for (let interview of interviewList) {
    const div = document.createElement("div");
    div.className =
      "card flex flex-row justify-between mt-4 bg-white border border-gray-200 shadow-[#F1F2F4] rounded-lg p-6";
    div.innerHTML = `
        <div class="space-y-4">
              <div class="">
                <p class="companyName text-lg font-semibold text-[#002C5C]">
                  ${interview.companyName}
                </p>
                <p class="position text-[#64748B]">${interview.position}</p>
              </div>

              <div class="flex items-center gap-4">
                <p class="location text-[14px] text-[#64748B]">${interview.location}</p>
                <span class="text-[#64748B]">•</span>
                <p class="type text-[14px] text-[#64748B]">${interview.type}</p>
                <span class="text-[#64748B]">•</span>
                <p class="salary text-[14px] text-[#64748B]">
                  ${interview.salary}
                </p>
              </div>

              <span
                class="status1 px-3 py-2 rounded-sm text-[14px] font-medium text-[#002C5C] bg-[#EEF4FF]"
                >${interview.status1}</span
              >
              <p class="description text-[14px] text-[#323B49] mt-4">
                ${interview.description}
              </p>
              <div class="flex gap-4">
                <button
                  class="interview-btn btn btn-success btn-soft border-2 border-success px-4 py-1 rounded cursor-pointer"
                >
                  INTERVIEW
                </button>
                <button
                  class="rejected-btn btn btn-error btn-soft border-2 border-error px-3 py-1 rounded cursor-pointer"
                >
                  REJECTED
                </button>
              </div>
            </div>

            <div class="">
              <button
                class="btn-delete h-8 w-8 stroke-[#F1F2F4] border border-base-300 cursor-pointer rounded-full"
              >
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
        `;
    filteredSection.appendChild(div);
  }
}

function renderRejected() {
  filteredSection.innerHTML = "";
  if (rejectedList.length === 0) {
    beforeFilter.classList.remove("hidden");
    return;
  } else {
    beforeFilter.classList.add("hidden");
  }
  for (let reject of rejectedList) {
    const div = document.createElement("div");
    div.className =
      "card flex flex-row justify-between mt-4 bg-white border border-gray-200 shadow-[#F1F2F4] rounded-lg p-6";
    div.innerHTML = `
        <div class="space-y-4">
              <div class="">
                <p class="companyName text-lg font-semibold text-[#002C5C]">
                  ${reject.companyName}
                </p>
                <p class="position text-[#64748B]">${reject.position}</p>
              </div>

              <div class="flex items-center gap-4">
                <p class="location text-[14px] text-[#64748B]">${reject.location}</p>
                <span class="text-[#64748B]">•</span>
                <p class="type text-[14px] text-[#64748B]">${reject.type}</p>
                <span class="text-[#64748B]">•</span>
                <p class="salary text-[14px] text-[#64748B]">
                  ${reject.salary}
                </p>
              </div>

              <span
                class="status1 px-3 py-2 rounded-sm text-[14px] font-medium text-[#002C5C] bg-[#EEF4FF]"
                >${reject.status1}</span
              >
              <p class="description text-[14px] text-[#323B49] mt-4">
                ${reject.description}
              </p>
              <div class="flex gap-4">
                <button
                  class="interview-btn btn btn-success btn-soft border-2 border-success px-4 py-1 rounded cursor-pointer"
                >
                  INTERVIEW
                </button>
                <button
                  class="rejected-btn btn btn-error btn-soft border-2 border-error px-3 py-1 rounded cursor-pointer"
                >
                  REJECTED
                </button>
              </div>
            </div>

            <div class="">
              <button
                class="btn-delete h-8 w-8 stroke-[#F1F2F4] border border-base-300 cursor-pointer rounded-full"
              >
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
        `;
    filteredSection.appendChild(div);
  }
}
