// Basic interactive logic: open/close, remove, undo, calc totals
(function () {
  const openBtn = document.getElementById('openCartBtn');
  const closeBtn = document.getElementById('closeCartBtn');
  const offcanvas = document.getElementById('cartOffcanvas');
  const panel = offcanvas.querySelector('.offcanvas__panel');
  const backdrop = document.getElementById('offcanvasBackdrop');
  const cartList = document.getElementById('cartList');
  const cartCount = document.getElementById('cartCount');
  const undoSnackbar = document.getElementById('undoSnackbar');
  const undoBtn = document.getElementById('undoBtn');
  const snackText = document.getElementById('snackText');

  // summary elements
  const subtotalEl = document.getElementById('subtotal');
  const discountEl = document.getElementById('discount');
  const taxEl = document.getElementById('tax');
  const totalEl = document.getElementById('total');

  // example static discount & tax rules (customize as needed)
  const discountRule = (subtotal) => subtotal >= 2000 ? 200 : 0;
  const taxPercent = 0.025; // 2.5%

  let lastRemoved = null;
  let undoTimeout = null;

  function openCart() {
    offcanvas.classList.add('is-open');
    backdrop.classList.add('visible');
    panel.classList.add('panel-open');
    offcanvas.setAttribute('aria-hidden', 'false');
  }

  function closeCart() {
    offcanvas.classList.remove('is-open');
    backdrop.classList.remove('visible');
    panel.classList.remove('panel-open');
    offcanvas.setAttribute('aria-hidden', 'true');
  }

  function parsePrice(str) {
    // expects "₹499" or number string
    if (typeof str === 'number') return str;
    return Number(String(str).replace(/[^\d.]/g, '')) || 0;
  }

  function formatCurrency(n) {
    return '₹' + (Math.round(n));
  }

  function recalc() {
    const items = cartList.querySelectorAll('.cart-item');
    let subtotal = 0;
    items.forEach(li => {
      const price = parsePrice(li.dataset.price);
      subtotal += price;
    });

    const discount = discountRule(subtotal);
    const tax = Math.round((subtotal - discount) * taxPercent);
    const total = subtotal - discount + tax;

    subtotalEl.textContent = formatCurrency(subtotal);
    discountEl.textContent = (discount > 0 ? '-' : '') + formatCurrency(discount);
    taxEl.textContent = formatCurrency(tax);
    totalEl.textContent = formatCurrency(total);

    // update count
    cartCount.textContent = items.length;
    const subtitle = document.getElementById('cartSubtitle');
    subtitle.textContent = `${items.length} test${items.length === 1 ? '' : 's'} selected`;
  }

  function removeItem(li) {
    if (!li) return;
    lastRemoved = {
      node: li,
      index: Array.from(cartList.children).indexOf(li)
    };
    const title = li.querySelector('.item-title')?.textContent || 'Item';
    // visually remove
    li.style.opacity = 0;
    li.style.transform = 'translateX(10px)';
    setTimeout(() => {
      li.remove();
      recalc();
    }, 160);

    // show snackbar with undo
    snackText.textContent = `${title} removed`;
    undoSnackbar.hidden = false;
    if (undoTimeout) clearTimeout(undoTimeout);
    undoTimeout = setTimeout(() => {
      undoSnackbar.hidden = true;
      lastRemoved = null;
    }, 6000);
  }

  function undoRemove() {
    if (!lastRemoved) return;
    const { node, index } = lastRemoved;
    // reinsert at previous index
    const children = Array.from(cartList.children);
    if (index >= children.length) {
      cartList.appendChild(node);
    } else {
      cartList.insertBefore(node, children[index]);
    }
    // restore visuals
    node.style.opacity = 1;
    node.style.transform = 'translateX(0)';
    recalc();
    lastRemoved = null;
    undoSnackbar.hidden = true;
    if (undoTimeout) clearTimeout(undoTimeout);
  }

  // event delegation for remove buttons & chips add
  cartList.addEventListener('click', (e) => {
    const rem = e.target.closest('.remove-btn');
    if (rem) {
      const li = rem.closest('.cart-item');
      removeItem(li);
    }
  });

  // suggestion chips (add item)
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) {
      const id = chip.dataset.addId;
      const price = chip.dataset.addPrice;
      // create new li
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.dataset.id = id;
      li.dataset.price = price;
      li.innerHTML = `
        <div class="item-main">
          <div class="item-info">
            <div class="item-title">${chip.textContent.split('—')[0].trim()}</div>
            <div class="item-meta">Result: 48 hours</div>
          </div>
          <div class="item-meta-right">
            <div class="item-price">₹${price}</div>
            <button class="btn-icon remove-btn" aria-label="Remove ${chip.textContent}">Remove</button>
          </div>
        </div>`;
      cartList.appendChild(li);
      recalc();
    }
  });

  undoBtn.addEventListener('click', undoRemove);

  openBtn.addEventListener('click', openCart);
  closeBtn.addEventListener('click', closeCart);
  backdrop.addEventListener('click', closeCart);

  // keyboard accessibility: Esc to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });

  // initial calc
  recalc();

  // expose recalc for dev
  window.cartRecalc = recalc;
})();
