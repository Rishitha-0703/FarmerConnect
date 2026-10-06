"use strict";

const translations = {
  en: {
    marketplace: "FARMER-TO-CONSUMER MARKETPLACE", welcome: "Fresh from farmers, closer to home.",
    welcome_copy: "Discover local produce and buy directly from the people who grow it.",
    login: "Log in", phone: "Phone number", password: "Password", no_account: "New to FramerConnect?",
    create_account: "Create an account", join: "JOIN THE MARKETPLACE", full_name: "Full name",
    account_type: "I want to", buy_produce: "Buy fresh produce", sell_produce: "Sell my produce",
    location_optional: "Location (optional)", use_gps: "Use GPS", upi_id: "UPI ID",
    already_account: "Already have an account?", farmer_space: "FARMER SPACE",
    my_products: "My products", add_product: "Add a product", seller_details: "Seller details",
    location: "Location", save_details: "Save details", incoming_orders: "Incoming orders",
    all_orders: "All orders", grown_nearby: "GROWN NEARBY, SHARED DIRECTLY",
    browse_title: "Good food starts with good connections.",
    browse_copy: "Browse seasonal produce listed by farmers in your community.",
    search_products: "Search products", search_placeholder: "Search products or locations",
    category: "Category", all_categories: "All categories", vegetables: "Vegetables",
    fruits: "Fruits", grains: "Grains", pulses: "Pulses", spices: "Spices", other: "Other",
    back_to_products: "← Back to my products", share_harvest: "SHARE YOUR HARVEST",
    choose_category: "Choose a category", product_name: "Product name", quantity: "Quantity in stock",
    price_per_unit: "Price per unit (₹)", description: "Description",
    product_image: "Product image (JPG, PNG, GIF, or WebP; max 5 MB)",
    publish_product: "Publish product", back_to_browse: "← Back to products",
    your_basket: "YOUR BASKET", your_cart: "Your cart", back_to_cart: "← Back to cart",
    almost_there: "ALMOST THERE", checkout: "Checkout", delivery_location: "Delivery location",
    payment_method: "Payment method", cash: "Cash on delivery", upi: "UPI",
    payment_reference: "UPI payment reference (optional)", place_order: "Place order",
    order_history: "ORDER HISTORY", orders: "Orders", browse: "Browse", cart: "Cart",
    my_orders: "My orders", logout: "Log out", register: "Register", farmer: "Farmer",
    consumer: "Consumer", farmer_label: "Farmer", seller: "Seller", stock: "Stock",
    in_stock: "In stock", out_of_stock: "OUT OF STOCK", view_details: "View details",
    add_to_cart: "Add to cart", update_stock: "Update stock", delete: "Delete",
    product_empty: "No products yet. Add your first product to get started.",
    browse_empty: "No products found. Try another search or category.",
    orders_empty: "No orders yet.", cart_empty: "Your cart is empty.",
    cart_continue: "Browse products", remove: "Remove", subtotal: "Subtotal",
    estimated_total: "Estimated total", available: "Available", save: "Save",
    order_status: "Order status", order_id: "Order", delivery_to: "Delivery to",
    payment: "Payment", quantity_label: "Quantity", customer: "Customer",
    status_pending: "Pending", status_accepted: "Accepted", status_preparing: "Preparing",
    status_ready: "Ready for pickup", status_completed: "Completed", status_cancelled: "Cancelled",
    change_status: "Change status", no_change: "No further status changes",
    total: "Total", unit: "unit", add_more: "Add more", order_success: "Order placed successfully.",
    account_created: "Account created. You are now logged in.", product_created: "Product published.",
    saved: "Saved successfully.", stock_saved: "Stock updated.", product_deleted: "Product deleted.",
    item_added: "Added to your cart.", item_removed: "Removed from your cart.",
    logged_out: "You have been logged out.", image_failed: "Could not load image.",
    empty_location: "Enter a location or use GPS.", location_failed: "Could not get your location. You can enter it manually.",
    login_required: "Please log in to continue.", wrong_role: "This page is not available for your account.",
    loading_failed: "Could not load data. Please try again.", status_saved: "Order status updated.",
    stock_conflict: "Stock changed while you were shopping. Review your cart and try again.",
    upi_pay_to: "Pay the farmer at this UPI ID", order_for: "From",
    price: "Price", description_missing: "No description provided.", finding_location: "Finding your location…",
    search_filter_label: "Product filters", confirm_delete: "Delete this product? Products with order history cannot be deleted.",
    cancel: "Cancel", confirm: "Delete", unavailable_product: "This product is no longer available.",
    main_navigation: "Main navigation", language_label: "Language"
  },
  te: {
    marketplace: "రైతు-వినియోగదారుల మార్కెట్", welcome: "రైతుల నుంచి తాజా పంట, మీ ఇంటికి దగ్గరగా.",
    welcome_copy: "స్థానిక పంటలను కనుగొని, వాటిని పండించిన రైతుల నుంచే కొనండి.",
    login: "లాగిన్", phone: "ఫోన్ నంబర్", password: "పాస్‌వర్డ్", no_account: "FramerConnect‌లో కొత్తవారా?",
    create_account: "ఖాతా సృష్టించండి", join: "మార్కెట్‌లో చేరండి", full_name: "పూర్తి పేరు",
    account_type: "నేను", buy_produce: "తాజా పంట కొనాలనుకుంటున్నాను", sell_produce: "నా పంట అమ్మాలనుకుంటున్నాను",
    location_optional: "ప్రాంతం (ఐచ్ఛికం)", use_gps: "GPS వాడండి", upi_id: "UPI ID",
    already_account: "ఇప్పటికే ఖాతా ఉందా?", farmer_space: "రైతు విభాగం",
    my_products: "నా ఉత్పత్తులు", add_product: "ఉత్పత్తి జోడించండి", seller_details: "విక్రేత వివరాలు",
    location: "ప్రాంతం", save_details: "వివరాలు భద్రపరచండి", incoming_orders: "వచ్చిన ఆర్డర్లు",
    all_orders: "అన్ని ఆర్డర్లు", grown_nearby: "మీ దగ్గర పండినవి, నేరుగా మీకోసం",
    browse_title: "మంచి ఆహారం మంచి అనుబంధంతో మొదలవుతుంది.",
    browse_copy: "మీ పరిసర రైతులు అందించిన కాలానుగుణ పంటలను చూడండి.",
    search_products: "ఉత్పత్తులను వెతకండి", search_placeholder: "ఉత్పత్తి లేదా ప్రాంతం వెతకండి",
    category: "వర్గం", all_categories: "అన్ని వర్గాలు", vegetables: "కూరగాయలు",
    fruits: "పండ్లు", grains: "ధాన్యాలు", pulses: "పప్పులు", spices: "సుగంధ ద్రవ్యాలు", other: "ఇతరాలు",
    back_to_products: "← నా ఉత్పత్తులకు వెనక్కి", share_harvest: "మీ పంటను పంచుకోండి",
    choose_category: "వర్గాన్ని ఎంచుకోండి", product_name: "ఉత్పత్తి పేరు", quantity: "నిల్వ పరిమాణం",
    price_per_unit: "యూనిట్ ధర (₹)", description: "వివరణ",
    product_image: "ఉత్పత్తి చిత్రం (JPG, PNG, GIF లేదా WebP; గరిష్ఠం 5 MB)",
    publish_product: "ఉత్పత్తిని ప్రచురించండి", back_to_browse: "← ఉత్పత్తులకు వెనక్కి",
    your_basket: "మీ బుట్ట", your_cart: "మీ కార్ట్", back_to_cart: "← కార్ట్‌కు వెనక్కి",
    almost_there: "ఇంకొంచెమే", checkout: "చెల్లింపు", delivery_location: "డెలివరీ ప్రాంతం",
    payment_method: "చెల్లింపు విధానం", cash: "డెలివరీ సమయంలో నగదు", upi: "UPI",
    payment_reference: "UPI చెల్లింపు రిఫరెన్స్ (ఐచ్ఛికం)", place_order: "ఆర్డర్ చేయండి",
    order_history: "ఆర్డర్ చరిత్ర", orders: "ఆర్డర్లు", browse: "చూడండి", cart: "కార్ట్",
    my_orders: "నా ఆర్డర్లు", logout: "లాగ్ అవుట్", register: "నమోదు", farmer: "రైతు",
    consumer: "వినియోగదారు", farmer_label: "రైతు", seller: "విక్రేత", stock: "నిల్వ",
    in_stock: "అందుబాటులో ఉంది", out_of_stock: "స్టాక్ లేదు", view_details: "వివరాలు చూడండి",
    add_to_cart: "కార్ట్‌లో వేయండి", update_stock: "స్టాక్ మార్చండి", delete: "తొలగించండి",
    product_empty: "ఇంకా ఉత్పత్తులు లేవు. మొదటి ఉత్పత్తిని జోడించండి.",
    browse_empty: "ఉత్పత్తులు కనబడలేదు. మరో వెతుకులాట లేదా వర్గాన్ని ప్రయత్నించండి.",
    orders_empty: "ఇంకా ఆర్డర్లు లేవు.", cart_empty: "మీ కార్ట్ ఖాళీగా ఉంది.",
    cart_continue: "ఉత్పత్తులను చూడండి", remove: "తొలగించండి", subtotal: "ఉప మొత్తం",
    estimated_total: "అంచనా మొత్తం", available: "అందుబాటులో", save: "భద్రపరచండి",
    order_status: "ఆర్డర్ స్థితి", order_id: "ఆర్డర్", delivery_to: "డెలివరీ చిరునామా",
    payment: "చెల్లింపు", quantity_label: "పరిమాణం", customer: "వినియోగదారు",
    status_pending: "పెండింగ్", status_accepted: "ఆమోదించబడింది", status_preparing: "సిద్ధం చేస్తున్నారు",
    status_ready: "తీసుకెళ్లడానికి సిద్ధం", status_completed: "పూర్తయింది", status_cancelled: "రద్దయింది",
    change_status: "స్థితి మార్చండి", no_change: "ఇక స్థితి మార్పులు లేవు",
    total: "మొత్తం", unit: "యూనిట్", add_more: "మరిన్ని జోడించండి", order_success: "ఆర్డర్ విజయవంతంగా నమోదైంది.",
    account_created: "ఖాతా సృష్టించబడింది. మీరు లాగిన్ అయ్యారు.", product_created: "ఉత్పత్తి ప్రచురించబడింది.",
    saved: "విజయవంతంగా భద్రపరచబడింది.", stock_saved: "స్టాక్ మార్చబడింది.", product_deleted: "ఉత్పత్తి తొలగించబడింది.",
    item_added: "మీ కార్ట్‌లో జోడించబడింది.", item_removed: "మీ కార్ట్ నుంచి తొలగించబడింది.",
    logged_out: "మీరు లాగ్ అవుట్ అయ్యారు.", image_failed: "చిత్రం లోడ్ కాలేదు.",
    empty_location: "ప్రాంతం నమోదు చేయండి లేదా GPS వాడండి.", location_failed: "మీ ప్రాంతాన్ని పొందలేకపోయాం. చేతితో నమోదు చేయండి.",
    login_required: "కొనసాగించడానికి లాగిన్ అవ్వండి.", wrong_role: "ఈ పేజీ మీ ఖాతాకు అందుబాటులో లేదు.",
    loading_failed: "వివరాలు లోడ్ కాలేదు. మళ్లీ ప్రయత్నించండి.", status_saved: "ఆర్డర్ స్థితి మార్చబడింది.",
    stock_conflict: "మీరు చూస్తున్నప్పుడు స్టాక్ మారింది. కార్ట్‌ను పరిశీలించి మళ్లీ ప్రయత్నించండి.",
    upi_pay_to: "ఈ UPI IDకు రైతుకు చెల్లించండి", order_for: "నుంచి",
    price: "ధర", description_missing: "వివరణ ఇవ్వలేదు.", finding_location: "మీ ప్రాంతాన్ని కనుగొంటోంది…",
    search_filter_label: "ఉత్పత్తి ఫిల్టర్లు", confirm_delete: "ఈ ఉత్పత్తిని తొలగించాలా? ఆర్డర్ చరిత్ర ఉన్న ఉత్పత్తులను తొలగించలేరు.",
    cancel: "రద్దు", confirm: "తొలగించండి", unavailable_product: "ఈ ఉత్పత్తి ఇక అందుబాటులో లేదు.",
    main_navigation: "ప్రధాన నావిగేషన్", language_label: "భాష"
  },
  hi: {
    marketplace: "किसान-से-उपभोक्ता बाज़ार", welcome: "किसानों की ताज़ा उपज, अब आपके और करीब।",
    welcome_copy: "स्थानीय उपज खोजें और उसे उगाने वाले किसानों से सीधे खरीदें।",
    login: "लॉग इन", phone: "फ़ोन नंबर", password: "पासवर्ड", no_account: "FramerConnect पर नए हैं?",
    create_account: "खाता बनाएँ", join: "बाज़ार से जुड़ें", full_name: "पूरा नाम",
    account_type: "मैं चाहता/चाहती हूँ", buy_produce: "ताज़ी उपज खरीदना", sell_produce: "अपनी उपज बेचना",
    location_optional: "स्थान (वैकल्पिक)", use_gps: "GPS इस्तेमाल करें", upi_id: "UPI ID",
    already_account: "पहले से खाता है?", farmer_space: "किसान अनुभाग",
    my_products: "मेरे उत्पाद", add_product: "उत्पाद जोड़ें", seller_details: "विक्रेता का विवरण",
    location: "स्थान", save_details: "विवरण सहेजें", incoming_orders: "नए ऑर्डर",
    all_orders: "सभी ऑर्डर", grown_nearby: "पास में उगाई गई, सीधे आपके लिए",
    browse_title: "अच्छा खाना, अच्छे जुड़ाव से शुरू होता है।",
    browse_copy: "अपने समुदाय के किसानों की मौसमी उपज देखें।",
    search_products: "उत्पाद खोजें", search_placeholder: "उत्पाद या स्थान खोजें",
    category: "श्रेणी", all_categories: "सभी श्रेणियाँ", vegetables: "सब्ज़ियाँ",
    fruits: "फल", grains: "अनाज", pulses: "दालें", spices: "मसाले", other: "अन्य",
    back_to_products: "← मेरे उत्पादों पर वापस", share_harvest: "अपनी उपज साझा करें",
    choose_category: "श्रेणी चुनें", product_name: "उत्पाद का नाम", quantity: "उपलब्ध मात्रा",
    price_per_unit: "प्रति इकाई कीमत (₹)", description: "विवरण",
    product_image: "उत्पाद की तस्वीर (JPG, PNG, GIF या WebP; अधिकतम 5 MB)",
    publish_product: "उत्पाद प्रकाशित करें", back_to_browse: "← उत्पादों पर वापस",
    your_basket: "आपकी टोकरी", your_cart: "आपकी कार्ट", back_to_cart: "← कार्ट पर वापस",
    almost_there: "बस एक कदम और", checkout: "चेकआउट", delivery_location: "डिलीवरी का स्थान",
    payment_method: "भुगतान का तरीका", cash: "डिलीवरी पर नकद", upi: "UPI",
    payment_reference: "UPI भुगतान संदर्भ (वैकल्पिक)", place_order: "ऑर्डर करें",
    order_history: "ऑर्डर इतिहास", orders: "ऑर्डर", browse: "उत्पाद देखें", cart: "कार्ट",
    my_orders: "मेरे ऑर्डर", logout: "लॉग आउट", register: "पंजीकरण", farmer: "किसान",
    consumer: "उपभोक्ता", farmer_label: "किसान", seller: "विक्रेता", stock: "स्टॉक",
    in_stock: "उपलब्ध", out_of_stock: "स्टॉक समाप्त", view_details: "विवरण देखें",
    add_to_cart: "कार्ट में जोड़ें", update_stock: "स्टॉक अपडेट करें", delete: "हटाएँ",
    product_empty: "अभी कोई उत्पाद नहीं है। शुरू करने के लिए पहला उत्पाद जोड़ें।",
    browse_empty: "कोई उत्पाद नहीं मिला। दूसरी खोज या श्रेणी आज़माएँ।",
    orders_empty: "अभी कोई ऑर्डर नहीं है।", cart_empty: "आपकी कार्ट खाली है।",
    cart_continue: "उत्पाद देखें", remove: "हटाएँ", subtotal: "उप-योग",
    estimated_total: "अनुमानित कुल", available: "उपलब्ध", save: "सहेजें",
    order_status: "ऑर्डर की स्थिति", order_id: "ऑर्डर", delivery_to: "डिलीवरी का पता",
    payment: "भुगतान", quantity_label: "मात्रा", customer: "ग्राहक",
    status_pending: "लंबित", status_accepted: "स्वीकृत", status_preparing: "तैयार हो रहा है",
    status_ready: "ले जाने के लिए तैयार", status_completed: "पूरा हुआ", status_cancelled: "रद्द",
    change_status: "स्थिति बदलें", no_change: "स्थिति में आगे बदलाव नहीं",
    total: "कुल", unit: "इकाई", add_more: "और जोड़ें", order_success: "ऑर्डर सफलतापूर्वक दिया गया।",
    account_created: "खाता बन गया। आप लॉग इन हैं।", product_created: "उत्पाद प्रकाशित हो गया।",
    saved: "सफलतापूर्वक सहेजा गया।", stock_saved: "स्टॉक अपडेट हुआ।", product_deleted: "उत्पाद हटाया गया।",
    item_added: "आपकी कार्ट में जोड़ा गया।", item_removed: "कार्ट से हटाया गया।",
    logged_out: "आप लॉग आउट हो गए हैं।", image_failed: "तस्वीर लोड नहीं हो सकी।",
    empty_location: "स्थान लिखें या GPS इस्तेमाल करें।", location_failed: "स्थान नहीं मिल सका। आप इसे हाथ से लिख सकते हैं।",
    login_required: "जारी रखने के लिए लॉग इन करें।", wrong_role: "यह पृष्ठ आपके खाते के लिए उपलब्ध नहीं है।",
    loading_failed: "जानकारी लोड नहीं हुई। फिर से कोशिश करें।", status_saved: "ऑर्डर की स्थिति अपडेट हुई।",
    stock_conflict: "खरीदारी के दौरान स्टॉक बदल गया। कार्ट देखें और फिर कोशिश करें।",
    upi_pay_to: "इस UPI ID पर किसान को भुगतान करें", order_for: "से",
    price: "कीमत", description_missing: "कोई विवरण नहीं दिया गया।", finding_location: "आपका स्थान खोज रहे हैं…",
    search_filter_label: "उत्पाद फ़िल्टर", confirm_delete: "यह उत्पाद हटाएँ? ऑर्डर इतिहास वाले उत्पाद हटाए नहीं जा सकते।",
    cancel: "रद्द करें", confirm: "हटाएँ", unavailable_product: "यह उत्पाद अब उपलब्ध नहीं है।",
    main_navigation: "मुख्य नेविगेशन", language_label: "भाषा"
  }
};

