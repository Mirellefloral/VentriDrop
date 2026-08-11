import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import DashboardLayout from '../../components/shared/DashboardLayout';
import { PRODUCT_CATEGORIES, EMOJI_CATEGORIES } from '../../data/demoData';

function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(product || {
    name: '', price: '', category: 'Food & Groceries', emoji: '🍎',
    description: '', region: '', area: '', stock: ''
  });
  const [imageMode, setImageMode] = useState('emoji');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiSearch, setEmojiSearch] = useState('');
  const imgRef = useRef();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const allEmojis = Object.values(EMOJI_CATEGORIES).flat();
  const filteredEmojis = emojiSearch
    ? allEmojis.filter((_, i) => true) // show all when searching; simplified
    : (EMOJI_CATEGORIES[form.category] || allEmojis.slice(0, 40));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { set('imageUrl', ev.target.result); setImageMode('image'); };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    onSave({ ...form, price: Number(form.price) });
  };

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 540 }}>
        <div className="modal-header">
          <h3>{product ? '✏️ Edit Product' : '➕ Add New Product'}</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {/* Preview */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'center' }}>
            <div style={{
              width: 100, height: 100, borderRadius: 16,
              background: 'linear-gradient(135deg, rgba(0,195,123,0.08), rgba(79,70,229,0.08))',
              border: '2px dashed var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: imageMode === 'image' && form.imageUrl ? 0 : 48,
              overflow: 'hidden', cursor: 'pointer', flexShrink: 0
            }} onClick={() => imageMode === 'emoji' ? setShowEmojiPicker(!showEmojiPicker) : imgRef.current?.click()}>
              {imageMode === 'image' && form.imageUrl
                ? <img src={form.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                : form.emoji || '🛍️'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Product Image</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <button
                  className={`btn btn-sm ${imageMode === 'emoji' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setImageMode('emoji')}
                >😊 Emoji</button>
                <button
                  className={`btn btn-sm ${imageMode === 'image' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => imgRef.current?.click()}
                >📷 Upload Photo</button>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Click the box to change emoji or upload a real product photo.</div>
              <input ref={imgRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
            </div>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && imageMode === 'emoji' && (
            <div style={{ background: 'var(--bg-input)', borderRadius: 14, padding: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <input
                  className="input"
                  placeholder="Search emojis..."
                  value={emojiSearch}
                  onChange={e => setEmojiSearch(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button className="btn btn-ghost btn-sm" onClick={() => { setShowEmojiPicker(false); setEmojiSearch(''); }}>✕</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 4, maxHeight: 200, overflowY: 'auto' }}>
                {(emojiSearch ? allEmojis : filteredEmojis).map((e, i) => (
                  <button key={i} onClick={() => { set('emoji', e); setShowEmojiPicker(false); setImageMode('emoji'); }}
                    style={{ fontSize: 24, background: form.emoji === e ? 'rgba(0,195,123,0.2)' : 'transparent', border: 'none', cursor: 'pointer', borderRadius: 8, padding: 4, transition: 'background 0.15s' }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="input-group">
              <label>Product Name *</label>
              <input className="input" placeholder="e.g. Fresh Tomatoes 1kg" value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div className="grid-2">
              <div className="input-group">
                <label>Price (FCFA) *</label>
                <input className="input" type="number" placeholder="0" value={form.price} onChange={e => set('price', e.target.value)} />
              </div>
              <div className="input-group">
                <label>Stock Quantity</label>
                <input className="input" type="number" placeholder="e.g. 50" value={form.stock} onChange={e => set('stock', e.target.value)} />
              </div>
            </div>
            <div className="input-group">
              <label>Category</label>
              <select className="select" value={form.category} onChange={e => { set('category', e.target.value); set('emoji', EMOJI_CATEGORIES[e.target.value]?.[0] || '🛍️'); }}>
                {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea className="textarea" rows={3} placeholder="Describe your product..." value={form.description} onChange={e => set('description', e.target.value)} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={!form.name || !form.price}>
            {product ? 'Save Changes' : 'Add Product 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SellerProducts() {
  const { sellerProducts, addProduct, updateProduct, deleteProduct, user } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = sellerProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data) => {
    if (editProduct) {
      updateProduct(editProduct.id, data);
    } else {
      addProduct({ ...data, region: user?.region || 'buea', area: user?.area || 'Molyko', rating: 0, orders: 0 });
    }
    setShowModal(false);
    setEditProduct(null);
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <h1 style={{ fontSize: 24 }}>🏪 My Products</h1>
          <button className="btn btn-primary" onClick={() => { setEditProduct(null); setShowModal(true); }}>
            ➕ Add Product
          </button>
        </div>
        <div className="search-bar" style={{ maxWidth: 400 }}>
          <span>🔍</span>
          <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="page-content">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏪</div>
            <h3>No products yet</h3>
            <p>Add your first product to start selling on VentriDrop!</p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setShowModal(true)}>➕ Add Product</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {filtered.map(p => (
              <div key={p.id} className="card" style={{ overflow: 'hidden' }}>
                <div style={{
                  height: 120, background: 'linear-gradient(135deg, rgba(0,195,123,0.08), rgba(79,70,229,0.08))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: p.imageUrl ? 0 : 52, overflow: 'hidden'
                }}>
                  {p.imageUrl
                    ? <img src={p.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={p.name} />
                    : p.emoji}
                </div>
                <div className="card-body">
                  <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{p.name}</div>
                  <div style={{ color: 'var(--brand-primary)', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>{p.price.toLocaleString()} FCFA</div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                    <span className="badge badge-muted" style={{ fontSize: 10 }}>{p.category}</span>
                    <span className="badge badge-success" style={{ fontSize: 10 }}>⭐ {p.rating || 0}</span>
                    <span className="badge badge-info" style={{ fontSize: 10 }}>{p.orders || 0} orders</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => { setEditProduct(p); setShowModal(true); }}>✏️ Edit</button>
                    <button className="btn btn-danger btn-sm" style={{ flex: 1 }} onClick={() => { if (confirm('Delete this product?')) deleteProduct(p.id); }}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <ProductModal
          product={editProduct}
          onClose={() => { setShowModal(false); setEditProduct(null); }}
          onSave={handleSave}
        />
      )}
    </DashboardLayout>
  );
}
