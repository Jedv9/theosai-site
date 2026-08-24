(function () {
  "use strict";

  var products = {
    vx9: { id: "vx9", name: "VX-9 Pro Wireless", price: 129, art: "mouse" },
    atlas75: { id: "atlas75", name: "Atlas 75 HE", price: 179, art: "keyboard" },
    sonic1: { id: "sonic1", name: "Sonic-1 Wireless", price: 149, art: "audio" }
  };

  var artSymbols = {
    mouse: { symbol: "mouse-product", viewBox: "0 0 640 640" },
    keyboard: { symbol: "keyboard-product", viewBox: "0 0 760 520" },
    audio: { symbol: "headset-product", viewBox: "0 0 640 640" }
  };

  var cart = readCart();
  var toastTimer;
  var lastScroll = window.scrollY;

  var body = document.body;
  var header = document.getElementById("siteHeader");
  var menuTrigger = document.querySelector(".menu-trigger");
  var mobileMenu = document.getElementById("mobileMenu");
  var cartDrawer = document.querySelector(".cart-drawer");
  var cartItems = document.querySelector(".cart-items");
  var cartEmpty = document.querySelector(".cart-empty");
  var cartFooter = document.querySelector(".cart-footer");
  var cartSubtotal = document.querySelector(".cart-subtotal");
  var backdrop = document.querySelector(".drawer-backdrop");
  var searchDrawer = document.querySelector(".search-drawer");
  var siteSearch = document.getElementById("siteSearch");
  var toast = document.querySelector(".toast");
  var toastProduct = document.querySelector(".toast-product");
  var checkoutDialog = document.querySelector(".checkout-dialog");

  function money(value) {
    return "$" + Number(value).toFixed(2);
  }

  function readCart() {
    try {
      var saved = JSON.parse(localStorage.getItem("theos-cart") || "{}");
      return saved && typeof saved === "object" ? saved : {};
    } catch (error) {
      return {};
    }
  }

  function saveCart() {
    try {
      localStorage.setItem("theos-cart", JSON.stringify(cart));
    } catch (error) {
      // The storefront still works if storage is unavailable.
    }
  }

  function cartSummary() {
    return Object.keys(cart).reduce(
      function (summary, id) {
        if (!products[id] || cart[id] <= 0) return summary;
        summary.count += cart[id];
        summary.subtotal += products[id].price * cart[id];
        return summary;
      },
      { count: 0, subtotal: 0 }
    );
  }

  function productSvg(art) {
    var config = artSymbols[art] || artSymbols.mouse;
    return (
      '<svg viewBox="' +
      config.viewBox +
      '" aria-hidden="true"><use href="#' +
      config.symbol +
      '"></use></svg>'
    );
  }

  function renderCart() {
    var summary = cartSummary();
    var countNodes = document.querySelectorAll(".cart-count");
    var countTextNodes = document.querySelectorAll(".cart-count-text");
    var cartTrigger = document.querySelector(".cart-trigger");
    var shippingMessage = document.querySelector(".shipping-message");
    var shippingProgress = document.querySelector(".shipping-meter i");

    countNodes.forEach(function (node) {
      node.textContent = summary.count;
    });
    countTextNodes.forEach(function (node) {
      node.textContent = summary.count;
    });
    if (cartTrigger) {
      cartTrigger.setAttribute(
        "aria-label",
        "Open cart, " + summary.count + (summary.count === 1 ? " item" : " items")
      );
    }

    if (summary.subtotal >= 75) {
      shippingMessage.textContent = "Free express shipping unlocked";
      shippingProgress.style.width = "100%";
    } else {
      shippingMessage.textContent = "Add " + money(75 - summary.subtotal) + " for free express shipping";
      shippingProgress.style.width = Math.min((summary.subtotal / 75) * 100, 100) + "%";
    }

    if (!summary.count) {
      cartItems.innerHTML = "";
      cartItems.hidden = true;
      cartEmpty.hidden = false;
      cartFooter.hidden = true;
      return;
    }

    cartItems.hidden = false;
    cartEmpty.hidden = true;
    cartFooter.hidden = false;
    cartSubtotal.textContent = money(summary.subtotal);

    cartItems.innerHTML = Object.keys(cart)
      .filter(function (id) {
        return products[id] && cart[id] > 0;
      })
      .map(function (id) {
        var product = products[id];
        var quantity = cart[id];
        return (
          '<article class="cart-line" data-cart-id="' +
          id +
          '">' +
          '<div class="cart-line__visual" data-art="' +
          product.art +
          '">' +
          productSvg(product.art) +
          "</div>" +
          '<div class="cart-line__main">' +
          '<div class="cart-line__title">' +
          "<p><strong>" +
          product.name +
          "</strong><span>Performance black / Standard</span></p>" +
          '<button class="cart-remove" type="button" aria-label="Remove ' +
          product.name +
          '">×</button>' +
          "</div>" +
          '<div class="cart-line__bottom">' +
          '<div class="quantity" aria-label="Quantity for ' +
          product.name +
          '">' +
          '<button type="button" data-quantity="-1" aria-label="Decrease quantity"><svg><use href="#icon-minus"></use></svg></button>' +
          "<span>" +
          quantity +
          "</span>" +
          '<button type="button" data-quantity="1" aria-label="Increase quantity"><svg><use href="#icon-plus"></use></svg></button>' +
          "</div>" +
          "<strong>" +
          money(product.price * quantity) +
          "</strong>" +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function addToCart(button) {
    var id = button.getAttribute("data-id");
    if (!products[id]) {
      products[id] = {
        id: id,
        name: button.getAttribute("data-name") || "Theos product",
        price: Number(button.getAttribute("data-price")) || 0,
        art: button.getAttribute("data-art") || "mouse"
      };
    }
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();

    var count = document.querySelector(".cart-count");
    if (count) {
      count.classList.remove("bump");
      void count.offsetWidth;
      count.classList.add("bump");
    }

    toastProduct.textContent = products[id].name;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2800);
  }

  function setCartOpen(open) {
    closeSearch(false);
    cartDrawer.classList.toggle("is-open", open);
    cartDrawer.setAttribute("aria-hidden", String(!open));
    backdrop.classList.toggle("is-visible", open);
    body.classList.toggle("is-locked", open);
    if (open) {
      window.setTimeout(function () {
        var close = document.querySelector(".cart-close");
        if (close) close.focus();
      }, 250);
    }
  }

  function setSearchOpen(open) {
    if (open) setCartOpen(false);
    searchDrawer.classList.toggle("is-open", open);
    searchDrawer.setAttribute("aria-hidden", String(!open));
    backdrop.classList.toggle("is-visible", open);
    body.classList.toggle("is-locked", open);
    if (open) {
      window.setTimeout(function () {
        siteSearch.focus();
      }, 300);
    }
  }

  function closeSearch(updateBackdrop) {
    searchDrawer.classList.remove("is-open");
    searchDrawer.setAttribute("aria-hidden", "true");
    if (updateBackdrop !== false) {
      backdrop.classList.remove("is-visible");
      body.classList.remove("is-locked");
    }
  }

  function closeAllDrawers() {
    cartDrawer.classList.remove("is-open");
    cartDrawer.setAttribute("aria-hidden", "true");
    closeSearch(false);
    backdrop.classList.remove("is-visible");
    body.classList.remove("is-locked");
  }

  function setMenuOpen(open) {
    mobileMenu.hidden = !open;
    menuTrigger.setAttribute("aria-expanded", String(open));
    menuTrigger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuTrigger.querySelector("use").setAttribute("href", open ? "#icon-close" : "#icon-menu");
    body.classList.toggle("is-locked", open);
    header.classList.toggle("menu-open", open);
  }

  document.querySelectorAll(".add-to-cart").forEach(function (button) {
    button.addEventListener("click", function () {
      addToCart(button);
    });
  });

  document.querySelector(".cart-trigger").addEventListener("click", function () {
    setCartOpen(true);
  });
  document.querySelector(".cart-close").addEventListener("click", function () {
    setCartOpen(false);
  });
  document.querySelector(".cart-shop").addEventListener("click", function () {
    setCartOpen(false);
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  });

  cartItems.addEventListener("click", function (event) {
    var line = event.target.closest("[data-cart-id]");
    if (!line) return;
    var id = line.getAttribute("data-cart-id");
    var quantityButton = event.target.closest("[data-quantity]");
    var removeButton = event.target.closest(".cart-remove");

    if (quantityButton) {
      cart[id] = Math.max(0, (cart[id] || 0) + Number(quantityButton.getAttribute("data-quantity")));
      if (!cart[id]) delete cart[id];
    } else if (removeButton) {
      delete cart[id];
    } else {
      return;
    }

    saveCart();
    renderCart();
  });

  document.querySelector(".search-trigger").addEventListener("click", function () {
    setSearchOpen(true);
  });
  document.querySelector(".search-close").addEventListener("click", function () {
    setSearchOpen(false);
  });
  backdrop.addEventListener("click", closeAllDrawers);

  menuTrigger.addEventListener("click", function () {
    setMenuOpen(mobileMenu.hidden);
  });
  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    closeAllDrawers();
    if (!mobileMenu.hidden) setMenuOpen(false);
    if (checkoutDialog.open) checkoutDialog.close();
  });

  document.querySelectorAll(".product-tabs button").forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");
      document.querySelectorAll(".product-tabs button").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      document.querySelectorAll(".product-card").forEach(function (card) {
        card.classList.toggle(
          "is-filtered",
          filter !== "all" && card.getAttribute("data-category") !== filter
        );
      });
    });
  });

  function performSearch(query) {
    var normalized = query.trim().toLowerCase();
    var result = document.querySelector(".search-result");
    if (!normalized) {
      result.textContent = "Type a product name, category, or technology.";
      return;
    }

    var matches = Object.keys(products)
      .map(function (id) {
        return products[id];
      })
      .filter(function (product) {
        var haystack = (product.name + " " + product.art).toLowerCase();
        return haystack.indexOf(normalized) !== -1;
      });

    if (!matches.length) {
      result.textContent = 'No results for "' + query + '". Try mouse, keyboard, or audio.';
      return;
    }

    result.textContent =
      matches.length +
      (matches.length === 1 ? " result: " : " results: ") +
      matches
        .map(function (product) {
          return product.name;
        })
        .join(" / ");
  }

  document.querySelector(".search-form").addEventListener("submit", function (event) {
    event.preventDefault();
    performSearch(siteSearch.value);
  });

  document.querySelectorAll(".search-suggestions button").forEach(function (button) {
    button.addEventListener("click", function () {
      siteSearch.value = button.textContent;
      performSearch(button.textContent);
    });
  });

  document.querySelector(".newsletter-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var input = form.querySelector("input");
    var button = form.querySelector("button");
    if (!input.value.trim()) return;
    input.disabled = true;
    button.innerHTML = 'You’re on the grid <svg><use href="#icon-arrow"></use></svg>';
    button.disabled = true;
  });

  document.querySelector(".checkout-button").addEventListener("click", function () {
    setCartOpen(false);
    if (typeof checkoutDialog.showModal === "function") {
      checkoutDialog.showModal();
    }
  });
  document.querySelector(".dialog-close").addEventListener("click", function () {
    checkoutDialog.close();
  });
  document.querySelector(".dialog-continue").addEventListener("click", function () {
    checkoutDialog.close();
  });
  checkoutDialog.addEventListener("click", function (event) {
    if (event.target === checkoutDialog) checkoutDialog.close();
  });

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealItems = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("in-view");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" }
    );
    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = (index % 3) * 70 + "ms";
      revealObserver.observe(item);
    });
  }

  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".magnetic").forEach(function (button) {
      button.addEventListener("pointermove", function (event) {
        var rect = button.getBoundingClientRect();
        var x = (event.clientX - rect.left - rect.width / 2) * 0.12;
        var y = (event.clientY - rect.top - rect.height / 2) * 0.16;
        button.style.transform = "translate(" + x + "px," + y + "px)";
      });
      button.addEventListener("pointerleave", function () {
        button.style.transform = "";
      });
    });
  }

  function onScroll() {
    var current = window.scrollY;
    header.classList.toggle("is-scrolled", current > 16);
    if (
      current > lastScroll &&
      current > 280 &&
      !header.classList.contains("menu-open") &&
      !cartDrawer.classList.contains("is-open")
    ) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }
    lastScroll = current;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  renderCart();
})();
