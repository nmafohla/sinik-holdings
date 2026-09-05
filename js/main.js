function toggleMenu() {
  const nav = document.getElementById('navLinks');
  if (nav) nav.classList.toggle('active');
}

function calculateMortgage() {
  const priceInput = document.getElementById('propertyPrice');
  const depositInput = document.getElementById('deposit');
  const yearsInput = document.getElementById('years');
  const rateInput = document.getElementById('rate');

  const price = priceInput instanceof HTMLInputElement ? Number(priceInput.value) : 0;
  const deposit = depositInput instanceof HTMLInputElement ? Number(depositInput.value) : 0;
  const years =
    yearsInput instanceof HTMLInputElement && yearsInput.value ? Number(yearsInput.value) : 20;
  const rate =
    rateInput instanceof HTMLInputElement && rateInput.value ? Number(rateInput.value) : 12;

  const annualRate = rate / 100 / 12;
  const months = years * 12;
  const loan = Math.max(price - deposit, 0);

  let monthly = 0;
  if (annualRate > 0 && months > 0) {
    const factor = Math.pow(1 + annualRate, months);
    monthly = (loan * (annualRate * factor)) / (factor - 1);
  } else if (months > 0) {
    monthly = loan / months;
  }

  const result = document.getElementById('mortgageResult');
  if (result) {
    result.textContent = `Estimated monthly payment: USD ${monthly.toFixed(2)}`;
  }
}

function handleInquiry(event) {
  event.preventDefault();
  const msg = document.getElementById('inquiryMessage');
  if (msg) {
    msg.textContent =
      'Thank you. Your inquiry has been received. An agent will contact you shortly.';
  }
  if (event.target instanceof HTMLFormElement) {
    event.target.reset();
  }
}

function saveFavorite(button) {
  if (button instanceof HTMLElement) {
    button.textContent = 'Saved ✓';
    button.classList.remove('btn-outline');
    button.classList.add('btn-primary');
  }
}

window.toggleMenu = toggleMenu;
window.calculateMortgage = calculateMortgage;
window.handleInquiry = handleInquiry;
window.saveFavorite = saveFavorite;
