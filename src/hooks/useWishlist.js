import { useState, useEffect } from 'react';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('elara-wishlist') || '[]');
    setWishlist(saved);
  }, []);

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const updated = prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id];
      localStorage.setItem('elara-wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const isWishlisted = (id) => wishlist.includes(id);

  return { wishlist, toggleWishlist, isWishlisted };
};
