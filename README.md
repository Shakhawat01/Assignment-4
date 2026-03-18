Questions & Answers
1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
ans:
    getElementById দিয়ে একটিমাত্র element ধরা হয় (id দিয়ে)
    getElementsByClassName একই class এর একাধিক element ধরে (className দিয়ে)
    querySelector CSS selector ব্যবহার করে প্রথম matching element ধরে
    querySelectorAll CSS selector ব্যবহার করে সব matching element ধরে

2. How do you create and insert a new element into the DOM?
ans: 
    প্রথমে createElement() দিয়ে element বানাতে হয়, তারপর appendChild() বা append() দিয়ে DOM এ ঢোকাতে হয়।

3. What is Event Bubbling? And how does it work?
ans: 
    Event bubbling মানে হলো event আগে child element এ ঘটে, তারপর ধীরে ধীরে parent element এর দিকে উঠে যায়।

4. What is Event Delegation in JavaScript? Why is it useful?
ans: 
    Event delegation হলো parent element এ event বসিয়ে child element এর event handle করা।
    এতে কম code লাগে আর performance ভালো থাকে।

5. What is the difference between preventDefault() and stopPropagation() methods?
ans:
    preventDefault() browser এর default কাজ বন্ধ করে
    stopPropagation() event কে parent element এ যেতে দেয় না