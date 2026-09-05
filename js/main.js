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
    result.textContent = `Estimated monthly payment: USD ${monthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}

function handleInquiry(event) {
  event.preventDefault();
  const msg = document.getElementById('inquiryMessage');
  if (msg) {
    msg.textContent =
      'Thank you. Your inquiry has been received. A certified SINIK agent will contact you shortly.';
  }
  if (event.target instanceof HTMLFormElement) {
    event.target.reset();
  }
}

function saveFavorite(button, propertyId) {
  if (button instanceof HTMLElement) {
    const isSaved = button.classList.contains('saved');
    if (isSaved) {
      button.textContent = '♡ Save';
      button.classList.remove('saved', 'btn-primary');
      button.classList.add('btn-outline');
      if (propertyId && typeof localStorage !== 'undefined') {
        const saved = JSON.parse(localStorage.getItem('sinik_favs') || '[]');
        const updated = saved.filter((id) => id !== propertyId);
        localStorage.setItem('sinik_favs', JSON.stringify(updated));
      }
    } else {
      button.textContent = 'Saved ✓';
      button.classList.add('saved', 'btn-primary');
      button.classList.remove('btn-outline');
      if (propertyId && typeof localStorage !== 'undefined') {
        const saved = JSON.parse(localStorage.getItem('sinik_favs') || '[]');
        if (!saved.includes(propertyId)) saved.push(propertyId);
        localStorage.setItem('sinik_favs', JSON.stringify(saved));
      }
    }
  }
}

function openMediaModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal instanceof HTMLDialogElement) {
    modal.showModal();
  }
}

function closeMediaModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal instanceof HTMLDialogElement) {
    modal.close();
  }
}

function switchTab(evt, tabId) {
  const navContainer = evt.currentTarget?.parentElement;
  if (navContainer) {
    navContainer.querySelectorAll('.tab-btn').forEach((btn) => btn.classList.remove('active'));
  }
  evt.currentTarget?.classList.add('active');

  const parent = navContainer?.parentElement;
  if (parent) {
    parent.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));
    const target = parent.querySelector(`#${tabId}`);
    if (target) target.classList.add('active');
  }
}

let activeCurrency = 'USD';
const ZIG_RATE = 27.5; // Reference rate for display

function getCurrentCurrency() {
  return activeCurrency;
}

function setCurrency(currency) {
  activeCurrency = currency;
  document.querySelectorAll('.currency-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.currency === currency);
  });

  document.querySelectorAll('.price[data-usd]').forEach((el) => {
    if (el instanceof HTMLElement) {
      const usd = Number(el.dataset.usd);
      if (currency === 'ZiG') {
        const zig = Math.round(usd * ZIG_RATE);
        el.textContent = `ZiG ${zig.toLocaleString('en-US')}`;
      } else {
        el.textContent = `USD ${usd.toLocaleString('en-US')}`;
      }
    }
  });
}

function filterProperties() {
  const citySelect = document.getElementById('filterCity');
  const typeSelect = document.getElementById('filterType');
  const queryInput = document.getElementById('filterQuery');

  const selectedCity =
    citySelect instanceof HTMLSelectElement ? citySelect.value.toLowerCase() : '';
  const selectedType =
    typeSelect instanceof HTMLSelectElement ? typeSelect.value.toLowerCase() : '';
  const query = queryInput instanceof HTMLInputElement ? queryInput.value.toLowerCase().trim() : '';

  let visibleCount = 0;
  const cards = document.querySelectorAll('.property-card[data-city]');

  cards.forEach((card) => {
    if (card instanceof HTMLElement) {
      const city = (card.dataset.city || '').toLowerCase();
      const type = (card.dataset.type || '').toLowerCase();
      const text = card.innerText.toLowerCase();

      const matchesCity = !selectedCity || selectedCity === 'all' || city.includes(selectedCity);
      const matchesType = !selectedType || selectedType === 'all' || type.includes(selectedType);
      const matchesQuery = !query || text.includes(query);

      if (matchesCity && matchesType && matchesQuery) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    }
  });

  const countEl = document.getElementById('listingCount');
  if (countEl) {
    countEl.textContent = `Showing ${visibleCount} of ${cards.length} verified listings`;
  }
}

// Dialog backdrop click light-dismiss fallback
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('dialog.media-modal').forEach((dlg) => {
    dlg.addEventListener('click', (event) => {
      if (event.target === dlg) {
        const rect = dlg.getBoundingClientRect();
        const isInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!isInDialog && dlg instanceof HTMLDialogElement) {
          dlg.close();
        }
      }
    });
  });
});

window.toggleMenu = toggleMenu;
window.calculateMortgage = calculateMortgage;
window.handleInquiry = handleInquiry;
window.saveFavorite = saveFavorite;
window.openMediaModal = openMediaModal;
window.closeMediaModal = closeMediaModal;
window.switchTab = switchTab;
window.getCurrentCurrency = getCurrentCurrency;
window.setCurrency = setCurrency;
window.filterProperties = filterProperties;