const categoryKeys = {
  Vegetables: "vegetables", Fruits: "fruits", Grains: "grains",
  Pulses: "pulses", Spices: "spices", Other: "other"
};
const statusKeys = {
  Pending: "status_pending", Accepted: "status_accepted", Preparing: "status_preparing",
  "Ready for pickup": "status_ready", Completed: "status_completed", Cancelled: "status_cancelled"
};
const statusTransitions = {
  Pending: ["Accepted", "Cancelled"],
  Accepted: ["Preparing", "Cancelled"],
  Preparing: ["Ready for pickup", "Cancelled"],
  "Ready for pickup": ["Completed", "Cancelled"],
  Completed: [],
  Cancelled: []
};
const tokenKey = "framerconnect_token";
const userKey = "framerconnect_user";
const cartKey = "framerconnect_cart";
let language = localStorage.getItem("framerconnect_language") || "en";
let toastTimer;

function t(key) {
  return (translations[language] && translations[language][key]) || translations.en[key] || key;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function getUser() {
  if (!localStorage.getItem(tokenKey)) {
    localStorage.removeItem(userKey);
    return null;
  }
  try {
    const user = JSON.parse(localStorage.getItem(userKey) || "null");
    return user && ["farmer", "consumer"].includes(user.role) ? user : null;
  } catch {
    localStorage.removeItem(userKey);
    return null;
  }
}

function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.toggle("error", isError);
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3800);
}

