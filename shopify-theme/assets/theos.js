(function () {
  "use strict";

  var config = window.TheosTheme || {};
  var routes = config.routes || {};
  var body = document.body;
  var toastTimer;
  var searchTimer;
  var lastScroll = window.scrollY;

  function query(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function queryAll(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function escapeHtml(value) {
    var element = document.createElement("div");
    element.textContent = value == null ? "" : String(value);
    return element.innerHTML;
  }

  function money(cents) {
    try {
      return new Intl.NumberFormat(config.locale || document.documentElement.lang || "en-US", {
        style: "currency",
        currency: config.currency || "USD"
      }).format(Number(cents || 0) / 100);
    } catch (error) {
      return "$" + (Number(cents || 0) / 100).toFixed(2);
    }
  }

  function resizedImage(url, width) {
    if (!url) return "";
    return url + (url.indexOf("?") === -1 ? "?" : "&") + "width=" + width;
  }

  function setBackdrop(visible) {
    var backdrop = query("[data-drawer-backdrop]");
    if (backdrop) backdrop.classList.toggle("is-visible", visible);
    body.classList.toggle("is-locked", visible);
  }

  function closeSearch(restoreFocus) {
    var drawer = query("[data-search-drawer]");
    if (!drawer) return;
    if (drawer.contains(document.activeElement) && restoreFocus !== false) {
      var trigger = query("[data-search-trigger]");
      if (trigger) trigger.focus();
    }
    drawer.inert = true;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
  }

  function openSearch() {
    closeCart(false);
    var drawer = query("[data-search-drawer]");
    if (!drawer) return;
    drawer.inert = false;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    setBackdrop(true);
    window.setTimeout(function () {
      var input = query("[data-predictive-search-input]", drawer);
      if (input) input.focus();
    }, 250);
  }

  function closeCart(restoreFocus) {
    var drawer = query("[data-cart-drawer]");
    if (!drawer) return;
    if (drawer.contains(document.activeElement) && restoreFocus !== false) {
      var trigger = query("[data-cart-trigger]");
      if (trigger) trigger.focus();
    }
    drawer.inert = true;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
  }

  function openCart() {
    closeSearch(false);
    var drawer = query("[data-cart-drawer]");
    if (!drawer) return;
    drawer.inert = false;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    setBackdrop(true);
    window.setTimeout(function () {
      var close = query("[data-cart-close]", drawer);
      if (close) close.focus();
    }, 250);
  }

  function closeDrawers() {
    closeCart(true);
    closeSearch(true);
    setBackdrop(false);
  }

  function toggleMenu(trigger) {
    var menu = query("[data-mobile-menu]");
    if (!menu) return;
    var open = menu.hidden;
    if (!open && menu.contains(document.activeElement)) trigger.focus();
    menu.hidden = !open;
    trigger.setAttribute("aria-expanded", String(open));
    trigger.setAttribute("aria-label", open ? "Close menu" : "Menu");
    var use = query("use", trigger);
    if (use) use.setAttribute("href", open ? "#icon-close" : "#icon-menu");
    body.classList.toggle("is-locked", open);
    var header = query("[data-site-header]");
    if (header) header.classList.toggle("menu-open", open);
  }

  function showToast(productTitle, error) {
    var toast = query(".theos-toast");
    if (!toast) return;
    var heading = query("strong", toast);
    var product = query("[data-toast-product]", toast);
    if (heading) heading.textContent = error ? "Unable to add product" : "Added to your setup";
    if (product) product.textContent = productTitle || "";
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3200);
  }

  function cartItemHtml(item, index) {
    var image = item.image
      ? '<img src="' + escapeHtml(resizedImage(item.image, 240)) + '" alt="' + escapeHtml(item.product_title) + '" loading="lazy" width="108" height="108">'
      : "";
    var variant = item.variant_title && item.variant_title !== "Default Title"
      ? "<span>" + escapeHtml(item.variant_title) + "</span>"
      : "";
    return (
      '<article class="cart-line" data-cart-line="' + index + '">' +
        '<a class="cart-line__visual" href="' + escapeHtml(item.url) + '">' + image + "</a>" +
        '<div class="cart-line__main">' +
          '<div class="cart-line__title">' +
            '<p><strong><a href="' + escapeHtml(item.url) + '">' + escapeHtml(item.product_title) + "</a></strong>" + variant + "</p>" +
            '<button class="cart-remove" type="button" data-cart-remove="' + index + '" aria-label="Remove ' + escapeHtml(item.product_title) + '">×</button>' +
          "</div>" +
          '<div class="cart-line__bottom">' +
            '<div class="quantity" aria-label="Quantity for ' + escapeHtml(item.product_title) + '">' +
              '<button type="button" data-cart-change="' + index + '" data-quantity="' + Math.max(0, item.quantity - 1) + '" aria-label="Decrease quantity"><svg><use href="#icon-minus"></use></svg></button>' +
              "<span>" + item.quantity + "</span>" +
              '<button type="button" data-cart-change="' + index + '" data-quantity="' + (item.quantity + 1) + '" aria-label="Increase quantity"><svg><use href="#icon-plus"></use></svg></button>' +
            "</div>" +
            "<strong>" + money(item.final_line_price) + "</strong>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function renderCart(cart) {
    queryAll("[data-cart-count]").forEach(function (node) {
      node.textContent = cart.item_count;
      node.classList.remove("bump");
      void node.offsetWidth;
      node.classList.add("bump");
    });
    queryAll("[data-cart-count-text]").forEach(function (node) {
      node.textContent = cart.item_count;
    });
    queryAll("[data-cart-trigger]").forEach(function (trigger) {
      trigger.setAttribute("aria-label", "Open cart, " + cart.item_count + " items");
    });

    var items = query("[data-cart-items]");
    var empty = query("[data-cart-empty]");
    var footer = query("[data-cart-footer]");
    var subtotal = query("[data-cart-subtotal]");
    if (items) {
      items.innerHTML = cart.items.map(function (item, itemIndex) {
        return cartItemHtml(item, itemIndex + 1);
      }).join("");
      items.hidden = cart.item_count === 0;
    }
    if (empty) empty.hidden = cart.item_count !== 0;
    if (footer) footer.hidden = cart.item_count === 0;
    if (subtotal) subtotal.textContent = money(cart.total_price);

    var drawer = query("[data-cart-drawer]");
    if (drawer) {
      var threshold = Number(drawer.getAttribute("data-free-shipping-threshold") || 0);
      var message = query("[data-shipping-message]", drawer);
      var progress = query("[data-shipping-progress]", drawer);
      if (threshold > 0 && message && progress) {
        var remaining = Math.max(0, threshold - cart.total_price);
        message.textContent = remaining === 0 ? "Free shipping unlocked" : "Add " + money(remaining) + " for free shipping";
        progress.style.width = Math.min(100, (cart.total_price / threshold) * 100) + "%";
      }
    }
  }

  function fetchCart() {
    return fetch(routes.cart + ".js", {
      headers: { Accept: "application/json" }
    }).then(function (response) {
      if (!response.ok) throw new Error("Unable to refresh cart");
      return response.json();
    }).then(function (cart) {
      renderCart(cart);
      return cart;
    });
  }

  function addProduct(form, submitter) {
    var title = form.getAttribute("data-product-title") || "Product";
    var original = submitter ? submitter.innerHTML : "";
    if (submitter) {
      submitter.disabled = true;
      submitter.setAttribute("aria-busy", "true");
    }

    return fetch(routes.cartAdd + ".js", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    }).then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok) throw new Error(data.description || "Unable to add product");
        return data;
      });
    }).then(function () {
      return fetchCart();
    }).then(function () {
      showToast(title, false);
      openCart();
    }).catch(function (error) {
      showToast(error.message, true);
    }).finally(function () {
      if (submitter) {
        submitter.disabled = false;
        submitter.removeAttribute("aria-busy");
        submitter.innerHTML = original;
      }
    });
  }

  function changeCartLine(line, quantity) {
    var drawer = query("[data-cart-drawer]");
    if (drawer) drawer.classList.add("is-loading");
    return fetch(routes.cartChange + ".js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ line: Number(line), quantity: Number(quantity) })
    }).then(function (response) {
      if (!response.ok) throw new Error("Unable to update cart");
      return response.json();
    }).then(renderCart).catch(function (error) {
      showToast(error.message, true);
    }).finally(function () {
      if (drawer) drawer.classList.remove("is-loading");
    });
  }

  function predictiveSearch(input) {
    var results = query("[data-predictive-results]");
    var term = input.value.trim();
    if (!results) return;
    if (term.length < 2) {
      results.innerHTML = "";
      return;
    }
    var url = routes.predictiveSearch + ".json?q=" + encodeURIComponent(term) +
      "&resources[type]=product&resources[limit]=4&resources[options][unavailable_products]=last";
    fetch(url, { headers: { Accept: "application/json" } })
      .then(function (response) {
        if (!response.ok) throw new Error("Search unavailable");
        return response.json();
      })
      .then(function (payload) {
        var products = (((payload || {}).resources || {}).results || {}).products || [];
        if (!products.length) {
          results.innerHTML = '<p class="predictive-empty">No products found.</p>';
          return;
        }
        results.innerHTML = products.map(function (product) {
          var imageUrl = product.featured_image && product.featured_image.url
            ? resizedImage(product.featured_image.url, 116)
            : "";
          var image = imageUrl
            ? '<img src="' + escapeHtml(imageUrl) + '" alt="" width="58" height="58" loading="lazy">'
            : "";
          return (
            '<a class="predictive-result" href="' + escapeHtml(product.url) + '">' +
              image +
              '<span><strong>' + escapeHtml(product.title) + "</strong>" +
              (!config.conceptMode && product.price ? "<span>" + escapeHtml(product.price) + "</span>" : "") +
              "</span>" +
            "</a>"
          );
        }).join("");
      })
      .catch(function () {
        results.innerHTML = '<p class="predictive-empty">Search is temporarily unavailable.</p>';
      });
  }

  function initReveal(scope) {
    var items = queryAll(".reveal:not(.in-view)", scope || document);
    if (!items.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach(function (item) { item.classList.add("in-view"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    items.forEach(function (item, index) {
      item.style.transitionDelay = (index % 3) * 70 + "ms";
      observer.observe(item);
    });
  }

  function updateVariant(select) {
    var option = select.options[select.selectedIndex];
    var section = select.closest("[data-product-section]");
    if (!option || !section) return;
    var price = query("[data-product-price]", section);
    var button = query("[data-add-button]", section);
    var label = query("[data-add-label]", section);
    var available = option.getAttribute("data-available") === "true";
    var currentPrice = Number(option.getAttribute("data-price") || 0);
    var comparePrice = Number(option.getAttribute("data-compare-price") || 0);
    if (price) {
      price.innerHTML = "<strong>" + money(currentPrice) + "</strong>" +
        (comparePrice > currentPrice ? "<s>" + money(comparePrice) + "</s>" : "");
    }
    if (button) button.disabled = !available;
    if (label) label.textContent = available ? "Add to setup" : "Sold out";
  }

  document.addEventListener("submit", function (event) {
    var form = event.target.closest(".js-product-form");
    if (!form || !event.submitter || !event.submitter.hasAttribute("data-ajax-add")) return;
    event.preventDefault();
    addProduct(form, event.submitter);
  });

  document.addEventListener("click", function (event) {
    var target = event.target;
    var cartTrigger = target.closest("[data-cart-trigger]");
    if (cartTrigger) {
      openCart();
      return;
    }
    if (target.closest("[data-cart-close]")) {
      closeDrawers();
      return;
    }
    if (target.closest("[data-drawer-backdrop]")) {
      closeDrawers();
      return;
    }
    if (target.closest("[data-search-trigger]")) {
      openSearch();
      return;
    }
    if (target.closest("[data-search-close]")) {
      closeDrawers();
      return;
    }
    var menuTrigger = target.closest("[data-menu-trigger]");
    if (menuTrigger) {
      toggleMenu(menuTrigger);
      return;
    }
    var mobileLink = target.closest("[data-mobile-menu] a");
    if (mobileLink) {
      var trigger = query("[data-menu-trigger]");
      if (trigger) toggleMenu(trigger);
      return;
    }
    var filterButton = target.closest("[data-filter]");
    if (filterButton && filterButton.closest(".product-tabs")) {
      var filter = filterButton.getAttribute("data-filter");
      queryAll("[data-filter]", filterButton.closest(".product-tabs")).forEach(function (button) {
        button.classList.toggle("is-active", button === filterButton);
      });
      queryAll(".product-card", filterButton.closest(".products-section")).forEach(function (card) {
        card.classList.toggle("is-filtered", filter !== "all" && card.getAttribute("data-category") !== filter);
      });
      return;
    }
    var cartChange = target.closest("[data-cart-change]");
    if (cartChange) {
      changeCartLine(cartChange.getAttribute("data-cart-change"), cartChange.getAttribute("data-quantity"));
      return;
    }
    var cartRemove = target.closest("[data-cart-remove]");
    if (cartRemove) {
      changeCartLine(cartRemove.getAttribute("data-cart-remove"), 0);
      return;
    }
    var productQuantity = target.closest("[data-product-quantity-change]");
    if (productQuantity) {
      var productForm = productQuantity.closest(".product-form");
      var quantityInput = query('input[name="quantity"]', productForm);
      if (quantityInput) {
        quantityInput.value = Math.max(1, Number(quantityInput.value || 1) + Number(productQuantity.getAttribute("data-product-quantity-change")));
      }
    }
  });

  document.addEventListener("input", function (event) {
    if (!event.target.matches("[data-predictive-search-input]")) return;
    clearTimeout(searchTimer);
    searchTimer = window.setTimeout(function () {
      predictiveSearch(event.target);
    }, 220);
  });

  document.addEventListener("change", function (event) {
    if (event.target.matches("[data-variant-select]")) updateVariant(event.target);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    closeDrawers();
    var menu = query("[data-mobile-menu]");
    if (menu && !menu.hidden) {
      var trigger = query("[data-menu-trigger]");
      if (trigger) toggleMenu(trigger);
    }
  });

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("pointermove", function (event) {
      var magnetic = event.target.closest(".magnetic");
      if (!magnetic) return;
      var rect = magnetic.getBoundingClientRect();
      var x = (event.clientX - rect.left - rect.width / 2) * 0.1;
      var y = (event.clientY - rect.top - rect.height / 2) * 0.12;
      magnetic.style.transform = "translate(" + x + "px," + y + "px)";
    });
    document.addEventListener("pointerout", function (event) {
      var magnetic = event.target.closest(".magnetic");
      if (magnetic) magnetic.style.transform = "";
    });
  }

  function onScroll() {
    var header = query("[data-site-header]");
    if (!header) return;
    var current = window.scrollY;
    header.classList.toggle("is-scrolled", current > 16);
    if (current > lastScroll && current > 280 && !header.classList.contains("menu-open")) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }
    lastScroll = current;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("shopify:section:load", function (event) {
    initReveal(event.target);
  });

  initReveal(document);
  onScroll();
})();
