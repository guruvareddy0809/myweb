import { useState, useEffect } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
`;

const MENU_ITEMS = [
  { id: 1, name: "Truffle Mushroom Burger", price: 18.5, category: "Burgers", cal: 640, time: "20 min", emoji: "🍔", color: "#c8a96e", desc: "Double patty, wild truffle aioli, caramelized onions" },
  { id: 2, name: "Spicy Salmon Poke Bowl", price: 22.0, category: "Bowls", cal: 480, time: "15 min", emoji: "🍱", color: "#e07b60", desc: "Sushi-grade salmon, edamame, mango, sriracha mayo" },
  { id: 3, name: "Margherita Napoletana", price: 19.0, category: "Pizza", cal: 720, time: "25 min", emoji: "🍕", color: "#d4796a", desc: "San Marzano tomatoes, fior di latte, fresh basil" },
  { id: 4, name: "Pad Thai Royale", price: 16.5, category: "Noodles", cal: 590, time: "18 min", emoji: "🍜", color: "#c9924a", desc: "Rice noodles, tiger prawns, tamarind, crushed peanuts" },
  { id: 5, name: "Wagyu Beef Tacos", price: 24.0, category: "Tacos", cal: 520, time: "22 min", emoji: "🌮", color: "#b87f55", desc: "A5 Wagyu, pickled jalapeño, avocado crema, cotija" },
  { id: 6, name: "Lobster Bisque Pasta", price: 28.0, category: "Pasta", cal: 680, time: "30 min", emoji: "🦞", color: "#c06050", desc: "Fresh tagliatelle, Maine lobster, cognac cream sauce" },
];

const STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0f0d0a; }
  
  .app {
    font-family: 'DM Sans', sans-serif;
    background: #0f0d0a;
    min-height: 100vh;
    color: #f0e8d8;
    overflow-x: hidden;
  }

  /* ---- LOGIN ---- */
  .login-wrap {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media(max-width:700px){ .login-wrap{ grid-template-columns:1fr; } .login-hero{ display:none!important; } }

  .login-hero {
    background: linear-gradient(160deg, #1a120a 0%, #2d1e0e 50%, #1a120a 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 3rem;
  }
  .login-hero::before {
    content:'';
    position:absolute; inset:0;
    background: radial-gradient(ellipse at 30% 60%, rgba(200,120,40,0.18) 0%, transparent 70%);
  }
  .hero-food-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
    max-width: 340px;
    position: relative; z-index:1;
  }
  .hero-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 1.5rem 1rem;
    text-align: center;
    backdrop-filter: blur(10px);
    transition: transform 0.3s;
  }
  .hero-card:hover { transform: translateY(-4px); }
  .hero-card .emo { font-size: 2.4rem; display:block; margin-bottom:0.5rem; }
  .hero-card .label { font-size: 0.7rem; color: #c8a96e; letter-spacing: 0.1em; text-transform: uppercase; }
  .hero-tagline {
    position: relative; z-index:1;
    margin-top: 2rem;
    text-align: center;
  }
  .hero-tagline h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.4rem;
    font-weight: 900;
    color: #f0e8d8;
    line-height: 1.1;
  }
  .hero-tagline span { color: #c8a96e; }
  .hero-tagline p { font-size: 0.85rem; color: #8a7a68; margin-top: 0.5rem; }

  .login-form-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem 3rem;
    background: #12100d;
  }
  .login-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #c8a96e;
    margin-bottom: 3rem;
    letter-spacing: -0.02em;
  }
  .login-logo span { color: #f0e8d8; }
  .login-title { font-family:'Playfair Display',serif; font-size:2rem; font-weight:700; margin-bottom:0.4rem; }
  .login-sub { color:#7a6d60; font-size:0.9rem; margin-bottom:2.5rem; }

  .form-group { margin-bottom: 1.2rem; }
  .form-group label { display:block; font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; color:#8a7a68; margin-bottom:0.5rem; }
  .form-group input {
    width:100%; padding:0.85rem 1rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #f0e8d8;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    transition: border-color 0.2s;
    outline: none;
  }
  .form-group input:focus { border-color: #c8a96e; background: rgba(200,169,110,0.06); }

  .btn-primary {
    width:100%; padding:1rem;
    background: #c8a96e;
    color: #0f0d0a;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: all 0.2s;
    margin-top: 0.5rem;
  }
  .btn-primary:hover { background: #d9ba7e; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(200,169,110,0.25); }
  .btn-primary:active { transform: translateY(0); }

  .login-footer { margin-top:1.5rem; text-align:center; font-size:0.85rem; color:#5a5048; }
  .login-footer a { color:#c8a96e; cursor:pointer; text-decoration:none; }
  .demo-hint { margin-top:1rem; padding:0.8rem; background:rgba(200,169,110,0.08); border-radius:8px; font-size:0.8rem; color:#8a7a68; text-align:center; }
  .demo-hint strong { color:#c8a96e; }

  /* ---- ORDER PAGE ---- */
  .order-page { min-height:100vh; }
  
  .top-nav {
    position: sticky; top:0; z-index:100;
    background: rgba(15,13,10,0.92);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-logo { font-family:'Playfair Display',serif; font-size:1.3rem; font-weight:700; color:#c8a96e; }
  .nav-logo span { color:#f0e8d8; }
  .nav-right { display:flex; align-items:center; gap:1rem; }
  .nav-location { font-size:0.8rem; color:#7a6d60; }
  .nav-location strong { color:#c8a96e; }
  
  .cart-btn {
    position: relative;
    background: rgba(200,169,110,0.12);
    border: 1px solid rgba(200,169,110,0.3);
    border-radius: 24px;
    padding: 0.5rem 1.2rem;
    color: #c8a96e;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    display: flex; align-items:center; gap:0.5rem;
    transition: all 0.2s;
  }
  .cart-btn:hover { background: rgba(200,169,110,0.2); }
  .cart-badge {
    background: #c8a96e;
    color: #0f0d0a;
    border-radius: 50%;
    width: 18px; height:18px;
    font-size: 0.7rem;
    font-weight:700;
    display:flex; align-items:center; justify-content:center;
  }
  .user-pill {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 0.4rem 1rem;
    font-size: 0.82rem;
    color: #a09080;
    cursor:pointer;
    transition: all 0.2s;
  }
  .user-pill:hover { border-color: rgba(255,255,255,0.16); color:#f0e8d8; }

  .order-hero {
    padding: 3rem 2rem 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  .order-hero h2 { font-family:'Playfair Display',serif; font-size:2.6rem; font-weight:900; line-height:1.1; }
  .order-hero h2 span { color:#c8a96e; }
  .order-hero p { color:#7a6d60; margin-top:0.6rem; font-size:0.95rem; }

  .categories {
    padding: 0 2rem;
    max-width: 1100px;
    margin: 0 auto 2rem;
    display:flex; gap:0.6rem; flex-wrap:wrap;
  }
  .cat-pill {
    padding: 0.45rem 1.1rem;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid rgba(255,255,255,0.1);
    color: #8a7a68;
    background: transparent;
  }
  .cat-pill:hover { border-color: rgba(200,169,110,0.4); color: #c8a96e; }
  .cat-pill.active { background: #c8a96e; color: #0f0d0a; border-color: #c8a96e; font-weight:600; }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.2rem;
    padding: 0 2rem 4rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .menu-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    overflow: hidden;
    transition: all 0.3s;
    cursor: pointer;
  }
  .menu-card:hover { transform: translateY(-4px); border-color: rgba(200,169,110,0.25); background: rgba(255,255,255,0.05); }

  .card-visual {
    height: 140px;
    display: flex; align-items:center; justify-content:center;
    position: relative;
    overflow: hidden;
  }
  .card-emoji { font-size: 4.5rem; position:relative; z-index:1; filter: drop-shadow(0 8px 20px rgba(0,0,0,0.4)); }
  .card-body { padding: 1.2rem; }
  .card-meta { display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem; }
  .card-category { font-size:0.7rem; text-transform:uppercase; letter-spacing:0.1em; color:#8a7a68; font-weight:500; }
  .card-badges { display:flex; gap:0.4rem; }
  .badge { font-size:0.7rem; padding:0.2rem 0.6rem; border-radius:12px; background:rgba(255,255,255,0.06); color:#7a6d60; }
  .card-name { font-family:'Playfair Display',serif; font-size:1.15rem; font-weight:700; margin-bottom:0.3rem; line-height:1.2; }
  .card-desc { font-size:0.8rem; color:#6a5d52; line-height:1.5; margin-bottom:1rem; }
  .card-footer { display:flex; align-items:center; justify-content:space-between; }
  .card-price { font-size:1.2rem; font-weight:700; color:#c8a96e; font-family:'Playfair Display',serif; }
  
  .add-btn {
    background: #c8a96e;
    color: #0f0d0a;
    border: none;
    border-radius: 10px;
    width:36px; height:36px;
    font-size:1.2rem;
    cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    font-weight:700;
    transition: all 0.2s;
  }
  .add-btn:hover { background:#d9ba7e; transform:scale(1.1); }
  .add-btn.added { background: rgba(200,169,110,0.2); border:1px solid rgba(200,169,110,0.5); color:#c8a96e; font-size:0.8rem; border-radius:10px; width:auto; padding:0 0.7rem; gap:0.3rem; }

  /* ---- CART SIDEBAR ---- */
  .cart-overlay {
    position:fixed; inset:0; z-index:200;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    display:flex; justify-content:flex-end;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }

  .cart-panel {
    width: min(420px, 100vw);
    background: #15120e;
    border-left: 1px solid rgba(255,255,255,0.08);
    display:flex; flex-direction:column;
    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes slideIn { from{transform:translateX(100%)} to{transform:translateX(0)} }

  .cart-header {
    padding: 1.5rem 1.5rem 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    display:flex; align-items:center; justify-content:space-between;
  }
  .cart-header h3 { font-family:'Playfair Display',serif; font-size:1.3rem; }
  .close-btn { background:none; border:none; color:#7a6d60; cursor:pointer; font-size:1.4rem; line-height:1; transition:color 0.2s; }
  .close-btn:hover { color:#f0e8d8; }

  .cart-items { flex:1; overflow-y:auto; padding:1rem 1.5rem; }
  .cart-empty { text-align:center; padding:3rem 1rem; color:#5a5048; }
  .cart-empty .emo { font-size:3rem; display:block; margin-bottom:1rem; }

  .cart-item {
    display:flex; gap:1rem; align-items:center;
    padding:0.9rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .ci-emoji { font-size:2rem; flex-shrink:0; }
  .ci-info { flex:1; }
  .ci-name { font-size:0.9rem; font-weight:500; margin-bottom:0.2rem; }
  .ci-price { font-size:0.85rem; color:#c8a96e; }
  .ci-qty { display:flex; align-items:center; gap:0.5rem; }
  .qty-btn { background: rgba(255,255,255,0.07); border:none; color:#f0e8d8; width:26px;height:26px; border-radius:6px; cursor:pointer; font-size:1rem; transition:background 0.2s; display:flex;align-items:center;justify-content:center; }
  .qty-btn:hover { background:rgba(200,169,110,0.2); color:#c8a96e; }
  .qty-num { font-size:0.9rem; font-weight:600; min-width:1.2rem; text-align:center; }

  .cart-footer {
    padding:1.2rem 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.07);
  }
  .cart-total-row { display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.85rem; color:#7a6d60; }
  .cart-grand { display:flex; justify-content:space-between; margin:0.8rem 0 1.2rem; font-size:1.1rem; font-weight:700; }
  .cart-grand span:last-child { color:#c8a96e; font-family:'Playfair Display',serif; }

  /* ---- PAYMENT ---- */
  .pay-page {
    min-height:100vh;
    display:grid;
    grid-template-columns:1fr 420px;
    max-width:1000px;
    margin:0 auto;
    padding:3rem 2rem;
    gap:2rem;
    align-items:start;
  }
  @media(max-width:780px){ .pay-page{grid-template-columns:1fr;} }

  .pay-back {
    background:none; border:none; color:#7a6d60; cursor:pointer;
    font-family:'DM Sans',sans-serif; font-size:0.85rem;
    display:flex;align-items:center;gap:0.4rem;
    margin-bottom:2rem; transition:color 0.2s;
  }
  .pay-back:hover { color:#c8a96e; }

  .pay-title { font-family:'Playfair Display',serif; font-size:2rem; font-weight:900; margin-bottom:0.4rem; }
  .pay-sub { color:#7a6d60; font-size:0.9rem; margin-bottom:2rem; }

  .pay-section { margin-bottom:2rem; }
  .pay-section-label {
    font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em;
    color:#7a6d60; margin-bottom:1rem; display:flex;align-items:center;gap:0.6rem;
  }
  .pay-section-label::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.07); }

  .pay-methods { display:flex; gap:0.8rem; margin-bottom:1.5rem; flex-wrap:wrap; }
  .pay-method {
    flex:1; min-width:100px;
    padding:0.9rem;
    background: rgba(255,255,255,0.03);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:12px;
    text-align:center;
    cursor:pointer;
    transition:all 0.2s;
  }
  .pay-method:hover { border-color: rgba(200,169,110,0.3); }
  .pay-method.selected { border-color:#c8a96e; background:rgba(200,169,110,0.08); }
  .pay-method .pm-icon { font-size:1.5rem; display:block; margin-bottom:0.3rem; }
  .pay-method .pm-label { font-size:0.78rem; color:#8a7a68; font-weight:500; }
  .pay-method.selected .pm-label { color:#c8a96e; }

  .card-field-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.8rem; }
  .card-field-grid .full { grid-column:1/-1; }

  .delivery-options { display:flex; gap:0.8rem; }
  .del-opt {
    flex:1; padding:0.9rem;
    background:rgba(255,255,255,0.03);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:12px;
    cursor:pointer; transition:all 0.2s;
  }
  .del-opt:hover { border-color:rgba(200,169,110,0.3); }
  .del-opt.selected { border-color:#c8a96e; background:rgba(200,169,110,0.08); }
  .del-opt .do-label { font-size:0.85rem; font-weight:600; margin-bottom:0.2rem; }
  .del-opt.selected .do-label { color:#c8a96e; }
  .del-opt .do-desc { font-size:0.75rem; color:#6a5d52; }

  .order-summary-box {
    background: rgba(255,255,255,0.03);
    border:1px solid rgba(255,255,255,0.08);
    border-radius:18px;
    padding:1.5rem;
    position:sticky; top:5rem;
  }
  .os-title { font-family:'Playfair Display',serif; font-size:1.1rem; margin-bottom:1.2rem; }
  .os-item { display:flex; justify-content:space-between; font-size:0.85rem; padding:0.5rem 0; border-bottom:1px solid rgba(255,255,255,0.05); }
  .os-item:last-of-type { border:none; }
  .os-item .name { color:#8a7a68; flex:1; margin-right:0.5rem; }
  .os-item .qty { color:#6a5d52; margin-right:0.5rem; }
  .os-item .price { color:#f0e8d8; font-weight:500; }
  .os-divider { height:1px; background:rgba(255,255,255,0.08); margin:1rem 0; }
  .os-row { display:flex;justify-content:space-between; font-size:0.85rem; color:#7a6d60; margin-bottom:0.4rem; }
  .os-total { display:flex;justify-content:space-between; font-size:1.1rem; font-weight:700; margin-top:0.8rem; }
  .os-total span:last-child { color:#c8a96e; font-family:'Playfair Display',serif; }

  .pay-now-btn {
    width:100%; padding:1rem;
    background: linear-gradient(135deg, #c8a96e, #d9ba7e);
    color:#0f0d0a; border:none;
    border-radius:12px;
    font-family:'DM Sans',sans-serif; font-size:1rem; font-weight:700;
    cursor:pointer; letter-spacing:0.02em;
    margin-top:1.5rem;
    transition: all 0.2s;
    display:flex; align-items:center; justify-content:center; gap:0.6rem;
  }
  .pay-now-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(200,169,110,0.3); }

  /* ---- SUCCESS ---- */
  .success-page {
    min-height:100vh;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; padding:3rem 2rem;
  }
  .success-ring {
    width:100px;height:100px;
    border-radius:50%;
    background:rgba(200,169,110,0.1);
    border:2px solid rgba(200,169,110,0.3);
    display:flex;align-items:center;justify-content:center;
    font-size:2.8rem;
    margin:0 auto 2rem;
    animation: pop 0.5s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes pop { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
  .success-page h2 { font-family:'Playfair Display',serif; font-size:2.2rem; margin-bottom:0.6rem; }
  .success-page p { color:#7a6d60; max-width:340px; line-height:1.7; margin-bottom:0.5rem; }
  .order-id { font-size:0.8rem; color:#5a5048; letter-spacing:0.1em; margin-bottom:2.5rem; }
  .eta-box {
    background:rgba(200,169,110,0.08);
    border:1px solid rgba(200,169,110,0.2);
    border-radius:14px;
    padding:1.2rem 2rem;
    margin-bottom:2rem;
    display:flex;align-items:center;gap:1rem;
  }
  .eta-box .eta-icon { font-size:2rem; }
  .eta-box .eta-label { font-size:0.75rem;color:#8a7a68;text-transform:uppercase;letter-spacing:0.08em; }
  .eta-box .eta-time { font-family:'Playfair Display',serif; font-size:1.4rem; color:#c8a96e; font-weight:700; }
`;

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState({ name: "Alex", email: "alex@taste.io" });
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [payMethod, setPayMethod] = useState("card");
  const [delivery, setDelivery] = useState("standard");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [cardForm, setCardForm] = useState({ num: "", exp: "", cvv: "", name: "" });
  const [processing, setProcessing] = useState(false);

  const categories = ["All", ...new Set(MENU_ITEMS.map(i => i.category))];
  const filtered = activeCategory === "All" ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === activeCategory);
  const cartCount = cart.reduce((a, i) => a + i.qty, 0);
  const subtotal = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const deliveryFee = delivery === "express" ? 6.99 : 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      if (ex) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart(prev => {
      const next = prev.map(c => c.id === id ? { ...c, qty: c.qty + delta } : c).filter(c => c.qty > 0);
      return next;
    });
  };

  const handleLogin = () => {
    if (loginForm.email && loginForm.password) setPage("order");
    else setPage("order"); // demo: skip validation
  };

  const handlePayNow = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setPage("success"); }, 2000);
  };

  return (
    <>
      <style>{FONTS}{STYLES}</style>
      <div className="app">

        {/* ===== LOGIN ===== */}
        {page === "login" && (
          <div className="login-wrap">
            <div className="login-hero">
              <div className="hero-food-grid">
                {[["🍔","Burgers"],["🍱","Bowls"],["🍕","Pizza"],["🌮","Tacos"]].map(([e,l]) => (
                  <div className="hero-card" key={l}>
                    <span className="emo">{e}</span>
                    <span className="label">{l}</span>
                  </div>
                ))}
              </div>
              <div className="hero-tagline">
                <h1>Taste.<span>Delivered.</span></h1>
                <p>Premium food from the finest kitchens</p>
              </div>
            </div>
            <div className="login-form-side">
              <div className="login-logo">Sav<span>our</span></div>
              <h2 className="login-title">Welcome back</h2>
              <p className="login-sub">Sign in to continue your culinary journey</p>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" value={loginForm.email}
                  onChange={e => setLoginForm({...loginForm, email:e.target.value})} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••" value={loginForm.password}
                  onChange={e => setLoginForm({...loginForm, password:e.target.value})} />
              </div>
              <button className="btn-primary" onClick={handleLogin}>Sign In →</button>
              <div className="demo-hint">
                Demo: use any email/password or just click <strong>Sign In</strong>
              </div>
              <div className="login-footer">
                New to Savour? <a onClick={() => setPage("order")}>Create account</a>
              </div>
            </div>
          </div>
        )}

        {/* ===== ORDER PAGE ===== */}
        {page === "order" && (
          <div className="order-page">
            <nav className="top-nav">
              <div className="nav-logo">Sav<span>our</span></div>
              <div className="nav-right">
                <div className="nav-location">📍 Delivering to <strong>Manhattan, NY</strong></div>
                <button className="cart-btn" onClick={() => setCartOpen(true)}>
                  🛒 Cart
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </button>
                <div className="user-pill" onClick={() => setPage("login")}>👤 {user.name}</div>
              </div>
            </nav>

            <div className="order-hero">
              <h2>What are you<br/><span>craving today?</span></h2>
              <p>Fresh, curated dishes from top chefs — delivered in under 30 minutes</p>
            </div>

            <div className="categories">
              {categories.map(c => (
                <button key={c} className={`cat-pill ${activeCategory===c?"active":""}`}
                  onClick={() => setActiveCategory(c)}>{c}</button>
              ))}
            </div>

            <div className="menu-grid">
              {filtered.map(item => {
                const inCart = cart.find(c => c.id === item.id);
                return (
                  <div className="menu-card" key={item.id}>
                    <div className="card-visual" style={{background:`linear-gradient(135deg, ${item.color}22, ${item.color}44)`}}>
                      <span className="card-emoji">{item.emoji}</span>
                    </div>
                    <div className="card-body">
                      <div className="card-meta">
                        <span className="card-category">{item.category}</span>
                        <div className="card-badges">
                          <span className="badge">⏱ {item.time}</span>
                          <span className="badge">🔥 {item.cal}cal</span>
                        </div>
                      </div>
                      <div className="card-name">{item.name}</div>
                      <div className="card-desc">{item.desc}</div>
                      <div className="card-footer">
                        <span className="card-price">${item.price.toFixed(2)}</span>
                        {inCart ? (
                          <button className="add-btn added" onClick={() => changeQty(item.id, 1)}>
                            ✓ {inCart.qty}
                          </button>
                        ) : (
                          <button className="add-btn" onClick={() => addToCart(item)}>+</button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Sidebar */}
            {cartOpen && (
              <div className="cart-overlay" onClick={e => e.target===e.currentTarget && setCartOpen(false)}>
                <div className="cart-panel">
                  <div className="cart-header">
                    <h3>Your Order</h3>
                    <button className="close-btn" onClick={() => setCartOpen(false)}>✕</button>
                  </div>
                  <div className="cart-items">
                    {cart.length === 0 ? (
                      <div className="cart-empty">
                        <span className="emo">🍽️</span>
                        <p>Your cart is empty.<br/>Add something delicious!</p>
                      </div>
                    ) : cart.map(item => (
                      <div className="cart-item" key={item.id}>
                        <span className="ci-emoji">{item.emoji}</span>
                        <div className="ci-info">
                          <div className="ci-name">{item.name}</div>
                          <div className="ci-price">${(item.price * item.qty).toFixed(2)}</div>
                        </div>
                        <div className="ci-qty">
                          <button className="qty-btn" onClick={() => changeQty(item.id,-1)}>−</button>
                          <span className="qty-num">{item.qty}</span>
                          <button className="qty-btn" onClick={() => changeQty(item.id,1)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {cart.length > 0 && (
                    <div className="cart-footer">
                      <div className="cart-total-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                      <div className="cart-total-row"><span>Delivery</span><span>$2.99</span></div>
                      <div className="cart-grand"><span>Total</span><span>${(subtotal+2.99+subtotal*0.08).toFixed(2)}</span></div>
                      <button className="btn-primary" onClick={() => { setCartOpen(false); setPage("payment"); }}>
                        Proceed to Checkout →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== PAYMENT ===== */}
        {page === "payment" && (
          <div className="pay-page">
            <div>
              <button className="pay-back" onClick={() => setPage("order")}>← Back to menu</button>
              <h2 className="pay-title">Checkout</h2>
              <p className="pay-sub">You're almost there — just a few details</p>

              <div className="pay-section">
                <div className="pay-section-label">Payment Method</div>
                <div className="pay-methods">
                  {[{id:"card",icon:"💳",label:"Card"},{id:"apple",icon:"",label:"Apple Pay"},{id:"paypal",icon:"🅿️",label:"PayPal"}].map(m=>(
                    <div key={m.id} className={`pay-method ${payMethod===m.id?"selected":""}`} onClick={()=>setPayMethod(m.id)}>
                      <span className="pm-icon">{m.icon}</span>
                      <span className="pm-label">{m.label}</span>
                    </div>
                  ))}
                </div>
                {payMethod==="card" && (
                  <div className="card-field-grid">
                    <div className="form-group full">
                      <label>Card Number</label>
                      <input placeholder="1234 5678 9012 3456" value={cardForm.num}
                        onChange={e=>setCardForm({...cardForm,num:e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Expiry</label>
                      <input placeholder="MM/YY" value={cardForm.exp}
                        onChange={e=>setCardForm({...cardForm,exp:e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input placeholder="•••" value={cardForm.cvv}
                        onChange={e=>setCardForm({...cardForm,cvv:e.target.value})} />
                    </div>
                    <div className="form-group full">
                      <label>Cardholder Name</label>
                      <input placeholder="Alex Johnson" value={cardForm.name}
                        onChange={e=>setCardForm({...cardForm,name:e.target.value})} />
                    </div>
                  </div>
                )}
                {payMethod !== "card" && (
                  <div style={{padding:"1.5rem",textAlign:"center",color:"#7a6d60",fontSize:"0.9rem",background:"rgba(255,255,255,0.03)",borderRadius:"12px",border:"1px solid rgba(255,255,255,0.07)"}}>
                    {payMethod==="apple"?"Click 'Place Order' to authenticate with Apple Pay":"You'll be redirected to PayPal to complete payment"}
                  </div>
                )}
              </div>

              <div className="pay-section">
                <div className="pay-section-label">Delivery Speed</div>
                <div className="delivery-options">
                  <div className={`del-opt ${delivery==="standard"?"selected":""}`} onClick={()=>setDelivery("standard")}>
                    <div className="do-label">🚴 Standard</div>
                    <div className="do-desc">25–35 min · $2.99</div>
                  </div>
                  <div className={`del-opt ${delivery==="express"?"selected":""}`} onClick={()=>setDelivery("express")}>
                    <div className="do-label">⚡ Express</div>
                    <div className="do-desc">10–20 min · $6.99</div>
                  </div>
                </div>
              </div>

              <div className="pay-section">
                <div className="pay-section-label">Delivery Address</div>
                <div className="form-group">
                  <label>Street Address</label>
                  <input placeholder="123 West 57th Street, Apt 4B" />
                </div>
                <div className="card-field-grid">
                  <div className="form-group">
                    <label>City</label>
                    <input defaultValue="New York" />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input placeholder="10019" />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="order-summary-box">
                <div className="os-title">Order Summary</div>
                {cart.length === 0 ? (
                  <p style={{color:"#5a5048",fontSize:"0.85rem"}}>No items in cart</p>
                ) : cart.map(item => (
                  <div className="os-item" key={item.id}>
                    <span className="name">{item.emoji} {item.name}</span>
                    <span className="qty">×{item.qty}</span>
                    <span className="price">${(item.price*item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div className="os-divider" />
                <div className="os-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="os-row"><span>Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
                <div className="os-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="os-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
                <button className="pay-now-btn" onClick={handlePayNow} disabled={processing}>
                  {processing ? "⏳ Processing..." : `🔒 Place Order · $${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== SUCCESS ===== */}
        {page === "success" && (
          <div className="success-page">
            <div className="success-ring">🎉</div>
            <h2>Order Confirmed!</h2>
            <p>Your food is being prepared by our chefs and will be on its way shortly.</p>
            <div className="order-id">ORDER #SAV-{Math.floor(Math.random()*90000+10000)}</div>
            <div className="eta-box">
              <span className="eta-icon">🛵</span>
              <div>
                <div className="eta-label">Estimated Arrival</div>
                <div className="eta-time">{delivery==="express"?"12–18 min":"25–32 min"}</div>
              </div>
            </div>
            <button className="btn-primary" style={{width:"auto",padding:"0.85rem 2rem"}}
              onClick={() => { setCart([]); setPage("order"); }}>
              Order More Food
            </button>
          </div>
        )}
      </div>
    </>
  );
}