async function api(url, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = localStorage.getItem(tokenKey);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (options.body && !(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  let response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch {
    throw new Error(t("loading_failed"));
  }
  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : {};
  if (!response.ok) {
    const message = payload.error || t("loading_failed");
    if (response.status === 401) {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(userKey);
      if (!["login", "register"].includes(document.body.dataset.page)) {
        window.location.assign("/");
      }
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return payload;
}

function setSession(token, user) {
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(userKey, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}

function setFlash(key) {
  sessionStorage.setItem("framerconnect_flash", key);
}

function readCart() {
  try {
    const items = JSON.parse(localStorage.getItem(cartKey) || "[]");
    if (!Array.isArray(items)) throw new TypeError("Cart is invalid.");
    return items.filter(item =>
      Number.isInteger(item.product_id) && item.product_id > 0 &&
      Number.isInteger(item.quantity) && item.quantity > 0
    );
  } catch {
    localStorage.removeItem(cartKey);
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(cartKey, JSON.stringify(items));
}

function money(amount) {
  return new Intl.NumberFormat(language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 2
  }).format(Number(amount) || 0);
}

function applyTranslations() {
  document.documentElement.lang = language === "te" ? "te" : language === "hi" ? "hi" : "en";
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  const pageTitles = {
    en: {
      login: "FramerConnect | Fresh from farmers", register: "Create account | FramerConnect",
      farmer: "Farmer dashboard | FramerConnect", consumer: "Browse produce | FramerConnect",
      "add-product": "Add a product | FramerConnect", product: "Product details | FramerConnect",
      cart: "Your cart | FramerConnect", checkout: "Checkout | FramerConnect", orders: "Orders | FramerConnect"
    },
    te: {
      login: "FramerConnect | రైతుల నుంచి తాజా పంట", register: "ఖాతా సృష్టించండి | FramerConnect",
      farmer: "రైతు డ్యాష్‌బోర్డ్ | FramerConnect", consumer: "పంటను చూడండి | FramerConnect",
      "add-product": "ఉత్పత్తి జోడించండి | FramerConnect", product: "ఉత్పత్తి వివరాలు | FramerConnect",
      cart: "మీ కార్ట్ | FramerConnect", checkout: "చెల్లింపు | FramerConnect", orders: "ఆర్డర్లు | FramerConnect"
    },
    hi: {
      login: "FramerConnect | किसानों की ताज़ी उपज", register: "खाता बनाएँ | FramerConnect",
      farmer: "किसान डैशबोर्ड | FramerConnect", consumer: "उपज देखें | FramerConnect",
      "add-product": "उत्पाद जोड़ें | FramerConnect", product: "उत्पाद का विवरण | FramerConnect",
      cart: "आपकी कार्ट | FramerConnect", checkout: "चेकआउट | FramerConnect", orders: "ऑर्डर | FramerConnect"
    }
  };
  document.title = pageTitles[language][document.body.dataset.page] || "FramerConnect";
}

function renderHeader(page, user) {
  const header = document.getElementById("site-header");
  if (!header) return;
  let links = [];
  if (user?.role === "farmer") {
    links = [
      ["farmer_dashboard.html", "my_products"],
      ["addd_product.html", "add_product"],
      ["orders.html", "orders"]
    ];
  } else if (user?.role === "consumer") {
    links = [
      ["consumer_dashboard.html", "browse"],
      ["cart.html", "cart"],
      ["orders.html", "my_orders"]
    ];
  } else {
    links = [["/", "login"], ["/register.html", "register"]];
  }
  const activeName = window.location.pathname.split("/").pop() || "index.html";
  const nav = links.map(([href, key]) =>
    `<a href="/${href.replace(/^\//, "")}" data-i18n="${key}"${href.replace(/^\//, "") === activeName ? ' aria-current="page"' : ""}>${escapeHtml(t(key))}</a>`
  ).join("");
  const greeting = user ? `<span class="user-greeting">${escapeHtml(user.name)}</span><button id="logout-button" class="button secondary small" type="button" data-i18n="logout">${escapeHtml(t("logout"))}</button>` : "";
  header.className = "site-header";
  header.innerHTML = `
    <nav class="nav-wrap" aria-label="${escapeHtml(t("main_navigation"))}">
      <a class="brand" href="${user?.role === "farmer" ? "/farmer_dashboard.html" : user?.role === "consumer" ? "/consumer_dashboard.html" : "/"}"><span class="brand-mark" aria-hidden="true">F</span>FramerConnect</a>
      <div class="nav-links">${nav}</div>
      <div class="nav-actions">${greeting}
        <label class="sr-only" for="language-select">${escapeHtml(t("language_label"))}</label>
        <select id="language-select" class="language-select" aria-label="${escapeHtml(t("language_label"))}">
          <option value="en"${language === "en" ? " selected" : ""}>English</option>
          <option value="te"${language === "te" ? " selected" : ""}>తెలుగు</option>
          <option value="hi"${language === "hi" ? " selected" : ""}>हिन्दी</option>
        </select>
      </div>
    </nav>`;
}

function pageForRole(user) {
  return user.role === "farmer" ? "/farmer_dashboard.html" : "/consumer_dashboard.html";
}

function requirePageAccess(page, user) {
  const publicPages = ["login", "register"];
  if (publicPages.includes(page)) {
    if (user && page === "login") window.location.replace(pageForRole(user));
    return !user || page === "register";
  }
  if (!user) {
    window.location.replace("/");
    return false;
  }
  const farmerPages = ["farmer", "add-product"];
  const consumerPages = ["consumer", "product", "cart", "checkout"];
  if ((farmerPages.includes(page) && user.role !== "farmer") ||
      (consumerPages.includes(page) && user.role !== "consumer")) {
    window.location.replace(pageForRole(user));
    return false;
  }
  return true;
}

function formatCategory(category) {
  return t(categoryKeys[category] || "other");
}

function formatStatus(status) {
  return t(statusKeys[status] || "status_pending");
}

function stockBadge(product) {
  return product.quantity > 0
    ? `<span class="stock-badge">${escapeHtml(t("in_stock"))} · ${product.quantity}</span>`
    : `<span class="stock-badge out">${escapeHtml(t("out_of_stock"))}</span>`;
}

function productImage(product, className = "product-card-image") {
  if (!product.image_url) return `<div class="product-placeholder" aria-hidden="true">✿</div>`;
  const url = escapeHtml(product.image_url);
  const alt = escapeHtml(product.name);
  return `<img class="${className}" src="${url}" alt="${alt}" loading="lazy" onerror="this.hidden=true">`;
}

function renderProductCard(product, farmerMode = false) {
  const detailLink = `/product.html?id=${encodeURIComponent(product.id)}`;
  const actions = farmerMode
    ? `<div class="stock-control">
         <label class="sr-only" for="stock-${product.id}">${escapeHtml(t("stock"))}</label>
         <input id="stock-${product.id}" type="number" min="0" step="1" value="${product.quantity}" aria-label="${escapeHtml(t("stock"))}">
         <button class="button secondary small" type="button" data-stock-id="${product.id}" data-i18n="update_stock">${escapeHtml(t("update_stock"))}</button>
         <button class="button danger small" type="button" data-delete-id="${product.id}" data-i18n="delete">${escapeHtml(t("delete"))}</button>
       </div>`
    : `<div class="card-actions">
         <a class="button secondary small" href="${detailLink}" data-i18n="view_details">${escapeHtml(t("view_details"))}</a>
         ${product.quantity > 0 ? `<button class="button primary small" type="button" data-add-id="${product.id}" data-i18n="add_to_cart">${escapeHtml(t("add_to_cart"))}</button>` : ""}
       </div>`;
  const farmerInfo = farmerMode
    ? `<p>${escapeHtml(formatCategory(product.category))} · ${escapeHtml(product.location)}</p>`
    : `<p>${escapeHtml(t("seller"))}: ${escapeHtml(product.farmer_name)} · ${escapeHtml(product.location)}</p>`;
  return `<article class="product-card">
    ${productImage(product)}
    <div class="product-card-body">
      <h2><a href="${detailLink}">${escapeHtml(product.name)}</a></h2>
      ${farmerInfo}
      <div class="card-bottom"><span class="price">${escapeHtml(money(product.price))} / ${escapeHtml(t("unit"))}</span>${stockBadge(product)}</div>
      ${actions}
    </div>
  </article>`;
}

async function loadProducts() {
  const container = document.getElementById("consumer-products");
  if (!container) return;
  const search = document.getElementById("product-search")?.value.trim() || "";
  const category = document.getElementById("category-filter")?.value || "";
  const parameters = new URLSearchParams();
  if (search) parameters.set("search", search);
  if (category) parameters.set("category", category);
  try {
    const { products } = await api(`/api/products?${parameters}`);
    container.innerHTML = products.length
      ? products.map(product => renderProductCard(product)).join("")
      : `<p class="empty-state">${escapeHtml(t("browse_empty"))}</p>`;
  } catch (error) {
    container.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
  }
}

async function loadFarmerProducts() {
  const container = document.getElementById("farmer-products");
  if (!container) return;
  try {
    const { products } = await api("/api/my/products");
    container.innerHTML = products.length
      ? products.map(product => renderProductCard(product, true)).join("")
      : `<p class="empty-state">${escapeHtml(t("product_empty"))}</p>`;
    document.getElementById("farmer-location").value = getUser()?.location || "";
    document.getElementById("farmer-upi").value = getUser()?.upi_id || "";
  } catch (error) {
    container.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
  }
}

async function addToCart(productId) {
  const { product } = await api(`/api/products/${productId}`);
  if (product.quantity < 1) throw new Error(t("out_of_stock"));
  const cart = readCart();
  const item = cart.find(entry => entry.product_id === productId);
  if (item) {
    if (item.quantity >= product.quantity) throw new Error(`${t("available")}: ${product.quantity}`);
    item.quantity += 1;
  } else {
    cart.push({ product_id: productId, quantity: 1 });
  }
  saveCart(cart);
  showToast(t("item_added"));
}

async function loadProductDetail() {
  const container = document.getElementById("product-detail");
  const productId = Number(new URLSearchParams(window.location.search).get("id"));
  if (!Number.isInteger(productId) || productId < 1) {
    container.innerHTML = `<p class="empty-state">${escapeHtml(t("loading_failed"))}</p>`;
    return;
  }
  try {
    const { product } = await api(`/api/products/${productId}`);
    container.innerHTML = `
      ${product.image_url ? productImage(product, "detail-image") : ""}
      <p class="eyebrow">${escapeHtml(formatCategory(product.category))}</p>
      <h1 class="detail-title">${escapeHtml(product.name)}</h1>
      <p class="detail-meta"><span>${escapeHtml(t("seller"))}: ${escapeHtml(product.farmer_name)}</span><span>${escapeHtml(product.location)}</span></p>
      <p class="price">${escapeHtml(money(product.price))} / ${escapeHtml(t("unit"))}</p>
      <p class="detail-description">${escapeHtml(product.description || t("description_missing"))}</p>
      ${product.farmer_upi_id ? `<p>${escapeHtml(t("upi_pay_to"))}: <strong>${escapeHtml(product.farmer_upi_id)}</strong></p>` : ""}
      ${stockBadge(product)}
      ${product.quantity > 0 ? `<div class="quantity-row"><div><label for="detail-quantity">${escapeHtml(t("quantity_label"))}</label><input id="detail-quantity" type="number" min="1" max="${product.quantity}" value="1" step="1"></div><button id="detail-add" class="button primary" type="button" data-product-id="${product.id}" data-stock="${product.quantity}">${escapeHtml(t("add_to_cart"))}</button></div>` : ""}
    `;
  } catch (error) {
    container.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
  }
}

function cartLine(product, quantity) {
  const total = product.price * quantity;
  return `<article class="cart-line summary-row">
    <div><strong>${escapeHtml(product.name)}</strong><div class="detail-meta">${escapeHtml(product.farmer_name)} · ${escapeHtml(money(product.price))} / ${escapeHtml(t("unit"))} · ${escapeHtml(t("available"))}: ${product.quantity}</div>
      ${product.quantity === 0 ? `<span class="stock-badge out">${escapeHtml(t("out_of_stock"))}</span>` : ""}
    </div>
    <div class="cart-line-actions">
      <label class="sr-only" for="cart-quantity-${product.id}">${escapeHtml(t("quantity_label"))}</label>
      <input id="cart-quantity-${product.id}" data-cart-quantity="${product.id}" type="number" min="1" max="${product.quantity}" value="${quantity}" step="1" ${product.quantity === 0 ? "disabled" : ""}>
      <strong>${escapeHtml(money(total))}</strong>
      <button class="button danger small" type="button" data-remove-id="${product.id}" data-i18n="remove">${escapeHtml(t("remove"))}</button>
    </div>
  </article>`;
}

async function loadCart(targetId = "cart-items", includeCheckoutLink = true) {
  const container = document.getElementById(targetId);
  const cart = readCart();
  if (!cart.length) {
    container.innerHTML = `<p class="empty-state">${escapeHtml(t("cart_empty"))}<br><a class="button secondary" href="/consumer_dashboard.html">${escapeHtml(t("cart_continue"))}</a></p>`;
    return [];
  }
  try {
    const products = await Promise.all(cart.map(async item => {
      try {
        const result = await api(`/api/products/${item.product_id}`);
        return { item, product: result.product };
      } catch (error) {
        if (error.status === 404) return { item, product: null };
        throw error;
      }
    }));
    const total = products.reduce((sum, entry) =>
      sum + (entry.product ? entry.product.price * entry.item.quantity : 0), 0);
    const hasUnavailable = products.some(({ item, product }) =>
      !product || product.quantity < item.quantity);
    container.innerHTML = `
      <div class="cart-lines">${products.map(({ item, product }) => product
        ? cartLine(product, item.quantity)
        : `<article class="cart-line summary-row"><div><strong>${escapeHtml(t("unavailable_product"))}</strong></div><button class="button danger small" type="button" data-remove-id="${item.product_id}">${escapeHtml(t("remove"))}</button></article>`
      ).join("")}</div>
      <div class="summary-row summary-total"><span>${escapeHtml(t("estimated_total"))}</span><strong>${escapeHtml(money(total))}</strong></div>
      ${hasUnavailable ? `<p class="toast-message">${escapeHtml(t("stock_conflict"))}</p>` : ""}
      ${includeCheckoutLink ? `<a class="button primary full" href="/checkout.html">${escapeHtml(t("checkout"))}</a>` : ""}
    `;
    return products;
  } catch (error) {
    container.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}<br><a href="/consumer_dashboard.html">${escapeHtml(t("cart_continue"))}</a></p>`;
    return [];
  }
}

async function loadCheckout() {
  const entries = await loadCart("checkout-summary", false);
  const form = document.getElementById("checkout-form");
  const cart = readCart();
  if (!cart.length || !entries.length) {
    form.hidden = true;
    return;
  }
  const hasUnavailable = entries.some(({ item, product }) =>
    !product || product.quantity < item.quantity);
  if (hasUnavailable) {
    form.hidden = true;
    showToast(t("stock_conflict"), true);
    return;
  }
  form.hidden = false;
  document.getElementById("delivery-location").value = getUser()?.location || "";
}

function orderCard(order, farmerMode) {
  const nextStatuses = statusTransitions[order.status] || [];
  const statusSelect = farmerMode && nextStatuses.length
    ? `<div class="order-controls">
         <label class="sr-only" for="order-status-${order.id}">${escapeHtml(t("change_status"))}</label>
         <select id="order-status-${order.id}" data-order-status="${order.id}">
           ${nextStatuses.map(status => `<option value="${escapeHtml(status)}">${escapeHtml(formatStatus(status))}</option>`).join("")}
         </select>
         <button class="button secondary small" type="button" data-save-order="${order.id}">${escapeHtml(t("change_status"))}</button>
       </div>`
    : "";
  return `<article class="order-card">
    <div class="order-card-header">
      <h2>${escapeHtml(order.product_name)} · ${escapeHtml(t("order_id"))} #${order.id}</h2>
      <span class="status-badge ${order.status.toLowerCase().replaceAll(" ", "-")}">${escapeHtml(formatStatus(order.status))}</span>
    </div>
    <p>${escapeHtml(t("quantity_label"))}: ${order.quantity} · ${escapeHtml(t("total"))}: ${escapeHtml(money(order.total_price))}</p>
    <p>${escapeHtml(farmerMode ? `${t("customer")}: ${order.consumer_name}` : `${t("seller")}: ${order.farmer_name}`)} · ${escapeHtml(t("delivery_to"))}: ${escapeHtml(order.delivery_location)}</p>
    <p>${escapeHtml(t("payment"))}: ${escapeHtml(order.payment_method === "upi" ? "UPI" : t("cash"))}${order.payment_details ? ` · ${escapeHtml(order.payment_details)}` : ""}</p>
    ${statusSelect}
  </article>`;
}

async function loadOrders(targetId = "orders-list", farmerMode = false, limit = Infinity) {
  const container = document.getElementById(targetId);
  if (!container) return;
  try {
    const { orders } = await api("/api/orders");
    const shownOrders = orders.slice(0, limit);
    container.innerHTML = shownOrders.length
      ? shownOrders.map(order => orderCard(order, farmerMode)).join("")
      : `<p class="empty-state">${escapeHtml(t("orders_empty"))}</p>`;
  } catch (error) {
    container.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
  }
}

function bindForm(id, handler) {
  const form = document.getElementById(id);
  if (!form) return;
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const submitButton = form.querySelector('[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    try {
      await handler(form);
    } catch (error) {
      showToast(error.message, true);
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

function bindLogin() {
  bindForm("login-form", async form => {
    const data = Object.fromEntries(new FormData(form));
    const result = await api("/api/login", {
      method: "POST", body: JSON.stringify(data)
    });
    setSession(result.token, result.user);
    window.location.assign(pageForRole(result.user));
  });
}

function bindRegistration() {
  const role = document.getElementById("register-role");
  const upiWrap = document.getElementById("register-upi-wrap");
  const updateUpiVisibility = () => { upiWrap.hidden = role.value !== "farmer"; };
  role.addEventListener("change", updateUpiVisibility);
  updateUpiVisibility();
  bindForm("register-form", async form => {
    const values = Object.fromEntries(new FormData(form));
    const data = {
      name: values.name, phone: values.phone, password: values.password,
      role: values.role, location: values.location || "", upi_id: values.upi_id || ""
    };
    await api("/api/register", { method: "POST", body: JSON.stringify(data) });
    const result = await api("/api/login", {
      method: "POST", body: JSON.stringify({ phone: data.phone, password: data.password })
    });
    setSession(result.token, result.user);
    setFlash("account_created");
    window.location.assign(pageForRole(result.user));
  });
}

function bindProfileForm() {
  bindForm("farmer-profile-form", async form => {
    const values = Object.fromEntries(new FormData(form));
    const { user } = await api("/api/profile", {
      method: "PATCH", body: JSON.stringify(values)
    });
    localStorage.setItem(userKey, JSON.stringify(user));
    showToast(t("saved"));
    renderHeader(document.body.dataset.page, user);
  });
}

function bindProductForm() {
  bindForm("product-form", async form => {
    const image = form.elements.image.files[0];
    if (image && image.size > 5 * 1024 * 1024) throw new Error(t("product_image"));
    await api("/api/products", { method: "POST", body: new FormData(form) });
    setFlash("product_created");
    window.location.assign("/farmer_dashboard.html");
  });
}

function bindCheckoutForm() {
  const methodSelect = document.getElementById("payment-method");
  const paymentDetails = document.getElementById("payment-details-wrap");
  methodSelect.addEventListener("change", () => { paymentDetails.hidden = methodSelect.value !== "upi"; });
  bindForm("checkout-form", async form => {
    const cart = readCart();
    if (!cart.length) throw new Error(t("cart_empty"));
    const values = Object.fromEntries(new FormData(form));
    const result = await api("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        items: cart,
        delivery_location: values.delivery_location,
        payment_method: values.payment_method,
        payment_details: values.payment_details || ""
      })
    });
    saveCart([]);
    window.location.assign(`/orders.html?placed=${encodeURIComponent(result.order_group_id)}`);
  });
}

function updateCartQuantity(productId, quantity) {
  const cart = readCart();
  const item = cart.find(entry => entry.product_id === productId);
  if (!item) return;
  if (!Number.isInteger(quantity) || quantity < 1) {
    showToast(t("quantity_label"), true);
    return;
  }
  item.quantity = quantity;
  saveCart(cart);
}

function bindDelegatedActions() {
  document.addEventListener("click", async event => {
    const target = event.target.closest("button");
    if (!target) return;
    try {
      if (target.id === "logout-button") {
        await api("/api/logout", { method: "POST" });
        clearSession();
        setFlash("logged_out");
        window.location.assign("/");
      } else if (target.dataset.addId) {
        await addToCart(Number(target.dataset.addId));
      } else if (target.dataset.productId) {
        const productId = Number(target.dataset.productId);
        const quantity = Number(document.getElementById("detail-quantity").value);
        const available = Number(target.dataset.stock);
        if (!Number.isInteger(quantity) || quantity < 1 || quantity > available) {
          throw new Error(`${t("available")}: ${available}`);
        }
        const cart = readCart();
        const item = cart.find(entry => entry.product_id === productId);
        const requested = quantity + (item?.quantity || 0);
        if (requested > available) throw new Error(`${t("available")}: ${available}`);
        if (item) item.quantity = requested;
        else cart.push({ product_id: productId, quantity });
        saveCart(cart);
        showToast(t("item_added"));
      } else if (target.dataset.removeId) {
        saveCart(readCart().filter(item => item.product_id !== Number(target.dataset.removeId)));
        showToast(t("item_removed"));
        await loadCart();
      } else if (target.dataset.stockId) {
        const id = Number(target.dataset.stockId);
        const input = document.getElementById(`stock-${id}`);
        const quantity = Number(input.value);
        if (!Number.isInteger(quantity) || quantity < 0) throw new Error(t("stock"));
        await api(`/api/products/${id}`, {
          method: "PATCH", body: JSON.stringify({ quantity })
        });
        showToast(t("stock_saved"));
        await loadFarmerProducts();
      } else if (target.dataset.deleteId) {
        if (!await confirmAction(t("confirm_delete"))) return;
        const result = await api(`/api/products/${target.dataset.deleteId}`, { method: "DELETE" });
        showToast(result.warning || t("product_deleted"), Boolean(result.warning));
        await loadFarmerProducts();
      } else if (target.dataset.saveOrder) {
        const orderId = Number(target.dataset.saveOrder);
        const status = document.getElementById(`order-status-${orderId}`).value;
        await api(`/api/orders/${orderId}`, {
          method: "PATCH", body: JSON.stringify({ status })
        });
        showToast(t("status_saved"));
        await loadOrders(document.getElementById("orders-list") ? "orders-list" : "farmer-order-preview", true,
          document.getElementById("orders-list") ? Infinity : 3);
      }
    } catch (error) {
      const message = error.message.includes("available") ? t("stock_conflict") : error.message;
      showToast(message, true);
    }
  });
  document.addEventListener("change", async event => {
    const target = event.target;
    if (target.id === "language-select") {
      language = target.value;
      localStorage.setItem("framerconnect_language", language);
      renderHeader(document.body.dataset.page, getUser());
      applyTranslations();
      refreshPageContent();
      return;
    }
    if (target.matches("[data-cart-quantity]")) {
      const productId = Number(target.dataset.cartQuantity);
      const quantity = Number(target.value);
      const maximum = Number(target.max);
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > maximum) {
        showToast(`${t("available")}: ${maximum}`, true);
        await loadCart();
        return;
      }
      updateCartQuantity(productId, quantity);
      await loadCart();
    }
  });
}

function confirmAction(message) {
  let dialog = document.getElementById("action-dialog");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "action-dialog";
    document.body.append(dialog);
  }
  dialog.innerHTML = `
    <form method="dialog" class="confirm-form">
      <p>${escapeHtml(message)}</p>
      <div class="dialog-actions">
        <button class="button secondary" value="cancel">${escapeHtml(t("cancel"))}</button>
        <button class="button danger" value="confirm">${escapeHtml(t("confirm"))}</button>
      </div>
    </form>`;
  return new Promise(resolve => {
    dialog.addEventListener("close", () => resolve(dialog.returnValue === "confirm"), { once: true });
    dialog.showModal();
  });
}

function bindLocationButtons() {
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-geolocate]");
    if (!button) return;
    const input = document.getElementById(button.dataset.geolocate);
    if (!navigator.geolocation) {
      showToast(t("location_failed"), true);
      return;
    }
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = t("finding_location");
    navigator.geolocation.getCurrentPosition(
      position => {
        input.value = `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`;
        button.disabled = false;
        button.textContent = originalText;
      },
      () => {
        button.disabled = false;
        button.textContent = originalText;
        showToast(t("location_failed"), true);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  });
}

function initializePage() {
  language = ["en", "te", "hi"].includes(language) ? language : "en";
  const page = document.body.dataset.page;
  const user = getUser();
  if (!requirePageAccess(page, user)) return;
  renderHeader(page, user);
  applyTranslations();
  const flash = sessionStorage.getItem("framerconnect_flash");
  if (flash) {
    sessionStorage.removeItem("framerconnect_flash");
    showToast(t(flash));
  }
  bindDelegatedActions();
  bindLocationButtons();
  initializePageContent();
}

function refreshPageContent() {
  const page = document.body.dataset.page;
  if (page === "farmer") {
    loadFarmerProducts();
    loadOrders("farmer-order-preview", true, 3);
  }
  if (page === "consumer") loadProducts();
  if (page === "product") loadProductDetail();
  if (page === "cart") loadCart();
  if (page === "checkout") loadCheckout();
  if (page === "orders") loadOrders("orders-list", getUser()?.role === "farmer");
}

function initializePageContent() {
  const page = document.body.dataset.page;
  if (page === "login") bindLogin();
  if (page === "register") bindRegistration();
  if (page === "farmer") {
    bindProfileForm();
    loadFarmerProducts();
    loadOrders("farmer-order-preview", true, 3);
  }
  if (page === "consumer") {
    loadProducts();
    document.getElementById("product-search").addEventListener("input", () => {
      clearTimeout(window.productSearchTimer);
      window.productSearchTimer = setTimeout(loadProducts, 250);
    });
    document.getElementById("category-filter").addEventListener("change", loadProducts);
  }
  if (page === "add-product") bindProductForm();
  if (page === "product") loadProductDetail();
  if (page === "cart") loadCart();
  if (page === "checkout") {
    bindCheckoutForm();
    loadCheckout();
  }
  if (page === "orders") {
    if (new URLSearchParams(window.location.search).has("placed")) showToast(t("order_success"));
    loadOrders("orders-list", getUser()?.role === "farmer");
  }
}

document.addEventListener("DOMContentLoaded", initializePage);